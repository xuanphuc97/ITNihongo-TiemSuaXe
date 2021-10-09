package com.itnihongo.kamehouse.controller;

import java.util.List;

import com.itnihongo.kamehouse.model.User;
import com.itnihongo.kamehouse.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/users")
    public List<User> getAllUsers() {

        List<User> listAllUsers = userService.getAllUsers();

        return listAllUsers;

    }

}
