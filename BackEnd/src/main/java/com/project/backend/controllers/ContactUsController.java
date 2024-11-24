package com.project.backend.controllers;

import com.project.backend.models.Message;
import com.project.backend.services.ContactUsService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contactus")
public class ContactUsController {

    private final ContactUsService contactUsService;

    public ContactUsController(ContactUsService contactUsService) {
       this.contactUsService = contactUsService;
   }

    @PostMapping("/message/send")
    public ResponseEntity<String> sendMessage(@RequestBody Message message) {
        //save the message to database
        try {
            contactUsService.save(message);
        } catch (IllegalStateException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
        catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Failed to save message.");
        }

        return ResponseEntity.ok("Message saved successfully");
    }


    @GetMapping("/message/all")
    @PreAuthorize("hasAuthority('SCOPE_ADMIN')")
    public ResponseEntity<List<Message>> getAllMessages() {
        List<Message> messages = contactUsService.getAllMessages();
        return ResponseEntity.ok(messages);
    }

}
