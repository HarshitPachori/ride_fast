"use client";

import GuardComponent from "@/components/GuardComponent";
import Layout from "@/components/Layout/Layout";
import RideDetail from "@/components/RideDetail/RideDetail";
import React, { ReactPropTypes } from "react";

function page(props: React.FC<ReactPropTypes>) {
  const ride = {
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
  return (
    <GuardComponent>
      <Layout children={<RideDetail ride={ride} />} />
    </GuardComponent>
  );
}

export default page;
