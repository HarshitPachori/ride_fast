import RegisterForm from "@/components/Auth/RegisterForm";
import Layout from "@/components/Layout/Layout";
import React from "react";

function page() {
  return <Layout children={<RegisterForm />} />;
}

export default page;
