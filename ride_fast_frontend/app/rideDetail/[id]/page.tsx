"use client";
import React from "react";

import GuardComponent from "@/components/Auth/GuardComponent";
import Layout from "@/components/Layout/Layout";
import RideDetail from "@/components/RideDetail/RideDetail";

function page({ params }: any) {
  return (
    <GuardComponent>
      <Layout children={<RideDetail id={params.id} />} />
    </GuardComponent>
  );
}

export default page;
