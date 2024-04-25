import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  acceptRideUrl,
  completeRideUrl,
  requestRideUrl,
  startRideUrl,
} from "../apiRoutes";

const token =
  typeof localStorage !== "undefined" ? localStorage.getItem("token") : null;

export const requestRide = createAsyncThunk(
  "ride/requestRide",
  async (
    rideData: {
      destinationArea: string;
      sourceArea: string;
      sourceLatitude: string;
      destinationLatitude: string;
      sourceLongitude: string;
      destinationLongitude: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(requestRideUrl, rideData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data);
      } else {
        console.log("error occured : " + error);
        return rejectWithValue("An Error Occured !!");
      }
    }
  }
);

export const acceptRide = createAsyncThunk(
  "ride/acceptRide",
  async (rideId: number, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        acceptRideUrl.replace("id", rideId.toString()),
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data);
      } else {
        return rejectWithValue("An Error Occured !!");
      }
    }
  }
);

export const startRide = createAsyncThunk(
  "ride/startRide",
  async (
    startRideData: { otp: number; rideId: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        startRideUrl.replace("id", startRideData.rideId.toString()),
        startRideData.otp,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data);
      } else {
        return rejectWithValue("An Error Occured !!");
      }
    }
  }
);

export const completeRide = createAsyncThunk(
  "ride/completeRide",
  async (rideId: number, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        completeRideUrl.replace("id", rideId.toString()),
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data);
      } else {
        return rejectWithValue("An Error Occured !!");
      }
    }
  }
);
