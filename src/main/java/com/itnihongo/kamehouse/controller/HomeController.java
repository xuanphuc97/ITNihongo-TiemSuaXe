package com.itnihongo.kamehouse.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(maxAge = 3600, origins = {"https://localhost:3000"})
public class HomeController {
    @GetMapping("/")
    String home() {
        return "Kamehouse api";
    }
}
