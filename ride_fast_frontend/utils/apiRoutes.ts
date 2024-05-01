// auth routes

export const registerUserUrl = "/api/v1/auth/register/user";
export const registerDriverUrl = "/api/v1/auth/register/driver";
export const loginUserUrl = "/api/v1/auth/login";
export const userProfileUrl = "/api/v1/user/profile";
export const driverProfileUrl = "/api/v1/driver/profile";

// ride routes

export const requestRideUrl = "/api/v1/ride/request";
export const startRideUrl = "/api/v1/ride/:id/start";
export const acceptRideUrl = "/api/v1/ride/:id/accept";
export const completeRideUrl = "/api/v1/ride/:id/complete";

// driver routes

// user routes
export const userCompletedRides = "/api/v1/user/rides/completed";
export const userCurrentRides = "/api/v1/user/id/rides/current";
export const userRequestedRides = "/api/v1/user/id/rides/requested";
