"use client";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import BookRideNavBar from "./BookRideNavBar";
import { Button } from "@mui/material";

const validationSchema = Yup.object().shape({
  pickupLocation: Yup.string().required("Pickup location is required"),
  destinationLocation: Yup.string().required(
    "Destination location is required"
  ),
});

function BookRide() {
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
  const onFocused = () => {};
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
            className="bg-purple-700"
            sx={{ width: "100%", padding: ".7rem 0rem" }}
            variant="contained"
            type="submit"
            color="secondary"
          >
            Find Driver
          </Button>
        </form>
      </div>
    </div>
  );
}

export default BookRide;
