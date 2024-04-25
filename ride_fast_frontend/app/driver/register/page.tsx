import Layout from "@/components/Layout/Layout";
import RegisterDriverForm from "@/components/RegisterDriverForm";
import React from "react";

function page() {
  return <Layout children={<RegisterDriverForm />} />;
}

export default page;
