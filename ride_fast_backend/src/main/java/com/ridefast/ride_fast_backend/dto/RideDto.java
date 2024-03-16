package com.ridefast.ride_fast_backend.dto;

import java.time.LocalDateTime;

import com.ridefast.ride_fast_backend.enums.RideStatus;
import com.ridefast.ride_fast_backend.model.PaymentDetails;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RideDto {
  private Long id;
  private UserResponse user;
  private DriverResponse driver;
  private double pickupLatitude;
  private double pickupLongitude;
  private double destinationLatitude;
  private double destinationLongitude;
  private String pickupArea;
  private String destinationArea;
  private double distance;
  private long duration;
  private RideStatus status;
  private LocalDateTime startTime;
  private LocalDateTime endTime;
  private double fare;
  private PaymentDetails paymentDetails;
  private int otp;
}
