import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import api from "../../api";
import LoadingButton from "../../component/Loading/Loading";

export default function Admin_Cos_Edit() {
    const location = useLocation();
    const { co_count, usercourse_id } = location.state;
    const [formData, setFormData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState("");
    const [newlyAddedCOs, setNewlyAddedCOs] = useState([]);
    const [deletedCOs, setDeletedCOs] = useState([]);
    const [isAddingNew, setIsAddingNew] = useState(false);

    useEffect(() => {
        const fetchCOData = async () => {
            if (usercourse_id) {
                setErr("");
                setLoading(true);
                try {
                    const res = await api.get(`/api/cos/admin/showcos/${usercourse_id}`);
                    const fetchedCOData = res.data;

                    // Set formData to fetched CO data with default structure
                    setFormData(
                        fetchedCOData.map(co => ({
                            cos_name: co.co_name,
                            cos_body: co.co_body,
                            idcos: co.idcos
                        }))
                    );
                } catch (error) {
                    console.error("Error fetching COs data:", error);
                    setErr(error.response?.data?.error || "An unexpected error occurred");
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchCOData();
    }, [usercourse_id]);

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (index, event) => {
        const { name, value } = event.target;
        const newFormData = [...formData];
        newFormData[index][name] = value;
        setFormData(newFormData);
    };

    const handleAddNewClick = () => {
        // Check if there's already an empty CO being added
        const hasEmptyCO = newlyAddedCOs.some(co => co.cos_name === "" && co.cos_body === "");
        
        if (!hasEmptyCO) {
            setIsAddingNew(true);
            setNewlyAddedCOs((prev) => [
                ...prev,
                { cos_name: "", cos_body: "", created_time: new Date().toISOString() }
            ]);
        }
    };
    

    const handleNewCoChange = (index, event) => {
        const { name, value } = event.target;
        const updatedCOs = [...newlyAddedCOs];
        updatedCOs[index][name] = name === "cos_id" ? Number(value) : value;
        setNewlyAddedCOs(updatedCOs);
    };

    const handleSubmit = async () => {
        setLoading(true);
        setErrorMessage("");
        setSuccessMessage("");

        try {
            if (formData.length > 0) {
                // Handle updating existing COs
                const updatedCos = formData.map((cos) => ({
                    co_name: cos.cos_name,
                    co_body: cos.cos_body,
                }));

                const data = { usercourse_id, updatedCos };
                await api.put(`/api/cos/admin/update/${usercourse_id}`, data);
                setSuccessMessage("COS data updated successfully.");
            }

            if (newlyAddedCOs.length > 0) {

                const currentTime = new Date().toISOString();

                const formatDateForDatabase = (isoDate) => {
                    const date = new Date(isoDate);
                    const year = date.getFullYear();
                    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
                    const day = String(date.getDate()).padStart(2, '0');
                    const hours = String(date.getHours()).padStart(2, '0');
                    const minutes = String(date.getMinutes()).padStart(2, '0');
                    const seconds = String(date.getSeconds()).padStart(2, '0');
                    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
                };

                const formattedCreatedAt = formatDateForDatabase(currentTime);
                const newCOs = newlyAddedCOs.map((cos) => ({
                    co_name: cos.cos_name,
                    co_body: cos.cos_body,
                    created_time: formattedCreatedAt,
                }));

                const newdata = { usercourse_id, newCOs };
                await api.post(`/api/cos/admin/add/${usercourse_id}`, newdata);
                setSuccessMessage("New COS added successfully.");
                setNewlyAddedCOs([]);
            }

            if (deletedCOs.length > 0) {
                const deleteCOs = deletedCOs.map((cos) => ({
                    co_name: cos.cos_name,
                    co_body: cos.cos_body,
                }));

                await api.delete(`/api/cos/admin/remove/${usercourse_id}`, {
                    data: { usercourse_id, deleteCOs }
                });
                setSuccessMessage("Selected COS deleted successfully.");
                setDeletedCOs([]);
            }
        } catch (error) {
            console.error("Error updating COS data:", error);
            setErrorMessage("Failed to update COS data.");
        } finally {
            setLoading(false);
        }
    };

    const handleRemoveCO = (index) => {
        const deletedCO = formData[index];
        const newFormData = formData.filter((_, i) => i !== index);
        setFormData(newFormData);
        setDeletedCOs((prevDeletedCOs) => [...prevDeletedCOs, deletedCO]);
    };

    const handleEditCO = (index) => {
        alert(`Edit CO at index ${index}`);
    };

    return (
        <div className="max-w-screen-lg mx-auto p-6 border border-gray-300 shadow-lg rounded-md bg-white mt-10">
            <h1 className="text-2xl mb-6 text-blue-500 text-center">COS Form</h1>

            {errorMessage && <div className="mb-4 text-red-500">{errorMessage}</div>}
            {successMessage && <div className="mb-4 text-green-500">{successMessage}</div>}

            <button
                type="button"
                onClick={handleAddNewClick}
                className="bg-blue-600 text-white py-2 px-4 rounded-md mb-4"
            >
                Add CO
            </button>

            {isAddingNew && (
                newlyAddedCOs.map((co, index) => (
                    <div key={index} className="bg-white p-4 mb-6 shadow-lg rounded-lg">
                        <input
                            type="text"
                            name="cos_name"
                            value={co.cos_name}
                            onChange={(e) => handleNewCoChange(index, e)}
                            placeholder="CO Name"
                            className="w-full mb-3 border border-gray-300 rounded-md p-2"
                        />
                        <input
                            type="text"
                            name="cos_body"
                            value={co.cos_body}
                            onChange={(e) => handleNewCoChange(index, e)}
                            placeholder="CO Body"
                            className="w-full mb-3 border border-gray-300 rounded-md p-2"
                        />
                    </div>
                ))
            )}

            <table className="min-w-full divide-y divide-gray-200 border-collapse border border-gray-300 rounded-md">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border border-gray-300 px-4 py-2 text-left">COS Name</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">COS Body</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {formData.map((cos, index) => (
                        <tr key={index} className="border-b border-gray-300">
                            <td className="border border-gray-300 px-4 py-2">
                                <input
                                    type="text"
                                    name="cos_name"
                                    value={cos.cos_name}
                                    onChange={(e) => handleChange(index, e)}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    style={{ textTransform: 'uppercase' }}
                                />
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                <input
                                    type="text"
                                    name="cos_body"
                                    value={cos.cos_body}
                                    onChange={(e) => handleChange(index, e)}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                />
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                {/* <button
                                    type="button"
                                    onClick={() => handleEditCO(index)}
                                    className="bg-blue-600 text-white px-3 py-1 rounded-md mr-2"
                                >
                                    Edit CO
                                </button> */}
                                <button
                                    type="button"
                                    onClick={() => handleRemoveCO(index)}
                                    className="bg-blue-600 text-white px-3 py-1 rounded-md"
                                >
                                    Remove CO
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <button
                type="button"
                onClick={handleSubmit}
                className="bg-blue-500 text-white py-2 px-4 rounded-md mt-6 w-full"
                disabled={loading}
            >
                {loading ? <LoadingButton /> : "Save"}
            </button>
        </div>
    );
}
