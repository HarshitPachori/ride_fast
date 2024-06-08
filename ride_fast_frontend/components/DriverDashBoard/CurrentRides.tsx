"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "@/utils/store/store";
import { getDriverCurrentRide } from "@/utils/reducers/driverReducers";
import { driverProfile } from "@/utils/reducers/authReducers";
import { useRouter } from "next/navigation";
import { startRide } from "@/utils/reducers/rideReducers";

const CurrentRides = () => {
  const driver = useAppSelector((state) => state.driver);
  const auth = useAppSelector((state) => state.auth);
  const ride = useAppSelector((state) => state.ride);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOtp("");
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleOtpSubmit = async () => {
    // ride start dispatch
    if (auth.token) {
      const response = await dispatch(driverProfile(auth.token));
      if (response.payload.code === 401) {
        toast.error(response.payload.payload);
        router.replace("/login");
      }
      dispatchGetdriverCurrentRide();
      // Only start ride if there are current rides available
      if (driver.currentRides.length > 0) {
        const data = {
          otp: parseInt(otp),
          rideId: ride.rideId,
        };
        const response = await dispatch(startRide(data));
        if (response.payload.error) {
          toast.error(response.payload.message);
        } else {
          toast.success(response.payload.message || "Ride started succesfully");
        }
      }
      handleClose();
    }
  };

  const dispatchGetdriverCurrentRide = async () => {
    try {
      if (auth.token) {
        const response = await dispatch(driverProfile(auth.token));
        if (response.payload.code === 401) {
          toast.error(response.payload.payload);
          router.replace("/login");
        }
        const currentRideData = {
          driverId: response.payload.id,
          token: auth.token,
        };
        await dispatch(getDriverCurrentRide(currentRideData));
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    dispatchGetdriverCurrentRide();
  }, []);
  useEffect(() => {
    dispatchGetdriverCurrentRide();
  }, [auth.token, ride.status]);

  return (
    <>
      <div className="bg-white w-full px-5 py-5 rounded-md shadow-lg my-10">
        <h1 className="mb-5 font-semibold text-xl ">Current Ride</h1>
        {driver.currentRides.length === 0 ? (
          <h1>No Current Rides</h1>
        ) : (
          driver.currentRides.map((item:any) => (
            <div
              className="flex flex-col lg:flex-row justify-between"
              key={item?.id}
            >
              <div className="flex items-center justify-between lg:gap-8">
                <h1>{item.id}</h1>
                <Image
                  src="https://cdn.pixabay.com/photo/2017/06/15/04/13/car-2404064_1280.png"
                  alt=""
                  className="w-28 h-20 "
                  width={200}
                  height={200}
                />
                <div className="">
                  <p className="text-sm text-slate-600">
                    {item?.driver?.vehicle?.company +
                      " " +
                      item?.driver?.vehicle?.model}
                  </p>
                  <p className="text-sm text-slate-600">{ride?.pickupArea}</p>
                </div>
              </div>
              <button
                className="bg-green-600 text-white hover:bg-green-700 font-semibold rounded-md m-2 lg:m-5 py-2  px-5 lg:px-12"
                onClick={handleOpen}
              >
                Start
              </button>
              <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Enter OTP here</DialogTitle>
                <DialogContent>
                  <TextField
                    autoFocus
                    label="OTP"
                    type="number"
                    name="otp"
                    margin="dense"
                    variant="outlined"
                    fullWidth
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </DialogContent>
                <DialogActions>
                  <button
                    className="bg-red-600 text-white hover:bg-red-700 font-semibold rounded-md m-2 py-2 px-5  lg:px-10"
                    onClick={handleClose}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-green-600 text-white hover:bg-green-700 font-semibold rounded-md m-2 py-2 px-5  lg:px-10"
                    onClick={handleOtpSubmit}
                  >
                    Submit
                  </button>
                </DialogActions>
              </Dialog>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default CurrentRides;
