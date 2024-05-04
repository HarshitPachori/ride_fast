"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  AccountCircle,
  Dashboard,
  CheckCircle,
  Cancel,
  Logout,
  Menu,
  Close,
} from "@mui/icons-material";
import toast from "react-hot-toast";
import { logout } from "@/utils/slices/authSlice";
import { useDispatch } from "react-redux";
import { useAppDispatch, useAppSelector } from "@/utils/store/store";
import { driverProfile } from "@/utils/reducers/authReducers";
import { useRouter } from "next/navigation";

const DriverDashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const dispatch = useDispatch();
  const appDispatch = useAppDispatch();
  const router = useRouter();
  const auth = useAppSelector((store) => store.auth);
  useEffect(() => {
    const dispatchdriverProfile = async () => {
      if (auth.token) {
        const response = await appDispatch(driverProfile(auth.token));
        if (response.payload.code === 401) {
          toast.error(response.payload.payload);
          router.replace("/login");
        }
      }
    };
    dispatchdriverProfile();
  }, []);

  return (
    <>
      <nav className="w-full bg-black h-[10vh] flex  items-center justify-between px-6 lg:px-20 text-slate-200 sticky">
        <Link href="/driver/dashboard">
          <h1 className=" font-bold ">RIDE FAST</h1>
        </Link>
        <div
          className="flex items-center gap-2 cursor-pointer  py-2 px-2"
          onClick={() =>
            toast.success("iske click pe profile modal khulega :)")
          }
        >
          <h1>{auth?.driver?.name}</h1>
          <AccountCircle />
        </div>
      </nav>
      <div className="flex flex-row h-[90vh] sticky">
        <div
          className={`absolute lg:relative bg-white min-w-[300px] h-full  shadow-lg z-10    flex flex-col justify-between ${
            !sidebarOpen ? "hidden lg:flex" : "flex"
          }`}
        >
          <div className="">
            <Link href={"/driver/dashboard"}>
              <div className="flex items-center gap-2 px-5 py-5 cursor-pointer border-b border-slate-300">
                <Dashboard className="text-blue-600" />
                <h1 className="">DashBoard</h1>
              </div>
            </Link>

            <Link href={"/driver/dashboard/completedRides"}>
              <div className="flex items-center gap-2 px-5 py-5 cursor-pointer border-b border-slate-300">
                <CheckCircle className="text-green-600" />
                <h1 className="">Completed Rides</h1>
              </div>
            </Link>

            {/* <Link href={"/driver/dashboard/cancelledRides"}>
              <div className="flex items-center gap-2 px-5 py-5 cursor-pointer border-b border-slate-300">
                <Cancel className="text-red-600" />
                <h1 className="">Cancelled Rides</h1>
              </div>
            </Link> */}
          </div>
          <div
            className="flex items-center gap-2 px-5 py-5  cursor-pointer border-t border-slate-300"
            onClick={() => dispatch(logout())}
          >
            <Logout />
            <h1>Logout</h1>
          </div>
        </div>
        <div className="relative lg:hidden cursor-pointer">
          <div
            className={`bg-white absolute top-0 z-10  py-1 px-1 text-xl shadow-lg ${
              sidebarOpen
                ? "rounded-r-lg left-[300px] lg:left-0"
                : "rounded-lg lg:left-0 m-1"
            }`}
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {!sidebarOpen ? <Menu /> : <Close />}
          </div>
        </div>
        <div className="bg-blue-200 w-full h-full overflow-y-scroll">
          {children}
        </div>
      </div>
    </>
  );
};

export default DriverDashboardLayout;
