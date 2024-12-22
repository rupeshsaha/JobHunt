import React, { useState, useEffect, useContext } from "react";
import Navbar from "./components/Navbar";
import JobListings from "./pages/JobListings";
import { StoreContext } from "./store/StoreContext";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div className="w-full bg-[#faf8fcae] ">
      <Navbar />
      <JobListings />
      <Footer />
    </div>
  );
};

export default App;
