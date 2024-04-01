import React from "react";
import styles from "./Banner.module.css";
import CircleIcon from "@mui/icons-material/Circle";
import ArrowRightIcon from "@mui/icons-material/ArrowRightAlt";
import Image from "next/image";

function Banner() {
  return (
    <div className="h-[90vh] -translate-y-10 ">
      <div className={styles.croppedImage}></div>
      <div
        className={`${styles.bannerMiniContainer} max-w-[70vw] mx-auto mt-9`}
      >
        <p className="text-white text-4xl sm:text-5xl font-semibold w-[25rem] mb-5 ">
          Moving people, and the world
        </p>
        <div className="py-3 bg-white w-[25rem] flex space-x-2 :space-x-7 justify-around ">
          <p className="cursor-pointer">Daily</p>
          <span className="h-1 w-[3rem] text-black"></span>
          <p className="cursor-pointer">Rental</p>
          <p className="cursor-pointer">OutStations</p>
        </div>
        <div className="bg-slate-100 pt-5 w-[25rem] md:w-auto">
          <div className="flex flex-col md:flex-row items-center justify-around space-y-2 md:space-y-0">
            <div className="flex  bg-white items-center border border-slate-900 py-2 px-8 sm:px-14">
              <CircleIcon className="text-green-800 pr-8 text-[40px]" />
              <p>Current Location</p>
            </div>
            <div className="flex bg-white items-center border border-slate-900 py-2 px-7 sm:px-14">
              <CircleIcon className="text-red-700 pr-8 text-[40px]" />
              <p>Enter Destination</p>
            </div>
            <div
              className={`cursor-pointer flex items-center py-4 sm:px-14 border border-slate-900 justify-around ${styles.searchOlaCabButton}`}
            >
              <p className="text-white font-semibold">
                Search
                <span className="text-green-400"> Ola Cab</span>
              </p>
              <ArrowRightIcon className="text-green-400" />
            </div>
          </div>
          <div className="mt-5 bg-white">
            <Image
              src="https://s3-ap-southeast-1.amazonaws.com/ola-prod-website/banner-green-desktop.png"
              alt=""
              className="w-full"
              sizes="100vw"
              height={0}
              width={0}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
