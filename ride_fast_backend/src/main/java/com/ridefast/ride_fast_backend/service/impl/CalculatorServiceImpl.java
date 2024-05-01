package com.ridefast.ride_fast_backend.service.impl;

import java.time.Duration;
import java.time.LocalDateTime;

import com.ridefast.ride_fast_backend.constant.AppConstants;
import com.ridefast.ride_fast_backend.service.CalculatorService;
import org.springframework.stereotype.Service;

@Service
public class CalculatorServiceImpl implements CalculatorService {

  @Override
  public double calculateDistance(double sourceLatitude, double sourceLongitude, double destinationLatitude,
      double destinationLongitude) {
    double dLatitude = Math.toRadians(destinationLatitude - sourceLatitude);
    double dLongitude = Math.toRadians(destinationLongitude - sourceLongitude);
    double a = Math.sin(dLatitude / 2) * Math.sin(dLatitude / 2)
        + Math.cos(Math.toRadians(sourceLatitude)) * Math.cos(Math.toRadians(destinationLatitude))
            * Math.sin(dLongitude / 2) * Math.sin(dLongitude / 2);

    double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return AppConstants.EARTH_RADIUS * c;
  }

  @Override
  public Long calculateDuration(LocalDateTime startTime, LocalDateTime endTime) {
    Duration duration = Duration.between(startTime, endTime);
    return duration.getSeconds();
  }

  @Override
  public double calculateFair(double distance) {
    double fair = AppConstants.RIDE_FAIR_AMOUNT;
    double totalFair = fair * distance;
    return totalFair;
  }
}
