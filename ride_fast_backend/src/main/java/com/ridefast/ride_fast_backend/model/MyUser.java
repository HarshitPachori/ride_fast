package com.ridefast.ride_fast_backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ridefast.ride_fast_backend.enums.UserRole;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MyUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String fullName;
    private String email;
    private String mobile;
    private String password;
    private String profilePicture;
    private UserRole role;
    
  @JsonIgnore
    @OneToOne(cascade = CascadeType.ALL)
    private Ride currentRide;

    @OneToOne(mappedBy = "user")
    private RefreshToken refreshToken;
}
