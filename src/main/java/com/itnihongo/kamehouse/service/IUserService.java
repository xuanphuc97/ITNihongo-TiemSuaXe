package com.itnihongo.kamehouse.service;

import com.itnihongo.kamehouse.dto.UserDTO;

public interface IUserService {
    UserDTO getDetailInfo(int userId);

    UserDTO getDetailInfo(String username);

    void updateProfile(String username, String password, String email, String fullname);
}
