import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getDriverAllocatedRides = createAsyncThunk(
  "driver/allocatedRides",
  async (token: string, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/v1/driver/rides/allocated", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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
export const getDriverCompletedRides = createAsyncThunk(
  "driver/completedRides",
  async (token: string, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/v1/driver/rides/completed", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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

export const getDriverCurrentRide = createAsyncThunk(
  "driver/currentRide",
  async (data: { token: string; driverId: number }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `/api/v1/driver/${data.driverId}/current_ride`,
        {
          headers: {
            Authorization: `Bearer ${data.token}`,
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
export const getDriverStartedRide = createAsyncThunk(
  "driver/startedRide",
  async (_, { rejectWithValue }) => {
    const token =
      typeof localStorage !== "undefined"
        ? localStorage.getItem("token")
        : null;

    try {
      const response = await axios.get(`/api/v1/driver/rides/started`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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
