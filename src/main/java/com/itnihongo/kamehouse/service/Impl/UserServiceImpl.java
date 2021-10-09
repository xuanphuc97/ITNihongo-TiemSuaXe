package com.itnihongo.kamehouse.service.Impl;

import java.util.List;

import com.itnihongo.kamehouse.model.User;
import com.itnihongo.kamehouse.repository.UserRepository;
import com.itnihongo.kamehouse.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
        // User user = new User(null, "linh99", "khanhlinh@gmail.com", "khanhlinh99",
        // "Nguyen Khanh Linh", "user", true,
        // false);
        // return List.of(user);
    }
}