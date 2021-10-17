package com.itnihongo.kamehouse.repository;

import com.itnihongo.kamehouse.model.User;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {

	User findByUsername(String username);

	User findByEmail(String email);

	User findByConfirmationToken(String confirmationToken);
}