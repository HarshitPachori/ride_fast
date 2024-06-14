package com.ridefast.ride_fast_backend.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.ridefast.ride_fast_backend.model.Driver;
import com.ridefast.ride_fast_backend.model.MyUser;
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
    MyUser user = userRepository.findByEmail(username).orElse(null);
    if (user != null)
     return buildUserDetails(user.getEmail(), user.getPassword());
    Driver driver = driverRepository.findByEmail(username).orElse(null);
    if (driver != null)
      return buildUserDetails(driver.getEmail(), driver.getPassword());
    throw new UsernameNotFoundException("User or Driver not found");
  }

  private UserDetails buildUserDetails(String username, String password) {
    List<GrantedAuthority> authorities = new ArrayList<>();
        return new org.springframework.security.core.userdetails.User(username, password, authorities);
  }

}
