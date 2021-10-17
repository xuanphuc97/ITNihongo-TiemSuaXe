package com.itnihongo.kamehouse.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.itnihongo.kamehouse.model.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserDTO {
    private int accountId;
    private String username;
    private String email;
    private String fullName;
    private String role;

    public static UserDTO toUserDTO(User entity) {
        return UserDTO.builder()
                .accountId(entity.getId())
                .username(entity.getUsername())
                .email(entity.getEmail())
                .fullName(entity.getFullName())
                .role(entity.getRole())
                .build();
    }
}
