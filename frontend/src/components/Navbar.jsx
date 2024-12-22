import React, { useState } from "react";
import menuIcon from "../assets/menu.png";
import JobHuntForm from "./JobHuntForm";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import PostJobForm from "./JobPostForm";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  


  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <nav className="bg-white rounded-lg w-full h-16 shadow-md overflow-x-hidden relative">
      <div className="flex md:justify-around items-center justify-between h-full px-4">
        <div className="text-xl font-bold">JobHunt</div>
        
        {/* Desktop Menu */}
        <div className="md:flex py-1 items-center space-x-5 hidden">
          <a href="#" className="text-gray-800 font-medium cursor-pointer">
            For Job Seekers
          </a>
          <a href="#" className="text-gray-800 font-medium cursor-pointer">
            For Employers
          </a>
          {/* <a onClick={()=>{setIsPopupOpen(true)}} href="#" className="text-gray-800 font-medium cursor-pointer">
            Hunt More Jobs
          </a> */}
          <JobHuntForm/>
            <PostJobForm/>
          <div className="flex items-center space-x-2">
            <SignupForm/>
            <LoginForm/>
          </div>
        </div>
        
        {/* Mobile Menu Icon */}
        <div className="md:hidden block">
          <img
            src={menuIcon}
            className="w-6 h-6 cursor-pointer"
            alt="Menu Icon"
            onClick={toggleSidebar}
          />
        </div>
      </div>

      {/* Sidebar for Mobile */}
      <div
        className={`fixed inset-0 bg-white z-50 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 md:hidden`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold">Menu</h2>
          <button
            className="text-xl font-bold"
            onClick={toggleSidebar}
          >
            ✕
          </button>
        </div>
        <div className="flex flex-col p-4 space-y-4">
          <a href="#" className="text-gray-800 font-medium cursor-pointer">
            For Job Seekers
          </a>
          <a href="#" className="text-gray-800 font-medium cursor-pointer">
            For Employers
          </a>
         <JobHuntForm/>
          <PostJobForm/>
          <div className="flex flex-col space-y-2">
            <SignupForm/>
           <LoginForm/>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
