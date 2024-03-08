package com.ridefast.ride_fast_backend.service;

import java.util.List;

import com.ridefast.ride_fast_backend.dto.DriverSignUpRequest;
import com.ridefast.ride_fast_backend.model.Driver;
import com.ridefast.ride_fast_backend.model.Ride;

public interface DriverService {
  Driver registerDriver(DriverSignUpRequest driverSignUpRequest);

  List<Driver> getAvailableDrivers(double pickupLatitude, double pickupLongitude, double radius, Ride ride);

  Driver getNearestDriver(List<Driver> availableDrivers, double pickupLatitude, double pickupLongitude);

  Driver getRequestedDriverProfile(String jwtToken);

  Ride getDriverCurrentRide(Long driverId);

  List<Ride> getAllocatedRides(Long driverId);

  Driver getDriverById(Long driverId);

  List<Ride> completedRides(Long driverId);
}
