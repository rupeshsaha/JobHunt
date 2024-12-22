import React, { createContext, useState } from "react";

const StoreContext = createContext();

const StoreProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [currPage, setCurrPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  return (
    <StoreContext.Provider
      value={{
        jobs,
        setJobs,
        currPage,
        setCurrPage,
        totalPages,
        setTotalPages,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export { StoreContext, StoreProvider };
