package com.itnihongo.kamehouse.service.impl;

import com.itnihongo.kamehouse.dto.UserDTO;
import com.itnihongo.kamehouse.exception.ResourceNotFoundException;
import com.itnihongo.kamehouse.model.User;
import com.itnihongo.kamehouse.repository.UserRepository;
import com.itnihongo.kamehouse.service.IAdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor(onConstructor_ = {@Autowired})
public class AdminServiceImpl implements IAdminService {

    private final UserRepository userRepository;

    @Override
    public List<UserDTO> getAllUser() {
        List<User> users = userRepository.findAll();
        if (users.isEmpty()) {
            System.out.println("DB is not having any accounts");
        }
        return users.stream().map(UserDTO::toUserDTO).collect(Collectors.toList());
    }

    @Override
    public void deleteUser(String username) {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new ResourceNotFoundException("user with username " + username + " not found");
        }
        userRepository.delete(user);
    }

    @Override
    public void editRole(String username, String role) {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new ResourceNotFoundException("user with username " + username + " not found");
        }
        user.setRole(role);
        userRepository.saveAndFlush(user);
    }
}
