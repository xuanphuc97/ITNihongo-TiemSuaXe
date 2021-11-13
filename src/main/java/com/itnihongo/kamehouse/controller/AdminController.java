package com.itnihongo.kamehouse.controller;

import com.itnihongo.kamehouse.dto.UserDTO;
import com.itnihongo.kamehouse.service.IAdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(maxAge = 3600)
@RestController
@RequiredArgsConstructor(onConstructor_ = { @Autowired })
@PreAuthorize("hasRole('ADMIN')")
@RequestMapping("/api")
public class AdminController {
    private final IAdminService adminService;

    @GetMapping("/users")
    public ResponseEntity<Object> getAllUsers() {
        List<UserDTO> users = adminService.getAllUser();
        return ResponseEntity.ok(users);
    }

    @DeleteMapping("/users/{username}")
    public ResponseEntity<Object> deleteUser(@PathVariable("username") String username) {
        adminService.deleteUser(username);
        return ResponseEntity.accepted().build();
    }

    @PutMapping("/users/{username}")
    public ResponseEntity<Object> updateRoleOfUser(@PathVariable("username") String username,
            @RequestParam("role") String role) {
        adminService.editRole(username, role);
        return ResponseEntity.accepted().build();
    }
}
