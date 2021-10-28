package com.itnihongo.kamehouse.repository;

import com.itnihongo.kamehouse.model.Garage;
import com.itnihongo.kamehouse.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Integer> {
    //    list review theo tên user
    List<Review> findByUser_Username(String username);

    //     list review theo garage
    List<Review> findByGarage_GarageName(String garageName);
}