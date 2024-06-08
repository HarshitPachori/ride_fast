"use client";
import { driverProfile } from "@/utils/reducers/authReducers";
import {
  getDriverAllocatedRides,
  getDriverCurrentRide,
} from "@/utils/reducers/driverReducers";
import { acceptRide, getRideById } from "@/utils/reducers/rideReducers";
import { useAppDispatch, useAppSelector } from "@/utils/store/store";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const AllocatedRides = () => {
  const ride = useAppSelector((state) => state.driver);
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [startedride, setStartedride] = useState([]);
  useEffect(() => {
    const dispatchallocatedRide = async () => {
      try {
        if (auth.token) {
          await dispatch(getDriverAllocatedRides(auth.token));
        }
      } catch (error) {}
    };
    dispatchallocatedRide();
  }, [ride.status]);
  const handleAcceptRide = async (rideId: number) => {
    try {
      if (ride.currentRides.length <= 0) {
        await dispatch(acceptRide(rideId));
      }
      if (auth.token) {
        await dispatch(getDriverAllocatedRides(auth.token));
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleDeclineRide = async (rideId: number) => {
    try {
      // await dispatch((rideId));
      if (auth.token) {
        await dispatch(getDriverAllocatedRides(auth.token));
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="bg-white w-full px-5 py-5 rounded-md shadow-lg my-10">
      <h1 className="mb-5 font-semibold text-xl ">Allocated Rides</h1>
      {ride.allocatedRides.length === 0 ? (
        <h1>No Allocated Rides</h1>
      ) : (
        ride.allocatedRides.map((item:any, idx) => (
          <div
            className="flex flex-col lg:flex-row justify-between  my-5 p-2 rounded-md shadow-lg border"
            key={idx + item.id}
          >
            <div className="flex flex-col lg:flex-row items-center justify-between lg:gap-8 ">
              <p>{item.id}</p>
              <Image
                src="https://cdn.pixabay.com/photo/2017/06/15/04/13/car-2404064_1280.png"
                alt=""
                className="w-28 h-20 "
                width={200}
                height={200}
              />
              <div className="">
                {/* <h1 className="font-semibold text-slate-700">Today 10:08pm</h1> */}
                <p className="font-semibold text-slate-600 text-center">
                  {item?.driver?.vehicle?.company +
                    " " +
                    item?.driver?.vehicle?.model}
                </p>
                <p className="text-center text-sm">
                  Booked By : {item?.user.fullName}
                </p>
              </div>
              <div className="items-center my-2">
                <p className="text-xs  sm:text-sm text-slate-600">
                  {item?.pickupArea}
                </p>
                <p className="text-sm  sm:text-base text-center">to</p>
                <p className="text-xs sm:text-sm text-slate-600">
                  {item?.destinationArea}
                </p>
              </div>
            </div>
            <div className="flex flex-col ">
              <button
                className="bg-green-600 text-white hover:bg-green-700 font-semibold rounded-md m-2  py-2  px-5 lg:px-10"
                // onClick={() => toast.success("dispatch accept ride action here")}
                onClick={() => handleAcceptRide(item.id)}
              >
                Accept
              </button>
              <button
                className="bg-red-600 text-white hover:bg-red-700 font-semibold rounded-md m-2  py-2  px-5 lg:px-10"
                // onClick={() => toast.success("dispatch decline ride action here")}
                onClick={() => handleDeclineRide(item.id)}
              >
                Decline
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default AllocatedRides;
