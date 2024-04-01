import React from "react";
import Image from "next/image";
import {
  Instagram as InstagramIcon,
  Twitter as TwitterIcon,
  YouTube as YouTubeIcon,
} from "@mui/icons-material";
import Link from "next/link";

function Footer() {
  return (
    <div className="mt-10 sm:mt-18">
      <div className="container py-8 px-5 ">
        <div className="grid grid-cols-1  sm:flex justify-around ">
          <div className="footerLinks">
            <Image
              src="https://s3-ap-southeast-1.amazonaws.com/ola-prod-website/OLA.svg"
              alt=""
              height={100}
              width={100}
            />
            <div className="flex items-center mt-5">
              <InstagramIcon className="text-4xl" />
              <YouTubeIcon className="text-4xl ml-5" />
              <TwitterIcon className="text-4xl ml-5" />
            </div>
          </div>
          <div className="footerLinks">
            <h1 className="text-lg font-semibold">Explore</h1>
            <ul className="mt-4">
              <li>
                <Link
                  href={"/"}
                  about=""
                  className="text-gray-600 hover:text-gray-800"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href={"/"}
                  about=""
                  className="text-gray-600 hover:text-gray-800"
                >
                  Book a Ride
                </Link>
              </li>
              <li>
                <Link
                  href={"/"}
                  about=""
                  className="text-gray-600 hover:text-gray-800"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href={"/"}
                  about=""
                  className="text-gray-600 hover:text-gray-800"
                >
                  Careers
                </Link>
              </li>
            </ul>
          </div>
          <div className="footerLinks">
            <h3 className="text-lg font-semibold">Customer Support</h3>
            <ul className="mt-4">
              <li>
                <Link
                  href={"/"}
                  about=""
                  className="text-gray-600 hover:text-gray-800"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href={"/"}
                  about=""
                  className="text-gray-600 hover:text-gray-800"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href={"/"}
                  about=""
                  className="text-gray-600 hover:text-gray-800"
                >
                  FAQs
                </Link>
              </li>
            </ul>
          </div>
          <div className="footerLinks">
            <h3 className="text-lg font-semibold">Legal</h3>
            <ul className="mt-4">
              <li>
                <Link
                  href={"/"}
                  about=""
                  className="text-gray-600 hover:text-gray-800"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  href={"/"}
                  about=""
                  className="text-gray-600 hover:text-gray-800"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="bg-gray-800 py">
        <div className="container mx-auto">
          <p className="text-center text-gray-600 text-sm">
            &copy; {new Date().getFullYear()} Ola Cabs. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
