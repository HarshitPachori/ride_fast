"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

import { Avatar, Button } from "@mui/material";
import {
  West,
  AccountBalanceWallet,
  ContactPhone,
  Wifi,
} from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "@/utils/store/store";
import { userProfile } from "@/utils/reducers/authReducers";
import { useDispatch } from "react-redux";
import { logout } from "@/utils/slices/authSlice";
import RideCar from "../RideCar";

function Profile() {
  const router = useRouter();
  const goBack = () => {
    router.back();
  };
  const ride = {
    id: 2,
    rideDetails: {
      id: 458996324444,
      pickupArea: "MUMBAI",
      destinationArea: "DELHI",
      otp: 5689,
      driver: {
        name: "Raju",
        vehicle: {
          model: "TOYOTA",
          licensePlate: "GJ01-28343",
        },
      },
      status: "COMPLETED",
    },
  };
  const appDispatch = useAppDispatch();
  const dispatch = useDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const jwt =
    typeof localStorage !== undefined ? localStorage.getItem("token") : null;

  useEffect(() => {
    if (!jwt) return;
    appDispatch(userProfile(jwt));
  }, [jwt]);

  return (
    <div className="px-2 lg:px-5">
      <div className="px-2 lg:px-5 py-2">
        <West onClick={goBack} className="cursor-pointer" />
      </div>
      <div className="flex flex-col items-center space-y-2">
        <Avatar sx={{ bgcolor: "red" }}>{user?.fullName[0]}</Avatar>
        <p className="">{user?.fullName}</p>
        <p className="">{user?.mobile}</p>
      </div>
      <div className="rounded-sm border mt-5">
        <RideCar ride={ride} />
        <div className="flex flex-col items-center">
          <Button variant="text" onClick={() => router.push("/myRides")}>
            Sell All Rides
          </Button>
        </div>
      </div>
      <div className="border mt-5">
        <div className="flex items-center p-3 border-b">
          <AccountBalanceWallet className="text-green-600" />
          <p className="ml-4">RideFast Money</p>
        </div>
        <div className="flex items-center p-3 border-b">
          <ContactPhone className="text-green-600" />
          <p className="ml-4">Emergency Contact</p>
        </div>
        <div className="flex items-center p-3 border-b">
          <Wifi className="text-green-600" />
          <p className="ml-4">RideFast Wifi Credentials</p>
        </div>
      </div>
      <div>
        <Button
          className="w-full bg-red-500  text-white"
          variant="contained"
          color="error"
          onClick={() => dispatch(logout())}
        >
          Logout
        </Button>
      </div>
    </div>
  );
}

export default Profile;
