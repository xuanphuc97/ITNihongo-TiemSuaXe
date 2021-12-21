package com.itnihongo.kamehouse.service.impl;

import com.itnihongo.kamehouse.model.Review;
import com.itnihongo.kamehouse.repository.GarageRepository;
import com.itnihongo.kamehouse.repository.ReviewRepository;
import com.itnihongo.kamehouse.repository.UserRepository;
import com.itnihongo.kamehouse.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewServicelmpl implements ReviewService {
    @Autowired
    ReviewRepository repository;

    @Autowired
    GarageRepository garageRepository;

    @Autowired
    UserRepository userRepository;

    @Override
    public List<Review> finAll() {
        return repository.findAll();
    }

    @Override
    public Review findById(int id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public void delete(int id) {

        this.repository.deleteById(id);
    }

    @Override
    public void create(Review review) {

        this.repository.save(review);
    }

    @Override
    public Review findByUser_Userid(int id) {
        return (Review) repository.findAllByUser_Id(id);
    }

    @Override
    public List<Review> findByUser_Username(String username) {

        return repository.findAllByUser_Username(username);
    }

    @Override
    public List<Review> findByGarage_GarageName(String garageName) {
        return repository.findAllByGarage_GarageName(garageName);
    }

    @Override
    public List<com.itnihongo.kamehouse.model.Review> getAllReviewOfGarage(int id) {
        return repository.findAllByGarage_Id(id);
    }

//    @Override
//    public Review findByGarage_GarageId(int id) {
//        return repository.findAllByGarage_Id(id);
//
//    }

    @Override
    public Review addReview(String username, int garageId, String comment, int rating, List<String> list) {
        Review review = new Review();
        review.setGarage(garageRepository.findById(garageId));
        review.setUser(userRepository.findByUsername(username));
        review.setComment(comment);
        review.setRating(rating);
        review.setImages(list);
        repository.save(review);
        return review;
    }
}
