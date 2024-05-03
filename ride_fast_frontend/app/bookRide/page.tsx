import React from "react";
import BookRide from "../../components/BookRide/BookRide";
import Layout from "@/components/Layout/Layout";
import GuardComponent from "@/components/Auth/GuardComponent";

function page() {
  return (
    <GuardComponent>
      <Layout children={<BookRide />}></Layout>
    </GuardComponent>
  );
}

export default page;
