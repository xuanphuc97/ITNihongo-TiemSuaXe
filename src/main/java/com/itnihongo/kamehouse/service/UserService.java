package com.itnihongo.kamehouse.service;

import java.security.SecureRandom;
import java.util.List;
import java.util.Random;
import java.util.UUID;

import com.itnihongo.kamehouse.exception.DisableError;
import com.itnihongo.kamehouse.exception.UnauthorizedError;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.itnihongo.kamehouse.exception.BadRequestException;
import com.itnihongo.kamehouse.model.User;
import com.itnihongo.kamehouse.repository.UserRepository;

@Service
@EnableJpaAuditing

public class UserService {

//	@Bean
//	public PasswordEncoder passwordEncoder() {
//		return PasswordEncoderFactories.createDelegatingPasswordEncoder();
//	}

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private PasswordEncoder encoder;

	private static final Random RANDOM = new SecureRandom();
	private static final String ALPHABET = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

	public List<User> getAllUsers() {
		List<User> users = userRepository.findAll();
		for (User user : users) {
			user.setPassword("");
		}
		return users;
	}

	public User getUserByUsername(String username) {
		User user = userRepository.findByUsername(username);
		user.setPassword("");
		return user;
	}

	public boolean registerUser(User user) {

		// password
		String password = user.getPassword();
		if (password.isEmpty()) {
			throw new BadRequestException("Invalid password. 401");
		}

		String encodedPassword = encoder.encode(password);
		user.setPassword(encodedPassword);

		// User
		String username = user.getUsername();
		if (username.isEmpty()) {
			throw new BadRequestException("Invalid Username");
		}

		User userExists = userRepository.findByUsername(user.getUsername());
		if (userExists != null) {
			throw new BadRequestException("Username " +user.getUsername() + " is exist");
		}

		// Email
		String email = user.getEmail();
		if (email.isEmpty()) {
			throw new BadRequestException("Invalid email");
		}
		User emailExists = userRepository.findByEmail(user.getEmail());

		if (emailExists != null) {
			throw new BadRequestException("Email "+ user.getEmail() + " was registered ");
		}

		// Disable user until they click on confirmation link in email
//		String fullname = user.getFullName();
//		user.setFullName(fullname);
		user.setActive(false);
		user.setRole("ROLE_USER");

		// Generate random 36-character string token for confirmation link
		user.setConfirmationToken(UUID.randomUUID().toString());

		userRepository.save(user);

		return true;
	}

	public User resetUser(User user) {

		User emailExists = userRepository.findByEmail(user.getEmail());

		if (emailExists == null) {
			throw new BadRequestException(user.getEmail() + " is not registered");
		}

		String password = generatePassword(10);
		String encodedPassword = encoder.encode(password);
		emailExists.setPassword(encodedPassword);
		emailExists.setIsTempPassword(true);

		userRepository.save(emailExists);

		// return the user with plain password so that we can send it to the user's
		// email.
		emailExists.setPassword(password);

		return emailExists;
	}

	public User changeUserPassword(User user) {
		User userExists = userRepository.findByUsername(user.getUsername());

		if (userExists == null) {
			throw new BadRequestException(user.getUsername() + " is not registered. 401");
		}

		String oldPassword = user.getPassword();
		if (!encoder.matches(oldPassword, userExists.getPassword())) {
			throw new BadRequestException("Invalid current password. 401");
		}

		if (!userExists.getActive()) {
			throw new BadRequestException("The user is not enabled. 401");
		}

		String newPassword = user.getConfirmationToken();
		String encodedPassword = encoder.encode(newPassword);
		userExists.setPassword(encodedPassword);
		userExists.setIsTempPassword(false);

		userRepository.save(userExists);

		userExists.setPassword("");
		userExists.setId(0);
		return userExists;
	}

	public User confirmUser(String token) {
		User user = userRepository.findByConfirmationToken(token);

		if (user == null) {
			throw new BadRequestException("Invalid token. 401");
		}
		// Token found
		user.setActive(true);
		user.setConfirmationToken(token);

		// Save user
		userRepository.save(user);
		return user;
	}

	public User loginUser(User user) {
		User userExists = userRepository.findByUsername(user.getUsername());

		if (userExists == null) {
			throw new BadRequestException("Invalid user name. 400");
		}

		String password = user.getPassword();
		if (!encoder.matches(password, userExists.getPassword())) {
			throw new UnauthorizedError("Invalid user name and password combination.401");
		}

		if (!userExists.getActive()) {
			throw new DisableError("The user is not enabled. 423");
		}

		userExists.setPassword("");
		userExists.setId(0);
		return userExists;
	}

	public static String generatePassword(int length) {
		StringBuilder returnValue = new StringBuilder(length);
		for (int i = 0; i < length; i++) {
			returnValue.append(ALPHABET.charAt(RANDOM.nextInt(ALPHABET.length())));
		}
		return new String(returnValue);
	}
}
