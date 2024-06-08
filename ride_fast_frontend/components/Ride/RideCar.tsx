"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { Verified } from "@mui/icons-material";
import { Avatar } from "@mui/material";

function RideCar({ ride }: { ride: any }) {
  const router = useRouter();
  return (
    <div
      className="flex justify-between items-center shadow-md rounded-s-sm p-3 cursor-pointer"
      onClick={() => router.push(`/rideDetail/${ride?.id}`)}
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
          <p className="text-sm font-semibold">{ride?.startTime}</p>
          <p className="text-xs font-semibold opacity-60">
            {ride?.driver?.vehicle?.company +
              " " +
              ride?.driver?.vehicle?.model}
          </p>
          <p className="opacity-60 text-xs">from : {ride?.pickupArea}</p>
          <p className="opacity-60 text-xs">to : {ride?.destinationArea}</p>
        </div>
      </div>
      {ride?.status === "COMPLETED" ? (
        <div>
          <Verified className="text-4xl text-green-800" />
        </div>
      ) : (
        <div className="flex flex-col justify-between items-center">
          <p className="text-green-500 mb-5">{ride?.status}</p>
          <div className="flex items-center gap-5">
            <p className="text-sm text-slate-500">id : {ride?.id}</p>
            <Avatar src="https://cdn.pixabay.com/photo/2017/03/27/13/28/man-2178721_640.jpg" />
          </div>
        </div>
      )}
    </div>
  );
}

export default RideCar;
