package com.itnihongo.kamehouse.controller;

import com.itnihongo.kamehouse.dto.UserDTO;
import com.itnihongo.kamehouse.service.IUserService;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(maxAge = 3600, origins = {"https://localhost:3000"})
@RestController
@RequiredArgsConstructor(onConstructor_ = {@Autowired})
@PreAuthorize("isAuthenticated()")
public class UserController {

    private final IUserService userService;

    @GetMapping(path = "/users/{username}")
    public ResponseEntity<UserDTO> getUserByUsername(@PathVariable("username") String username) {
        UserDTO user = userService.getDetailInfo(username);
        return ResponseEntity.ok(user);
    }

    @GetMapping("/whoami")
    @PreAuthorize("isAuthenticated()")
//    @Cacheable(key = "{@securityUtils.getLoggedInEmail()}")
    public ResponseEntity<Object> getCurrentUserInfo(
            Authentication authentication) {

        String username = authentication.getName();

        UserDTO userDTO = userService.getDetailInfo(username);

        return ResponseEntity.ok(userDTO);
    }

    @PutMapping("/users/update")
//    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Object> updateUser(@RequestParam("email") String email,
                                             @RequestParam("fullname") String fullname,
                                             Authentication authentication
    ) {
        String username = authentication.getName();
        userService.updateProfile(username, email, fullname);
        return ResponseEntity.accepted().build();
    }

//	@PostMapping(path = "/users/login")
//	public ResponseEntity<User> loginUser(@Valid @RequestBody User user) {
//		return ResponseEntity.ok(userService.loginUser(user));
//	}
}
