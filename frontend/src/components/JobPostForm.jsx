import React, { useEffect, useState } from "react";

const PostJobForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [jobTitle, setJobTitle] = useState("");
  const [jobCompany, setJobCompany] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const [jobDescription, setJobDescription] = useState("");

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const jobData = {
      title: jobTitle,
      company: jobCompany,
      location: jobLocation,
      employmentType: jobType,
      jobDescription: jobDescription,
    };

    const postJob = async () => {
      try {
        const serverUrl = import.meta.env.VITE_SERVER_URL;
        const response = await fetch(`${serverUrl}/jobs/post-job`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(jobData),
        });
        const data = await response.json();
       
      } catch (error) {
        console.error("Error posting job:", error);
      } finally{
        setIsOpen(false)
        setJobTitle('')
        setJobLocation('')
        setJobCompany('')
        setJobDescription('')
        setJobType('')
      }
    };
    postJob();

    
  };
  return (
    <div>
      {/* Button to Open Popup */}
      <button
        onClick={togglePopup}
        className="hover:bg-[#e4e4f4] text-blue-500 md:px-4 md:py-2 rounded-full"
      >
        + Post a Job
      </button>

      {/* Popup Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white m-2 rounded-lg p-6 w-full max-w-md shadow-lg relative">
            {/* Close Button */}
            <button
              onClick={togglePopup}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>

            {/* Form Content */}
            <h2 className="text-2xl font-bold mb-4">Post Job</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="text-lg">Title</label>

                <input
                required
                  type="text"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  placeholder="Enter job title"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-4">
                <label className="text-lg">Company</label>

                <input
                required
                  type="text"
                  value={jobCompany}
                  onChange={(e) => setJobCompany(e.target.value)}
                  placeholder="Enter company name"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="text-lg">Location</label>

                <input
                required
                  type="text"
                  value={jobLocation}
                  onChange={(e) => setJobLocation(e.target.value)}
                  placeholder="Enter location"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="text-lg">Job Type</label>

                <div className="flex flex-col gap-2">
                  <div>
                    <input
                      type="radio"
                      id="full-time"
                      name="jobType"
                      onChange={(e) => setJobType(e.target.value)}
                      value="Full Time"
                      className="mr-2"
                    />
                    <label htmlFor="full-time" className="text-gray-700">
                      Full Time
                    </label>
                  </div>

                  <div>
                    <input
                      type="radio"
                      id="part-time"
                      name="jobType"
                      onChange={(e) => setJobType(e.target.value)}
                      value="Part Time"
                      className="mr-2"
                    />
                    <label htmlFor="part-time" className="text-gray-700">
                      Part Time
                    </label>
                  </div>

                  <div>
                    <input
                      type="radio"
                      id="remote"
                      name="jobType"
                      onChange={(e) => setJobType(e.target.value)}
                      value="Remote"
                      className="mr-2"
                    />
                    <label htmlFor="remote" className="text-gray-700">
                      Remote
                    </label>
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <label className="text-lg">Job Description</label>

                <input
                  type="text"
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Enter Job Description"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div></div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
              >
                Post Job
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostJobForm;
