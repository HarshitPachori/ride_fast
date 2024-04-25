package com.ridefast.ride_fast_backend.service.impl;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.ridefast.ride_fast_backend.exception.ResourceNotFoundException;
import com.ridefast.ride_fast_backend.exception.UserException;
import com.ridefast.ride_fast_backend.model.Ride;
import com.ridefast.ride_fast_backend.model.User;
import com.ridefast.ride_fast_backend.repository.UserRepository;
import com.ridefast.ride_fast_backend.service.UserService;
import com.ridefast.ride_fast_backend.util.JwtTokenHelper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

  private final UserRepository usereRepository;
  private final JwtTokenHelper tokenHelper;
  private final ModelMapper modelMapper;

  @Override
  public User getRequestedUserProfile(String jwtToken) throws ResourceNotFoundException, UserException {
    String email = tokenHelper.getUsernameFromToken(jwtToken);
    User user = null;
    if (usereRepository.findByEmail(email).isPresent())
      user = usereRepository.findByEmail(email).get();
    if (user != null)
      return user;
    throw new UserException("Invalid Jwt Token");
  }

  @Override
  public List<Ride> getCompletedRides(Long userId) {
    List<Ride> completedRides = usereRepository.getCompletedRides(userId);
  
    return completedRides;
  }

  @Override
  public User getUserById(Long userId) throws ResourceNotFoundException {
    return usereRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User", "userId", userId));
  }

}
