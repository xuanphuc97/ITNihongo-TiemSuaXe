package com.itnihongo.kamehouse.repository;

import com.itnihongo.kamehouse.model.Garage;
import com.itnihongo.kamehouse.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Integer> {
    //    list review theo tên user
    List<Review> findAllByUser_Username(String username);

    // list review của user theo userId
    List<Review> findAllByUser_Id(int id);

    //     list review theo garage
    List<Review> findAllByGarage_GarageName(String garageName);
    List<Review> findAllByGarage_Id(int id);
}
