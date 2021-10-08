package com.itnihongo.kamehouse;

import java.util.List;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class KamehouseApplication {
	public static void main(String[] args) {
		SpringApplication.run(KamehouseApplication.class, args);

	}

	@GetMapping
	public String listUsers() {
		// return userService.getAllUsers();
		return "Hello";
	}
}
