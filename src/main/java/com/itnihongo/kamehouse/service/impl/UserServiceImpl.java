package com.itnihongo.kamehouse.service.impl;

import com.itnihongo.kamehouse.dto.UserDTO;
import com.itnihongo.kamehouse.exception.BadRequestException;
import com.itnihongo.kamehouse.exception.ResourceNotFoundException;
import com.itnihongo.kamehouse.model.User;
import com.itnihongo.kamehouse.repository.UserRepository;
import com.itnihongo.kamehouse.service.EmailService;
import com.itnihongo.kamehouse.service.IUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor(onConstructor_ = {@Autowired})
public class UserServiceImpl implements IUserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;
    @Value("${webServerUrl}")
    private String webServerUrl;

    @Override
    public UserDTO getDetailInfo(int userId) {
        User user = userRepository.findByIdAndActive(userId, true);
        if (user == null) {
            throw new ResourceNotFoundException("Account with id: " + userId + " not found");
        }
        return UserDTO.toUserDTO(user);
    }

    @Override
    public UserDTO getDetailInfo(String username) {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new ResourceNotFoundException("Account with username: '" + username + "' not found");
        }
        return UserDTO.toUserDTO(user);
    }

    @Override
    public void updateProfile(String username, String password, String email, String fullname) {
        User user = userRepository.findByUsername(username);
        String encodedPass = passwordEncoder.encode(password);

        if (user == null) {
            throw new ResourceNotFoundException("Account with username: '" + username + "' not found");
        }
        if (!user.getUsername().equals(username)) {
            user.setUsername(username);
        }
        if (!passwordEncoder.matches(password, user.getPassword())) {
            user.setPassword(encodedPass);
        }
        if (!user.getFullName().equals(fullname)) {
            user.setFullName(fullname);
        }
        if (!user.getEmail().equals(email)) {
            User emailExists = userRepository.findByEmail(email);
            if (emailExists != null) {
                throw new BadRequestException("Email "+ user.getEmail() + " was registered ");
            }
            user.setEmail(email);
            user.setConfirmationToken(UUID.randomUUID().toString());
            user.setActive(false);

            SimpleMailMessage updateEmail = new SimpleMailMessage();
            updateEmail.setTo(email);
            updateEmail.setSubject("Registration Confirmation");
            updateEmail.setText("To confirm your e-mail address, please click the link below:\n" + webServerUrl
                    + "/auth/confirm?token=" + user.getConfirmationToken());
            updateEmail.setFrom("noreply@domain.com");

            emailService.sendEmail(updateEmail);
        }
        userRepository.saveAndFlush(user);
    }

}
