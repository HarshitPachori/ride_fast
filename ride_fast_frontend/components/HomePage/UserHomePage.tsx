import React from "react";
import NavBar from "./NavBar";
import Banner from "./Banner";
import CardVideoSection from "./CardVideoSection";
import Footer from "./Footer";

const UserHomePage = () => {
  return (
    <>
      <NavBar />
      <Banner />
      {/* <CircularProgressBar /> */}
      <CardVideoSection />
      <Footer />
    </>
  );
};

export default UserHomePage;
