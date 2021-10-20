package com.itnihongo.kamehouse.controller;

import com.itnihongo.kamehouse.dto.JwtTokenDTO;
import com.itnihongo.kamehouse.service.impl.AuthServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {

    private final long JWT_EXPIRATION = 604800000L;

    private final AuthServiceImpl authService;

    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestParam("username") String username,
                                        @RequestParam("password") String password,
                                        HttpServletResponse response) {

        String accessToken = authService.login(username, password, response);
        return ResponseEntity.ok(new JwtTokenDTO(accessToken, JWT_EXPIRATION));
    }
}
