import { useRouter } from "next/navigation";
import React from "react";
import { Star, Call, West, Key } from "@mui/icons-material";
import { Avatar, IconButton, Button } from "@mui/material";

interface RideDetailsProps {
  ride: {
    rideDetails: {
      id: number;
      pickupArea: string;
      destinationArea: string;
      otp: number;
      driver: {
        name: string;
        vehicle: {
          model: string;
          licensePlate: string;
        };
      };
      status: string;
    };
  };
}
function RideDetail({ ride }: RideDetailsProps) {
  const router = useRouter();
  const goBack = () => {
    router.back();
  };
  const startPoint = { lat: 37.7749, lng: -122.4194 };
  const endPoint = { lat: 40.7128, lng: -74.006 };
  return (
    <div>
      <div className="flex items-center px-2 lg:px-5 py-2">
        <West onClick={goBack} className="cursor-pointer" />
        <p className="text-center w-full">AEGD5214DA</p>
      </div>
      <div className="px-2 lg:px-5 py-5">
        <div className="border rounded-md">
          <div className="flex items-center border-b p-3">
            <span className="pr-5 text-xs opacity-70 font-semibold">
              PICKUP :
            </span>
            <span className="">{ride?.rideDetails?.pickupArea}</span>
          </div>
          <div className="flex items-center border-b p-3">
            <span className="pr-5 text-xs opacity-70 font-semibold">
              DROP :
            </span>
            <span className="">{ride?.rideDetails?.destinationArea}</span>
          </div>
        </div>
      </div>
      <p className="p-2 bg-green-400 text-white text-center">
        Picking arriving in 3 min
      </p>
      <div className="flex items-center justify-center">
        <p className="text-center w-full">
          <iframe
            src="https://maps.google.com/maps?hl=en&amp;q=aligarh%20+()&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
            width="100%"
            height="300"
            allowFullScreen={true}
            loading="lazy"
            style={{ border: 0 }}
          ></iframe>
          <a href="https://www.gps.ie/"></a>
        </p>
      </div>
      <div className="px-2 lg:px-5 mt-2">
        <div className="border rounded-md">
          <div className="flex justify-between w-full border-b p-3">
            <div className="flex items-center">
              <Avatar
                src="https://cdn.pixabay.com/photo/2012/04/13/20/37/car-33556_640.png"
                alt="Reny Sharp"
              />
              <div className="pl-4">
                <p className="">{ride?.rideDetails?.driver?.vehicle?.model}</p>
                <p className="text-xs font-semibold opacity-60">Mini Cab</p>
              </div>
            </div>
            <div>
              <p className="text-xs">
                {ride?.rideDetails?.driver?.vehicle?.licensePlate}
              </p>
              <p className="font-semibold">
                {
                  ride?.rideDetails?.driver?.vehicle?.licensePlate?.split(
                    "-"
                  )[1]
                }
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-between w-full p-3">
          <div className="flex items-center">
            <Avatar src="https://cdn.pixabay.com/photo/2017/03/27/13/28/man-2178721_640.jpg" />
            <div className="pl-4">
              <p>{ride?.rideDetails?.driver?.name}</p>
              <p className="text-xs flex items-center">
                4.7 <Star className="text-yellow-500 text-sm" />
              </p>
            </div>
          </div>
          <IconButton color="success" aria-label="call driver">
            <Call />
          </IconButton>
        </div>
      </div>
      {ride?.rideDetails?.status === "COMPLETED" ? (
        <Button
          onClick={() => {
            router.push(`/ride/${ride.rideDetails?.id}/payment`);
          }}
          variant="contained"
          color="secondary"
          sx={{
            width: "100%",
            padding: ".5rem 0rem",
          }}
        >
          Pay Now
        </Button>
      ) : (
        <div className=" flex justify-between items-center bg-yellow-600 text-white py-2 px-3">
          <div className="flex items-center">
            <Key />
            <p className="ml-4">OTP</p>
          </div>
          <p>{ride?.rideDetails?.otp}</p>
        </div>
      )}
    </div>
  );
}

export default RideDetail;
