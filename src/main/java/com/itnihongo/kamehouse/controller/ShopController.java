package com.itnihongo.kamehouse.controller;

import com.itnihongo.kamehouse.dto.GarageDTO;
import com.itnihongo.kamehouse.dto.GarageRequestDTO;
import com.itnihongo.kamehouse.dto.UserDTO;
import com.itnihongo.kamehouse.model.Garage;
import com.itnihongo.kamehouse.model.User;
import com.itnihongo.kamehouse.service.IGarageService;
import com.itnihongo.kamehouse.service.IUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequiredArgsConstructor(onConstructor_ = {@Autowired})
public class ShopController {

    private final IUserService userService;

    private final IGarageService garageService;

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

    @PostMapping("/user/{user_id}/garages")
    @ResponseStatus(HttpStatus.OK)
    public Object createGarageOfShop(
            @PathVariable("user_id") int userId,
            @Valid GarageRequestDTO garageRequestDTO
    ) {
        UserDTO owner = userService.getDetailInfo(userId);
        String ownerUsername = owner.getUsername();

        GarageDTO garageDTO = garageService.addNewGarage(garageRequestDTO, ownerUsername);
        return ResponseEntity.ok(garageDTO);
    }

}
