package com.itnihongo.kamehouse.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.itnihongo.kamehouse.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
}
