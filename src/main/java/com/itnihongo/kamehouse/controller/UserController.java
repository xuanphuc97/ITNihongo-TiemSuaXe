package com.itnihongo.kamehouse.controller;

import java.util.List;

import com.itnihongo.kamehouse.model.User;
import com.itnihongo.kamehouse.service.UserService;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {
    private UserService userService;

    public UserController(UserService userServcie) {
        super();
        this.userService = userService;
    }

    @GetMapping("/users")
    public String listUsers() {
        List<User> a = userService.getAllUsers();
        User b = a.get(0);
        return b.toString();

    }

}
