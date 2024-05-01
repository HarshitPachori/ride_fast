"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/utils/store/store";

export default function Home() {
  const router = useRouter();
  const token = useAppSelector((state) => state.auth.token);
  const role = useAppSelector((state) => state.auth.role);
  useEffect(() => {
    if (!token || token === "" || role === null) {
      router.replace("/login");
      return;
    } else if (role === "NORMAL_USER") {
      router.replace("/profile");
      return;
    } else if (role === "DRIVER") {
      router.replace("/driver/dashboard");
      return;
    }
  }, [token, role]);
  return null;
}
