package com.itnihongo.kamehouse.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.itnihongo.kamehouse.model.User;


@Repository
public interface UserRepository extends JpaRepository<User, Long> {
}
