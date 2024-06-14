package com.ridefast.ride_fast_backend.service.impl;

import java.time.Instant;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.ridefast.ride_fast_backend.constant.AppConstants;
import com.ridefast.ride_fast_backend.enums.UserRole;
import com.ridefast.ride_fast_backend.exception.ResourceNotFoundException;
import com.ridefast.ride_fast_backend.model.Driver;
import com.ridefast.ride_fast_backend.model.RefreshToken;
import com.ridefast.ride_fast_backend.model.MyUser;
import com.ridefast.ride_fast_backend.repository.DriverRepository;
import com.ridefast.ride_fast_backend.repository.RefreshTokenRepository;
import com.ridefast.ride_fast_backend.repository.UserRepository;
import com.ridefast.ride_fast_backend.service.RefreshTokenService;
import com.ridefast.ride_fast_backend.util.JwtTokenHelper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RefreshTokenServiceImpl implements RefreshTokenService {

  private final RefreshTokenRepository refreshTokenRepository;
  private final UserRepository userRepository;
  private final DriverRepository driverRepository;
  private final JwtTokenHelper jwtTokenHelper;

  @Override
  public RefreshToken createRefreshToken(String username, UserRole userRole) throws ResourceNotFoundException {
    RefreshToken refreshToken = null;
    if (userRole == UserRole.NORMAL_USER) {
      MyUser user = userRepository.findByEmail(username)
          .orElseThrow(() -> new ResourceNotFoundException("username", "username", username));
      refreshToken = user.getRefreshToken();
      if (refreshToken == null) {
        refreshToken = RefreshToken.builder()
            .refreshToken(UUID.randomUUID().toString())
            .expirationDate(Instant.now().plusMillis(AppConstants.REFRESH_TOKEN_VALIDITY * 1000))
            .user(user)
            .build();
      } else {
        refreshToken.setExpirationDate(Instant.now().plusMillis(AppConstants.REFRESH_TOKEN_VALIDITY * 1000));
      }
    } else {
      Driver driver = driverRepository.findByEmail(username)
          .orElseThrow(() -> new ResourceNotFoundException("driver", "username", username));
      refreshToken = driver.getRefreshToken();
      if (refreshToken == null) {
        refreshToken = RefreshToken.builder()
            .refreshToken(UUID.randomUUID().toString())
            .expirationDate(Instant.now().plusMillis(AppConstants.REFRESH_TOKEN_VALIDITY * 1000))
            .driver(driver)
            .build();
      } else {
        refreshToken.setExpirationDate(Instant.now().plusMillis(AppConstants.REFRESH_TOKEN_VALIDITY * 1000));
      }
    }
    return refreshTokenRepository.save(refreshToken);
  }

  @Override
  public boolean verifyRefreshToken(RefreshToken refreshToken) {
    if (refreshToken.getExpirationDate().compareTo(Instant.now()) < 0) {
      refreshTokenRepository.delete(refreshToken);
      return false;
    } else
      return true;
  }

  @Override
  public String createJwtTokenFromRefreshToken(RefreshToken refreshToken, UserRole userRole)
      throws ResourceNotFoundException {
    RefreshToken fetchedRefreshToken = refreshTokenRepository.findByRefreshToken(refreshToken.getRefreshToken())
        .orElseThrow(
            () -> new ResourceNotFoundException("RefreshToken", "RefreshToken", refreshToken.getRefreshToken()));
    String username = null;
    if (userRole == UserRole.NORMAL_USER) {
      username = fetchedRefreshToken.getUser().getEmail();
    } else {
      username = fetchedRefreshToken.getDriver().getEmail();
    }
    return jwtTokenHelper.generateToken(username);
  }
}
