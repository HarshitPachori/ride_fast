"use client";
import { West } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { useAppDispatch, useAppSelector } from "@/utils/store/store";
import { sx } from "@/utils/constants";
import toast from "react-hot-toast";
import { registerDriver, registerUser } from "@/utils/reducers/authReducers";
import { CircularProgressBar } from "../CustomLoader";

const validationSchema = yup.object().shape({
  name: yup.string().required("fullname is required"),
  mobile: yup.string().required("mobile is required"),
  email: yup
    .string()
    .email("invalid email")
    .required("email is required")
    .notOneOf(["ride@fast.com"], "You cannot pick this email"),
  password: yup
    .string()
    .min(8, "password should be of atleast 8 characters")
    .required("password is required"),
  licenseNumber: yup.string().required("license number is required"),
  licenseState: yup.string().required("license state is required"),
  licenseExpirationDate: yup
    .string()
    .required("license expiration date is required"),
  company: yup.string().required("company is required"),
  model: yup.string().required("model is required"),
  capacity: yup.string().required("capacity is required"),
  year: yup.string().required("year is required"),
  licensePlate: yup.string().required("vehicle number is required"),
});
function RegisterDriverForm() {
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
  });
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.auth.isLoading);
  const goBack = () => {
    router.back();
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      name: "",
      mobile: "",
      location: "",
      licenseNumber: "",
      licenseState: "",
      licenseExpirationDate: "",
      company: "",
      model: "",
      color: "",
      year: "",
      capacity: "",
      licensePlate: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const {
        email,
        password,
        mobile,
        name,
        licenseExpirationDate,
        licenseNumber,
        capacity,
        color,
        company,
        model,
        year,
        licensePlate,
        licenseState,
      } = values;
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error("error getting current location");
          toast.error("Error Getting current location");
          return;
        }
      );
      if (formik.isValid) {
        const driverData = {
          name: name,
          email: email,
          password: password,
          mobile: mobile,
          latitude: location.latitude,
          longitude: location.longitude,
          license: {
            licenseNumber: parseInt(licenseNumber),
            licenseExpirationDate: licenseExpirationDate,
            licenseState: licenseState,
          },
          vehicle: {
            company: company,
            model: model,
            year: year,
            color: color,
            capacity: capacity,
            licensePlate: licensePlate,
          },
        };
        try {
          const response = await dispatch(registerDriver(driverData));
          // registerUser({ name,email, password, mobile, })
          if (response.payload.error) {
            toast.error(response.payload.message);
          } else if (response.payload === "Internal Server Error") {
            toast.error(response.payload);
          } else {
            toast.success(
              response.payload.message || "Registered Successfully"
            );
            router.push("/login");
          }
        } catch (error) {
          toast.error("An error occured while registering");
        }
      }
    },
  });

  return (
    <div className=" max-h-screen overflow-y-scroll">
      <div className="flex items-center px-2 lg:px-5 py-5 sticky top-0 z-10 bg-white">
        <West className="cursor-pointer" onClick={goBack} />
        <div className="w-full text-center">
          <h1 className="font-semibold text-xl tracking-widest">
            REGISTER HERE
          </h1>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center py-5">
        <form
          className="w-[90vw] sm:w-[60vw] lg:w-[40vw] px-5 md:px-10"
          onSubmit={formik.handleSubmit}
        >
          <label className="flex justify-center my-2 font-semibold">
            Driver Details
          </label>
          <TextField
            label="Name"
            name="name"
            type="text"
            variant="outlined"
            fullWidth
            margin="normal"
            placeholder="John Doe"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            sx={sx}
          />
          <TextField
            label="Mobile Number"
            name="mobile"
            type="tel"
            variant="outlined"
            fullWidth
            margin="normal"
            placeholder="+91-0123456789"
            value={formik.values.mobile}
            onChange={formik.handleChange}
            error={formik.touched.mobile && Boolean(formik.errors.mobile)}
            helperText={formik.touched.mobile && formik.errors.mobile}
            sx={sx}
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            variant="outlined"
            fullWidth
            margin="normal"
            placeholder="john@email.com"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            sx={sx}
          />

          <TextField
            label="Password"
            name="password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            placeholder="**********"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            sx={sx}
          />
          <label className="flex justify-center my-2 font-semibold">
            Driving License Details
          </label>
          <TextField
            label="Driving License Number"
            name="licenseNumber"
            type="text"
            variant="outlined"
            fullWidth
            margin="normal"
            placeholder="AB245"
            value={formik.values.licenseNumber}
            onChange={formik.handleChange}
            error={
              formik.touched.licenseNumber &&
              Boolean(formik.errors.licenseNumber)
            }
            helperText={
              formik.touched.licenseNumber && formik.errors.licenseNumber
            }
            sx={sx}
          />
          <TextField
            label="License State"
            name="licenseState"
            type="text"
            variant="outlined"
            fullWidth
            margin="normal"
            placeholder="London"
            value={formik.values.licenseState}
            onChange={formik.handleChange}
            error={
              formik.touched.licenseState && Boolean(formik.errors.licenseState)
            }
            helperText={
              formik.touched.licenseState && formik.errors.licenseState
            }
            sx={sx}
          />

          <TextField
            label="License Expiration Date"
            name="licenseExpirationDate"
            type="date"
            variant="outlined"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            value={formik.values.licenseExpirationDate}
            onChange={formik.handleChange}
            error={
              formik.touched.licenseExpirationDate &&
              Boolean(formik.errors.licenseExpirationDate)
            }
            helperText={
              formik.touched.licenseExpirationDate &&
              formik.errors.licenseExpirationDate
            }
            sx={sx}
          />

          <label className="flex justify-center my-2 font-semibold">
            Vehicle Details
          </label>
          <TextField
            label="Vehicle company"
            name="company"
            type="text"
            variant="outlined"
            fullWidth
            margin="normal"
            placeholder="Toyota"
            value={formik.values.company}
            onChange={formik.handleChange}
            error={formik.touched.company && Boolean(formik.errors.company)}
            helperText={formik.touched.company && formik.errors.company}
            sx={sx}
          />
          <TextField
            label="Model"
            name="model"
            type="text"
            variant="outlined"
            fullWidth
            margin="normal"
            placeholder="SUV300"
            value={formik.values.model}
            onChange={formik.handleChange}
            error={formik.touched.model && Boolean(formik.errors.model)}
            helperText={formik.touched.model && formik.errors.model}
            sx={sx}
          />

          <div className="flex gap-2">
            <TextField
              label="Color"
              name="color"
              type="text"
              variant="outlined"
              fullWidth
              placeholder="Red"
              margin="normal"
              value={formik.values.color}
              onChange={formik.handleChange}
              error={formik.touched.color && Boolean(formik.errors.color)}
              helperText={formik.touched.color && formik.errors.color}
              sx={sx}
            />
            <TextField
              label="Year"
              name="year"
              type="number"
              variant="outlined"
              fullWidth
              placeholder="2010"
              margin="normal"
              value={formik.values.year}
              onChange={formik.handleChange}
              error={formik.touched.year && Boolean(formik.errors.year)}
              helperText={formik.touched.year && formik.errors.year}
              sx={sx}
            />
            <TextField
              label="Capacity"
              name="capacity"
              type="number"
              variant="outlined"
              fullWidth
              margin="normal"
              placeholder="12"
              value={formik.values.capacity}
              onChange={formik.handleChange}
              error={formik.touched.capacity && Boolean(formik.errors.capacity)}
              helperText={formik.touched.capacity && formik.errors.capacity}
              sx={sx}
            />
          </div>
          <TextField
            label="Vehicle Plate Number"
            name="licensePlate"
            type="text"
            variant="outlined"
            fullWidth
            margin="normal"
            placeholder="hdj2354f"
            value={formik.values.licensePlate}
            onChange={formik.handleChange}
            error={
              formik.touched.licensePlate && Boolean(formik.errors.licensePlate)
            }
            helperText={
              formik.touched.licensePlate && formik.errors.licensePlate
            }
            sx={sx}
          />
          <Button
            sx={{ padding: ".9rem 0rem" }}
            variant="contained"
            type="submit"
            className="w-full bg-gray-800 hover:bg-gray-900 my-3"
          >
            {isLoading ? <CircularProgressBar /> : "Create Account"}
          </Button>
        </form>

        <div className="flex flex-col w-full justify-center items-center">
          <p className="flex items-center text-center text-slate-700 my-2">
            Already have an account ?{" "}
            <Button
              className="font-semibold  text-slate-800 normal-case"
              onClick={() => router.push("/login")}
            >
              Login
            </Button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegisterDriverForm;
