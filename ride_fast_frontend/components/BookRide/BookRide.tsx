"use client";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import BookRideNavBar from "./BookRideNavBar";
import { Button } from "@mui/material";
import AvailableCab from "./AvailableCabs";
import SearchResult from "./SearchResult";

const validationSchema = Yup.object().shape({
  pickupLocation: Yup.string().required("Pickup location is required"),
  destinationLocation: Yup.string().required(
    "Destination location is required"
  ),
});

function BookRide() {
  const [activeField, setActiveField] = useState("");

  const handleOnSubmit = (values: { pickupLocation: string }) => {
    console.log(values);
  };

  const formik = useFormik({
    initialValues: {
      pickupLocation: "",
      destinationLocation: "",
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
                name="pickupLocation"
                placeholder="Enter Pickup Location"
                className="border-none outline-none"
                value={formik.values.pickupLocation}
                onChange={(event) => {
                  const value = event.target.value;
                  formik.setFieldValue("pickupLocation", value);
                  // dispatch(search)
                }}
                onBlur={formik.handleBlur}
                onFocus={onFocused}
              />
              {activeField === "pickupLocation" &&
                formik.values?.pickupLocation?.length > 0 && (
                  <div className="">
                    <SearchResult
                      areaKey="pickupArea"
                      latitude_key="pickupLatitude"
                      longitude_key="pickupLongitude"
                      setActiveField={activeField}
                    />
                  </div>
                )}
            </div>

            {formik.touched.pickupLocation && formik.errors.pickupLocation && (
              <div>
                <p className="text-xs text-red-500 px-2">
                  {formik.errors.pickupLocation}
                </p>
              </div>
            )}
          </div>
          <div>
            <div className="border p-2 flex items-center relative">
              <p className="pr-3">To</p>
              <input
                type="text"
                name="destinationLocation"
                placeholder="Enter Destination Location"
                className="border-none outline-none"
                value={formik.values.destinationLocation}
                onChange={(event) => {
                  const value = event.target.value;
                  formik.setFieldValue("destinationLocation", value);
                  // dispatch(search)
                }}
                onBlur={formik.handleBlur}
                onFocus={onFocused}
              />
              {activeField === "destinationLocation" &&
                formik.values?.destinationLocation?.length > 0 && (
                  <div className="">
                    <SearchResult
                      areaKey="destinationArea"
                      latitude_key="destinationLatitude"
                      longitude_key="destinationLongitude"
                      setActiveField={activeField}
                    />
                  </div>
                )}
            </div>
            {formik.touched.destinationLocation &&
              formik.errors.destinationLocation && (
                <div>
                  <p className="text-xs text-red-500 px-2">
                    {formik.errors.destinationLocation}
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
            Find Driver
          </Button>
        </form>
      </div>

      <div className="-z-10 px-2 lg:px-5 mt-5">
        <p className="">Available Cabs</p>
        <div className="space-y-5">
          <AvailableCab />
          <AvailableCab />
          <AvailableCab />
          <AvailableCab />
          <AvailableCab />
        </div>
      </div>
    </div>
  );
}

export default BookRide;
