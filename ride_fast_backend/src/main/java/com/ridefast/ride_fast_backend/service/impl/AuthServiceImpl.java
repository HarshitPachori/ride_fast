package com.ridefast.ride_fast_backend.service.impl;

import org.modelmapper.ModelMapper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ridefast.ride_fast_backend.dto.JwtResponse;
import com.ridefast.ride_fast_backend.dto.LoginRequest;
import com.ridefast.ride_fast_backend.dto.SignUpRequest;
import com.ridefast.ride_fast_backend.dto.UserResponse;
import com.ridefast.ride_fast_backend.enums.UserRole;
import com.ridefast.ride_fast_backend.exception.ResourceNotFoundException;
import com.ridefast.ride_fast_backend.exception.UserException;
import com.ridefast.ride_fast_backend.model.RefreshToken;
import com.ridefast.ride_fast_backend.model.User;
import com.ridefast.ride_fast_backend.repository.UserRepository;
import com.ridefast.ride_fast_backend.service.AuthService;
import com.ridefast.ride_fast_backend.service.CustomUserDetailsService;
import com.ridefast.ride_fast_backend.service.RefreshTokenService;
import com.ridefast.ride_fast_backend.util.JwtTokenHelper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

  private final UserRepository userRepository;
  private final RefreshTokenService refreshTokenService;
  private final JwtTokenHelper jwtTokenHelper;
  private final AuthenticationManager authenticationManager;
  private final CustomUserDetailsService userDetailsService;

  private final PasswordEncoder passwordEncoder;
  private final ModelMapper modelMapper;

  @Override
  public UserResponse signUpUser(SignUpRequest request) {
    try {
      boolean userPresent = userRepository.findByEmail(request.getEmail()).isPresent();
      if (userPresent)
        throw new UserException("User Already Exists with this email");
    } catch (UserException e) {
      e.printStackTrace();
    }

    String encodedPassword = passwordEncoder.encode(request.getPassword());

    User createdUser = modelMapper.map(request, User.class);
    createdUser.setPassword(encodedPassword);
    createdUser.setRole(UserRole.NORMAL_USER);

    User savedUser = userRepository.save(createdUser);

    UserResponse userResponse = modelMapper.map(savedUser, UserResponse.class);
    return userResponse;

  }

  @Override
  public JwtResponse loginUser(LoginRequest request) throws ResourceNotFoundException {
    Authentication authentication = authenticate(request.getEmail(), request.getPassword());
    SecurityContextHolder.getContext().setAuthentication(authentication);

    UserDetails userDetails = userDetailsService.loadUserByUsername(request.getEmail());

    RefreshToken refreshToken = refreshTokenService.createRefreshToken(userDetails.getUsername(), UserRole.NORMAL_USER);

    String jwtToken = jwtTokenHelper.generateToken(userDetails.getUsername());

    JwtResponse response = JwtResponse.builder()
        .accessToken(jwtToken)
        .refreshToken(refreshToken.getRefreshToken())
        .type(UserRole.NORMAL_USER)
        .message("Login successfully : " + userDetails.getUsername())
        .build();
    return response;
  }

  private Authentication authenticate(String username, String password) {
    UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(username,
        password);
    try {
      Authentication authentication = authenticationManager.authenticate(authenticationToken);
      return authentication;
    } catch (BadCredentialsException e) {
      throw new BadCredentialsException("invalid username or password");
    }
  }

}
