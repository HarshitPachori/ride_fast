package com.ridefast.ride_fast_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ridefast.ride_fast_backend.model.Vehicle;

public interface VehicleRepository extends JpaRepository<Vehicle,Long>{
  
}
