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
import com.ridefast.ride_fast_backend.model.User;
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
    User user = userService.getRequestedUserProfile(jwtToken);
    Ride ride = rideService.requestRide(request, user);
    RideDto rideDto = modelMapper.map(ride, RideDto.class);
    return new ResponseEntity<>(rideDto, HttpStatus.OK);
  }

  @PostMapping("/{rideId}/accept")
  public ResponseEntity<MessageResponse> acceptRideRequestHandler(@PathVariable Long rideId)
      throws ResourceNotFoundException {
    rideService.acceptRide(rideId);
    MessageResponse message = new MessageResponse("Ride accepted by Driver");
    return new ResponseEntity<>(message, HttpStatus.OK);
  }

  @PostMapping("/{rideId}/decline")
  public ResponseEntity<MessageResponse> declineRideHandler(@RequestHeader("Authorization") String jwtToken,
      @PathVariable Long rideId) throws ResourceNotFoundException {
    Driver driver = driverService.getRequestedDriverProfile(jwtToken);
    rideService.declineRide(rideId, driver.getId());
    MessageResponse message = new MessageResponse("Ride Declined by Driver");
    return new ResponseEntity<>(message, HttpStatus.OK);
  }

  @PostMapping("/{rideId}/start")
  public ResponseEntity<MessageResponse> rideStartHandler(
      @PathVariable Long rideId, @RequestBody StartRideRequest req) throws ResourceNotFoundException, UserException {
    rideService.startRide(rideId, req.getOtp());
    MessageResponse message = new MessageResponse("Ride is Started");
    return new ResponseEntity<>(message, HttpStatus.OK);
  }

  @PostMapping("/{rideId}/complete")
  public ResponseEntity<MessageResponse> rideCompleteHandler(
      @PathVariable Long rideId) throws ResourceNotFoundException {
    rideService.completeRide(rideId);
    MessageResponse message = new MessageResponse("Ride is Completed ! Thank you for Booking Cab");
    return new ResponseEntity<>(message, HttpStatus.OK);
  }

  @GetMapping("/{rideId}")
  public ResponseEntity<RideDto> findRideByIdHandler(@PathVariable Long rideId) throws ResourceNotFoundException {
    Ride ride = rideService.findRideById(rideId);
    RideDto rideDto = modelMapper.map(ride, RideDto.class);
    return new ResponseEntity<>(rideDto, HttpStatus.OK);
  }
}
