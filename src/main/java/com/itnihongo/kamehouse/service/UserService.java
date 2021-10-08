package com.itnihongo.kamehouse.service;

import java.util.List;

import com.itnihongo.kamehouse.model.User;

public interface UserService {
    List<User> getAllUsers();
    User saveUser(User user);
}
