package com.itnihongo.kamehouse.service;

import com.itnihongo.kamehouse.dto.GarageDTO;
import com.itnihongo.kamehouse.dto.GarageRequestDTO;
import com.itnihongo.kamehouse.model.Garage;

import java.util.List;

public interface IGarageService {
    GarageDTO getGarageDetail(int garageId);

    List<GarageDTO> getAllGarages();

    List<GarageDTO> getAllGaragesOfUser(int userId);

    GarageDTO addNewGarage(GarageRequestDTO garageRequestDTO, String username);

    GarageDTO updateGarage(GarageRequestDTO garageRequestDTO, int id);

    Garage deleteGarage(int garageId);

    List<GarageDTO> findGaragesByName(String name);

    List<GarageDTO> findGaragesByAddress(String address);

    List<GarageDTO> findAllGaragesOrderedByDistance(String location);

    List<GarageDTO> findAllGaragesOrderedByRating();

    Garage saveImageLink(String imgLink, int garageId);
}
