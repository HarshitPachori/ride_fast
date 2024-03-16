package com.ridefast.ride_fast_backend.service;

import com.ridefast.ride_fast_backend.dto.RideRequest;
import com.ridefast.ride_fast_backend.exception.ResourceNotFoundException;
import com.ridefast.ride_fast_backend.exception.UserException;
import com.ridefast.ride_fast_backend.model.Driver;
import com.ridefast.ride_fast_backend.model.Ride;
import com.ridefast.ride_fast_backend.model.User;

public interface RideService {
  Ride requestRide(RideRequest rideRequest, User user) throws UserException;

  Ride createRide(User user, Driver nearestDriver, double pickupLatitude, double pickupLongitude,
      double destinationLatitude, double destinationLongitude, String pickupArea, String destinationArea);

  void acceptRide(Long rideId) throws ResourceNotFoundException;

  void declineRide(Long rideId, Long driverId) throws ResourceNotFoundException;

  void startRide(Long rideId, int OTP) throws ResourceNotFoundException, UserException;

  void completeRide(Long rideId) throws ResourceNotFoundException;

  void cancelRide(Long rideId) throws ResourceNotFoundException;

  Ride findRideById(Long rideId) throws ResourceNotFoundException;

}
