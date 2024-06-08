"use client";
import { useAppSelector } from "@/utils/store/store";
import axios from "axios";
import React, { useEffect, useState } from "react";
import CustomLoader, { CircularProgressBar } from "../CustomLoader";
import { convertMillisecondsToMinutesAndHours } from "@/utils/millisecondsToMinutes";
import Link from "next/link";

const CompanyDashboard = () => {
  const [selectedBtn, setSelectedBtn] = useState("Users");
  const [userData, setUserData] = useState([]);
  const [driverData, setDriverData] = useState([]);
  const [rideData, setRideData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const token = useAppSelector((state) => state.auth.token);

  const getUserData = () => {
    setIsLoading(true);
    axios
      .get("/api/v1/company/allUsers", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUserData(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  };
  const getRidesData = () => {
    setIsLoading(true);
    axios
      .get("/api/v1/company/allRides", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setRideData(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  };
  const getDriverData = () => {
    setIsLoading(true);
    axios
      .get("/api/v1/company/allDrivers", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setDriverData(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  };
  useEffect(() => {
    if (selectedBtn === "Users") {
      getUserData();
    } else if (selectedBtn === "Drivers") {
      getDriverData();
    } else if (selectedBtn === "Rides") {
      getRidesData();
    }
  }, [selectedBtn]);
  if (isLoading) {
    return (
      <div className="h-[90vh] flex justify-center items-center">
        <CircularProgressBar />;
      </div>
    );
  }
  return (
    <div className="">
      <div className=" flex justify-center sticky top-[10vh] bg-black z-10 w-full py-2 lg:py-5">
        <button
          className="bg-green-400 hover:bg-green-500 shadow-md ease-in-out py-2 px-5 m-2 rounded-md font-semibold"
          onClick={() => setSelectedBtn("Users")}
        >
          All users
        </button>
        <button
          className="bg-green-400 hover:bg-green-500 shadow-md ease-in-out py-2 px-5 m-2 rounded-md font-semibold"
          onClick={() => setSelectedBtn("Drivers")}
        >
          All drivers
        </button>
        <button
          className="bg-green-400 hover:bg-green-500 shadow-md ease-in-out py-2 px-5 m-2 rounded-md font-semibold"
          onClick={() => setSelectedBtn("Rides")}
        >
          All rides
        </button>
      </div>

      <div className="p-5 mb-5 ">
        {selectedBtn === "Users" ? (
          <div>
            {userData.length === 0 ? (
              <h1>No User there</h1>
            ) : (
              <div className="shadow-lg px-10 py-5 my-5 border-2 border-slate-400 rounded-md flex items-center justify-between font-semibold bg-slate-100">
                <h1>User Id</h1>
                <h1>Full Name</h1>
                <h1>Email</h1>
                <h1>Mobile</h1>
              </div>
            )}
            {userData.length !== 0 &&
              userData.map((user: any) => (
                <div
                  className="shadow-lg px-10 py-5 my-5 border border-slate-300 rounded-md flex items-center justify-between bg-slate-100"
                  key={user.id}
                >
                  <h1>{user.id}</h1>
                  <h1 className="">{user.fullName}</h1>
                  <h1 className="">{user.email}</h1>
                  <h1 className="">{user.mobile}</h1>
                </div>
              ))}
          </div>
        ) : selectedBtn === "Drivers" ? (
          <div>
            {driverData.length === 0 ? (
              <h1>No Driver there</h1>
            ) : (
              driverData.map((driver: any) => (
                <div
                  className="shadow-lg px-10 py-5 my-5 border border-slate-300 rounded-md flex flex-col lg:flex-row gap-8 justify-center items-center lg:justify-between bg-slate-100"
                  key={driver.id}
                >
                  <div className="">
                    <h1 className="font-semibold">
                      Driver Id :{" "}
                      <span className="font-normal">{driver.id}</span>
                    </h1>
                    <h1 className="font-semibold">
                      Name : <span className="font-normal">{driver.name}</span>
                    </h1>
                    <h1 className="font-semibold">
                      Email :{" "}
                      <span className="font-normal">{driver.email}</span>
                    </h1>
                    <h1 className="font-semibold">
                      Mobile :{" "}
                      <span className="font-normal">{driver.mobile}</span>
                    </h1>
                    <h1 className="font-semibold">
                      Earning :{" "}
                      <span className="font-normal">
                        &#8377; {driver.totalRevenue}
                      </span>
                    </h1>
                  </div>
                  <div className="">
                    <h1 className="font-semibold">
                      License No :{" "}
                      <span className="font-normal">
                        {driver.license.licenseNumber}
                      </span>
                    </h1>
                    <h1 className="font-semibold">
                      State :{" "}
                      <span className="font-normal">
                        {driver.license.licenseState}
                      </span>
                    </h1>
                    <h1 className="font-semibold">
                      Expiration Date :{" "}
                      <span className="font-normal">
                        {driver.license.licenseExpirationDate}
                      </span>
                    </h1>
                  </div>
                  <div className="">
                    <h1 className="font-semibold">
                      Vehicle No :{" "}
                      <span className="font-normal">
                        {driver.vehicle.licensePlate}
                      </span>
                    </h1>
                    <h1 className="font-semibold">
                      Company :{" "}
                      <span className="font-normal">
                        {driver.vehicle.company}
                      </span>
                    </h1>
                    <h1 className="font-semibold">
                      Model :{" "}
                      <span className="font-normal">
                        {driver.vehicle.model}
                      </span>
                    </h1>
                    <h1 className="font-semibold">
                      Year :{" "}
                      <span className="font-normal">{driver.vehicle.year}</span>
                    </h1>
                    <h1 className="font-semibold">
                      Color :{" "}
                      <span className="font-normal">
                        {driver.vehicle.color}
                      </span>
                    </h1>
                    <h1 className="font-semibold">
                      Capacity :{" "}
                      <span className="font-normal">
                        {driver.vehicle.capacity}
                      </span>
                    </h1>
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          <div>
            {rideData.length === 0 ? (
              <h1>No Rides are there</h1>
            ) : (
              rideData.map((ride: any) => (
                <div
                  className="shadow-lg px-10 py-5 my-5 border border-slate-300 rounded-md flex flex-col lg:flex-row gap-8 justify-center items-center lg:justify-between bg-slate-100"
                  key={ride.id}
                >
                  <div className="">
                    <h1 className="font-semibold">
                      Ride Id : <span className="font-normal">{ride.id}</span>
                    </h1>
                    <h1 className="font-semibold">
                      User :{" "}
                      <span className="font-normal">{ride.user.email}</span>
                    </h1>
                    <h1 className="font-semibold">
                      Driver :{" "}
                      <span className="font-normal">{ride.driver.email}</span>
                    </h1>
                  </div>
                  <div className="">
                    <h1 className="font-semibold">
                      Pickup Area :{" "}
                      <span className="font-normal">{ride.pickupArea}</span>
                    </h1>
                    <h1 className="font-semibold">
                      Destination Area :{" "}
                      <span className="font-normal">
                        {ride.destinationArea}
                      </span>
                    </h1>
                    <h1 className="font-semibold">
                      Distance Covered :{" "}
                      <span className="font-normal">{ride.distance} km</span>
                    </h1>
                    <h1 className="font-semibold">
                      Duration :{" "}
                      <span className="font-normal">
                        {convertMillisecondsToMinutesAndHours(ride.duration)}
                      </span>
                    </h1>
                    <h1 className="font-semibold">
                      Fare :{" "}
                      <span className="font-normal">&#8377; {ride.fare}</span>
                    </h1>
                  </div>
                  <div className="">
                    <h1 className="font-semibold">
                      Payment Status :{" "}
                      <span className="font-normal">
                        {ride.paymentDetails?.paymentStatus}
                      </span>
                    </h1>
                    <h1 className="font-semibold">
                      Payment Id :{" "}
                      <span className="font-normal">
                        {ride.paymentDetails?.paymentId}
                      </span>
                    </h1>
                    {ride.paymentDetails?.paymentId && (
                      <Link
                        href={`https://dashboard.razorpay.com/app/payments/${ride.paymentDetails?.paymentId}?init_point=payments-table&init_page=Home.Recentactivity`}
                      >
                        <h1 className="bg-slate-500 hover:bg-slate-600 py-2 px-5 rounded-md text-white my-2 text-center shadow-lg">
                          View Payment
                        </h1>
                      </Link>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyDashboard;
