import React, { useEffect, useState } from "react";
import JobSearch from "../components/JobSearch";
import JobCard from "../components/JobCard";
import Paginate from "../components/Paginate";

const JobListings = () => {
  return (
    <div className="rounded-md grid grid-cols-12 p-2  justify-center">
      <div className="md:col-span-2"></div>
      <div className="md:col-span-8  col-span-12">
        <JobSearch />
        <JobCard />
        <Paginate />
      </div>
      <div className="md:col-span-2"></div>
    </div>
  );
};

export default JobListings;
