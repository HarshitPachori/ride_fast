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

export const getCompletedRideByUser = createAsyncThunk(
  "user/completedRides",
  async (token, { rejectWithValue }) => {
    try {
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error);
      } else {
        return rejectWithValue("An Error Ocurrred !!");
      }
    }
  }
);
