package com.ridefast.ride_fast_backend.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.ridefast.ride_fast_backend.dto.DriverSignUpRequest;
import com.ridefast.ride_fast_backend.model.Driver;
import com.ridefast.ride_fast_backend.model.Ride;
import com.ridefast.ride_fast_backend.repository.DriverRepository;
import com.ridefast.ride_fast_backend.repository.LicenseRepository;
import com.ridefast.ride_fast_backend.repository.RideRepository;
import com.ridefast.ride_fast_backend.repository.VehicleRepository;
import com.ridefast.ride_fast_backend.service.CalculatorService;
import com.ridefast.ride_fast_backend.service.DriverService;
import com.ridefast.ride_fast_backend.util.JwtTokenHelper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DriverServiceImpl implements DriverService {

  private final DriverRepository driverRepository;
  private final RideRepository rideRepository;
  private final LicenseRepository licenseRepository;
  private final VehicleRepository vehicleRepository;

  private final CalculatorService calculatorService;
  private final JwtTokenHelper jwtTokenHelper;

  @Override
  public Driver registerDriver(DriverSignUpRequest driverSignUpRequest) {
    throw new UnsupportedOperationException("Unimplemented method 'registerDriver'");
  }

  @Override
  public List<Driver> getAvailableDrivers(double pickupLatitude, double pickupLongitude, double radius, Ride ride) {
    throw new UnsupportedOperationException("Unimplemented method 'getAvailableDrivers'");
  }

  @Override
  public Driver getNearestDriver(List<Driver> availableDrivers, double pickupLatitude, double pickupLongitude) {
    throw new UnsupportedOperationException("Unimplemented method 'getNearestDriver'");
  }

  @Override
  public Driver getRequestedDriverProfile(String jwtToken) {
    throw new UnsupportedOperationException("Unimplemented method 'getRequestedDriverProfile'");
  }

  @Override
  public Ride getDriverCurrentRide(Long driverId) {
    throw new UnsupportedOperationException("Unimplemented method 'getDriverCurrentRide'");
  }

  @Override
  public List<Ride> getAllocatedRides(Long driverId) {
    throw new UnsupportedOperationException("Unimplemented method 'getAllocatedRides'");
  }

  @Override
  public Driver getDriverById(Long driverId) {
    throw new UnsupportedOperationException("Unimplemented method 'getDriverById'");
  }

  @Override
  public List<Ride> completedRides(Long driverId) {
    throw new UnsupportedOperationException("Unimplemented method 'completedRides'");
  }

}
