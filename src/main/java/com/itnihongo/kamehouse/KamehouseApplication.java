package com.itnihongo.kamehouse;

import java.util.List;

import com.itnihongo.kamehouse.model.User;
import com.itnihongo.kamehouse.repository.UserRepository;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class KamehouseApplication {
	public static void main(String[] args) {
		SpringApplication.run(KamehouseApplication.class, args);

	}
	// @Bean
	// CommandLineRunner commandLineRunner(UserRepository userRepository) {
	// return args -> {
	// User linh = new User(null, "linh99", "khanhlinh@gmail.com", "khanhlinh99",
	// "Nguyen Khanh Linh", "user",
	// true, false);
	// userRepository.save(linh);
	// };
	// }

}
