package com.itnihongo.kamehouse.repository;

import com.itnihongo.kamehouse.model.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    User findByUsername(String username);

    User findByConfirmationToken(String confirmationToken);

    User findByIdAndActive(int userId, boolean active);
}