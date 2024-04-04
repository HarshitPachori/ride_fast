import GuardComponent from "@/components/GuardComponent";
import Layout from "@/components/Layout/Layout";
import Rides from "@/components/Rides";
import React from "react";

function page() {
  return (
    <GuardComponent>

      
      <Layout children={<Rides />} />
    </GuardComponent>
  );
}

export default page;
