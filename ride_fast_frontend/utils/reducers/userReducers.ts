/*  1. userprofile  
response
{
    "id": 1,
    "email": "john@gmail.com",
    "fullName": "John Sharma",
    "mobile": "0123456789",
    "role": "NORMAL_USER"
}  
request send jwt of user

2. rides completed by user

*/

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  userCompletedRides,
  userCurrentRides,
  userRequestedRides,
} from "../apiRoutes";

// const token =
// typeof localStorage !== "undefined" ? localStorage.getItem("token") : null;

export const getCompletedRideByUser = createAsyncThunk(
  "user/completedRides",
  async (token: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(userCompletedRides, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error);
      } else {
        return rejectWithValue("An Error Ocurrred !!");
      }
    }
  }
);

export const getCurrentRideOfUser = createAsyncThunk(
  "user/currentRides",
  async (userData: { userId: number; token: string }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        userCurrentRides.replace("id", userData.userId.toString()),
        {
          headers: {
            Authorization: `Bearer ${userData.token}`,
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

export const getUserRequestedRides = createAsyncThunk(
  "user/requestedRide",
  async (userData: { userId: number; token: string }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        userRequestedRides.replace("id", userData.userId.toString()),
        {
          headers: {
            Authorization: `Bearer ${userData.token}`,
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
