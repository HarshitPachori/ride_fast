package com.ridefast.ride_fast_backend.service.impl;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;

import org.springframework.stereotype.Service;

import com.ridefast.ride_fast_backend.dto.RideRequest;
import com.ridefast.ride_fast_backend.enums.RideStatus;
import com.ridefast.ride_fast_backend.exception.ResourceNotFoundException;
import com.ridefast.ride_fast_backend.exception.UserException;
import com.ridefast.ride_fast_backend.model.Driver;
import com.ridefast.ride_fast_backend.model.Ride;
import com.ridefast.ride_fast_backend.model.MyUser;
import com.ridefast.ride_fast_backend.repository.DriverRepository;
import com.ridefast.ride_fast_backend.repository.RideRepository;
import com.ridefast.ride_fast_backend.service.CalculatorService;
import com.ridefast.ride_fast_backend.service.DriverService;
import com.ridefast.ride_fast_backend.service.RideService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RideServiceImpl implements RideService {

  private final DriverService driverService;
  private final RideRepository rideRepository;
  private final CalculatorService calculatorService;
  private final DriverRepository driverRepository;

  @Override
  public Ride requestRide(RideRequest request, MyUser user) throws UserException {
    double pickupLatitude = request.getPickupLatitude();
    double pickupLongitude = request.getPickupLongitude();
    double destinationLatitude = request.getDestinationLatitude();
    double destinationLongitude = request.getDestinationLongitude();
    String pickupArea = request.getPickupArea();
    String destinationArea = request.getDestinationArea();

    Ride existingRide = new Ride();

    List<Driver> availableDrivers = driverService.getAvailableDrivers(pickupLatitude, pickupLongitude, existingRide);
    Driver nearestDriver = driverService.getNearestDriver(availableDrivers, pickupLatitude, pickupLongitude);

    if (nearestDriver == null)
      throw new UserException("Driver not available");

    Ride ride = createRide(user, nearestDriver, pickupLatitude, pickupLongitude, destinationLatitude,
        destinationLongitude, pickupArea, destinationArea);

    return ride;
  }

  @Override
  public Ride createRide(MyUser user, Driver nearestDriver, double pickupLatitude, double pickupLongitude,
      double destinationLatitude, double destinationLongitude, String pickupArea, String destinationArea) {

    Ride ride = Ride.builder()
        .driver(nearestDriver)
        .user(user)
        .pickupLatitude(pickupLatitude)
        .pickupLongitude(pickupLongitude)
        .destinationLatitude(destinationLatitude)
        .destinationLongitude(destinationLongitude)
        .status(RideStatus.REQUESTED)
        .pickupArea(pickupArea)
        .destinationArea(destinationArea)
        .build();

    return rideRepository.save(ride);
  }

  @Override
  public Ride acceptRide(Long rideId) throws ResourceNotFoundException {
    Ride ride = rideRepository.findById(rideId)
        .orElseThrow(() -> new ResourceNotFoundException("Ride", "rideId", rideId));
    ride.setStatus(RideStatus.ACCEPTED);
    Driver driver = ride.getDriver();
    driver.setCurrentRide(ride);
    Random random = new Random();
    int otp = random.nextInt(9000) + 1000;
    ride.setOtp(otp);

    driverRepository.save(driver);
    Ride savedRide = rideRepository.save(ride);
    return savedRide;
  }

  @Override
  public Ride declineRide(Long rideId, Long driverId) throws ResourceNotFoundException {
    Ride ride = rideRepository.findById(rideId)
        .orElseThrow(() -> new ResourceNotFoundException("Ride", "rideId", rideId));
    ride.getDeclinedDrivers().add(driverId);
    List<Driver> availableDrivers = driverService.getAvailableDrivers(ride.getPickupLatitude(),
        ride.getPickupLongitude(), ride);
    Driver nearestDriver = driverService.getNearestDriver(availableDrivers, ride.getPickupLatitude(),
        ride.getPickupLongitude());
    ride.setDriver(nearestDriver);
    Ride savedRide = rideRepository.save(ride);
    return savedRide;
  }

  @Override
  public Ride startRide(Long rideId, int OTP) throws ResourceNotFoundException, UserException {
    Ride ride = rideRepository.findById(rideId)
        .orElseThrow(() -> new ResourceNotFoundException("Ride", "rideId", rideId));
    if (OTP != ride.getOtp()) {
      throw new UserException("Please provide a valid OTP");
    }
    ride.setStatus(RideStatus.STARTED);
    ride.setStartTime(LocalDateTime.now());
    Ride savedride = rideRepository.save(ride);
    return savedride;
  }

  @Override
  public Ride completeRide(Long rideId) throws ResourceNotFoundException {
    Ride ride = rideRepository.findById(rideId)
        .orElseThrow(() -> new ResourceNotFoundException("Ride", "rideId", rideId));
    ride.setStatus(RideStatus.COMPLETED);
    ride.setEndTime(LocalDateTime.now());

    double distance = calculatorService.calculateDistance(ride.getDestinationLatitude(), ride.getDestinationLongitude(),
        ride.getPickupLatitude(), ride.getPickupLongitude());

    LocalDateTime startTime = ride.getStartTime();
    LocalDateTime endTime = ride.getEndTime();

    Duration duration = Duration.between(startTime, endTime);

    long seconds = duration.toSeconds();

    double fare = calculatorService.calculateFair(distance);

    ride.setDistance(Math.round(distance * 100.0) / 100.0);
    ride.setFare((double) Math.round(fare));
    ride.setDuration(seconds);
    ride.setEndTime(LocalDateTime.now());

    Driver driver = ride.getDriver();
    driver.getRides().add(ride);
    driver.setCurrentRide(null);

    long totalRevenue = driver.getTotalRevenue() + Math.round(fare * 0.8); // means driver get 80% only
    driver.setTotalRevenue(totalRevenue);
    driverRepository.save(driver);
    Ride savedRide = rideRepository.save(ride);
    return savedRide;
  }

  @Override
  public Ride cancelRide(Long rideId) throws ResourceNotFoundException {
    Ride ride = rideRepository.findById(rideId)
        .orElseThrow(() -> new ResourceNotFoundException("Ride", "rideId", rideId));
    ride.setStatus(RideStatus.CANCELLED);
    Ride savedRide = rideRepository.save(ride);
    return savedRide;
  }

  @Override
  public Ride findRideById(Long rideId) throws ResourceNotFoundException {
    return rideRepository.findById(rideId).orElseThrow(() -> new ResourceNotFoundException("Ride", "rideId", rideId));
  }

}
