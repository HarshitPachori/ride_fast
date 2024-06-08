import Image from "next/image";
import React from "react";

const AllocatedRideCard = ({ ride, type }: { type: string; ride:any }) => {
  return (
    <div className=" px-5 py-5 ">
      <h1 className="mb-5 font-semibold text-xl text-center">Ride Details</h1>
      <div className="flex justify-center items-center  p-2 ">
        <div className="flex flex-col lg:flex-row items-center justify-between lg:gap-8 ">
          <Image
            src="https://cdn.pixabay.com/photo/2017/06/15/04/13/car-2404064_1280.png"
            alt=""
            className="w-28 h-20 "
            width={200}
            height={200}
          />
          <div className="items-center my-2">
            <p className="font-semibold text-slate-600 text-center">
              {ride?.driver?.vehicle?.company +
                " " +
                ride?.driver?.vehicle?.model}
            </p>
            <p className="text-center text-sm">
              Booked on : {new Date(ride.startTime).toLocaleDateString()}
            </p>
            <p className="text-center text-sm">
              Booked By : {ride?.user?.fullName}
            </p>
            <p className="text-xs  sm:text-sm text-slate-600 mt-2">
              {ride?.pickupArea}
            </p>
            <p className="text-sm  sm:text-base text-center">to</p>
            <p className="text-xs sm:text-sm text-slate-600">
              {ride?.destinationArea}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllocatedRideCard;
