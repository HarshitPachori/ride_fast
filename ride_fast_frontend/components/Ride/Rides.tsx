"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { West, Verified } from "@mui/icons-material";
import RideCar from "./RideCar";
import { useAppDispatch, useAppSelector } from "@/utils/store/store";
import {
  getCompletedRideByUser,
  getUserRequestedRides,
} from "@/utils/reducers/userReducers";
import Image from "next/image";
import toast from "react-hot-toast";
import { userProfile } from "@/utils/reducers/authReducers";
import { CircularProgressBar } from "../CustomLoader";

function Rides() {
  // const ride = {
  //   id: 2,
  //   rideDetails: {
  //     id: 458996324444,
  //     pickupArea: "MUMBAI",
  //     destinationArea: "DELHI",
  //     otp: 5689,
  //     driver: {
  //       name: "Raju",
  //       vehicle: {
  //         model: "TOYOTA",
  //         licensePlate: "GJ01-28343",
  //       },
  //     },
  //     status: "COMPLETED",
  //   },
  // };
  const completedRide = useAppSelector((state) => state.ride.completedRides);
  const requestdRide = useAppSelector((state) => state.ride.requestedRides);
  const auth = useAppSelector((state) => state.auth);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [toggle, setToggle] = useState("REQUESTED");
  const [isLoading, setIsLoading] = useState(false);
  const goBack = () => {
    router.back();
  };

  useEffect(() => {
    const dispatchcompleteRide = async () => {
      setIsLoading(true);
      try {
        if (auth.token) {
          const response = await dispatch(userProfile(auth.token));
          if (response.payload.code === 401) {
            toast.error(response.payload.payload);
            router.replace("/login");
          }
          if (toggle === "REQUESTED" && auth.user) {
            const user = { userId: response.payload?.id, token: auth.token };
            await dispatch(getUserRequestedRides(user));
            setIsLoading(false);
          } else {
            await dispatch(getCompletedRideByUser(auth.token));
            setIsLoading(false);
          }
        }
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };
    dispatchcompleteRide();
  }, [auth.token, toggle]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <CircularProgressBar />
      </div>
    );
  }
  return (
    <div className="h-screen">
      <div className="flex items-center px-2 lg:px-5 py-2">
        <West onClick={goBack} className="cursor-pointer" />
        <p className="text-center w-full">My Rides</p>
      </div>
      <div className="px-2 lg:px-5 space-x-5 flex items-center justify-center ">
        <button
          className={`px-4 py-2 rounded-md ${
            toggle == "REQUESTED"
              ? "bg-green-300 border-2 border-slate-400"
              : "bg-red-300"
          }`}
          onClick={() => setToggle("REQUESTED")}
        >
          Requested Rides
        </button>
        <button
          className={`px-4 py-2 rounded-md ${
            toggle == "COMPLETED"
              ? "bg-green-200 border-2 border-slate-400"
              : "bg-red-300"
          }`}
          onClick={() => setToggle("COMPLETED")}
        >
          Completed Rides
        </button>
      </div>
      <div className="space-y-5 px-2 lg:px-5 h-[90vh] overflow-y-scroll">
        {toggle === "REQUESTED" ? (
          requestdRide.length === 0 ? (
            <h1 className="flex justify-between items-center shadow-md rounded-s-sm p-3 cursor-pointer">
              No Requested Rides...
            </h1>
          ) : (
            requestdRide.map((item, idx) => <RideCar ride={item} key={idx} />)
          )
        ) : completedRide.length === 0 ? (
          <h1 className="flex justify-between items-center shadow-md rounded-s-sm p-3 cursor-pointer">
            No Completed Rides...
          </h1>
        ) : (
          completedRide.map((item:any, idx) => (
            <div
              key={idx}
              className="flex justify-between items-center shadow-md rounded-s-sm p-3 cursor-pointer"
            >
              <div className="flex items-center">
                <Image
                  src="https://cdn.pixabay.com/photo/2017/04/06/22/11/car-2209439_640.png"
                  alt=""
                  className="w-20 h-20"
                  width={200}
                  height={200}
                />
                <div className="ml-5 space-y-1">
                  <p className="text-sm font-semibold">
                    {new Date(item?.startTime).toLocaleString()}
                  </p>
                  <p className="text-xs font-semibold opacity-60">
                    {item?.driver?.vehicle?.company +
                      " " +
                      item?.driver?.vehicle?.model}
                  </p>
                  <p className="opacity-60 text-xs">{item?.pickupArea}</p>
                  <p className="opacity-60 text-xs">{item?.destinationArea}</p>
                </div>
              </div>
              <div className="flex flex-col justify-between items-center">
                <p className="text-green-500 mb-5">{item?.status}</p>

                <Verified className="text-4xl text-green-800" />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Rides;
