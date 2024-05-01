"use client";
import { useAppSelector } from "@/utils/store/store";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";

function GuardComponent({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const token = useAppSelector((state) => state.auth.token);
  const role = useAppSelector((state) => state.auth.role);
  const pathname = usePathname();
  useEffect(() => {
    if (!token || token === "" || role === null) {
      router.replace("/login");
    } else if (role === "NORMAL_USER" && pathname.startsWith("/driver")) {
      router.replace("/bookRide");
    } else if (role === "DRIVER" && !pathname.startsWith("/driver")) {
      router.replace("/driver/dashboard");
    }
  }, [token, role, router, pathname]);
  return token && role ? <>{children}</> : null;
}

export default GuardComponent;
