import GuardComponent from "@/components/Auth/GuardComponent";
import Layout from "@/components/Layout/Layout";
import Profile from "@/components/Profile/Profile";
import React from "react";

function page() {
  return (
    <GuardComponent>
      <Layout children={<Profile />} />
    </GuardComponent>
  );
}

export default page;
