import React, { useState } from "react";
import axios from "axios";
import api from "../../api";

export default function RegistrationForm({ uid }) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [numCourses, setNumCourses] = useState(1);
  const [formData, setFormData] = useState({
    user_id: uid,
    course_code: "",
    sem: "",
    academic_year: "",
    branch: "",
    co_count: 1,
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleNumCoursesChange = (e) => {
    const value = Math.max(1, Math.min(parseInt(e.target.value), 10)); // Restrict to range 1-10
    setNumCourses(value);
    setFormData({ ...formData, co_count: value });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleValidation = () => {
    const requiredFields = [
      "course_code",
      "sem",
      "academic_year",
      "branch",
      "co_count",
    ];

    for (let field of requiredFields) {
      if (!formData[field] || formData[field].toString().trim() === "") {
        alert(`Please fill in the ${field} field.`);
        return false;
      }
    }

    return true;
  };

  const generateYearList = () => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // getMonth() returns month from 0 to 11
    const startMonth = 6; // Assuming startMonth is June (6)

    const academicYear = (year, month) => {
      if (month >= startMonth) {
        return `${year}-${year + 1}`;
      } else {
        return `${year - 1}-${year}`;
      }
    };

    let yearList = [];
    for (let i = -5; i <= 2; i++) {
      let year = currentYear + i;
      yearList.push(academicYear(year, currentMonth));
    }

    return yearList;
  };

  const yearList = generateYearList();

  const handleProceedClick = async () => {
    if (handleValidation()) {
      try {
        const response = await api.post(
          `http://localhost:8081/api/usercourse/`,
          {
            user_id: formData.user_id,
            course_code: formData.course_code,
            sem: formData.sem,
            academic_year: formData.academic_year,
            branch: formData.branch,
            co_count: formData.co_count,
          }
        );

        console.log("Successfully updated record:", response.data);
        setIsSubmitted(true);
        setErrorMessage("");
      } catch (error) {
        if (error.response && error.response.data) {
          setErrorMessage(error.response.data.error || "An error occurred.");
        } else {
          setErrorMessage(
            "There was an error saving the registration. Please try again."
          );
        }
      }
    }
  };

  return (
    <div className="max-w-screen-md mx-auto p-6 border border-gray-300 shadow-lg rounded-md bg-white mt-10">
      <h1 className="text-2xl mb-6 text-blue-500 text-center">
        User Course Form
      </h1>
      {errorMessage && (
        <div className="mb-4 text-red-500">
          {typeof errorMessage === "string"
            ? errorMessage
            : JSON.stringify(errorMessage)}
        </div>
      )}

      {isSubmitted ? (
        <div className="text-green-500 text-center mb-4">
          Registration successful!
        </div>
      ) : (
        <form className="space-y-4">
          <div className="flex flex-wrap -mx-3 mb-4">
            <div className="w-full sm:w-1/2 px-3">
              <label
                htmlFor="co_count"
                className="block text-sm font-medium text-gray-700"
              >
                CO Count
              </label>
              <input
                type="number"
                id="co_count"
                name="co_count"
                value={numCourses}
                onChange={handleNumCoursesChange}
                className="w-full border border-gray-300 rounded-md shadow-sm p-2"
                min="1"
                max="10"
              />
            </div>

            <div className="w-full sm:w-1/2 px-3">
              <label
                htmlFor="sem"
                className="block text-sm font-medium text-gray-700"
              >
                Semester
              </label>
              <select
                id="sem"
                name="sem"
                value={formData.sem}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              >
                <option value="">Select Semester</option>
                <option value="1">1st</option>
                <option value="2">2nd</option>
                <option value="3">3rd</option>
                <option value="4">4th</option>
                <option value="5">5th</option>
                <option value="6">6th</option>
                <option value="7">7th</option>
                <option value="8">8th</option>
              </select>
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-4">
            <div className="w-full sm:w-1/2 px-3">
              <label
                htmlFor="branch"
                className="block text-sm font-medium text-gray-700"
              >
                Branch
              </label>
              <select
                id="branch"
                name="branch"
                value={formData.branch}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              >
                <option value="">Select Branch</option>
                <option value="Comps">Comps</option>
                <option value="IT">IT</option>
                <option value="AIDS">AIDS</option>
                <option value="EXTC">EXTC</option>
              </select>
            </div>

            <div className="w-full sm:w-1/2 px-3">
              <label
                htmlFor="academic_year"
                className="block text-sm font-medium text-gray-700"
              >
                Academic Year
              </label>
              <select
                id="academic_year"
                name="academic_year"
                value={formData.academic_year}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              >
                <option value="">Select Year</option>
                {yearList.map((year, index) => (
                  <option key={index} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-4">
            <div className="w-full px-3">
              <label
                htmlFor="course_code"
                className="block text-sm font-medium text-gray-700"
              >
                Course Code
              </label>
              <input
                type="text"
                id="course_code"
                name="course_code"
                value={formData.course_code}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
          </div>

          <button
            type="button"
            className="w-full bg-blue-500 text-white p-2 rounded-md shadow-sm hover:bg-blue-600 transition duration-300"
            onClick={handleProceedClick}
          >
            Proceed to Academic Details
          </button>
        </form>
      )}
    </div>
  );
}
