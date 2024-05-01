import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  loginUserUrl,
  registerDriverUrl,
  registerUserUrl,
  userProfileUrl,
} from "../apiRoutes";

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (
    userData: {
      email: string;
      password: string;
      mobile: string;
      fullName: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(registerUserUrl, userData);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data);
      } else {
        return rejectWithValue("An Error Occured");
      }
    }
  }
);
export const registerDriver = createAsyncThunk(
  "auth/registerDriver",
  async (driverData: {}, { rejectWithValue }) => {
    try {
      const reponse = await axios.post(registerDriverUrl, driverData);
      return reponse.data;
    } catch (error) {
      if (axios.isAxiosError(error))
        return rejectWithValue(error.response?.data);
      return rejectWithValue("UnKnown Error");
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (
    userData: { email: string; password: string; role: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(loginUserUrl, userData);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error))
        return rejectWithValue(error.response?.data);
      return rejectWithValue("An Unknown Error Occured");
    }
  }
);
export const userProfile = createAsyncThunk(
  "auth/userProfile",
  async (token: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(userProfileUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error))
        return rejectWithValue(error.response?.data);
      return rejectWithValue("An Unknown error occured");
    }
  }
);
export const driverProfile = createAsyncThunk(
  "auth/driverProfile",
  async (token: string, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/v1/driver/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error))
        return rejectWithValue(error.response?.data);
      return rejectWithValue("An unknown error occured");
    }
  }
);
