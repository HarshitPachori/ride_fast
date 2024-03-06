package com.ridefast.ride_fast_backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SignUpRequest {

  @Email(message = "Invalid email address")
  @NotEmpty(message = "email is required")
  private String email;

  @NotEmpty(message = "full name is required")
  private String fullName;

  @NotEmpty(message = "password is required")
  private String password;

  @NotEmpty(message = "mobile is required")
  @Size(min = 10, message = "Invalid mobile number")
  private String mobile;
}
