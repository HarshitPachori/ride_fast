package com.ridefast.ride_fast_backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ridefast.ride_fast_backend.model.Driver;

public interface DriverRepository extends JpaRepository<Driver, Long> {
  public Optional<Driver> findByEmail(String email);
}
