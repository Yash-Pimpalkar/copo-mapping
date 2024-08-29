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
    <div className="max-w-screen-3xl mx-auto container p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl md:text-4xl lg:text-5xl mb-6 text-blue-700 text-center font-extrabold flex justify-center">
        PO Records
      </h1>

      {errorMessage && (
        <div className="mb-4 text-red-500 text-center">{errorMessage}</div>
      )}

      <div className="flex justify-center mb-6">
        <select
          onChange={handleChange}
          value={selectedBranch}
          className="w-full md:w-1/2 lg:w-1/3 px-4 py-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-300 ease-in-out bg-white"
        >
          <option value="">Select a branch</option>
          <option value="1">Computer</option>
          <option value="2">IT</option>
          <option value="3">AI ML</option>
          {/* Add more options as needed */}
        </select>
      </div>

      {responseData && responseData.length > 0 && (
        <>
          <div className="overflow-x-auto bg-white shadow-lg rounded-lg flex items-center justify-center">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-blue-500 text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium uppercase tracking-wider">
                    PO's Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium uppercase tracking-wider">
                    PO's Body
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedData.map((pos, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {pos.po_name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 text-justify">
                      {formatPoBody(pos.po_body)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between mt-6">
            <button
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50 shadow-lg hover:bg-blue-700 transition duration-300"
            >
              Previous
            </button>
            <span className="text-sm text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50 shadow-lg hover:bg-blue-700 transition duration-300"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
