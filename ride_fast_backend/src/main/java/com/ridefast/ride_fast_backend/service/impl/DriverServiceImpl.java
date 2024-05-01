package com.ridefast.ride_fast_backend.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ridefast.ride_fast_backend.dto.DriverSignUpRequest;
import com.ridefast.ride_fast_backend.enums.RideStatus;
import com.ridefast.ride_fast_backend.enums.UserRole;
import com.ridefast.ride_fast_backend.exception.ResourceNotFoundException;
import com.ridefast.ride_fast_backend.model.Driver;
import com.ridefast.ride_fast_backend.model.License;
import com.ridefast.ride_fast_backend.model.Ride;
import com.ridefast.ride_fast_backend.model.Vehicle;
import com.ridefast.ride_fast_backend.repository.DriverRepository;
import com.ridefast.ride_fast_backend.repository.LicenseRepository;
import com.ridefast.ride_fast_backend.repository.VehicleRepository;
import com.ridefast.ride_fast_backend.service.CalculatorService;
import com.ridefast.ride_fast_backend.service.DriverService;
import com.ridefast.ride_fast_backend.util.JwtTokenHelper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DriverServiceImpl implements DriverService {

  private final DriverRepository driverRepository;
  private final LicenseRepository licenseRepository;
  private final VehicleRepository vehicleRepository;

  private final CalculatorService calculatorService;
  private final JwtTokenHelper tokenHelper;

  private final PasswordEncoder passwordEncoder;
  private final ModelMapper modelMapper;

  @Override
  public Driver registerDriver(DriverSignUpRequest request) {
    License license = request.getLicense();
    Vehicle vehicle = request.getVehicle();
    // make object of license & vehicle then save
    License savedLicense = licenseRepository.save(license);
    Vehicle savedVehicle = vehicleRepository.save(vehicle);
    Driver driver = modelMapper.map(request, Driver.class);
    driver.setPassword(passwordEncoder.encode(request.getPassword()));
    driver.setLicense(savedLicense);
    driver.setVehicle(savedVehicle);
    driver.setRole(UserRole.DRIVER);
    Driver savedDriver = driverRepository.save(driver);
    savedLicense.setDriver(savedDriver);
    savedVehicle.setDriver(savedDriver);
    licenseRepository.save(savedLicense);
    vehicleRepository.save(savedVehicle);
    return savedDriver;
  }

  @Override
  public List<Driver> getAvailableDrivers(double pickupLatitude, double pickupLongitude, Ride ride) {
    List<Driver> allDrivers = driverRepository.findAll();
    List<Driver> availableDrivers = new ArrayList<>();
    for (Driver driver : allDrivers) {
      if (driver.getCurrentRide() != null && driver.getCurrentRide().getStatus() != RideStatus.COMPLETED)
        continue;
      if (ride.getDeclinedDrivers().contains(driver.getId()))
        continue;
      // double driverLatitude = driver.getLatitude();
      // double driverLongitude = driver.getLongitude();
      // double distance = calculatorService.calculateDistance(driverLatitude,
      // driverLongitude, pickupLatitude,
      // pickupLongitude);
      availableDrivers.add(driver);
    }
    return availableDrivers;
  }

  @Override
  public Driver getNearestDriver(List<Driver> availableDrivers, double pickupLatitude, double pickupLongitude) {
    double min = Double.MAX_VALUE;
    Driver nearestDriver = null;
    for (Driver driver : availableDrivers) {
      double driverLatitude = driver.getLatitude();
      double driverLongitude = driver.getLongitude();
      double distance = calculatorService.calculateDistance(driverLatitude,
          driverLongitude, pickupLatitude,
          pickupLongitude);
      if (min > distance) {
        min = distance;
        nearestDriver = driver;
      }
    }
    return nearestDriver;
  }

  @Override
  public Driver getRequestedDriverProfile(String jwtToken) throws ResourceNotFoundException {
    String email = tokenHelper.getUsernameFromToken(jwtToken);
    Driver driver = driverRepository.findByEmail(email)
        .orElseThrow(() -> new ResourceNotFoundException("Driver", "username", email));
    return driver;
  }

  @Override
  public List<Ride> getDriverCurrentRide(Long driverId) throws ResourceNotFoundException {
    // Driver driver = driverRepository.findById(driverId)
    // .orElseThrow(() -> new ResourceNotFoundException("driver", "id", driverId));
    List<Ride> currentRides = driverRepository.getCurrentRides(driverId);
    return currentRides;
  }

  @Override
  public List<Ride> getAllocatedRides(Long driverId) {
    return driverRepository.getAllocatedRides(driverId);
  }

  @Override
  public List<Ride> getCompletedRides(Long driverId) {
    return driverRepository.getCompletedRides(driverId);
  }

  @Override
  public List<Ride> getDriverStartedRide(String jwtToken) throws ResourceNotFoundException {
    String email = tokenHelper.getUsernameFromToken(jwtToken);
    Driver driver = driverRepository.findByEmail(email)
        .orElseThrow(() -> new ResourceNotFoundException("Driver", "username", email));
    return driverRepository.getstartedRides(driver.getId());
  }

}
