package com.ridefast.ride_fast_backend.service;

import java.util.List;

import com.ridefast.ride_fast_backend.dto.DriverSignUpRequest;
import com.ridefast.ride_fast_backend.exception.ResourceNotFoundException;
import com.ridefast.ride_fast_backend.model.Driver;
import com.ridefast.ride_fast_backend.model.Ride;

public interface DriverService {
  Driver registerDriver(DriverSignUpRequest driverSignUpRequest);

  List<Driver> getAvailableDrivers(double pickupLatitude, double pickupLongitude, Ride ride);

  Driver getNearestDriver(List<Driver> availableDrivers, double pickupLatitude, double pickupLongitude);

  Driver getRequestedDriverProfile(String jwtToken) throws ResourceNotFoundException;

  List<Ride> getDriverCurrentRide(Long driverId) throws ResourceNotFoundException;

  List<Ride> getDriverStartedRide(String jwtToken) throws ResourceNotFoundException;

  List<Ride> getAllocatedRides(Long driverId);

  List<Ride> getCompletedRides(Long driverId);
}
