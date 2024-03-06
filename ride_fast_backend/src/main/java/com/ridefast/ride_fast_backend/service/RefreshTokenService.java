package com.ridefast.ride_fast_backend.service;

import com.ridefast.ride_fast_backend.enums.UserRole;
import com.ridefast.ride_fast_backend.exception.ResourceNotFoundException;
import com.ridefast.ride_fast_backend.model.RefreshToken;

public interface RefreshTokenService {
  RefreshToken createRefreshToken(String username, UserRole userRole) throws ResourceNotFoundException;

  boolean verifyRefreshToken(RefreshToken refreshToken);

  String createJwtTokenFromRefreshToken(RefreshToken refreshToken, UserRole userRole) throws ResourceNotFoundException;
}
