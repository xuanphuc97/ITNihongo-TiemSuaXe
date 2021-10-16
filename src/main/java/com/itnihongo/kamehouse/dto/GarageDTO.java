package com.itnihongo.kamehouse.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.itnihongo.kamehouse.model.Garage;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class GarageDTO {
    private int garageId;
    private UserDTO owner;
    private String garageName;
    private String phoneNumber;
    private String address;
    private String location;
    private String[] imageLinks;
    private LocalTime startAt;
    private LocalTime endAt;
    private Boolean active;

    public GarageDTO(int garageId, Boolean active) {
        this.garageId = garageId;
        this.active = active;
    }

    public static GarageDTO toGarageDTO(Garage garage) {
        if (garage == null)
            return null;

        return GarageDTO.builder()
                .garageId(garage.getId())
                .garageName(garage.getGarageName())
                .phoneNumber(garage.getPhoneNumber())
                .address(garage.getAddress())
                .location(garage.getLocation())
                .imageLinks(garage.getImages())
                .startAt(garage.getStartAt())
                .endAt(garage.getEndAt())
                .active(garage.getActive())
                .build();
    }
}
