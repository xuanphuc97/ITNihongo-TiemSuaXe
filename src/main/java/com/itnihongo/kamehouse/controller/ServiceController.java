package com.itnihongo.kamehouse.controller;

import com.itnihongo.kamehouse.model.Garage;
import com.itnihongo.kamehouse.model.Service;
import com.itnihongo.kamehouse.service.ServiceService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@CrossOrigin(maxAge = 3600) // https://spring.io/guides/gs/rest-service-cors/
@RequiredArgsConstructor(onConstructor_ = {@Autowired})
public class ServiceController {
    @Autowired
    private ServiceService serviceService;


    @GetMapping("/serviceshop")
    public ResponseEntity<Object> getAllServiceShop(@RequestBody(required = false) Garage garage) {
        List<Service> services = serviceService.findByGarage_GarageName(garage.getGarageName());
        return new ResponseEntity<>(services, HttpStatus.OK);
    }

    @GetMapping("/serviceshopid/{id}")
    public ResponseEntity<Object> getServiceShopId(@PathVariable("id") int userId) {
        List<Service> services = serviceService.getAllServicesOfGarage(userId);
        return new ResponseEntity<>(services, HttpStatus.OK);
    }

    @GetMapping("/serviceall")
    public ResponseEntity<Object> getAllServiceAll() {
        List<Service> services = serviceService.finAll();
        return new ResponseEntity<>(services, HttpStatus.OK);
    }

    @PostMapping("/createService/{id}")
    private ResponseEntity<Void> createRest(@RequestParam("serviceName") String serviceName,
                                            @RequestParam("price") String price,
                                            @PathVariable("id") int garageId) {
        this.serviceService.create(serviceName, price, garageId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @RequestMapping(value = "/editService/{id}", method = RequestMethod.PUT)
    private ResponseEntity<?> edit(@PathVariable("id") int id, @RequestBody(required = false) Service service) {
        Service serviceEdit = this.serviceService.findById(id);
        if (serviceEdit == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        serviceEdit = service;
//        this.serviceService.create(serviceEdit, id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping(value = "/service/{id}/edit")
    private ResponseEntity<?> edit(@RequestParam("serviceName") String serviceName,
                                   @RequestParam("price") String price,
                                   @PathVariable("id") int id) {
        Service serviceEdit = this.serviceService.findById(id);
        if (serviceEdit == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        else {
            this.serviceService.update(serviceName, price, id);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping(value = "/service/{id}")
    private ResponseEntity<?> delete(@PathVariable("id") int id) {
        this.serviceService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
