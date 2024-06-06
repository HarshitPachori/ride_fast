"use client";
import { West } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import React from "react";
import { TextField, Button } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { useAppDispatch, useAppSelector } from "@/utils/store/store";
import { sx } from "@/utils/constants";
import toast from "react-hot-toast";
import { registerUser } from "@/utils/reducers/authReducers";
import { CircularProgressBar } from "../CustomLoader";

const validationSchema = yup.object().shape({
  fullName: yup.string().required("fullname is required"),
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
});
function RegisterForm() {
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
      fullName: "",
      mobile: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const { email, password, mobile, fullName } = values;
      if (formik.isValid) {
        try {
          const response = await dispatch(
            registerUser({ email, password, mobile, fullName })
          );
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
    <div className="py-5">
      <div className="flex items-center px-2 lg:px-5 py-2">
        <West className="cursor-pointer" onClick={goBack} />
        <div className="w-full text-center">
          <h1 className="font-semibold text-xl tracking-widest">
            REGISTER HERE
          </h1>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center py-5">
        <form
          className="w-[90vw] sm:w-[60vw] lg:w-[40vw] p-2 "
          onSubmit={formik.handleSubmit}
        >
          <TextField
            label="Full Name"
            name="fullName"
            type="text"
            variant="outlined"
            fullWidth
            margin="normal"
            placeholder="John Doe"
            value={formik.values.fullName}
            onChange={formik.handleChange}
            error={formik.touched.fullName && Boolean(formik.errors.fullName)}
            helperText={formik.touched.fullName && formik.errors.fullName}
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
          <Button
            sx={{ padding: ".9rem 0rem" }}
            variant="contained"
            type="submit"
            className="w-[87vw] sm:w-[58vw] lg:w-[39vw]  bg-gray-800 hover:bg-gray-900 my-2"
            onClick={() => router.push("/driver/register")}
          >
            Register as a Driver
          </Button>
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

export default RegisterForm;
