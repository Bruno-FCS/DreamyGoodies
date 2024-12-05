package com.project.backend.services;

import java.io.IOException;
import java.time.Instant;
import java.util.Optional;

import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import com.project.backend.models.UserApp;
import com.project.backend.repositories.UserRepository;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class CustomAuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
    long EXPIRE_IN = 1800L;

    @Autowired
    private JwtEncoder jwtEncoder;
    @Autowired
    private OAuth2AuthorizedClientService authorizedClientService;
    @Autowired
    private CustomOAuth2UserService customOAuth2UserService;
    @Autowired
    private UserRepository userRepository;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException {
        // Extract user details
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();

        String email = oAuth2User.getAttribute("email");
        // Fetch email from GitHub API if not available in attributes
        if (email == null) {
            OAuth2AuthorizedClient authorizedClient = authorizedClientService.loadAuthorizedClient(
                "github", // The registrationId
                authentication.getName()
            );

            if (authorizedClient != null) {
                String accessToken = authorizedClient.getAccessToken().getTokenValue();
                email = customOAuth2UserService.fetchEmailFromGitHub(accessToken);
            }
        }
        String user = (String) oAuth2User.getAttributes().get("name");
        Instant now = Instant.now();

        Optional<UserApp> existingUser = userRepository.findByEmail(email);
        if (existingUser.isPresent()) {
            JwtClaimsSet claims = JwtClaimsSet.builder()
                    .issuer("backend")
                    .subject(email)
                    .issuedAt(now)
                    .expiresAt(now.plusSeconds(EXPIRE_IN))
                    .claim("scope", existingUser.get().getRole())
                    .claim("name", user)
                    .build();
            String tokenValue = jwtEncoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();

            // Redirect to the frontend with the token
            String redirectUrl = "http://localhost:3000?" + "token=" + tokenValue;
            getRedirectStrategy().sendRedirect(request, response, redirectUrl);
        }
    }
}
