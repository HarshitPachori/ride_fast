"use client";
import { useAppSelector } from "@/utils/store/store";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

function GuardComponent({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const token = useAppSelector((state) => state.auth.token);
  useEffect(() => {
    if (!token || token === "") router.replace("/login");
  }, [token]);
  return token ? <>{children}</> : null;
}

export default GuardComponent;
