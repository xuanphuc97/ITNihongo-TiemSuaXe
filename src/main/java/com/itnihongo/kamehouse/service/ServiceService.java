package com.itnihongo.kamehouse.service;

import com.itnihongo.kamehouse.model.Garage;
import com.itnihongo.kamehouse.model.Review;
import com.itnihongo.kamehouse.model.Service;

import java.util.List;

public interface ServiceService {

    List<Service> finAll();

    Service findById(int id);

    void delete(int id);

    void create(Service service);

    List<Service> findByGarage_GarageName(String garageName);


}
