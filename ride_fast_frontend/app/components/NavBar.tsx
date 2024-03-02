import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import Image from "next/image";

function NavBar() {
  return (
    <div className="bg-black py-4">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="flex items-center mx-5">
              <Link href="/">
                <Image
                  src="https://s3-ap-southeast-1.amazonaws.com/ola-prod-website/ola-white-logo.svg"
                  alt="Ola Logo"
                  height={50}
                  width={50}
                />
              </Link>
            </div>
            <div>
              <ul className="hidden sm:flex sm:items-center">
                <li className="mr-6">
                  <Link href="/" className="text-white">
                    OlaElectric
                  </Link>
                </li>
                <li className="mr-6">
                  <Link href="/" className="text-white">
                    OlaFactory
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div>
            <button className="bg-gray-700 text-white hover:bg-gray-900 text-sm font-semibold px-4 py-3 rounded-md">
              Book an Ola Cab
            </button>
            <button className="bg-white hover:bg-gray-300 text-sm font-semibold px-4 py-3 ml-5 rounded-md ">
              Free S1 Test Ride
            </button>
            <MenuIcon className="text-white ml-5 text-3xl  " />
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
