package com.project.backend.services;

import com.project.backend.models.RoleEnum;
import com.project.backend.models.UserApp;
import com.project.backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserAppService {

    private final UserRepository userRepository;

    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    //construct injection
    @Autowired
    public UserAppService(UserRepository userRepository , BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.userRepository = userRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;

    }


    /**
     * Save the user to the database(register)
     * @param userApp UserApp to be saved
     * @return UserApp
     * @throws IllegalStateException when Username already exists
     */
    public UserApp saveUserApp(UserApp userApp) throws IllegalStateException {
        //check if the user is in database
        if(userRepository.findByEmail(userApp.getEmail()).isPresent()) {
            throw new IllegalStateException("Email already exists");
        }

        userApp.setPassword(bCryptPasswordEncoder.encode(userApp.getPassword()));

        //save the user to the address
        return userRepository.save(userApp);

    }

    public List<UserApp> getAllUsers() {
        return userRepository.findAll();
    }
}
