import React, { useContext } from "react";
import pin from "../assets/pin.svg";
import time from "../assets/time.svg";
import box from "../assets/box.svg";
import defaultCompanyLogo from "../assets/defaultCompanyLogo.svg"
import { StoreContext } from "../store/StoreContext";

const JobCard = () => {
  const { jobs } = useContext(StoreContext);


  // conversion for those jobs which were posted manually and not scraped
  const timeAgo =(timestamp)=> {
    const currentTime = new Date();
    const pastTime = new Date(timestamp);
    const differenceInMs = currentTime - pastTime;

    const seconds = Math.floor(differenceInMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
        return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (hours > 0) {
        return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (minutes > 0) {
        return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else {
        return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
    }
}



  return (
    <>
      {jobs?.length === 0 ? (
        <div className="text-center text-2xl">No Available Jobs</div>
      ) : (
        jobs?.map((job) => (
          <div
            onClick={() => window.open(`${job.link}`, "_blank")}
            key={job._id}
            className="bg-white mt-4 rounded-xl md:p-4 p-4 md:col-span-8 col-span-10 items-center max-h-52 md:max-h-48 overflow-hidden shadow-md border hover:border-blue-500 cursor-pointer"
          >
            {/* Top Section: Timestamp and Location */}
            <div className="w-full font-mono text-[9px] md:text-sm flex justify-between  gap-4">
              <div className="flex gap-2 items-center">
                <img src={time}/>
                <div className=" ">{job.postedDate?.substring(7) ||timeAgo(job.createdAt) }</div>
                <div className="bg-[#fcc0fc4a] text-purple-700 flex items-center justify-center gap-2 rounded-full px-2 py-1 md:text-sm ">
                  <img src={pin} alt="" />
                  {job.location}
                </div>
              </div>
              {/* Bookmark Icon */}
              <div className="bookmark">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-5 h-5 text-gray-500 hover:text-gray-700 cursor-pointer"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 3v18l7-5 7 5V3z"
                  />
                </svg>
              </div>
            </div>

            {/* Main Section: Company Logo, Title, and Company Name */}
            <div className="bg-[#f0f9ff] w-full md:h-[80%] h-[90%] mt-1 rounded-lg p-2">
              <div className="flex max-h-[80px] gap-2">
                <div className="company-logo flex justify-center items-center   ">
                  <img
                    className="max-h-[50px] max-w-[50px] md:max-h-[70px] md:max-w-[70px]"
                    src={job.companyLogo || defaultCompanyLogo}
                    alt="Company Logo"
                  />
                </div>
                <div className="p-2 flex flex-col justify-center">
                  <div className="md:text-lg text-sm  font-semibold">
                    {job.title}
                  </div>
                  <div className="text-sm font-normal">{job.company}</div>
                </div>
              </div>

              {/* Bottom Section: Job Details */}
              <div className="flex md:justify-end justify-start mt-1 font-m gap-2 text-sm">
                <div className="flex items-center gap-1">
                  <img src={box} alt="Employment Type" />
                  <span>{job.employmentType}</span>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </>
  );
};

export default JobCard;
