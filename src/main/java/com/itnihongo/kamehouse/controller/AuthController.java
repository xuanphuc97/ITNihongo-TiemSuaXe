package com.itnihongo.kamehouse.controller;

import com.itnihongo.kamehouse.dto.JwtTokenDTO;
import com.itnihongo.kamehouse.dto.UserDTO;
import com.itnihongo.kamehouse.model.User;
import com.itnihongo.kamehouse.service.EmailService;
import com.itnihongo.kamehouse.service.UserService;
import com.itnihongo.kamehouse.service.impl.AuthServiceImpl;
import com.itnihongo.kamehouse.service.impl.UserServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

@CrossOrigin(maxAge = 3600)
@RestController
@RequiredArgsConstructor(onConstructor_ = {@Autowired})
@RequestMapping("/auth")
public class AuthController {

    @Value("${webServerUrl}")
    private final String webServerUrl;

    private final long JWT_EXPIRATION = 604800000L;

    private final EmailService emailService;
    private final AuthServiceImpl authService;
    private final UserServiceImpl userServiceImpl;
    private final UserService userService;

    @PostMapping("/login")
    public ResponseEntity<Object> login(@Valid @RequestBody User user,
                                        HttpServletResponse response) {

        String accessToken = authService.login(user.getUsername(), user.getPassword(), response);
        return ResponseEntity.ok(new JwtTokenDTO(accessToken, JWT_EXPIRATION));
    }

    @PostMapping(path = "/register")
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

    @GetMapping(path = "/confirm")
    public String confirm(@RequestParam("token") String token) {
        userService.confirmUser(token);
        return "User confirmed.";
    }

    @PostMapping(path = "/reset")
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

    @PostMapping(path = "/changepwd")
    public User changePassword(@Valid @RequestBody User user) {
        return userService.changeUserPassword(user);
    }


}
