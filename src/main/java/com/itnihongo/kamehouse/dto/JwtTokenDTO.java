package com.itnihongo.kamehouse.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
public class JwtTokenDTO {
    private final String token;
    private long duration;
}
