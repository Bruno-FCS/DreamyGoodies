package com.project.backend.dtos;

public record LoginResponse(String accessToken, Long expiresIn) {
}
