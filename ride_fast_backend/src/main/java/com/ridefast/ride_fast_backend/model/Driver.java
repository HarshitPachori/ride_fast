package com.ridefast.ride_fast_backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ridefast.ride_fast_backend.enums.UserRole;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Driver {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String email;
    private String mobile;
    private Double rating = 0.0;
    private Double latitude;
    private Double longitude;
    private UserRole role;

    private String password;
    @OneToOne(mappedBy = "driver", cascade = CascadeType.ALL)
    private License license;

    @JsonIgnore
    @OneToMany(mappedBy = "driver", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Ride> rides = new ArrayList<>();

    @OneToOne(mappedBy = "driver", cascade = CascadeType.ALL, orphanRemoval = true)
    private Vehicle vehicle;

    @JsonIgnore
    @OneToOne(cascade = CascadeType.ALL)
    private Ride currentRide;

    private Long totalRevenue = 0L;

    @OneToOne(mappedBy = "driver")
    private RefreshToken refreshToken;

}
