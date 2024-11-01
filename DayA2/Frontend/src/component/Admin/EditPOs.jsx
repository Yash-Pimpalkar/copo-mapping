import React, { useEffect, useState } from "react";
import api from "../../api";

export default function AdminEditPos() {
  const [selectedBranch, setSelectedBranch] = useState("");
  const [responseData, setResponseData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editPoData, setEditPoData] = useState({ po_name: "", po_body: "" });
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newPoData, setNewPoData] = useState({ po_name: "", po_body: "" });

  useEffect(() => {
    if (selectedBranch) {
      api
        .post("api/pos/show", { branch: selectedBranch })
        .then((response) => {
          // Sort the data by po_id before setting it in the state
          const sortedData = response.data.sort((a, b) => Number(a.po_id) - Number(b.po_id));
          setResponseData(sortedData);
          setCurrentPage(1);
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
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
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

  const startEdit = (index) => {
    const actualIndex = (currentPage - 1) * rowsPerPage + index; // Calculate the actual index in responseData
    setEditingIndex(actualIndex);
    setEditPoData(responseData[actualIndex]);
  };


  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditPoData((prev) => ({ ...prev, [name]: value }));
  };

  const saveEdit = () => { // Remove the index parameter
    const actualIndex = editingIndex; // Use editingIndex directly

    const updatedData = [...responseData];
    updatedData[actualIndex] = { ...editPoData, branch: selectedBranch }; // Include branch in the updated data
    setResponseData(updatedData);
    setEditingIndex(null);

    api
      .post("api/pos/admin/update/", updatedData[actualIndex]) // Send full updated data including branch
      .then(() => {
        alert("PO updated successfully!");
      })
      .catch((error) => {
        console.error("Error updating PO:", error);
        setErrorMessage("Error saving data. Please try again.");
      });
  };



  const deletePo = (index) => {
    // Calculate the actual index in the full responseData based on the current page
    const actualIndex = (currentPage - 1) * rowsPerPage + index;

    // Check if the calculated index is within bounds
    if (actualIndex < 0 || actualIndex >= responseData.length) {
      console.error("Invalid index for deletion:", actualIndex);
      return;
    }

    const itemToDelete = responseData[actualIndex]; // Get the item to delete
    const { po_id } = itemToDelete; // Destructure po_id from the item
    const branch = selectedBranch; // Get the branch from the state

    console.log("Deleting PO with:", { po_id, branch }); // Log the data being sent

    api
      .delete("api/pos/admin/delete", {
        data: { po_id, branch } // Ensure 'data' key is used
      })
      .then(() => {
        alert("PO deleted successfully!");
        const updatedData = responseData.filter((_, i) => i !== actualIndex); // Remove the deleted item from the UI list
        setResponseData(updatedData); // Update the state to reflect deletion
      })
      .catch((error) => {
        console.error("Error deleting PO:", error);
        setErrorMessage("Error deleting data. Please try again.");
      });
  };






  const handleAddNewClick = () => {
    setIsAddingNew(true);
    setNewPoData({ po_id: "", po_name: "", po_body: "" });
  };

  const handleNewPoChange = (e) => {
    const { name, value } = e.target;

    setNewPoData((prev) => ({
      ...prev,
      [name]: name === "po_id" ? Number(value) : value  // Convert po_id to a number
    }));
  };


  const saveNewPo = () => {
    api
      .post("api/pos/admin/create", { ...newPoData, branch: selectedBranch })
      .then((response) => {
        const newPo = { ...response.data, po_id: Number(response.data.po_id) };

        setResponseData((prevData) => {
          const updatedData = [...prevData, newPo].sort((a, b) => a.po_id - b.po_id);
          console.log("Sorted Data:", updatedData); // Log sorted data
          return updatedData;
        });

        setIsAddingNew(false);
        alert("New PO added successfully!");
      })
      .catch((error) => {
        console.error("Error adding new PO:", error);
        setErrorMessage("Error adding new PO. Please try again.");
      });
  };





  const paginatedData = responseData?.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div className="max-w-screen-3xl mx-auto container p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl md:text-4xl lg:text-5xl mb-6 text-blue-700 text-center font-extrabold flex justify-center">
        Edit POs
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
          <button
            onClick={handleAddNewClick}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-600 transition duration-300 mb-6"
          >
            Add New PO
          </button>

          {isAddingNew && (
            <div className="bg-white p-1 mb-6 shadow-lg rounded-lg">
              <textarea
                type="text"
                name="po_id"
                value={newPoData.po_id}
                onChange={handleNewPoChange}
                placeholder="PO Id"
                className="w-full mb-3 border border-gray-300 rounded-md p-2"
              />
              <textarea
                type="text"
                name="po_name"
                value={newPoData.po_name}
                onChange={handleNewPoChange}
                placeholder="PO Name"
                className="w-full mb-3 border border-gray-300 rounded-md p-2"
              />
              <textarea
                name="po_body"
                value={newPoData.po_body}
                onChange={handleNewPoChange}
                placeholder="PO Body"
                className="w-full mb-3 border border-gray-300 rounded-md p-2"
              />
              <button
                onClick={saveNewPo}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition duration-300"
              >
                Save New PO
              </button>
            </div>
          )}

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
                  <th className="px-6 py-4 text-sm font-medium uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedData.map((pos, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {editingIndex === (currentPage - 1) * rowsPerPage + index ? ( // Compare with the actual index
                        <input
                          type="text"
                          name="po_name"
                          value={editPoData.po_name}
                          onChange={handleEditChange}
                          className="w-full border border-gray-300 rounded-md p-2"
                        />
                      ) : (
                        pos.po_name
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 text-justify">
                      {editingIndex === (currentPage - 1) * rowsPerPage + index ? (
                        <textarea
                          name="po_body"
                          value={editPoData.po_body}
                          onChange={handleEditChange}
                          className="w-full border border-gray-300 rounded-md p-2"
                        />
                      ) : (
                        pos.po_body
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        {editingIndex === (currentPage - 1) * rowsPerPage + index ? (
                          <button
                            onClick={saveEdit} // Remove index from here
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 transition duration-300"
                          >
                            Save
                          </button>
                        ) : (
                          <>
                            <button
                              onClick={() => startEdit(index)}
                              className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 transition duration-300"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => deletePo(index)}
                              className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 transition duration-300"
                            >
                              Delete
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}

              </tbody>
            </table>
          </div>

          <div className="flex justify-between mt-6">
            <button
              onClick={handlePrevious}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 transition duration-300"
            >
              Previous
            </button>
            <p>
              Page {currentPage} of {totalPages}
            </p>
            <button
              onClick={handleNext}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 transition duration-300"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
