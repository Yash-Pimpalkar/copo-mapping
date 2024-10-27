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
    const [codata, setCOsdata] = useState([]);

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
                    setCOsdata(fetchedCOData);
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

    const handleAddCO = () => {
        setFormData([...formData, { cos_name: '', cos_body: '' }]);
    };

    const handleSubmit = async () => {
        setLoading(true);
        setErrorMessage("");
        setSuccessMessage("");

        try {
            // Prepare data in the format the backend expects
            const updatedCos = formData.map((cos) => ({
                co_name: cos.cos_name,
                co_body: cos.cos_body,
                idcos: cos.idcos
            }));

            console.log(updatedCos);

            const data = {
                usercourse_id,
                updatedCos
            };

            console.log(data);

            // Send the data to the backend
            await api.put(`/api/cos/admin/update/${usercourse_id}`, data);

            setSuccessMessage("COS data updated successfully.");
        } catch (error) {
            console.error("Error updating COS data:", error);
            setErrorMessage("Failed to update COS data.");
        } finally {
            setLoading(false);
        }
    };

    const handleEditCO = (index) => {
        alert(`Edit CO at index ${index}`);
    };

    const handleRemoveCO = (index) => {
        const newFormData = formData.filter((_, i) => i !== index);
        setFormData(newFormData);
    };

    return (
        <div className="max-w-screen-md mx-auto p-6 border border-gray-300 shadow-lg rounded-md bg-white mt-10">
            <h1 className="text-2xl mb-6 text-blue-500 text-center">
                COS Form
            </h1>

            {errorMessage && (
                <div className="mb-4 text-red-500">
                    {errorMessage}
                </div>
            )}

            {successMessage && (
                <div className="mb-4 text-green-500">
                    {successMessage}
                </div>
            )}

            <button
                type="button"
                onClick={handleAddCO}
                className="bg-blue-500 text-white py-2 px-4 rounded-md mb-4"
            >
                Add CO
            </button>

            <table className="w-full border-collapse border border-gray-300 rounded-sm">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border border-gray-300 px-4 py-2 text-left">COS Name</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">COS Body</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
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
                                <button
                                    type="button"
                                    onClick={() => handleEditCO(index)}
                                    className="bg-blue-600 text-white px-3 py-1 rounded-md mr-2"
                                >
                                    Edit CO
                                </button>
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
                {loading ? <LoadingButton /> : "Submit"}
            </button>
        </div>
    );
}
