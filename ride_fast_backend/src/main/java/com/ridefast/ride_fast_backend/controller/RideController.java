package com.ridefast.ride_fast_backend.controller;

import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ridefast.ride_fast_backend.dto.MessageResponse;
import com.ridefast.ride_fast_backend.dto.RideDto;
import com.ridefast.ride_fast_backend.dto.RideRequest;
import com.ridefast.ride_fast_backend.dto.StartRideRequest;
import com.ridefast.ride_fast_backend.exception.ResourceNotFoundException;
import com.ridefast.ride_fast_backend.exception.UserException;
import com.ridefast.ride_fast_backend.model.Driver;
import com.ridefast.ride_fast_backend.model.Ride;
import com.ridefast.ride_fast_backend.model.MyUser;
import com.ridefast.ride_fast_backend.service.DriverService;
import com.ridefast.ride_fast_backend.service.RideService;
import com.ridefast.ride_fast_backend.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/ride")
@RequiredArgsConstructor
public class RideController {
  private final RideService rideService;
  private final DriverService driverService;
  private final UserService userService;
  private final ModelMapper modelMapper;

  @PostMapping("/request")
  public ResponseEntity<RideDto> userRideRequestHandler(@RequestBody RideRequest request,
      @RequestHeader("Authorization") String jwtToken) throws ResourceNotFoundException, UserException {
    MyUser user = userService.getRequestedUserProfile(jwtToken);
    Ride ride = rideService.requestRide(request, user);
    RideDto rideDto = modelMapper.map(ride, RideDto.class);
    return new ResponseEntity<>(rideDto, HttpStatus.OK);
  }

  @PostMapping("/{rideId}/accept")
  public ResponseEntity<RideDto> acceptRideRequestHandler(@PathVariable Long rideId)
      throws ResourceNotFoundException {
    Ride ride = rideService.acceptRide(rideId);
    RideDto rideDto = modelMapper.map(ride, RideDto.class);
    return new ResponseEntity<>(rideDto, HttpStatus.OK);
  }

  @PostMapping("/{rideId}/decline")
  public ResponseEntity<RideDto> declineRideHandler(@RequestHeader("Authorization") String jwtToken,
      @PathVariable Long rideId) throws ResourceNotFoundException {
    Driver driver = driverService.getRequestedDriverProfile(jwtToken);
    Ride ride = rideService.declineRide(rideId, driver.getId());
    RideDto rideDto = modelMapper.map(ride, RideDto.class);
    return new ResponseEntity<>(rideDto, HttpStatus.OK);
  }

  @PostMapping("/{rideId}/start")
  public ResponseEntity<RideDto> rideStartHandler(
      @PathVariable Long rideId, @RequestBody StartRideRequest req) throws ResourceNotFoundException, UserException {
    Ride ride = rideService.startRide(rideId, req.getOtp());
    RideDto rideDto = modelMapper.map(ride, RideDto.class);
    return new ResponseEntity<>(rideDto, HttpStatus.OK);
  }

  @PostMapping("/{rideId}/complete")
  public ResponseEntity<RideDto> rideCompleteHandler(
      @PathVariable Long rideId) throws ResourceNotFoundException {
    Ride ride = rideService.completeRide(rideId);
    RideDto rideDto = modelMapper.map(ride, RideDto.class);
    return new ResponseEntity<>(rideDto, HttpStatus.OK);
  }

  @GetMapping("/{rideId}")
  public ResponseEntity<RideDto> findRideByIdHandler(@PathVariable Long rideId) throws ResourceNotFoundException {
    Ride ride = rideService.findRideById(rideId);
    RideDto rideDto = modelMapper.map(ride, RideDto.class);
    return new ResponseEntity<>(rideDto, HttpStatus.OK);
  }
}
