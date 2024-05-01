import { SerializedError, createSlice } from "@reduxjs/toolkit";
import {
  getDriverAllocatedRides,
  getDriverCompletedRides,
  getDriverCurrentRide,
  getDriverStartedRide,
} from "../reducers/driverReducers";
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
  pickupArea: string;
  destinationArea: string;
  currentRides: [];
  allocatedRides: [];
  completedRides: [];
  startedRides: [];
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
  allocatedRides: [],
  completedRides: [],
  startedRides: [],
};
const driverSlice = createSlice({
  name: "driver",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getDriverAllocatedRides.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getDriverAllocatedRides.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allocatedRides = action.payload;
      })
      .addCase(getDriverAllocatedRides.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })
      .addCase(getDriverCompletedRides.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getDriverCompletedRides.fulfilled, (state, action) => {
        state.isLoading = false;
        state.completedRides = action.payload;
      })
      .addCase(getDriverCompletedRides.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })
      .addCase(getDriverCurrentRide.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getDriverCurrentRide.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentRides = action.payload;
      })
      .addCase(getDriverCurrentRide.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
        state.currentRides = [];
      })
      .addCase(getDriverStartedRide.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getDriverStartedRide.fulfilled, (state, action) => {
        state.isLoading = false;
        state.startedRides = action.payload;
      })
      .addCase(getDriverStartedRide.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
        state.startedRides = [];
      });
  },
});

export default driverSlice.reducer;
