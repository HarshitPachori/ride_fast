"use client";
import { convertMillisecondsToMinutesAndHours } from "@/utils/millisecondsToMinutes";
import { useAppDispatch, useAppSelector } from "@/utils/store/store";
import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import AllocatedRideCard from "../DriverDashBoard/AllocatedRideCard";
import { getRideById } from "@/utils/reducers/rideReducers";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const PaymentPage = ({ rideId }: { rideId: number }) => {
  const ride = useAppSelector((state) => state.driver);
  const token = useAppSelector((state) => state.auth.token);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [myRide, setMyRide] = useState<any>({});
  useEffect(() => {
    const dispatchgetride = async () => {
      if (token) {
        try {
          const response = await dispatch(getRideById({ rideId, token }));
          setMyRide(response.payload);
        } catch (error) {
          console.error(error);
        }
      }
    };
    dispatchgetride();
  }, []);
  const handlePaymentLink = async () => {
    try {
      const response = await axios.post(
        `/api/payments/${myRide.id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.paymentLinkUrl) {
        window.location.href = response.data.paymentLinkUrl;
      }
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          toast.error(error.response.data.payload);
          router.replace("/login");
        }
      }
    }
  };
  return (
    <div className="px-20 flex flex-col justify-center h-[99vh] border ">
      <div className="shadow-2xl py-2 px-3 border-2 border-gray-300 rounded-md mb-3">
        <AllocatedRideCard type={"Completed"} ride={myRide} />
      </div>
      <div className="border border-slate-600 rounded-md p-5 bg-slate-900 text-white">
        <p className="text-center text-xl font-semibold py-2">
          Payment Details
        </p>

        <div className="flex justify-between py-2 items-center">
          <p className="font-semibold opacity-60">Total Fare</p>
          <p className="text-blue-700 font-semibold">₹{myRide?.fare}</p>
        </div>
        <div className="flex justify-between py-2 items-center">
          <p className="font-semibold opacity-60">Distance</p>
          <p className="text-blue-700 font-semibold">{myRide.distance} km</p>
        </div>
        <div className="flex justify-between py-2 items-center">
          <p className="font-semibold opacity-60">Duration</p>
          <p className="text-blue-700 font-semibold">
            {convertMillisecondsToMinutesAndHours(myRide.duration)}
          </p>
        </div>
        <div className="flex justify-between py-2 items-center">
          <p className="font-semibold opacity-60">Ride Id</p>
          <p className="text-blue-700 font-semibold">{myRide.id}</p>
        </div>

        <div className="mt-5">
          <button
            onClick={handlePaymentLink}
            className="w-full bg-red-600 py-2 rounded-md"
          >
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
