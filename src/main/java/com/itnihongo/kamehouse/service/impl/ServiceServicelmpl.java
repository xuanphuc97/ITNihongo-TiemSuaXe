package com.itnihongo.kamehouse.service.impl;

import com.itnihongo.kamehouse.repository.ServiceRepository;
import com.itnihongo.kamehouse.service.ServiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ServiceServicelmpl  implements ServiceService {
    @Autowired
    ServiceRepository serviceRepository;
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
    public void create(com.itnihongo.kamehouse.model.Service service) {
        serviceRepository.save(service);
    }

    @Override
    public List<com.itnihongo.kamehouse.model.Service> findByGarage_GarageName(String garageName) {
        return serviceRepository.findByGarage_GarageName(garageName);
    }
}
