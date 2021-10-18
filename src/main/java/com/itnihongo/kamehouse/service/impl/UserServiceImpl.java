package com.itnihongo.kamehouse.service.impl;

import com.itnihongo.kamehouse.dto.UserDTO;
import com.itnihongo.kamehouse.exception.ResourceNotFoundException;
import com.itnihongo.kamehouse.model.User;
import com.itnihongo.kamehouse.repository.UserRepository;
import com.itnihongo.kamehouse.service.IUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor(onConstructor_ = {@Autowired})
public class UserServiceImpl implements IUserService {

    private final UserRepository userRepository;

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
}
