package com.project.backend.services;

import com.project.backend.models.UserApp;
import com.project.backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest);

        String provider = userRequest.getClientRegistration().getRegistrationId(); //github
        String email = oAuth2User.getAttribute("email");

        Optional<UserApp> existingUser = userRepository.findByEmail(email);
        if (existingUser.isEmpty()) {
            UserApp newUser = new UserApp();
            newUser.setEmail(email);
            newUser.setProvider(provider);
            newUser.setPassword("OAuth2 user - no local password");
            userRepository.save(newUser);
        }

        return oAuth2User;
    }
}

