package com.itnihongo.kamehouse.service.impl;

import com.itnihongo.kamehouse.dto.GarageDTO;
import com.itnihongo.kamehouse.dto.GarageRequestDTO;
import com.itnihongo.kamehouse.dto.UserDTO;
import com.itnihongo.kamehouse.exception.ResourceNotFoundException;
import com.itnihongo.kamehouse.model.Garage;
import com.itnihongo.kamehouse.model.Review;
import com.itnihongo.kamehouse.model.User;
import com.itnihongo.kamehouse.repository.GarageRepository;
import com.itnihongo.kamehouse.repository.ReviewRepository;
import com.itnihongo.kamehouse.repository.UserRepository;
import com.itnihongo.kamehouse.service.IGarageService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalTime;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor(onConstructor_ = {@Autowired})
public class GarageServiceImpl implements IGarageService {

    private final UserRepository userRepository;

    private final GarageRepository garageRepository;

    private final ReviewRepository reviewRepository;

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

        return garages.stream().filter(x -> x.delFlag.equals(false)).map(this::entityToDTO).collect(Collectors.toList());
    }

    @Override
    public List<GarageDTO> getAllGaragesOfUser(int userId) {
        List<Garage> garages = garageRepository.findAllByUser_IdAndDelFlagIsFalse(userId);

//        if (garages.isEmpty()) {
//            throw new ResourceNotFoundException("User is not having any garages");
//        }

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

    @Override
    public GarageDTO updateGarage(GarageRequestDTO garageRequestDTO, int id) {

        Garage garage = garageRepository.findById(id);
        if (garage == null) {
            throw new ResourceNotFoundException("Garage with id: '" + id + "' not found");
        } else {
            garage.setGarageName(garageRequestDTO.getGarageName());
            garage.setPhoneNumber(garageRequestDTO.getPhoneNumber());
            garage.setAddress(garageRequestDTO.getAddress());
            garage.setLocation(garageRequestDTO.getLocation());
            garage.setImage(garageRequestDTO.getImage());
            garage.setStartAt(LocalTime.parse(garageRequestDTO.getStartAt()));
            garage.setEndAt(LocalTime.parse(garageRequestDTO.getEndAt()));
        }

        Garage savedGarage = garageRepository.save(garage);

        return new GarageDTO(savedGarage.getId(), savedGarage.getActive());
    }

    @Override
    public Garage deleteGarage(int garageId) {
        Garage garage = garageRepository.findById(garageId);
        garage.setDelFlag(true);
        Garage savedGarage = garageRepository.save(garage);
        return savedGarage;
    }

    @Override
    public List<GarageDTO> findGaragesByName(String name) {
        List<Garage> garages = garageRepository.findByGarageNameContaining(name);
        if (garages.isEmpty())
            throw new ResourceNotFoundException("Garage with name: " + name + " not found!");
        return garages.stream().map(this::entityToDTO).collect(Collectors.toList());
    }

    @Override
    public List<GarageDTO> findGaragesByAddress(String address) {
        List<Garage> garages = garageRepository.findByAddressContaining(address);
        if (garages.isEmpty())
            throw new ResourceNotFoundException("Garage with address: " + address + " not found!");
        return garages.stream().map(this::entityToDTO).collect(Collectors.toList());
    }

    @Override
    public List<GarageDTO> findAllGaragesOrderedByDistance(String location) {
        List<Garage> garages = garageRepository.findAll();

        List<Garage> sortedList = garages.stream()
                .sorted(Comparator.comparingDouble(o -> distance(o, location)))
                .collect(Collectors.toList());

        return sortedList.stream().map(this::entityToDTO).collect(Collectors.toList());
    }

    @Override
    public List<GarageDTO> findAllGaragesOrderedByRating() {
        List<Garage> garages = garageRepository.findAll();
        List<GarageDTO> garageDTOs = garages.stream().map(this::entityToDTO).collect(Collectors.toList());
        return garageDTOs.stream()
                .sorted(Comparator.comparing(GarageDTO::getAverageRating).reversed())
                .collect(Collectors.toList());
    }

    public double distance(Garage garage, String myLocation) {
        String garageLocation = garage.getLocation();
        double xGarage;
        double yGarage;
        double xHome;
        double yHome;

        xGarage = Double.parseDouble(garageLocation.substring(0, garageLocation.indexOf(" ")));
        yGarage = Double.parseDouble(garageLocation.substring(garageLocation.indexOf(" ")));

        xHome = Double.parseDouble(myLocation.substring(0, myLocation.indexOf(" ")));
        yHome = Double.parseDouble(myLocation.substring(myLocation.indexOf(" ")));

        return Math.pow((xGarage - xHome), 2) + Math.pow((yGarage - yHome), 2);
    }

    public double averageRatingOfGarage(Garage garage) {
        List<Review> reviews = reviewRepository.findAllByGarage_Id(garage.getId());
        List<Integer> listRating = reviews.stream().map(Review::getRating).collect(Collectors.toList());
        Integer sum = listRating.stream().reduce(0, Integer::sum);
        return ((double) sum) / listRating.size();
    }

    private GarageDTO entityToDTO(Garage garage) {
        User owner = garage.getUser();
        UserDTO ownerDTO = UserDTO.toUserDTO(owner);
        double averageRating = averageRatingOfGarage(garage);

        GarageDTO garageDTO = GarageDTO.toGarageDTO(garage);
        garageDTO.setOwner(ownerDTO);
        garageDTO.setAverageRating(averageRating);
        return garageDTO;
    }

}
