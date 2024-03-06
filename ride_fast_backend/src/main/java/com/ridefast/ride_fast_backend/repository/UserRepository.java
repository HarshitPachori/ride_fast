package com.ridefast.ride_fast_backend.repository;

import com.ridefast.ride_fast_backend.model.User;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    public Optional<User> findByEmail(String email);
}
