import React, { useState, useEffect, useContext } from "react";
import { StoreContext } from "../store/StoreContext";

const JobSearch = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [minPay, setMinPay] = useState(0);
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [employmentType, setEmploymentType] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");
  const [industry, setIndustry] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [workplace, setWorkplace] = useState("");

  const filterRef = React.useRef(null);
  const { setJobs, setCurrPage, setTotalPages, currPage } =
    useContext(StoreContext);

  const toggleFilters = () => {
    setShowFilters((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setShowFilters(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleWorkplaceChange = (value) => {
    setWorkplace((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const fetchJobs = async () => {
    try {
      const serverUrl = import.meta.env.VITE_SERVER_URL;
      const response = await fetch(
        `${serverUrl}/jobs/get-job?query=${query}&location=${location}&employmentType=${employmentType}&experienceLevel=${experienceLevel}&industry=${industry}&workplace=${workplace}&minPay=${minPay}&sortBy=${sortBy}&page=${currPage}&limit=20`,
        { method: "GET" }
      );
      const data = await response.json();
      setJobs(data.availableJobs);
      setCurrPage(data.currentPage);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [
    query,
    location,
    employmentType,
    experienceLevel,
    industry,
    workplace,
    minPay,
    sortBy,
    currPage,
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    fetchJobs();
  };

  return (
    <>
      <div className="bg-slate-50 mt-4 mb-16 rounded-xl md:p-8 p-4 md:h-40 h-28  shadow-md border">
        <form action="" onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Search Bar */}
          <div className="flex">
            <input
              onChange={(e) => setQuery(e.target.value)}
              value={query}
              name="query"
              type="text"
              placeholder="Search for jobs..."
              className="w-full p-2 border border-gray-300 rounded-l-full"
            />
            <button
              type="submit"
              className="p-2 bg-blue-500 text-white rounded-r-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.9 14.32a8 8 0 111.414-1.414l4.387 4.387a1 1 0 01-1.414 1.414l-4.387-4.387zM8 14a6 6 0 100-12 6 6 0 000 12z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          {/* Filters (Desktop) */}
          <div className="hidden md:flex p-2 gap-2">
            <select
              onChange={(e) => setLocation(e.target.value)}
              className="w-full p-2 border hover:bg-gray-200 border-gray-300 rounded-full"
            >
              <option value="">Location</option>
              <option value="new-york">New York</option>
              <option value="san-francisco">San Francisco</option>
              <option value="los-angeles">Los Angeles</option>
            </select>
            <select
              onChange={(e) => setEmploymentType(e.target.value)}
              className="w-full p-2 border hover:bg-gray-200 border-gray-300 rounded-full"
            >
              <option value="">Job Type</option>
              <option value="full-time">Full Time</option>
              <option value="part-time">Part Time</option>
              <option value="contract">Contract</option>
            </select>
            <select
              onChange={(e) => setExperienceLevel(e.target.value)}
              className="w-full p-2 border hover:bg-gray-200 border-gray-300 rounded-full"
            >
              <option value="">Experience Level</option>
              <option value="entry">Entry Level</option>
              <option value="mid">Mid Level</option>
              <option value="senior">Senior Level</option>
            </select>
            <select
              onChange={(e) => setIndustry(e.target.value)}
              className="w-full p-2 border hover:bg-gray-200 border-gray-300 rounded-full"
            >
              <option value="">Industry</option>
              <option value="tech">Tech</option>
              <option value="finance">Finance</option>
              <option value="healthcare">Healthcare</option>
            </select>
          </div>

          {/* Filters Toggle Button (Mobile) */}
          <div
            onClick={toggleFilters}
            className="md:hidden text-blue-500 font-medium flex justify-center items-center w-full hover:bg-blue-200 p-1 rounded-full  cursor-pointer"
          >
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L15 11.414V17a1 1 0 01-.553.894l-4 2A1 1 0 019 19v-7.586L3.293 6.707A1 1 0 013 6V4z"
                />
              </svg>
            </span>
            Filters
          </div>
        </form>

        {/* Filters (Mobile Toggleable) */}
      </div>
      {showFilters && (
        <div
          ref={filterRef}
          className="filters absolute flex md:hidden flex-col items-center gap-2 bg-white shadow-lg right-0 top-0 h-full overflow-y-auto rounded-md w-[70vw]  p-8 z-50"
        >
          <div className="flex justify-between border-b-2  border-gray-500 w-full">
            <div></div>
            <h3 className="text-lg  font-semibold mb-2">Filters</h3>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 cursor-pointer"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              onClick={toggleFilters}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>

          <div className="flex mt-8 flex-col gap-2 w-full ">
            <h2 className=" flex w-full border-b-2 font-medium text-[12px]">
              SORT
            </h2>
            <div>
              <input
                type="radio"
                value="most-recent"
                onChange={(e) => setSortBy(e.target.value)}
                name="sortBy"
                id="Pay"
              />
              <label className="pl-2">Most Recent</label>
            </div>
            <div>
              <input
                onChange={(e) => setSortBy(e.target.value)}
                value="low-to-high"
                type="radio"
                name="sortBy"
                id="Pay"
              />
              <label className="pl-2">Pay (Low to High)</label>
            </div>
            <div>
              <input
                value="high-to-low"
                onChange={(e) => setSortBy(e.target.value)}
                type="radio"
                name="sortBy"
                id="Pay"
              />
              <label className="pl-2">Pay (High to Low)</label>
            </div>
          </div>
          <div className="flex mt-8 flex-col gap-2 w-full ">
            <h2 className=" flex w-full border-b-2 font-medium text-[12px]">
              JOB TYPE
            </h2>
            <div>
              <input
                type="checkbox"
                value="full-time"
                onChange={(e) => setEmploymentType(e.target.value)}
              />
              <label className="pl-2">Full-Time</label>
            </div>
            <div>
              <input
                type="checkbox"
                value="part-time"
                onChange={(e) => setEmploymentType(e.target.value)}
              />
              <label className="pl-2">Part-Time</label>
            </div>
            <div>
              <input
                type="checkbox"
                value="contract"
                onChange={(e) => setEmploymentType(e.target.value)}
              />
              <label className="pl-2">Contract</label>
            </div>
          </div>
          <div className="flex mt-8 flex-col gap-2 w-full ">
            <h2 className=" flex w-full border-b-2 font-medium text-[12px]">
              WORKPLACE
            </h2>
            <div>
              <input
                type="checkbox"
                onChange={(e) => {
                  handleWorkplaceChange("remote");
                }}
              />
              <label className="pl-2">Remote</label>
            </div>
            <div>
              <input
                type="checkbox"
                onChange={(e) => {
                  handleWorkplaceChange("on-site");
                }}
              />
              <label className="pl-2">On-Site</label>
            </div>
            <div>
              <input
                type="checkbox"
                onChange={(e) => {
                  handleWorkplaceChange("hybrid");
                }}
              />
              <label className="pl-2">Hybrid</label>
            </div>
          </div>
          <div className="flex mt-8 flex-col gap-2 w-full ">
            <h2 className=" flex w-full border-b-2 font-medium text-[12px]">
              PAY
            </h2>
            <div className="flex justify-between ">
              <h2 className=" flex w-full font-normal text-[14px]">Minimum</h2>
              <label className="pl-2  w-full flex justify-end text-[12px]">
                {minPay}k USD/year
              </label>
            </div>
            <div>
              <input
                type="range"
                onChange={(e) => setMinPay(e.target.value)}
                value={minPay}
                min={0}
                max={500}
                className="w-full accent-blue-500"
                name="sortBy"
                id="Pay"
              />
            </div>
          </div>

          <div className="w-full flex justify-between p-2 ">
            <button className="border border-blue-500 rounded-full text-blue-500 p-2">
              Clear All
            </button>
            <button
              onClick={toggleFilters}
              className="bg-blue-500 rounded-full p-2 text-white"
            >
              Show Jobs
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default JobSearch;
