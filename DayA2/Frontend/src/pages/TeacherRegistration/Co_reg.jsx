import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import api from "../../api"; // Ensure this module is properly configured
import LoadingButton from "../../component/Loading/Loading";

export default function Cos_reg() {
    const location = useLocation();
    const { co_count, usercourse_id } = location.state;
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formData, setFormData] = useState(
        Array.from({ length: co_count }, (_, index) => ({ 
            cos_name: `CO${index + 1}`, 
            cos_body: "" 
        }))
    );

    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState(""); 

    const handleChange = (index, e) => {
        const { name, value } = e.target;
        const updatedFormData = [...formData];
        updatedFormData[index] = { ...updatedFormData[index], [name]: value };
        setFormData(updatedFormData);
    };
    console.log(data)
    const handleValidation = () => {
        const requiredFields = ["cos_name", "cos_body"];

        for (const cos of formData) {
            for (let field of requiredFields) {
                if (cos[field].length === 0) {
                    alert(`Please fill in the ${field} field.`);
                    return false;
                }
            }
        }

        return true;
    };

    const handleSubmit = async () => {
        if (handleValidation()) {
            try {
                setLoading(true);
                const response = await axios.post(
                    'http://localhost:8081/api/cos/add',
                    { formData, usercourse_id }
                );
                console.log('Successfully added COS records:', response.data);
                setSuccessMessage(response.data.message || "COS records added successfully!");
                setErrorMessage("");
                setIsSubmitted(true);
            } catch (error) {
                if (error.response && error.response.data) {
                    setErrorMessage(error.response.data.error || "An unknown error occurred.");
                } else {
                    setErrorMessage("There was an error saving the COS records. Please try again.");
                }
            } finally {
                setLoading(false);
            }
        }
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

            <form className="space-y-4">
                {formData.map((cos, index) => (
                    <div key={index} className="flex flex-wrap -mx-2 mb-4 justify-center">
                        <div className="w-full sm:w-1/2 px-3">
                            <label 
                                htmlFor={`cos_name_${index}`} 
                                className="block text-sm font-medium text-gray-700"
                                style={{ textTransform: 'uppercase' }} 
                            >
                                COS Name
                            </label>
                            <input
                                type="text"
                                id={`cos_name_${index}`}
                                name="cos_name"
                                value={cos.cos_name}
                                onChange={(e) => handleChange(index, e)}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                style={{ textTransform: 'uppercase' }}
                            />
                        </div>

                        <div className="w-full sm:w-1/2 px-3">
                            <label htmlFor={`cos_body_${index}`} className="block text-sm font-medium text-gray-700">
                                COS Body
                            </label>
                            <input
                                type="text"
                                id={`cos_body_${index}`}
                                name="cos_body"
                                value={cos.cos_body}
                                onChange={(e) => handleChange(index, e)}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                            />
                        </div>
                    </div>
                ))}

                <button
                    type="button"
                    onClick={handleSubmit}
                    className="w-70 bg-blue-500 text-white py-2 px-4 rounded-md mt-6"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}
