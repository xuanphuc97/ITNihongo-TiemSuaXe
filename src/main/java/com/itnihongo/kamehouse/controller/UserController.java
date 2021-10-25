package com.itnihongo.kamehouse.controller;

import java.util.List;

import com.itnihongo.kamehouse.dto.UserDTO;
import com.itnihongo.kamehouse.model.User;
import com.itnihongo.kamehouse.service.UserService;

import com.itnihongo.kamehouse.service.impl.UserServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(maxAge = 3600) // https://spring.io/guides/gs/rest-service-cors/
@RestController
@RequiredArgsConstructor(onConstructor_ = {@Autowired})
public class UserController {

    private final UserService userService;

    private final UserServiceImpl userServiceImpl;

    @GetMapping(path = "/users")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping(path = "/users/{username}")
    public User getUserByUsername(@PathVariable("username") String username) {
        return userService.getUserByUsername(username);
    }

    @GetMapping("/whoami")
    @PreAuthorize("isAuthenticated()")
//    @Cacheable(key = "{@securityUtils.getLoggedInEmail()}")
    public ResponseEntity<Object> getCurrentUserInfo(
            Authentication authentication) {

        String username = authentication.getName();

        UserDTO userDTO = userServiceImpl.getDetailInfo(username);

        return ResponseEntity.ok(userDTO);
    }

//	@PostMapping(path = "/users/login")
//	public ResponseEntity<User> loginUser(@Valid @RequestBody User user) {
//		return ResponseEntity.ok(userService.loginUser(user));
//	}
}
