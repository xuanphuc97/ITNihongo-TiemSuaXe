package com.itnihongo.kamehouse.service.impl;

import com.itnihongo.kamehouse.dto.GarageDTO;
import com.itnihongo.kamehouse.dto.GarageRequestDTO;
import com.itnihongo.kamehouse.dto.UserDTO;
import com.itnihongo.kamehouse.exception.ResourceNotFoundException;
import com.itnihongo.kamehouse.model.Garage;
import com.itnihongo.kamehouse.model.User;
import com.itnihongo.kamehouse.repository.GarageRepository;
import com.itnihongo.kamehouse.repository.UserRepository;
import com.itnihongo.kamehouse.service.IGarageService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor(onConstructor_ = {@Autowired})
public class GarageServiceImpl implements IGarageService {

    private final UserRepository userRepository;

    private final GarageRepository garageRepository;

    @Override
    public GarageDTO getGarageDetail(int garageId) {
        Garage garage = garageRepository.findById(garageId);

        if (garage == null)
            throw new ResourceNotFoundException("Garage with id: " + garageId + " not found!");
        return entityToDTO(garage);
    }

    @Override
    public List<GarageDTO> getAllGarages() {
        List<Garage> garages = garageRepository.findAll();

        if (garages.isEmpty()) {
            throw new ResourceNotFoundException("DB is not having any garages");
        }

        return garages.stream().map(this::entityToDTO).collect(Collectors.toList());
    }

    @Override
    public List<GarageDTO> getAllGaragesOfUser(int userId) {
        List<Garage> garages = garageRepository.findAllByUser_Id(userId);

        if (garages.isEmpty()) {
            throw new ResourceNotFoundException("User is not having any garages");
        }

        return garages.stream().map(this::entityToDTO).collect(Collectors.toList());
    }

    @Override
    public GarageDTO addNewGarage(GarageRequestDTO garageRequestDTO, String username) {
        Garage garage = new Garage(
                garageRequestDTO.getGarageName(),
                garageRequestDTO.getPhoneNumber(),
                garageRequestDTO.getAddress(),
                garageRequestDTO.getLocation(),
                garageRequestDTO.getImage(),
                garageRequestDTO.getStartAt(),
                garageRequestDTO.getEndAt()
        );
        garage.setUser(userRepository.findByUsername(username));
        garage.setActive(true);

        Garage savedGarage = garageRepository.save(garage);
        if (garage.getActive()) {
            System.out.println("garage has been saved!");
        }

        return new GarageDTO(savedGarage.getId(), savedGarage.getActive());
    }

    private GarageDTO entityToDTO(Garage garage) {
        User owner = garage.getUser();
        UserDTO ownerDTO = UserDTO.toUserDTO(owner);

        GarageDTO garageDTO = GarageDTO.toGarageDTO(garage);
        garageDTO.setOwner(ownerDTO);
        return garageDTO;
    }

}
