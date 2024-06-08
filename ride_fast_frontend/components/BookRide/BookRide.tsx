"use client";
import React, { useState } from "react";
import { debounce } from "lodash";
import { useFormik } from "formik";
import * as Yup from "yup";
import BookRideNavBar from "./BookRideNavBar";
import { Button } from "@mui/material";
import { LocationOn } from "@mui/icons-material";
import AvailableCab from "./AvailableCabs";
import SearchResult from "./SearchResult";
import axios from "axios";
import { requestRide } from "@/utils/reducers/rideReducers";
import { useAppDispatch, useAppSelector } from "@/utils/store/store";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const validationSchema = Yup.object().shape({
  pickupArea: Yup.string().required("Pickup location is required"),
  destinationArea: Yup.string().required("Destination location is required"),
});

function BookRide() {
  const [activeField, setActiveField] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const dispatch = useAppDispatch();
  const ride = useAppSelector((state) => state.ride);
  const router = useRouter();
  const fetchSuggestions = debounce(
    async (input: React.ChangeEvent<HTMLInputElement>) => {
      try {
        const response = await axios.get(
          `https://us1.locationiq.com/v1/autocomplete.php?limit=5&key=pk.1dca78a113a7c45533e83e6c9f2196ae&q=${input}`
        );
        setSuggestions(response.data);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    },
    500
  );

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    formik.setFieldValue(name, value); // Update formik values
    setActiveField(name); // Set active field
    fetchSuggestions(value); // Fetch suggestions from API
  };

  const handleSelectSuggestion = (suggestion: any) => {
    const displayName = suggestion.display_name;
    const latitude = suggestion.lat;
    const longitude = suggestion.lon;
    formik.setFieldValue(activeField, displayName);

    // Set latitude and longitude in the formik values
    if (activeField === "pickupArea") {
      formik.setFieldValue("pickupLatitude", latitude);
      formik.setFieldValue("pickupLongitude", longitude);
    } else if (activeField === "destinationArea") {
      formik.setFieldValue("destinationLatitude", latitude);
      formik.setFieldValue("destinationLongitude", longitude);
    }

    setActiveField("");
    setSuggestions([]);
  };

  const handleOnSubmit = async (values: {
    pickupArea: string;
    destinationArea: string;
    destinationLatitude: string;
    destinationLongitude: string;
    pickupLatitude: string;
    pickupLongitude: string;
  }) => {
    try {
      const response = await dispatch(
        requestRide({
          destinationArea: values.destinationArea,
          pickupArea: values.pickupArea,
          destinationLatitude: parseFloat(values.destinationLatitude),
          destinationLongitude: parseFloat(values.destinationLongitude),
          pickupLatitude: parseFloat(values.pickupLatitude),
          pickupLongitude: parseFloat(values.pickupLongitude),
        })
      );
      if (response.payload.code === 401) {
        router.replace("/login");
        return;
      }
      if (response.payload.error) {
        toast.error(response.payload.message);
      } else if (response.payload === "Internal Server Error") {
        toast.error(response.payload);
      } else {
        toast.success(response.payload.message || "Ride Booked successfully");
        router.push(`/rideDetail/${response.payload?.id}`);
      }
    } catch (error) {
      toast.error("An error occurred while Booking Ride");
    }
  };

  const formik = useFormik({
    initialValues: {
      pickupArea: "",
      pickupLatitude: "",
      pickupLongitude: "",
      destinationArea: "",
      destinationLatitude: "",
      destinationLongitude: "",
    },
    validationSchema,
    onSubmit: (values) => {
      if (formik.isValid) handleOnSubmit(values);
    },
  });
  const onFocused = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    setActiveField(name);
  };
  return (
    <div className="w-full">
      <BookRideNavBar />
      <div className="px-3 lg:px-5 mt-10">
        <form className="space-y-5" onSubmit={formik.handleSubmit}>
          <div>
            <div className="border p-2 flex items-center relative">
              <p className="pr-3">From</p>
              <input
                type="text"
                name="pickupArea"
                placeholder="Enter Pickup Location"
                className="border-none outline-none w-full"
                value={formik.values.pickupArea}
                onChange={handleInputChange}
                onBlur={formik.handleBlur}
                onFocus={onFocused}
              />
              {activeField === "pickupArea" &&
                formik.values?.pickupArea?.length > 0 && (
                  <div className="absolute top-10 left-0 bg-white z-10 rounded-md p-2 border max-h-[50vh] w-full overflow-y-scroll shadow-md hide-scroll">
                    {suggestions.map((suggestion: any, index) => (
                      <div
                        key={index}
                        onClick={() => handleSelectSuggestion(suggestion)}
                        className="flex items-center py-2 z-10 bg-white cursor-pointer"
                      >
                        <div className="pr-5">
                          <LocationOn />
                        </div>
                        <div>
                          <p className="font-semibold">
                            {suggestion?.display_name.split()[0]}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
            </div>

            {formik.touched.pickupArea && formik.errors.pickupArea && (
              <div>
                <p className="text-xs text-red-500 px-2">
                  {formik.errors.pickupArea}
                </p>
              </div>
            )}
          </div>
          <div>
            <div className="border p-2 flex items-center relative">
              <p className="pr-3">To</p>
              <input
                type="text"
                name="destinationArea"
                placeholder="Enter Destination Location"
                className="border-none outline-none w-full"
                value={formik.values.destinationArea}
                onChange={handleInputChange}
                onBlur={formik.handleBlur}
                onFocus={onFocused}
              />
              {activeField === "destinationArea" &&
                formik.values?.destinationArea?.length > 0 && (
                  <div className="absolute top-10 left-0 bg-white z-10 rounded-md p-2 border max-h-[50vh] w-full overflow-y-scroll shadow-md hide-scroll">
                    {suggestions.map(
                      (suggestion: { display_name: any }, index) => (
                        <div
                          key={index}
                          onClick={() => handleSelectSuggestion(suggestion)}
                          className="flex items-center py-2 z-10 bg-white cursor-pointer"
                        >
                          <div className="pr-5">
                            <LocationOn />
                          </div>
                          <div>
                            <p className="font-semibold">
                              {suggestion?.display_name?.split()[0]}
                            </p>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                )}
            </div>
            {formik.touched.destinationArea &&
              formik.errors.destinationArea && (
                <div>
                  <p className="text-xs text-red-500 px-2">
                    {formik.errors.destinationArea}
                  </p>
                </div>
              )}
          </div>
          <Button
            className="bg-[#120e43e3] hover:bg-[#120E43] "
            sx={{ width: "100%", padding: ".7rem 0rem" }}
            variant="contained"
            type="submit"
            color="secondary"
          >
            Book Your Ride
          </Button>
        </form>
      </div>

      {/* <div className="-z-10 px-2 lg:px-5 mt-5">
        <p className="">Available Cabs</p>
        <div className="space-y-5">
          <AvailableCab />
          <AvailableCab />
          <AvailableCab />
          <AvailableCab />
          <AvailableCab />
        </div>
      </div> */}
    </div>
  );
}

export default BookRide;
