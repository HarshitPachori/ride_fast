import Layout from "@/components/Layout/Layout";
import Success from "@/components/Payment/Success";
import React from "react";

const page = ({ params }) => {
  return <Layout children={<Success rideId={params.id} />} />;
};

export default page;
