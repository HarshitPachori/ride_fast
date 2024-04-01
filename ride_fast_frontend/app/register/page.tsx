import Layout from "@/components/Layout/Layout";
import RegisterForm from "@/components/RegisterForm";
import React from "react";

function page() {
  return <Layout children={<RegisterForm />} />;
}

export default page;
