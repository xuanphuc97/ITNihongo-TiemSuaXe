package com.itnihongo.kamehouse.repository;

import com.itnihongo.kamehouse.model.Garage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GarageRepository extends JpaRepository<Garage, Integer> {
    Garage findById(int garageId);

    List<Garage> findAllByUser_IdAndDelFlagIsFalse(int userId);

    List<Garage> findByGarageNameContaining(String garageName);

    List<Garage> findByAddressContaining(String address);

}
