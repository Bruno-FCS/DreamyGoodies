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
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.Optional;

@RestController
@RequestMapping("/auth")
public class AuthController implements ErrorController {

    UserRepository userRepository;
    BCryptPasswordEncoder bCryptPasswordEncoder;
    JwtEncoder jwtEncoder;

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
        long expireIn = 1800L;

        JwtClaimsSet claims = JwtClaimsSet.builder()
                .issuer("backend")
                .subject(userApp.get().getEmail())
                .issuedAt(now)
                .expiresAt(now.plusSeconds(expireIn))
                .claim("scope", userApp.get().getRole())
                .build();
        String tokenValue = jwtEncoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();

        return ResponseEntity.ok(new LoginResponse(tokenValue, expireIn));
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpServletRequest request, HttpServletResponse response) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null) {
            new SecurityContextLogoutHandler().logout(request, response, authentication);
        }
        return ResponseEntity.ok("Logout successful");
    }
}
