package com.ridefast.ride_fast_backend.service;

import com.ridefast.ride_fast_backend.dto.RideRequest;
import com.ridefast.ride_fast_backend.exception.ResourceNotFoundException;
import com.ridefast.ride_fast_backend.exception.UserException;
import com.ridefast.ride_fast_backend.model.Driver;
import com.ridefast.ride_fast_backend.model.Ride;
import com.ridefast.ride_fast_backend.model.MyUser;

public interface RideService {
  Ride requestRide(RideRequest rideRequest, MyUser user) throws UserException;

  Ride createRide(MyUser user, Driver nearestDriver, double pickupLatitude, double pickupLongitude,
      double destinationLatitude, double destinationLongitude, String pickupArea, String destinationArea);

  Ride acceptRide(Long rideId) throws ResourceNotFoundException;

  Ride declineRide(Long rideId, Long driverId) throws ResourceNotFoundException;

  Ride startRide(Long rideId, int OTP) throws ResourceNotFoundException, UserException;

  Ride completeRide(Long rideId) throws ResourceNotFoundException;

  Ride cancelRide(Long rideId) throws ResourceNotFoundException;

  Ride findRideById(Long rideId) throws ResourceNotFoundException;

}
