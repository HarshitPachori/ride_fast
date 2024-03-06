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
  private Double pickupLatitude;
  private Double pickupLongitude;
  private Double destinationLatitude;
  private Double destinationLongitude;
}
