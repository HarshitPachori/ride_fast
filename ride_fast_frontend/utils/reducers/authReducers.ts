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
        console.log("error occured : " + error);
        return rejectWithValue("An Error Occured");
      }
    }
  }
);
export const registerDriver = createAsyncThunk(
  "auth/registerDriver",
  async (userData, { rejectWithValue }) => {
    try {
      const reponse = await axios.post(registerDriverUrl, userData);
      return reponse.data;
    } catch (error) {
      if (axios.isAxiosError(error))
        return rejectWithValue(error.response?.data);
      console.log("error : " + error);
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
      console.log("error : " + error);
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
      console.log("error : " + error);
      return rejectWithValue("An Unknown error occured");
    }
  }
);
export const driverProfile = createAsyncThunk(
  "auth/driverProfile",
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/v1/driver/profile");
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error))
        return rejectWithValue(error.response?.data);
      console.log("error : " + error);
      return rejectWithValue("An unknown error occured");
    }
  }
);
