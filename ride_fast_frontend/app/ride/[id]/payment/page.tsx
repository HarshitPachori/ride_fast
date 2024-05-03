import Layout from "@/components/Layout/Layout";
import PaymentPage from "@/components/Payment/PaymentPage";
import React from "react";

const page = ({ params }) => {
  return <Layout children={<PaymentPage rideId={params.id} />} />;
};

export default page;
