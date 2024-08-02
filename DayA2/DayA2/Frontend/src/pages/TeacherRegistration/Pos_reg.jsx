import React, { useEffect, useState } from "react";
import api from "../../api";

export default function ShowPos() {
  const [selectedBranch, setSelectedBranch] = useState("");
  const [responseData, setResponseData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5); // Default rows per page
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (selectedBranch) {
      api
        .post("api/pos/show", { branch: selectedBranch })
        .then((response) => {
          console.log(response.data);
          setResponseData(response.data);
          setCurrentPage(1); // Reset to first page when branch changes
        })
        .catch((error) => {
          console.error("Error making the POST request:", error);
          setErrorMessage("Error fetching data. Please try again.");
        });
    }
  }, [selectedBranch]);

  useEffect(() => {
    const handleResize = () => {
      const height = window.innerHeight;
      if (height > 800) setRowsPerPage(10);
      else if (height > 600) setRowsPerPage(7);
      else setRowsPerPage(5);
    };
    
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (responseData) {
      setTotalPages(Math.ceil(responseData.length / rowsPerPage));
    }
  }, [responseData, rowsPerPage]);

  const handleChange = (event) => {
    setSelectedBranch(event.target.value);
  };

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const paginatedData = responseData?.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const formatPoBody = (poBody) => {
    const [boldPart, ...rest] = poBody.split(":");
    return (
      <>
        <span className="font-bold">{boldPart}:</span>
        {rest.join(":")}
      </>
    );
  };

  return (
    <div className="max-w-screen-lg mx-auto p-6 border border-gray-300 shadow-lg rounded-md bg-white mt-10">
      <h1 className="text-2xl md:text-3xl lg:text-4xl mb-6 text-blue-500 text-center">
        POS Records
      </h1>

      {errorMessage && (
        <div className="mb-4 text-red-500 text-center">{errorMessage}</div>
      )}

      <div className="flex justify-center mb-4">
        <select
          onChange={handleChange}
          value={selectedBranch}
          className="w-full md:w-1/2 lg:w-1/3 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select a branch</option>
          <option value="1">Computer</option>
          <option value="2">IT</option>
          <option value="3">AIDS</option>
          {/* Add more options as needed */}
        </select>
      </div>

      {responseData && responseData.length > 0 && (
        <>
          <div className="overflow-x-auto mt-6">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    POS Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    POS Body
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedData.map((pos, index) => (
                  <tr key={index}>
                    <td className="px-4 py-4 whitespace-normal text-sm font-medium text-gray-900">
                      {pos.po_name}
                    </td>
                    <td className="px-4 py-4 whitespace-normal text-sm text-gray-500 text-justify">
                      {formatPoBody(pos.po_body)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between mt-4">
            <button
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-sm text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
