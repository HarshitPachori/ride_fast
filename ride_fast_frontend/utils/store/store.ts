import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/utils/slices/authSlice";
import rideReducer from "@/utils/slices/rideSlice";
import driverReducer from "@/utils/slices/driverSlice";
import { useDispatch, useSelector } from "react-redux";
const store = configureStore({
  reducer: {
    auth: authReducer,
    ride: rideReducer,
    driver: driverReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = useDispatch.withTypes<typeof store.dispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export default store;
