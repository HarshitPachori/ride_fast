"use client";
import { getDriverStartedRide } from "@/utils/reducers/driverReducers";
import { completeRide } from "@/utils/reducers/rideReducers";
import { useAppDispatch, useAppSelector } from "@/utils/store/store";
import Image from "next/image";
import React, { useEffect } from "react";

const StartedRide = () => {
  const driver = useAppSelector((state) => state.driver);
  const auth = useAppSelector((state) => state.auth);
  const ride = useAppSelector((state) => state.ride);
  const dispatch = useAppDispatch();
  const dispatchStartedRide = async () => {
    if (auth.token) {
      await dispatch(getDriverStartedRide());
    }
  };
  useEffect(() => {
    dispatchStartedRide();
  }, []);
  useEffect(() => {
    dispatchStartedRide();
  }, [ride.status, auth.token]);
  const handleCompleteRide = async (rideId: number) => {
    const response = await dispatch(completeRide(rideId));
    await dispatch(getDriverStartedRide());
  };
  return (
    <div className="bg-white w-full px-5 py-5 rounded-md shadow-lg my-10">
      <h1 className="mb-5 font-semibold text-xl ">Started Ride</h1>

      {driver.startedRides.length === 0 ? (
        <h1>No Started Rides</h1>
      ) : (
        driver.startedRides.map((item:any) => (
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
                <p className="text-sm text-slate-600">{item?.pickupArea}</p>
              </div>
            </div>
            <button
              className="bg-green-600 text-white hover:bg-green-700 font-semibold rounded-md m-2 lg:m-5 py-2  px-5 lg:px-12"
              onClick={() => handleCompleteRide(item?.id)}
            >
              Complete
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default StartedRide;
