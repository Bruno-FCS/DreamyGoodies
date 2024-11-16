package com.project.backend.controllers;

import com.project.backend.dtos.UserDto;
import com.project.backend.models.RoleEnum;
import com.project.backend.models.UserApp;
import com.project.backend.services.UserAppService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserAppService userAppService;

    public UserController(UserAppService userAppService) {
       this.userAppService = userAppService;
   }

    //register post endpoint(posting registration)
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody UserApp userApp) {
        //save the user to database
        try {
            userApp.setRole(RoleEnum.CUSTOMER.name());
            userAppService.saveUserApp(userApp);
        } catch (IllegalStateException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
        catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Failed to save user.");
        }

        return ResponseEntity.ok("User saved successfully");

    }


    @GetMapping("/all")
    @PreAuthorize("hasAuthority('SCOPE_ADMIN')")
    public ResponseEntity<List<UserDto>> getAllUsers() {
        //Map a list of userApps to a list of userDtos
        //Create to not pass the user password to frontend
        List<UserApp> userAppList = userAppService.getAllUsers();
        List<UserDto> lisOfUsersDto = userAppList
                .stream()
                .map(userApp -> new UserDto(
                        userApp.getId(),
                        userApp.getName(),
                        userApp.getEmail(),
                        userApp.getRole()))
                .toList();
        return ResponseEntity.ok(lisOfUsersDto);
    }

}
