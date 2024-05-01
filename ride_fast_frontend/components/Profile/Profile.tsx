"use client";
import React, { useEffect, useState } from "react";
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
import toast from "react-hot-toast";
import { getCurrentRideOfUser } from "@/utils/reducers/userReducers";
import CustomLoader, { CircularProgressBar } from "../CustomLoader";

function Profile() {
  const router = useRouter();
  const goBack = () => {
    router.back();
  };

  const appDispatch = useAppDispatch();
  const dispatch = useDispatch();
  const auth = useAppSelector((state) => state.auth);
  const ride = useAppSelector((state) => state.ride.currentRides);
  const isLoading = auth.isLoading;

  useEffect(() => {
    const dispatchUserProfile = async () => {
      if (!auth.token) return;
      try {
        const response = await appDispatch(userProfile(auth.token));
        if (response.payload.code === 401) {
          toast.error(response.payload.payload);
          router.replace("/login");
        } else {
          const currentRideData = {
            userId: response.payload.id,
            token: auth.token,
          };
          await appDispatch(getCurrentRideOfUser(currentRideData));
        }
      } catch (error) {
        console.error(error);
      }
    };

    dispatchUserProfile();
  }, [auth.token]);
  if (isLoading) {
    return <CustomLoader />;
  }
  return (
    <div className="px-2 lg:px-5">
      <div className="px-2 lg:px-5 py-2">
        <West onClick={goBack} className="cursor-pointer" />
      </div>
      <div className="flex flex-col items-center space-y-2">
        <Avatar sx={{ bgcolor: "red" }}>{auth?.user?.fullName[0]}</Avatar>
        <p className="">{auth?.user?.fullName}</p>
        <p className="">{auth?.user?.mobile}</p>
      </div>
      <div className="rounded-sm border mt-5">
        {ride.map((item) => (
          <RideCar ride={item} key={item?.id} />
        ))}
        <div className="flex flex-col items-center">
          <Button variant="text" onClick={() => router.push("/myRides")}>
            See All Rides
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
