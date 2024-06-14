package com.ridefast.ride_fast_backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ridefast.ride_fast_backend.enums.RideStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Ride {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(cascade = CascadeType.ALL)
    private MyUser user;

    @ManyToOne(cascade = CascadeType.ALL)
    private Driver driver;

    @JsonIgnore
    private List<Long> declinedDrivers = new ArrayList<>();

    private Double pickupLatitude;
    private Double pickupLongitude;
    private Double destinationLatitude;
    private Double destinationLongitude;

    private String pickupArea;
    private String destinationArea;

    private Double distance;
    private Long duration;

    private RideStatus status;

    private LocalDateTime startTime;
    private LocalDateTime endTime;

    private Double fare;
    private Integer otp;

    @Embedded
    private PaymentDetails paymentDetails = new PaymentDetails();

}
