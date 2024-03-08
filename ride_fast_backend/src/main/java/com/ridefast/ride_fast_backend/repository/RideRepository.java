package com.ridefast.ride_fast_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ridefast.ride_fast_backend.model.Ride;

public interface RideRepository extends JpaRepository<Ride,Long>{
  
}
