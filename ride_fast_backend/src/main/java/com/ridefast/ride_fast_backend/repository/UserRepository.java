package com.ridefast.ride_fast_backend.repository;

import com.ridefast.ride_fast_backend.model.Ride;
import com.ridefast.ride_fast_backend.model.User;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends JpaRepository<User, Long> {
    public Optional<User> findByEmail(String email);

    @Query("select r from Ride r where r.status=COMPLETED and r.user.id=:userId")
    public List<Ride> getCompletedRides(
            @Param("userId") Long userId);
}
