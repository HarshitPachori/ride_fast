"use client";
import { driverProfile } from "@/utils/reducers/authReducers";
import {
  getDriverCompletedRides,
  getDriverCurrentRide,
} from "@/utils/reducers/driverReducers";
import { useAppDispatch, useAppSelector } from "@/utils/store/store";
import Image from "next/image";
import React, { useEffect } from "react";

const DriverMyRides = () => {
  const { auth, driver, ride } = useAppSelector((state) => state);

  useEffect(() => {}, [ride.status]);

  return (
    <div className="bg-white w-full px-5 py-5 rounded-md shadow-lg my-10">
      <h1 className="mb-5 font-semibold text-xl ">My Ride Details</h1>
      <div className="flex flex-col lg:flex-row justify-between">
        <div className="flex items-center justify-between gap-5 mb-10 md:0 px-10">
          <Image
            src="https://cdn.pixabay.com/photo/2017/06/15/04/13/car-2404064_1280.png"
            alt=""
            className="w-28 h-20 "
            width={200}
            height={200}
          />
          <div className="text-center text-yellow-600">
            <h1 className="font-medium">Current rides</h1>
            <h1 className="">{driver.currentRides.length}</h1>
          </div>
        </div>
        {/* <div className="flex items-center justify-between gap-5 mb-10 md:0 px-10">
          <Image
            src="https://cdn.pixabay.com/photo/2017/06/15/04/13/car-2404064_1280.png"
            alt=""
            className="w-28 h-20 "
            width={200}
            height={200}
          />
          <div className="text-center text-red-600">
            <h1 className="font-medium">Cancelled rides</h1>
            <h1 className="">0</h1>
          </div>
        </div> */}
        <div className="flex items-center justify-between gap-5 mb-10 md:0 px-10">
          <Image
            src="https://cdn.pixabay.com/photo/2017/06/15/04/13/car-2404064_1280.png"
            alt=""
            className="w-28 h-20 "
            width={200}
            height={200}
          />
          <div className="text-center text-green-600">
            <h1 className="font-medium">Completed rides </h1>
            <h1 className="">{driver.completedRides.length}</h1>
          </div>
        </div>
        <div className="flex items-center justify-between gap-5 mb-10 md:0 px-10">
          <Image
            src="https://cdn.pixabay.com/photo/2013/07/12/14/07/bag-147782_1280.png"
            alt=""
            className="w-20 h-20 "
            width={200}
            height={200}
          />
          <div className="text-center ">
            <h1 className="font-medium">Revenue </h1>
            <h1 className="text-slate-500">
              &#8377; {auth.driver?.totalRevenue}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverMyRides;
