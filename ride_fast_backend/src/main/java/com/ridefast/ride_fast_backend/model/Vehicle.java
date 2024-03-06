package com.ridefast.ride_fast_backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Vehicle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String company;
    private String model;
    private String color;
    private Integer year;
    private String licensePlate;
    private Integer capacity;

    @JsonIgnore
    @OneToOne(cascade = CascadeType.ALL)
    private Driver driver;
}
