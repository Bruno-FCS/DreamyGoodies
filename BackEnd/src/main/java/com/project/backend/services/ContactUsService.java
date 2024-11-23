package com.project.backend.services;

import com.project.backend.models.Message;
import com.project.backend.repositories.MessageRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContactUsService {

    private final MessageRepository messageRepository;

    //construct injection
    public ContactUsService(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }

    public Message save(Message message) throws IllegalStateException {
        return messageRepository.save(message);
    }

    public List<Message> getAllMessages() {
        return messageRepository.findAll();
    }
}
