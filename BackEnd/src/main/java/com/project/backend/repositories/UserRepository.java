package com.project.backend.repositories;

import com.project.backend.models.UserApp;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserApp, Integer>{

    //Optional to find user email on database
    Optional<UserApp> findByEmail(String email);
}
