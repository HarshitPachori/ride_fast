import Layout from "@/components/Layout/Layout";
import LoginForm from "@/components/Auth/LoginForm";
import React from "react";

function page() {
  return <Layout children={<LoginForm />} />;
}

export default page;
