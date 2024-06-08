import { SerializedError, createSlice } from "@reduxjs/toolkit";
import {
  acceptRide,
  completeRide,
  getRideById,
  requestRide,
  startRide,
} from "../reducers/rideReducers";
import {
  getCompletedRideByUser,
  getCurrentRideOfUser,
  getUserRequestedRides,
} from "../reducers/userReducers";

interface PaymentDetails {
  paymentMethod: string;
}
interface User {
  fullName: string;
  email: string;
  mobile: string;
  password: string;
  role: string;
}
interface Driver {
  name: string;
  email: string;
  mobile: string;
  latitude: number;
  longitude: number;
  role: string;
  password: string;
  vehicle: {
    company: string;
    model: string;
    licensePlate:string
  };
}
export interface RideState {
  rideId: number;
  isLoading: boolean;
  error: SerializedError | string | null;
  otp: number;
  isSuccess: boolean;
  fare: number;
  distance: number;
  duration: number;
  startTime: number;
  endTime: number;
  paymentDetails: PaymentDetails | null;
  pickupLatitude: number;
  pickupLongitude: number;
  destinationLatitude: number;
  destinationLongitude: number;
  status: string | null;
  user: User | null;
  driver: Driver | null;
  pickupArea: string;
  destinationArea: string;
  currentRides: [];
  requestedRides: [];
  completedRides: [];
}
const initialState: RideState = {
  rideId: 0,
  isLoading: false,
  error: null,
  isSuccess: false,
  otp: 0,
  fare: 0,
  distance: 0,
  duration: 0,
  startTime: 0,
  endTime: 0,
  paymentDetails: null,
  pickupLatitude: 0,
  pickupLongitude: 0,
  destinationLatitude: 0,
  destinationLongitude: 0,
  pickupArea: "",
  destinationArea: "",
  status: null,
  user: null,
  driver: null,
  currentRides: [],
  requestedRides: [],
  completedRides: [],
};
const rideSlice = createSlice({
  name: "ride",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(requestRide.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(requestRide.fulfilled, (state, action) => {
        state.rideId = action.payload.id;
        state.isLoading = false;
        state.error = null;
        state.isSuccess = true;
        state.user = action.payload.user;
        state.driver = action.payload.driver;
        state.status = action.payload.status;
        state.destinationLatitude = action.payload.destinationLatitude;
        state.destinationLongitude = action.payload.destinationLongitude;
        state.pickupLatitude = action.payload.pickupLatitude;
        state.pickupLongitude = action.payload.pickupLongitude;
        state.pickupArea = action.payload.pickupArea;
        state.destinationArea = action.payload.destinationArea;
        state.fare = action.payload.fare;
        state.distance = action.payload.distance;
        state.duration = action.payload.duration;
        state.startTime = action.payload.startTime;
        state.endTime = action.payload.endTime;
        state.paymentDetails = action.payload.paymentDetails;
      })
      .addCase(requestRide.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.user = null;
        state.driver = null;
        state.error = action.error;
      })
      .addCase(startRide.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(startRide.fulfilled, (state, action) => {
        state.rideId = action.payload.id;
        state.isLoading = false;
        state.error = null;
        state.isSuccess = true;
        state.user = action.payload.user;
        state.driver = action.payload.driver;
        state.status = action.payload.status;
        state.destinationLatitude = action.payload.destinationLatitude;
        state.destinationLongitude = action.payload.destinationLongitude;
        state.pickupLatitude = action.payload.pickupLatitude;
        state.pickupLongitude = action.payload.pickupLongitude;
        state.pickupArea = action.payload.pickupArea;
        state.destinationArea = action.payload.destinationArea;
        state.fare = action.payload.fare;
        state.distance = action.payload.distance;
        state.duration = action.payload.duration;
        state.startTime = action.payload.startTime;
        state.endTime = action.payload.endTime;
        state.paymentDetails = action.payload.paymentDetails;
      })
      .addCase(startRide.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.user = null;
        state.driver = null;
        state.error = action.error;
      })
      .addCase(acceptRide.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(acceptRide.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.rideId = action.payload.id;
        state.user = action.payload.user;
        state.driver = action.payload.driver;
        state.status = action.payload.status;
        state.destinationLatitude = action.payload.destinationLatitude;
        state.destinationLongitude = action.payload.destinationLongitude;
        state.pickupLatitude = action.payload.pickupLatitude;
        state.pickupLongitude = action.payload.pickupLongitude;
        state.pickupArea = action.payload.pickupArea;
        state.destinationArea = action.payload.destinationArea;
        state.fare = action.payload.fare;
        state.distance = action.payload.distance;
        state.duration = action.payload.duration;
        state.startTime = action.payload.startTime;
        state.endTime = action.payload.endTime;
        state.paymentDetails = action.payload.paymentDetails;
      })
      .addCase(acceptRide.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.user = null;
        state.driver = null;
        state.error = action.error;
      })
      .addCase(completeRide.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(completeRide.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.rideId = action.payload.id;
        state.user = action.payload.user;
        state.driver = action.payload.driver;
        state.status = action.payload.status;
        state.destinationLatitude = action.payload.destinationLatitude;
        state.destinationLongitude = action.payload.destinationLongitude;
        state.pickupLatitude = action.payload.pickupLatitude;
        state.pickupLongitude = action.payload.pickupLongitude;
        state.pickupArea = action.payload.pickupArea;
        state.destinationArea = action.payload.destinationArea;
        state.fare = action.payload.fare;
        state.distance = action.payload.distance;
        state.duration = action.payload.duration;
        state.startTime = action.payload.startTime;
        state.endTime = action.payload.endTime;
        state.paymentDetails = action.payload.paymentDetails;
      })
      .addCase(completeRide.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.user = null;
        state.driver = null;
        state.error = action.error;
      })
      .addCase(getCurrentRideOfUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCurrentRideOfUser.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.currentRides = action.payload;
      })
      .addCase(getCurrentRideOfUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.error = action.error;
      })
      .addCase(getRideById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getRideById.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.user = action.payload.user;
        state.driver = action.payload.driver;
        state.status = action.payload.status;
        state.destinationLatitude = action.payload.destinationLatitude;
        state.destinationLongitude = action.payload.destinationLongitude;
        state.pickupLatitude = action.payload.pickupLatitude;
        state.pickupLongitude = action.payload.pickupLongitude;
        state.pickupArea = action.payload.pickupArea;
        state.destinationArea = action.payload.destinationArea;
        state.fare = action.payload.fare;
        state.distance = action.payload.distance;
        state.duration = action.payload.duration;
        state.startTime = action.payload.startTime;
        state.endTime = action.payload.endTime;
        state.paymentDetails = action.payload.paymentDetails;
        state.rideId = action.payload.id;
        state.otp = action.payload.otp;
      })
      .addCase(getRideById.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.error = action.error;
      })
      .addCase(getCompletedRideByUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCompletedRideByUser.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.completedRides = action.payload;
      })
      .addCase(getCompletedRideByUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.error = action.error;
      })
      .addCase(getUserRequestedRides.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUserRequestedRides.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.requestedRides = action.payload;
      })
      .addCase(getUserRequestedRides.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.error = action.error;
      });
  },
});
export default rideSlice.reducer;
