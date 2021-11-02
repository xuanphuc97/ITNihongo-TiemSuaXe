package com.itnihongo.kamehouse.service.impl;

import com.itnihongo.kamehouse.repository.ServiceRepository;
import com.itnihongo.kamehouse.repository.GarageRepository;
import com.itnihongo.kamehouse.service.ServiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class ServiceServicelmpl  implements ServiceService {
    @Autowired
    ServiceRepository serviceRepository;

    @Autowired
    GarageRepository garageRepository;
    @Override
    public List<com.itnihongo.kamehouse.model.Service> finAll() {
        return serviceRepository.findAll();
    }

    @Override
    public com.itnihongo.kamehouse.model.Service findById(int id) {
        return serviceRepository.findById(id).orElse(null);
    }

    @Override
    public void delete(int id) {
        serviceRepository.deleteById(id);
    }

    @Override
    public com.itnihongo.kamehouse.model.Service create(String serviceName, String price, int garageId) {
        com.itnihongo.kamehouse.model.Service service = new com.itnihongo.kamehouse.model.Service();
        service.setGarage(garageRepository.findById(garageId));
        service.setServiceName(serviceName);
        service.setServicePrice(BigDecimal.valueOf(Long.parseLong(price)));
        serviceRepository.save(service);
        return service;
    }

    @Override
    public List<com.itnihongo.kamehouse.model.Service> findByGarage_GarageName(String garageName) {
        return serviceRepository.findAllByGarage_GarageName(garageName);
    }

    @Override
    public List<com.itnihongo.kamehouse.model.Service> getAllServicesOfGarage(int id) {
        return serviceRepository.findAllByGarage_Id(id);
    }
}
