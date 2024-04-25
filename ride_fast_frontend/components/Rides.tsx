"use client";
import React from "react";
import { useRouter } from "next/navigation";

import { West } from "@mui/icons-material";
import RideCar from "./RideCar";

function Rides() {
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
  const router = useRouter();
  const goBack = () => {
    router.back();
  };
  return (
    <div className="h-screen">
      <div className="flex items-center px-2 lg:px-5 py-2">
        <West onClick={goBack} className="cursor-pointer" />
        <p className="text-center w-full">My Rides</p>
      </div>
      <div className="space-y-5 px-2 lg:px-5 h-[90vh] overflow-y-scroll">
        {[1, 1, 1, 1, 1, 1].map((item, idx) => (
          <RideCar key={idx} ride={ride} />
        ))}
      </div>
    </div>
  );
}

export default Rides;
