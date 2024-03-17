package com.ridefast.ride_fast_backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ridefast.ride_fast_backend.dto.DriverResponse;
import com.ridefast.ride_fast_backend.dto.DriverSignUpRequest;
import com.ridefast.ride_fast_backend.dto.JwtResponse;
import com.ridefast.ride_fast_backend.dto.LoginRequest;
import com.ridefast.ride_fast_backend.dto.SignUpRequest;
import com.ridefast.ride_fast_backend.dto.UserResponse;
import com.ridefast.ride_fast_backend.exception.ResourceNotFoundException;
import com.ridefast.ride_fast_backend.exception.UserException;
import com.ridefast.ride_fast_backend.service.AuthService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

  private final AuthService authService;

  @PostMapping("/register/user")
  public ResponseEntity<UserResponse> signUpHandler(@RequestBody @Valid SignUpRequest signUpRequest) throws UserException {
    UserResponse userResponse = authService.signUpUser(signUpRequest);
    return new ResponseEntity<>(userResponse, HttpStatus.CREATED);
  }

  @PostMapping("/login")
  public ResponseEntity<JwtResponse> loginHandler(@RequestBody @Valid LoginRequest loginRequest)
      throws ResourceNotFoundException {
    JwtResponse jwtResponse = authService.loginUser(loginRequest);
    return new ResponseEntity<>(jwtResponse, HttpStatus.OK);
  }

  @PostMapping("/register/driver")
  public ResponseEntity<DriverResponse> registerDriver(@RequestBody @Valid DriverSignUpRequest signUpRequest) {
    DriverResponse driverResponse = authService.registerDriver(signUpRequest);
    return new ResponseEntity<>(driverResponse, HttpStatus.CREATED);
  }
}
