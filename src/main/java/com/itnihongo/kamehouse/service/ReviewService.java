package com.itnihongo.kamehouse.service;

import com.itnihongo.kamehouse.model.Garage;
import com.itnihongo.kamehouse.model.Review;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ReviewService {
    List<Review> finAll();
    Review findById(int id);
    void delete(int id);
    void create(Review review);
    List<Review> findByUser_Username(String username);
    List<Review> findByGarage_GarageName(String garageName);



}
