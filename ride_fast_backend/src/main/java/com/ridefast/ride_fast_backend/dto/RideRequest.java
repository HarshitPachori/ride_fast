package com.ridefast.ride_fast_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RideRequest {

  private String pickupArea;
  private String destinationArea;
  private double pickupLatitude;
  private double pickupLongitude;
  private double destinationLatitude;
  private double destinationLongitude;
}
