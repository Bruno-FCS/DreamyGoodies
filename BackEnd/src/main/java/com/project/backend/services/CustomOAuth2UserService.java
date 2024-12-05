package com.project.backend.services;

import com.project.backend.models.RoleEnum;
import com.project.backend.models.UserApp;
import com.project.backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest);

        String email = oAuth2User.getAttribute("email");
        if (email == null) {
            // when user has no email available for public, fetch from github api
            email = fetchEmailFromGitHub(userRequest.getAccessToken().getTokenValue());
        }
        Optional<UserApp> existingUser = userRepository.findByEmail(email);
        if (existingUser.isEmpty()) {
            String name = oAuth2User.getAttribute("name");
            if (name == null) {
                name = oAuth2User.getAttribute("login");
            }
            String provider = userRequest.getClientRegistration().getRegistrationId(); //github

            UserApp newUser = new UserApp();
            newUser.setName(name);
            newUser.setEmail(email);
            newUser.setProvider(provider);
            newUser.setRole(RoleEnum.CUSTOMER.name());
            newUser.setPassword("OAuth2 user - no local password");
            userRepository.save(newUser);
        }
        return oAuth2User;
    }

    // needed when email is not public
    public String fetchEmailFromGitHub(String accessToken) {
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(accessToken);

        HttpEntity<String> entity = new HttpEntity<>(headers);

        ResponseEntity<List> response = restTemplate.exchange(
            "https://api.github.com/user/emails",
            HttpMethod.GET,
            entity,
            List.class
        );

        List<Map<String, Object>> emails = response.getBody();
        if (emails != null) {
            for (Map<String, Object> emailInfo : emails) {
                if ((boolean) emailInfo.get("primary")) {
                    return (String) emailInfo.get("email");
                }
            }
        }
        throw new IllegalStateException("Primary email not found");
    }
}

