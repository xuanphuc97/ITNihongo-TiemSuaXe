package com.itnihongo.kamehouse.controller;


import com.itnihongo.kamehouse.model.Garage;
import com.itnihongo.kamehouse.model.Review;
import com.itnihongo.kamehouse.model.Service;
import com.itnihongo.kamehouse.model.User;

import com.itnihongo.kamehouse.service.ReviewService;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(maxAge = 3600) // https://spring.io/guides/gs/rest-service-cors/
@RestController
@RequiredArgsConstructor(onConstructor_ = {@Autowired})
@RequestMapping("/")
public class ReviewController {
    @Autowired
    private ReviewService reviewService;


    @GetMapping("/allreviews")
    public ResponseEntity<Object> getAllReview() {
        List<Review> reviews = reviewService.finAll();
        return new ResponseEntity<>(reviews, HttpStatus.OK);
    }

    @GetMapping("/reviewshop")
    public ResponseEntity<Object> getAllReviewShop(@RequestBody(required = false) Garage garage) {
        List<Review> reviews = reviewService.findByGarage_GarageName(garage.getGarageName());
        return new ResponseEntity<>(reviews, HttpStatus.OK);
    }

    @GetMapping("/reviewshopid/{id}")
    public ResponseEntity<Object> getAllReviewShopId(@PathVariable("id") int id) {
        List<Review> reviews = reviewService.getAllReviewOfGarage(id);
        return new ResponseEntity<>(reviews, HttpStatus.OK);
    }


    @GetMapping("/reviewuser")
    public ResponseEntity<Object> getAllReviewuser(@RequestBody(required = false) User user) {
        List<Review> reviews = reviewService.findByUser_Username(user.getUsername());
        return new ResponseEntity<>(reviews, HttpStatus.OK);
    }

    @GetMapping("/reviewuserid/{id}")
    public ResponseEntity<Object> getAllReviewuserID(@PathVariable("id") int id){
        Review reviews = reviewService.findByUser_Userid(id);
        return new ResponseEntity<>(reviews, HttpStatus.OK);
    }

    @PostMapping("/createReview")
    private ResponseEntity<Void> createRest(@RequestBody(required = false) Review review) {
        this.reviewService.create(review);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @RequestMapping(value = "/editReview/{id}", method = RequestMethod.PUT)
    private ResponseEntity<?> edit(@PathVariable("id") int id, @RequestBody(required = false) Review review) {
        Review reviewedit = this.reviewService.findById(id);
        if (reviewedit == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        reviewedit = review;
        this.reviewService.create(reviewedit);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @RequestMapping(value = "/deleteRevice/{id}", method = RequestMethod.PUT)
    private ResponseEntity<?> delete(@PathVariable("id") int id) {
        this.reviewService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/review/add")
    private ResponseEntity<Void> addReview(@RequestParam("comment") String comment,
                                           @RequestParam("rating") int rating,
                                           @RequestParam("id") int garageId,
                                           Authentication authentication) {
        String username = authentication.getName();
        System.out.println(username);
        this.reviewService.addReview(username,garageId,comment,rating);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
