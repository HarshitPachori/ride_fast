package com.ridefast.ride_fast_backend.service;

import java.time.LocalDateTime;


public interface CalculatorService {
  double calculateDistance(double sourceLatitude, double sourceLongitude, double destinationLatitude,
      double destinationLongitude);

  Long calculateDuration(LocalDateTime startTime, LocalDateTime endTime);

  double calculateFair(double distance);
}
