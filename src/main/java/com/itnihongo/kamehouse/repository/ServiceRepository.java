package com.itnihongo.kamehouse.repository;

import com.itnihongo.kamehouse.model.Review;
import com.itnihongo.kamehouse.model.Service;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ServiceRepository extends JpaRepository<Service, Integer> {

    //    list Service theo tên garage
    List<Service> findByGarage_GarageName(String garageName);

}