package com.ridefast.ride_fast_backend.service;

import java.util.List;

import com.ridefast.ride_fast_backend.exception.ResourceNotFoundException;
import com.ridefast.ride_fast_backend.exception.UserException;
import com.ridefast.ride_fast_backend.model.Ride;
import com.ridefast.ride_fast_backend.model.User;

public interface UserService {
  // User createUser(User user);

  User getRequestedUserProfile(String jwtToken) throws ResourceNotFoundException, UserException;

  User getUserById(Long userId) throws ResourceNotFoundException;

  List<Ride> getCompletedRides(Long userId);

  List<Ride> getUserCurrentRide(Long userId) throws ResourceNotFoundException;

  List<Ride> getUserRequestedRide(Long userId) throws ResourceNotFoundException;
}
