package com.ridefast.ride_fast_backend.constant;

import java.util.Base64;

import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

public class AppConstants {

    public static final int EARTH_RADIUS = 6371;
    public static final double RIDE_FAIR_AMOUNT = 10;
    public static final String JWT_TOKEN_SECRET = Base64.getEncoder().encodeToString(
            Keys.secretKeyFor(SignatureAlgorithm.HS256).getEncoded());
    public static final long JWT_TOKEN_VALIDITY = 15 * 60 * 1000; // jwt -> 15 minutes
    public static final long REFRESH_TOKEN_VALIDITY = 7 * 24 * 60 * 60 * 1000; // -> 7 days
}
