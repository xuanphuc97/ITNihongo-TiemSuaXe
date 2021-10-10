package com.itnihongo.kamehouse;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication(exclude = { SecurityAutoConfiguration.class })
@RestController
public class KamehouseApplication {
	public static void main(String[] args) {
		SpringApplication.run(KamehouseApplication.class, args);

	}

	@GetMapping
	String home() {
		return "Kamehouse api";
	}

}
