package com.ridefast.ride_fast_backend.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.ridefast.ride_fast_backend.exception.ResourceNotFoundException;
import com.ridefast.ride_fast_backend.model.Driver;
import com.ridefast.ride_fast_backend.model.User;
import com.ridefast.ride_fast_backend.repository.DriverRepository;
import com.ridefast.ride_fast_backend.repository.UserRepository;

import lombok.RequiredArgsConstructor;

// default password will not get generated if we use this service  
@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

  private final DriverRepository driverRepository;
  private final UserRepository userRepository;

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    try {
      List<GrantedAuthority> authorities = new ArrayList<>();
      User user = userRepository.findByEmail(username)
          .orElseThrow(() -> new ResourceNotFoundException("User", "username", username));
      if (user != null) {
        return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), authorities);
      }
      Driver driver = driverRepository.findByEmail(username).orElseThrow(
          () -> new ResourceNotFoundException("Driver", "driver", username));

      if (driver != null) {
        return new org.springframework.security.core.userdetails.User(driver.getEmail(), driver.getPassword(),
            authorities);
      }
    } catch (ResourceNotFoundException e) {

    }
    throw new UsernameNotFoundException("User not found with email :- " + username);
  }

}
