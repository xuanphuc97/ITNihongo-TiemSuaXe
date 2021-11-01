package com.itnihongo.kamehouse.controller;

import com.itnihongo.kamehouse.model.Garage;

import com.itnihongo.kamehouse.model.Service;

import com.itnihongo.kamehouse.service.ServiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
public class ServiceController {
    @Autowired
    private ServiceService serviceService;


    @GetMapping("/serviceshop")
    public ResponseEntity<Object> getAllServiceShop(@RequestBody(required = false) Garage garage) {
        List<Service> services = serviceService.findByGarage_GarageName(garage.getGarageName());
        return new ResponseEntity<>(services, HttpStatus.OK);
    }


    @GetMapping("/serviceall")
    public ResponseEntity<Object> getAllServiceAll() {
        List<Service> services = serviceService.finAll();
        return new ResponseEntity<>(services, HttpStatus.OK);
    }

    @PostMapping("/createService")
    private ResponseEntity<Void> createRest(@RequestBody(required = false) Service service) {
        this.serviceService.create(service);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @RequestMapping(value = "/{id}/editService", method = RequestMethod.PUT)
    private ResponseEntity<?> edit(@PathVariable("id") int id, @RequestBody(required = false) Service service) {
        Service serviceEdit = this.serviceService.findById(id);
        if (serviceEdit == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        serviceEdit = service;
        this.serviceService.create(serviceEdit);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @RequestMapping(value = "/{id}/deleteService", method = RequestMethod.PUT)
    private ResponseEntity<?> delete(@PathVariable("id") int id) {
        this.serviceService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
