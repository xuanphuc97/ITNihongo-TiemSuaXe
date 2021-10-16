package com.itnihongo.kamehouse.dto;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalTime;

@Data
public class GarageRequestDTO {

    @NotNull
    @NotBlank
    private String garageName;

    private String phoneNumber;
    private String address;
    private String location;
    private String[] images;
    private String startAt;
    private String endAt;
}
