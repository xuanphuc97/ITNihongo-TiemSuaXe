package com.itnihongo.kamehouse.controller;

import com.itnihongo.kamehouse.dto.JwtTokenDTO;
import com.itnihongo.kamehouse.dto.UserDTO;
import com.itnihongo.kamehouse.model.User;
import com.itnihongo.kamehouse.service.impl.AuthServiceImpl;
import com.itnihongo.kamehouse.service.impl.UserServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

@CrossOrigin(maxAge = 3600)
@RestController
@RequiredArgsConstructor
//@RequestMapping("")
public class AuthController {

    private final long JWT_EXPIRATION = 604800000L;

    private final AuthServiceImpl authService;
    private final UserServiceImpl userService;

    @PostMapping("/users/login")
    public ResponseEntity<Object> login(@Valid @RequestBody User user,
                                        HttpServletResponse response) {

        String accessToken = authService.login(user.getUsername(), user.getPassword(), response);
        return ResponseEntity.ok(new JwtTokenDTO(accessToken, JWT_EXPIRATION));
    }

    @GetMapping("/whoami")
    @PreAuthorize("isAuthenticated()")
    @Cacheable(key = "{@securityUtils.getLoggedInEmail()}")
    public ResponseEntity<Object> getCurrentUserInfo(
            Authentication authentication) {

        String username = authentication.getName();

        UserDTO userDTO = userService.getDetailInfo(username);

        return ResponseEntity.ok(userDTO);
    }

}
