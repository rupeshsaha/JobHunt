import React, { useContext } from "react";
import { StoreContext } from "../store/StoreContext";

const Paginate = () => {
  const { currPage, setCurrPage, totalPages } = useContext(StoreContext);

  if (totalPages <= 0) return null; // Handle invalid or zero total pages

  // Define pagination range logic
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total pages are 5 or less
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show dynamic range
      let start = Math.max(currPage - 2, 1);
      let end = Math.min(currPage + 2, totalPages);

      if (currPage <= 3) {
        start = 1;
        end = 5;
      }

      if (currPage >= totalPages - 2) {
        start = totalPages - 4;
        end = totalPages;
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
    }

    return pages;
  };

  const pages = getPageNumbers();

  return (
    <div className="w-full flex justify-center p-4 gap-2">
      {/* First Page Button */}
      {currPage > 1 && (
        <button
          onClick={() => setCurrPage(1)}
          className="px-4 py-2 rounded-md bg-gray-200 text-black"
        >
          First
        </button>
      )}

      {/* Previous Page Button */}
      {currPage > 1 && (
        <button
          onClick={() => setCurrPage(currPage - 1)}
          className="px-4 py-2 rounded-md bg-gray-200 text-black"
        >
          Prev
        </button>
      )}

      {/* Page Numbers */}
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => setCurrPage(page)}
          className={`px-4 py-2 rounded-md ${
            currPage === page
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-black"
          }`}
        >
          {page}
        </button>
      ))}

      {/* Next Page Button */}
      {currPage < totalPages && (
        <button
          onClick={() => setCurrPage(currPage + 1)}
          className="px-4 py-2 rounded-md bg-gray-200 text-black"
        >
          Next
        </button>
      )}

      {/* Last Page Button */}
      {currPage < totalPages && (
        <button
          onClick={() => setCurrPage(totalPages)}
          className="px-4 py-2 rounded-md bg-gray-200 text-black"
        >
          Last
        </button>
      )}
    </div>
  );
};

export default Paginate;
