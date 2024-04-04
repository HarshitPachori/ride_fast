import { createSlice } from "@reduxjs/toolkit";
interface Driver {}
const initialState: Driver = {};
const driverSlice = createSlice({
  name: "driver",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {},
});
