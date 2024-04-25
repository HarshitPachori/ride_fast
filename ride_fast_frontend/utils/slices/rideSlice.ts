import { SerializedError, createSlice } from "@reduxjs/toolkit";
import {
  acceptRide,
  completeRide,
  requestRide,
  startRide,
} from "../reducers/rideReducers";

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
}
interface RideState {
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
  status: null,
  user: null,
  driver: null,
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
        state.user = action.payload.user;
        state.driver = action.payload.driver;
        state.status = action.payload.status;
        state.destinationLatitude = action.payload.destinationLatitude;
        state.destinationLongitude = action.payload.destinationLongitude;
        state.pickupLatitude = action.payload.pickupLatitude;
        state.pickupLongitude = action.payload.pickupLongitude;
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
        state.user = action.payload.user;
        state.driver = action.payload.driver;
        state.status = action.payload.status;
        state.destinationLatitude = action.payload.destinationLatitude;
        state.destinationLongitude = action.payload.destinationLongitude;
        state.pickupLatitude = action.payload.pickupLatitude;
        state.pickupLongitude = action.payload.pickupLongitude;
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
      });
  },
});
export default rideSlice.reducer;
