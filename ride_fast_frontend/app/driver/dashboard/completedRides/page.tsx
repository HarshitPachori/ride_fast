"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { Verified } from "@mui/icons-material";
import DriverDashboardLayout from "@/components/Layout/DriverDashboardLayout";
import { useAppDispatch, useAppSelector } from "@/utils/store/store";
import { getDriverCompletedRides } from "@/utils/reducers/driverReducers";
import CustomLoader from "@/components/CustomLoader";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { convertMillisecondsToMinutesAndHours } from "@/utils/millisecondsToMinutes";
import { RideState } from "@/utils/slices/rideSlice";
const pages = () => {
  const ride = useAppSelector((state) => state.driver);
  const auth = useAppSelector((state) => state.auth);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isLoading = ride.isLoading;
  useEffect(() => {
    const dispatchCompletedRides = async () => {
      if (auth.token) {
        try {
          const response = await dispatch(getDriverCompletedRides(auth.token));
          if (response.payload.code === 401) {
            toast.error(response.payload.payload);
            router.replace("/login");
          }
        } catch (error) {
          console.error(error);
        }
      }
    };
    dispatchCompletedRides();
  }, [ride.status]);
  if (isLoading) {
    return <CustomLoader />;
  }
  return (
    <DriverDashboardLayout>
      <div className="px-10">
        <div className="bg-white w-full px-5 py-5 rounded-md shadow-lg my-10">
          <h1 className="mb-5 font-semibold text-xl ">Completed Rides</h1>
          {ride.completedRides.length === 0 ? (
            <h1>No Completed rides</h1>
          ) : (
            ride.completedRides.map((item: RideState) => (
              <div
                className="relative flex flex-col lg:flex-row justify-between  my-5 p-2 rounded-md shadow-lg border"
                key={item?.rideId}
              >
                <div className="flex flex-col lg:flex-row items-center justify-between lg:gap-8 ">
                  <p>{item?.rideId}</p>
                  <Image
                    src="https://cdn.pixabay.com/photo/2017/06/15/04/13/car-2404064_1280.png"
                    alt=""
                    className="w-28 h-20 "
                    width={200}
                    height={200}
                  />
                  <div className="flex flex-col lg:flex-row gap-5 lg:gap-8 items-center">
                    <h1 className="font-semibold text-slate-700">
                      On : {new Date(item?.startTime).toLocaleDateString()}
                      <br />
                      {new Date(item?.startTime).toLocaleTimeString()} to{" "}
                      {new Date(item?.endTime).toLocaleTimeString()}
                    </h1>
                    <p className="font-semibold text-slate-600 text-center">
                      {item?.driver?.vehicle?.company +
                        " " +
                        item?.driver?.vehicle?.model}
                    </p>
                    <div>
                      <p className="text-center text-sm m-2">
                        Booked By : {item?.user?.fullName}
                      </p>
                      <div className="items-center text-center my-2">
                        <p className="text-xs  sm:text-sm text-slate-600">
                          {item?.pickupArea}
                        </p>
                        <p className="text-sm  sm:text-base text-center">to</p>
                        <p className="text-xs sm:text-sm text-slate-600">
                          {item?.destinationArea}
                        </p>
                      </div>
                    </div>
                    <p>
                      {convertMillisecondsToMinutesAndHours(item?.duration)}
                    </p>
                    <p>{item?.distance} km</p>
                    <p>&#8377; {item.fare}</p>
                  </div>
                </div>
                <div className="">
                  <Verified className="text-green-700 absolute top-5 right-5" />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </DriverDashboardLayout>
  );
};

export default pages;
