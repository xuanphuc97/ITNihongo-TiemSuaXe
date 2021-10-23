package com.itnihongo.kamehouse.controller;

import java.util.List;
import javax.validation.Valid;

import com.itnihongo.kamehouse.model.User;
import com.itnihongo.kamehouse.service.EmailService;
import com.itnihongo.kamehouse.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
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
public class UserController {

	@Autowired
	private UserService userService;

	@Autowired
	private EmailService emailService;

	@Value("${webServerUrl}")
	private String webServerUrl;

	@GetMapping(path = "/users")
	public List<User> getAllUsers() {
		return userService.getAllUsers();
	}

	@GetMapping(path = "/users/{username}")
	public User getUserByUsername(@PathVariable("username") String username) {
		return userService.getUserByUsername(username);
	}

	@PostMapping(path = "/users/register")
	public void register(@Valid @RequestBody User user) {

		if (userService.registerUser(user)) {

			SimpleMailMessage registrationEmail = new SimpleMailMessage();
			registrationEmail.setTo(user.getEmail());
			registrationEmail.setSubject("Registration Confirmation");
			registrationEmail.setText("To confirm your e-mail address, please click the link below:\n" + webServerUrl
					+ "/users/confirm?token=" + user.getConfirmationToken());
			registrationEmail.setFrom("noreply@domain.com");

			emailService.sendEmail(registrationEmail);
		}
	}

	@GetMapping(path = "/users/confirm")
	public String confirm(@RequestParam("token") String token) {
		userService.confirmUser(token);
		return "User confirmed.";
	}

//	@PostMapping(path = "/users/login")
//	public ResponseEntity<User> loginUser(@Valid @RequestBody User user) {
//		return ResponseEntity.ok(userService.loginUser(user));
//	}

	@PostMapping(path = "/users/reset")
	public void reset(@Valid @RequestBody User user) {
		User resetUser = userService.resetUser(user);
		if (resetUser != null) {
			SimpleMailMessage registrationEmail = new SimpleMailMessage();
			registrationEmail.setTo(user.getEmail());
			registrationEmail.setSubject("Temporary Password Sent From " + webServerUrl);
			registrationEmail
					.setText("To access your account, please use this temporary password:  " + resetUser.getPassword()
							+ ".\r\nNOTE: This email was sent from an automated system. Please do not reply.");
			registrationEmail.setFrom("noreply@domain.com");
			emailService.sendEmail(registrationEmail);
		}
	}

	@PostMapping(path = "/users/changepwd")
	public User changePassword(@Valid @RequestBody User user) {
		return userService.changeUserPassword(user);
	}


}
