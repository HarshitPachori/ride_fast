package com.ridefast.ride_fast_backend.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CustomExceptionResponse {

  private Integer status;
  private String error;
  // private StackTraceElement stackTarce[];
  private String message;
  private String path;
  private LocalDateTime timestamp;
}
