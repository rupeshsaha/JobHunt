import React, { useEffect, useState } from "react";

const PopupForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [pageSize, setPageSize] = useState(1);
  const [scrapeMessage, setScrapeMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
    setScrapeMessage("")
  };



    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setScrapeMessage("");
        const fetchJobs = async () => {
            try {
              const serverUrl = import.meta.env.VITE_SERVER_URL;
              const response = await fetch(
                `${serverUrl}/scrape?query=${query}&pageSize=${pageSize}`,
                { method: "GET" }
              );
              const data = await response.json();
                setScrapeMessage(data.message);
                
            } catch (error) {
              console.error("Error scraping jobs:", error);
            } finally{
                setIsLoading(false);
            }
          };
          fetchJobs();
    }
  return (
    <div>
      {/* Button to Open Popup */}
      <button
        onClick={togglePopup}
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
      >
     Scrape Jobs
      </button>

      {/* Popup Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg relative">
            {/* Close Button */}
            <button
              onClick={togglePopup}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>

            {/* Form Content */}
            <h2 className="text-2xl font-bold mb-4">Job Scraper</h2>
            <h2 className=" mb-4">Note: This might take some time</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search for Jobs..."
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
               
                <input
                  type="number"
                  value={pageSize}
                  onChange={(e) => setPageSize(e.target.value)}
                  placeholder="Enter number of Jobs to be sraped"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div></div>
            {isLoading && (
                <div className="flex justify-center items-center">
                <div className="h-16 w-16 border-4 border-dashed rounded-full animate-spin border-blue-500"></div>
              </div>
              
            )}
              <div className="mb-4 font-semibold">{scrapeMessage}</div>
             
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
              >
                Start Scraping
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PopupForm;
