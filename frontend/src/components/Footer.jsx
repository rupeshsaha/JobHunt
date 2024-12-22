import React from "react";

const Footer = () => {
  return (
    <div className="grid grid-cols-12 text-gray-500">
      <div className="md:col-span-2 "></div>
      <div className="md:col-span-8  border-t-2 p-4 flex-col md:flex-row  flex justify-around md:items-start items-center gap-10 md:gap-2 col-span-12">
        <div className="gap-2 items-center flex flex-col">

          <div className="font-semibold text-black">Company</div>
          <a href="#">About JobHunt</a>
          <a href="#">Careers</a>
          <a href="#">Support</a>
          <a href="#">Contact Us</a>
        </div>

        <div className="gap-2 items-center flex flex-col">
          <div className="font-semibold text-black">For Job Seekers</div>
          <a href="#">Sign up with Remote Jobs</a>
          <a href="#">Browse remote jobs</a>
        </div>

        <div className="gap-2 items-center flex flex-col">
          <div className="font-semibold text-black">For Companies</div>
          <a href="#">Post a remote job</a>
          <a href="#">Create a company bio</a>
          <a href="#">Pricing</a>
        </div>

        <div className="gap-2 items-center flex flex-col">
          <div className="font-semibold text-black">Remote work</div>
          <a href="#">Remote jobs by category</a>
        </div>
        
      </div>
      <div className="md:col-span-2 "></div>
    </div>
  );
};

export default Footer;
