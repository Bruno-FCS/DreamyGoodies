import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import "../../App.css";
import Footer from "../../components/Footer";

const UserProfile = () => {
  return (
    <div>
      <Navbar />
      <div style={{ minHeight: "544px" }}></div>
      <Footer />
    </div>
  );
};

export default UserProfile;
