import React, { useEffect, useState } from "react";

const SignupForm = () => {
  const [isOpen, setIsOpen] = useState(false);


  const togglePopup = () => {
    setIsOpen(!isOpen);
  
  };



    const handleSubmit = async (e) => {
        e.preventDefault();
       
    }
  return (
    <div>
      {/* Button to Open Popup */}
      <button
        onClick={togglePopup}
        className="bg-blue-600 text-white px-4 py-2 w-full rounded-full hover:bg-blue-700"
      >
     Signup
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
            <h2 className="text-2xl font-bold mb-4">Signup</h2>
            <form onSubmit={handleSubmit}>

            <div className="mb-4">
              <label className="text-lg">Name</label>

                <input
                  type="text"
                 
                  placeholder="Enter your name"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
             
              <div className="mb-4">
              <label className="text-lg">Email</label>

                <input
                  type="text"
                 
                  placeholder="Enter your email"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
              <label className="text-lg">Password</label>

                <input
                  type="text"
                 
                  placeholder="Enter your email"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div></div>
        
              
             
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
              >
                Signup
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignupForm;
