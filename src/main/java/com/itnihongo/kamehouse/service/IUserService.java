package com.itnihongo.kamehouse.service;

import com.itnihongo.kamehouse.dto.UserDTO;

public interface IUserService {
    UserDTO getDetailInfo(int userId);

    UserDTO getDetailInfo(String username);
}
