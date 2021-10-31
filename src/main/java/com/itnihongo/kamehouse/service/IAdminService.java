package com.itnihongo.kamehouse.service;

import com.itnihongo.kamehouse.dto.UserDTO;

import java.util.List;

public interface IAdminService {
    List<UserDTO> getAllUser();
    void deleteUser(String username);
    void editRole(String username, String role);
}
