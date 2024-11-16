package com.project.backend.dtos;

public record UserDto(Long id,
                      String name,
                      String email,
                      String role) {
}
