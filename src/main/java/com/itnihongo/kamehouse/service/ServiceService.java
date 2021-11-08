package com.itnihongo.kamehouse.service;

import com.itnihongo.kamehouse.model.Service;

import java.util.List;

public interface ServiceService {

    List<Service> finAll();

    Service findById(int id);

    void delete(int id);

    Service create(String serviceName, String price, int garageId);

    List<Service> findByGarage_GarageName(String garageName);

    List<Service> getAllServicesOfGarage(int garageId);

    void update(String serviceName, String price, int id);
}
