"use client";
import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import { useRouter } from "next/navigation";

function NavBar() {
  const [menuActive, setMenuActive] = useState(false);
  const router = useRouter();
  return (
    <div className="bg-black py-4  sticky top-0 z-10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="flex items-center mx-5">
              <Link href="/">
                <h1 className="text-slate-200                 font-bold ">
                  RIDE FAST
                </h1>
              </Link>
            </div>
            <div>
              <ul
                className="hidden md:flex md:items-center
               "
              >
                <li className="mr-6 text-slate-200">
                  <Link href="/" className="hover:text-white">
                    RideFast Electric
                  </Link>
                </li>
                <li className="mr-6">
                  <Link href="/" className="hover:text-white">
                    RideFast Factory
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex ">
            <button
              className="hidden sm:block bg-gray-700 text-white hover:bg-gray-900 text-sm font-semibold px-4 py-3 rounded-md"
              onClick={() => router.push("/bookRide")}
            >
              Book a RideFast Cab
            </button>
            <button className="hidden sm:block  bg-white hover:bg-gray-300 text-sm font-semibold px-4 py-3 ml-5 rounded-md ">
              Free S1 Test Ride
            </button>
            <MenuIcon
              className="sm:hidden text-white ml-5 text-3xl cursor-pointer"
              onClick={() => setMenuActive(!menuActive)}
            />
          </div>
        </div>
        {menuActive && (
          <div className="sm:hidden bg-black flex flex-col justify-center items-center absolute w-full z-10 space-y-5 py-10 transition-all ease-in-out duration-600 shadow-lg">
            <div>
              <ul
                className=" text-slate-200 
               "
              >
                <li className="mt-2">
                  <Link href="/" className="hover:text-white">
                    RideFast Electric
                  </Link>
                </li>
                <li className="mt-4">
                  <Link href="/" className="hover:text-white">
                    RideFast Factory
                  </Link>
                </li>
              </ul>
            </div>
            <div className="flex ">
              <button
                className="  bg-gray-700 text-white hover:bg-gray-900 text-sm font-semibold px-4 py-3 rounded-md"
                onClick={() => router.push("/bookRide")}
              >
                Book a RideFast Cab
              </button>
              <button className="  bg-white hover:bg-gray-300 text-sm font-semibold px-4 py-3 ml-5 rounded-md ">
                Free S1 Test Ride
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default NavBar;
