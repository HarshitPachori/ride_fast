"use client";
import React, { useEffect } from "react";
import { CheckCircle } from "@mui/icons-material";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { useAppSelector } from "@/utils/store/store";
import toast from "react-hot-toast";

const Success = ({ rideId }: { rideId: number }) => {
  const router = useRouter();
  const token = useAppSelector((state) => state.auth.token);
  const searchparam = useSearchParams();
  const payment_id = searchparam.get("razorpay_payment_id");
  useEffect(() => {
    const storepayment = async () => {
      try {
        const response = await axios.get("/api/payments", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            payment_id: payment_id,
            order_id: rideId,
          },
        });
        toast.success(response.data.message);
      } catch (error) {}
    };
    storepayment();
  }, [payment_id, rideId]);
  return (
    <div className=" px-5 sm:px-20 flex flex-col justify-center h-screen lg:h-full items-center border ">
      <div className="border border-slate-600 rounded-md relative w-full">
        <CheckCircle className="absolute right-[45%] -top-9 text-green-900 text-6xl text-center z-10 bg-white text-[3rem]" />
        <div className="my-5">
          <p className="text-center text-xl font-semibold py-2 text-green-800 ">
            Thank You For Choosing Us
          </p>
          <p className="text-center text-xl font-semibold py-2 text-green-800 ">
            PAYMENT SUCCESS
          </p>
        </div>

        <div className="h-[50vh] overflow-hidden">
          <img
            className="w-full h-full object-cover "
            src="https://cdn.pixabay.com/photo/2017/04/06/22/11/car-2209439_640.png"
            alt=""
          />
        </div>

        <div>
          <button
            onClick={() => router.push("/profile")}
            className="w-full bg-red-500 py-2 rounded-md hover:bg-red-600 "
          >
            Go To Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Success;
