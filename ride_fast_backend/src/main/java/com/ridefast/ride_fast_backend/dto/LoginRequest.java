package com.ridefast.ride_fast_backend.dto;

import com.ridefast.ride_fast_backend.enums.UserRole;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginRequest {

  @Email(message = "Invalid email address")
  @NotEmpty(message = "email is required")
  private String email;

  @NotEmpty(message = "password is required")
  private String password;

  @NotNull(message = "user role is required")
  private UserRole role;
}
