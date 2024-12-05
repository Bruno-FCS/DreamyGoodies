package com.project.backend.controllers;


import com.project.backend.dtos.LoginRequest;
import com.project.backend.dtos.LoginResponse;
import com.project.backend.models.UserApp;
import com.project.backend.repositories.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController implements ErrorController {

    UserRepository userRepository;
    BCryptPasswordEncoder bCryptPasswordEncoder;
    JwtEncoder jwtEncoder;
    long EXPIRE_IN = 1800L;

    //Constructor Injection
    public AuthController(UserRepository userRepository, BCryptPasswordEncoder bCryptPasswordEncoder, JwtEncoder jwtEncoder) {
        this.userRepository = userRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.jwtEncoder = jwtEncoder;
    }

    //custom login endpoint
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest) {
        Optional<UserApp> userApp = userRepository.findByEmail(loginRequest.email());
        if (userApp.isEmpty() || !bCryptPasswordEncoder.matches(loginRequest.password(), userApp.get().getPassword())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        Instant now = Instant.now();

        String tokenValue = getTokenValue(userApp.get(), now);

        return ResponseEntity.ok(new LoginResponse(tokenValue, EXPIRE_IN));
    }

    private String getTokenValue(UserApp userApp, Instant now) {
        JwtClaimsSet claims = JwtClaimsSet.builder()
                .issuer("backend")
                .subject(userApp.getEmail())
                .issuedAt(now)
                .expiresAt(now.plusSeconds(EXPIRE_IN))
                .claim("scope", userApp.getRole())
                .claim("name", userApp.getName())
                .build();
        String tokenValue = jwtEncoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();
        return tokenValue;
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpServletRequest request, HttpServletResponse response) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null) {
            new SecurityContextLogoutHandler().logout(request, response, authentication);
        }
        return ResponseEntity.ok("Logout successful");
    }

    @GetMapping("/attr")
    public String getUserAttributes(@AuthenticationPrincipal OAuth2User oAuth2User) {
        return oAuth2User.getAttributes().toString();
    }

}
