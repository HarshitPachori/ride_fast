import { SerializedError, createSlice } from "@reduxjs/toolkit";

import {
  driverProfile,
  loginUser,
  registerDriver,
  registerUser,
  userProfile,
} from "../reducers/authReducers";

interface User {
  userId: number;
  fullName: string;
  email: string;
  mobile: string;
  password: string;
  role: string;
}
interface Driver {
  driverId: number;
  name: string;
  email: string;
  mobile: string;
  latitude: number;
  longitude: number;
  role: string;
  password: string;
  totalRevenue: number;
}
interface AuthState {
  user: User | null;
  driver: Driver | null;
  error: SerializedError | string | null;
  isLoading: boolean;
  token: string | null;
  role: string | null;
}
const initialState: AuthState = {
  user: null,
  driver: null,
  error: null,
  isLoading: false,
  role:
    typeof localStorage !== "undefined" ? localStorage.getItem("role") : null,
  token:
    typeof localStorage !== "undefined" ? localStorage.getItem("token") : null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isLoading = false;
      state.role = null;
      state.error = null;
      state.token = null;
      localStorage.clear();
    },
  },
  extraReducers(builder) {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.driver = null;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })
      .addCase(registerDriver.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerDriver.fulfilled, (state, action) => {
        state.isLoading = false;
        state.driver = action.payload;
        state.error = null;
        state.user = null;
      })
      .addCase(registerDriver.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.token = action.payload.accessToken;
        state.role = action.payload.type;
        localStorage.setItem("token", action.payload.accessToken);
        localStorage.setItem("role", action.payload.type);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })
      .addCase(userProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(userProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.driver = null;
        state.user = action.payload;
        state.error = null;
        state.role = action.payload.role;
      })
      .addCase(userProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })
      .addCase(driverProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(driverProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.driver = action.payload;
        state.user = null;
        state.error = null;
        state.role = action.payload.role;
      })
      .addCase(driverProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      });
  },
});
export const { logout } = authSlice.actions;
export default authSlice.reducer;
