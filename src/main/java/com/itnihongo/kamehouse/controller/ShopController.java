package com.itnihongo.kamehouse.controller;

import com.itnihongo.kamehouse.dto.GarageDTO;
import com.itnihongo.kamehouse.dto.GarageRequestDTO;
import com.itnihongo.kamehouse.dto.UserDTO;
import com.itnihongo.kamehouse.model.Garage;
import com.itnihongo.kamehouse.service.IGarageService;
import com.itnihongo.kamehouse.service.IStorageService;
import com.itnihongo.kamehouse.service.IUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.io.IOException;
import java.util.List;

@CrossOrigin(maxAge = 3600) // https://spring.io/guides/gs/rest-service-cors/
@RestController
@RequiredArgsConstructor(onConstructor_ = {@Autowired})
@RequestMapping("/api")
public class ShopController {

    private final IUserService userService;

    private final IGarageService garageService;

    private final IStorageService storageService;

    @GetMapping("/user/{user_id}")
    public ResponseEntity<Object> getInfoShop(@PathVariable("user_id") int userId) {
        UserDTO userDTO = userService.getDetailInfo(userId);
        return ResponseEntity.ok(userDTO);
    }

    @GetMapping(value = "/user", params = {"username"})
    public ResponseEntity<Object> getInfoShop(@RequestParam("username") String username) {
        UserDTO userDTO = userService.getDetailInfo(username);
        return ResponseEntity.ok(userDTO);
    }

    @GetMapping("/garages")
    public ResponseEntity<Object> getAllGarages() {
        List<GarageDTO> garages = garageService.getAllGarages();
        return ResponseEntity.ok(garages);
    }

    @GetMapping("/garage/{garage_id}")
    public ResponseEntity<Object> getGarageById(@PathVariable("garage_id") int userId) {
        GarageDTO garageDTO = garageService.getGarageDetail(userId);
        return ResponseEntity.ok(garageDTO);
    }

    @GetMapping("/user/{user_id}/garages")
    public ResponseEntity<Object> getGaragesShop(@PathVariable("user_id") int userId) {
        List<GarageDTO> garages = garageService.getAllGaragesOfUser(userId);
        return ResponseEntity.ok(garages);
    }

    @PostMapping("/user/garages")
    @ResponseStatus(HttpStatus.OK)
    public Object createGarageOfShop(
            @Valid GarageRequestDTO garageRequestDTO,
            Authentication authentication
    ) {
//        UserDTO owner = userService.getDetailInfo(17);
//        String username = owner.getUsername();
        String username = authentication.getName();
        GarageDTO garageDTO = garageService.addNewGarage(garageRequestDTO, username);
        return ResponseEntity.ok(garageDTO);
    }

    @PutMapping("/garages/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<Object> deleteGarage(
            @PathVariable("id") int garageId
    ) {

        Garage garageDTO = garageService.deleteGarage(garageId);
        return ResponseEntity.ok(garageDTO);
    }


    @PutMapping("/garages/{id}/update")
    @ResponseStatus(HttpStatus.OK)
    public Object update(
            @PathVariable("id") int garageId,
            @Valid GarageRequestDTO garageRequestDTO
    ) {

        GarageDTO garageDTO = garageService.updateGarage(garageRequestDTO, garageId);
        return ResponseEntity.ok(garageDTO);
    }
//
//    @DeleteMapping("/garages/{id}")
//    public ResponseEntity<Object> deleteUser(@PathVariable("id") String garageId) {
////        garageService.deleteGarage(garageId);
////        return ResponseEntity.accepted().build();
//    }

    @GetMapping("/garages/name/{keyword}")
    public ResponseEntity<Object> findGaragesByName(@PathVariable("keyword") String name) {
        List<GarageDTO> garageDTOs = garageService.findGaragesByName(name);
        return ResponseEntity.ok(garageDTOs);
    }

    @GetMapping("/garages/address/{keyword}")
    public ResponseEntity<Object> findGaragesByAddress(@PathVariable("keyword") String address) {
        List<GarageDTO> garageDTOs = garageService.findGaragesByAddress(address);
        return ResponseEntity.ok(garageDTOs);
    }

    @GetMapping("/garages/rating")
    public ResponseEntity<Object> findAllGaragesOrderedByRating() {
        List<GarageDTO> garageDTOs = garageService.findAllGaragesOrderedByRating();
        return ResponseEntity.ok(garageDTOs);
    }

    @GetMapping(value = "/garages/distance", params = {"location"})
    public ResponseEntity<Object> findAllGaragesOrderedByDistance(@RequestParam("location") String location) {
        List<GarageDTO> garageDTOs = garageService.findAllGaragesOrderedByDistance(location);
        return ResponseEntity.ok(garageDTOs);
    }

    @PostMapping("/garages/{garageId}/uploadImg")
    public ResponseEntity<Object> saveImageLink(@PathVariable("garageId") int garageId,
                                                @RequestParam("image") MultipartFile multipartFile) throws IOException {
        String display_url = storageService.uploadImage(multipartFile);
        garageService.saveImageLink(display_url, garageId);
        return ResponseEntity.ok().build();
    }
}
