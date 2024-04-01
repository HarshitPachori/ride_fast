"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

function GuardComponent({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const jwt =
    typeof localStorage !== undefined ? localStorage.getItem("token") : null;
  useEffect(() => {
    if (!jwt) router.push("/login");
  },[jwt]);
  return <>{children}</>;
}

export default GuardComponent;
