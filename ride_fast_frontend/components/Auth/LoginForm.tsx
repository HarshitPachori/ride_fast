"use client";
import { sx } from "@/utils/constants";
import {
  driverProfile,
  loginUser,
  userProfile,
} from "@/utils/reducers/authReducers";
import { useAppDispatch, useAppSelector } from "@/utils/store/store";
import { West } from "@mui/icons-material";
import {
  Button,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
} from "@mui/material";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";
import * as yup from "yup";
import { CircularProgressBar } from "../CustomLoader";

const validationSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("email is required"),
  password: yup.string().required("password is required"),
  role: yup.string().oneOf(["DRIVER", "NORMAL_USER"]),
});
function LoginForm() {
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
      role: "NORMAL_USER",
    },
    validationSchema,
    onSubmit: async (values) => {
      const { email, password, role } = values;
      if (formik.isValid) {
        try {
          const response = await dispatch(loginUser({ email, password, role }));
          if (response.payload.error) {
            toast.error(response.payload.message);
          } else if (response.payload === "Internal Server Error") {
            toast.error(response.payload);
          } else {
            toast.success(response.payload.message);
          }
        } catch (error) {
          toast.error("An error occurred while logging in");
        }
      }
    },
  });

  const auth = useAppSelector((store) => store.auth);
  useEffect(() => {
    const checkAuthorized = async () => {
      try {
        let response = null;
        if (auth.role && auth.token) {
          if (auth.role === "DRIVER") {
            response = await dispatch(driverProfile(auth.token));
            if (response.payload?.code !== 401) {
              router.replace("/driver/dashboard");
            }
          } else if (auth.role === "NORMAL_USER") {
            dispatch(userProfile(auth.token)).then((response) => {
              if (response.payload.email === "ride@fast.com") {
                router.replace("/company");
              } else if (response.payload?.code !== 401) {
                router.replace("/bookRide");
              }
            });
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
    checkAuthorized();
  }, [auth.token, auth.role]);

  return (
    <div className="py-5">
      <div className="flex items-center px-2 lg:px-5 py-2">
        {/* <West className="cursor-pointer" onClick={goBack} /> */}
        <div className="w-full text-center">
          <h1 className="font-semibold text-xl tracking-widest">LOGIN HERE</h1>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center py-5">
        <form
          className="w-[90vw] sm:w-[60vw] lg:w-[40vw] p-2"
          onSubmit={formik.handleSubmit}
          method="POST"
        >
          <TextField
            label="Email"
            name="email"
            type="email"
            placeholder="john@email.com"
            variant="outlined"
            fullWidth
            margin="normal"
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
            placeholder="**********"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            sx={sx}
          />
          <FormControl component="fieldset" margin="normal" fullWidth>
            <FormLabel component="legend">Select Role</FormLabel>
            <RadioGroup
              row
              aria-label="role"
              name="role"
              value={formik.values.role}
              onChange={formik.handleChange}
            >
              <FormControlLabel
                value="NORMAL_USER"
                control={<Radio sx={{ color: "slategray" }} />}
                label="User"
              />
              <FormControlLabel
                value="DRIVER"
                control={<Radio sx={{ color: "slategray" }} />}
                label="Driver"
              />
            </RadioGroup>
          </FormControl>
          <Button
            sx={{ padding: ".9rem 0rem" }}
            variant="contained"
            type="submit"
            className="w-full bg-gray-800 hover:bg-gray-900 my-3"
          >
            {isLoading ? <CircularProgressBar /> : "Login"}
          </Button>
        </form>
        <div className="flex w-full justify-center">
          <p className="flex items-center text-center text-slate-700 ">
            Don't have an account ?{" "}
            <Button
              className="font-semibold  text-slate-800 normal-case"
              onClick={() => router.push("/register")}
            >
              Register
            </Button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
