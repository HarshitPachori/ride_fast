import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { Star, West, Key } from "@mui/icons-material";
import { Avatar, Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/utils/store/store";
import { userProfile } from "@/utils/reducers/authReducers";
import { getCurrentRideOfUser } from "@/utils/reducers/userReducers";
import { getRideById } from "@/utils/reducers/rideReducers";

function RideDetail({ id }: { id: number }) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const goBack = () => {
    router.back();
  };
  const auth = useAppSelector((state) => state.auth);
  const ride = useAppSelector((state) => state.ride);
  const token = auth.token;
  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (token) {
      // dispatch(userProfile(token));
      const dipatchgetRide = async () => {
        const data = { rideId: id, token: token };
        const response = await dispatch(getRideById(data));
      };
      intervalId = setInterval(() => {
        dipatchgetRide();
        if (ride.status === "COMPLETED") {
          clearInterval(intervalId);
        }
      }, 5000);
    }
    return () => {
      clearInterval(intervalId);
    };
  }, [ride.status]);
  const centerLat =
    (parseFloat(ride.pickupLatitude.toString()) +
      parseFloat(ride.destinationLatitude.toString())) /
    2;
  const centerLng =
    (parseFloat(ride.pickupLongitude.toString()) +
      parseFloat(ride.destinationLongitude.toString())) /
    2;

  return (
    <div>
      <div className="flex items-center px-2 lg:px-5 py-2">
        <West onClick={goBack} className="cursor-pointer" />
        <p className="text-center w-full">{ride?.rideId}</p>
      </div>
      <div className="px-2 lg:px-5 py-5">
        <div className="border rounded-md">
          <div className="flex items-center border-b p-3">
            <span className="pr-5 text-xs opacity-70 font-semibold">
              PICKUP :
            </span>
            <span className="">{ride?.pickupArea}</span>
          </div>
          <div className="flex items-center border-b p-3">
            <span className="pr-5 text-xs opacity-70 font-semibold">
              DROP :
            </span>
            <span className="">{ride?.destinationArea}</span>
          </div>
        </div>
      </div>
      <p className="p-2 bg-green-400 text-white text-center">{ride.status}</p>
      <div className="py-2 px-1">
        {/* <iframe
            src="https://maps.google.com/maps?hl=en&amp;q=aligarh%20+()&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
            width="100%"
            height="300"
            allowFullScreen={true}
            loading="lazy"
            style={{ border: 0 }}
          ></iframe>
          <a href="https://www.gps.ie/"></a> */}
        {/* <iframe
            src={`https://usl.locationiq.com/v1/driving/${ride?.pickupLatitude},${ride.pickupLongitude},${ride.destinationLatitude},${ride.destinationLongitude}?key=pk.1dca78a113a7c45533e83e6c9f2196ae&steps=true&alternatives=true&geometries=polyline&overview=full&`}
            width="100%"
            height="300"
            allowFullScreen={true}
            loading="lazy"
            style={{ border: 0 }}
          ></iframe> */}

        <iframe
          src={`https://maps.locationiq.com/v3/staticmap?key=pk.1dca78a113a7c45533e83e6c9f2196ae&center=${centerLat},${centerLng}&zoom=18&size=600x300&format=png&markers=icon:small-red-cutout|${ride.pickupLatitude},${ride.pickupLongitude}&markers=icon:small-blue-cutout|${ride.destinationLatitude},${ride.destinationLongitude}& path=weight:2|color:blue|fillcolor:%23add8e6|${ride.pickupLatitude},${ride.pickupLongitude}|${ride.destinationLatitude},${ride.destinationLongitude}`}
          width="100%"
          height="300"
          loading="lazy"
          style={{ border: 0 }}
        ></iframe>

        {/* <iframe
            width="100%"
            height="300"
            src={`https://us1.locationiq.com/v1/directions/driving/${ride.pickupLatitude},${ride.pickupLongitude};${ride.destinationLatitude},${ride.destinationLongitude}?key=pk.1dca78a113a7c45533e83e6c9f2196ae`}
            allowFullScreen
            loading="lazy"
          ></iframe> */}
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
                <p className="">{ride?.driver?.vehicle?.model}</p>
                <p className="text-xs font-semibold opacity-60">Mini Cab</p>
              </div>
            </div>
            <div>
              <p className="text-xs">{ride?.driver?.vehicle?.licensePlate}</p>
              <p className="font-semibold">
                {ride?.driver?.vehicle?.licensePlate?.split("-")[1]}
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-between w-full p-3">
          <div className="flex items-center">
            <Avatar src="https://cdn.pixabay.com/photo/2017/03/27/13/28/man-2178721_640.jpg" />
            <div className="pl-4">
              <p>{ride?.driver?.name}</p>
              <p className="text-xs flex items-center">
                4.7 <Star className="text-yellow-500 text-sm" />
              </p>
            </div>
          </div>
          {/* <IconButton color="success" aria-label="call driver">
            <Call />
          </IconButton> */}
        </div>
      </div>
      {ride?.status === "COMPLETED" ? (
        <Button
          onClick={() => {
            router.push(`/ride/${ride.rideId}/payment`);
          }}
          variant="contained"
          className="bg-blue-800"
          sx={{
            padding: ".5rem 0rem",
            width: "100%",
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
          <p>{ride?.otp}</p>
        </div>
      )}
    </div>
  );
}

export default RideDetail;
