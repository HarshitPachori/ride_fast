package com.ridefast.ride_fast_backend.service;

import com.ridefast.ride_fast_backend.dto.DriverResponse;
import com.ridefast.ride_fast_backend.dto.DriverSignUpRequest;
import com.ridefast.ride_fast_backend.dto.JwtResponse;
import com.ridefast.ride_fast_backend.dto.LoginRequest;
import com.ridefast.ride_fast_backend.dto.SignUpRequest;
import com.ridefast.ride_fast_backend.dto.UserResponse;
import com.ridefast.ride_fast_backend.exception.ResourceNotFoundException;
import com.ridefast.ride_fast_backend.exception.UserException;

public interface AuthService {
  UserResponse signUpUser(SignUpRequest request) throws UserException;

  JwtResponse loginUser(LoginRequest request) throws ResourceNotFoundException;

  DriverResponse registerDriver(DriverSignUpRequest request);
}
