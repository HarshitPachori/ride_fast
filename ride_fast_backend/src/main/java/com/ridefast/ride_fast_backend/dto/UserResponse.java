package com.ridefast.ride_fast_backend.dto;

import com.ridefast.ride_fast_backend.enums.UserRole;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserResponse {
  private Long id;
  private String email;
  private String fullName;
  private String mobile;
  private UserRole role;
}
