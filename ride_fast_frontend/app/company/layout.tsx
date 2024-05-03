"use client";
import { logout } from "@/utils/slices/authSlice";
import { useAppDispatch, useAppSelector } from "@/utils/store/store";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const layout = ({ children }: { children: React.ReactNode }) => {
  const [revenue, setRevenue] = useState(0);
  const token = useAppSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    const getRevenue = () => {
      axios
        .get("/api/v1/company/totalRevenue", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setRevenue(response.data?.totalRevenue);
        })
        .catch((error) => {
          if (axios.isAxiosError(error)) {
            if (
              error.response?.status === 401 ||
              error.response?.data.code === 401
            ) {
              router.replace("/login");
            }
          }
        });
    };
    getRevenue();
  }, [token]);
  return (
    <>
      <div>
        <nav className="w-full bg-black h-[10vh] flex  items-center justify-between px-6 lg:px-20 text-slate-200 sticky z-10 top-0">
          <div>
            <Link href={"/company"}>
              <h1 className="font-semibold">RIDE FAST</h1>
            </Link>
          </div>
          <div className="cursor-pointer flex items-center gap-5">
            <h1 className="font-semibold">
              Total Revenue : <span> &#8377; {revenue.toPrecision(4)}</span>
            </h1>
            <div className="text-center">
              <button
                className="bg-orange-400 hover:bg-orange-500 py-1 px-5 text-black font-semibold rounded-md shadow-lg"
                onClick={() => dispatch(logout())}
              >
                Log Out
              </button>
            </div>
          </div>
        </nav>
        {children}
      </div>
    </>
  );
};

export default layout;
