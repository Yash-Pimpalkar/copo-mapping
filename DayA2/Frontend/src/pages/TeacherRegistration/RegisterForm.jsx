import React, { useState } from "react";
import axios from "axios";
import api from "../../api";
import LoadingButton from "../../component/Loading/Loading";


export default function RegistrationForm({ uid }) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [numCourses, setNumCourses] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState([
    {
      user_id: uid,
      course_code: "",
      sem: "",
      academic_year: "",
      branch: "",
      co_count: 1,
    },
  ]);

  const [errorMessage, setErrorMessage] = useState("");

  const handleNumCoursesChange = (e) => {
    const value = Math.max(1, Math.min(parseInt(e.target.value), 10)); // Restrict to range 1-10
    setNumCourses(value);
    const updatedFormData = Array.from({ length: value }, (_, index) => formData[index] || {
      user_id: uid,
      course_code: "",
      sem: "",
      academic_year: "",
      branch: "",
      co_count: 1,
    });
    setFormData(updatedFormData);
  };

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedFormData = [...formData];
    updatedFormData[index] = { ...updatedFormData[index], [name]: value };
    setFormData(updatedFormData);
  };

  const handleValidation = () => {
    const requiredFields = [
      "course_code",
      "sem",
      "academic_year",
      "branch",
      "co_count",
    ];

    for (const course of formData) {
      for (let field of requiredFields) {
        if (!course[field] || course[field].toString().trim() === "") {
          alert(`Please fill in the ${field} field for all courses.`);
          return false;
        }
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
        setLoading(true);
        console.log(formData)
        const response = await api.post(
          `http://localhost:8081/api/usercourse/`,
         {formData}
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
      } finally {
        setLoading(false);
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
          <div className="flex items-center mb-4">
            <label htmlFor="num_courses" className="block text-sm font-medium text-gray-700 mr-4">
              How many courses do you want to add?
            </label>
            <input
              type="number"
              id="num_courses"
              value={numCourses}
              onChange={handleNumCoursesChange}
              className="w-20 border border-gray-300 rounded-md shadow-sm p-2"
              min="1"
              max="10"
            />
          </div>

          {formData.map((course, index) => (
            <div key={index} className="space-y-4 border-b border-gray-300 pb-4 mb-4">
              <h2 className="text-xl mb-4 text-blue-400">Course {index + 1}</h2>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full sm:w-1/2 px-3">
                  <label
                    htmlFor={`co_count_${index}`}
                    className="block text-sm font-medium text-gray-700"
                  >
                    CO Count
                  </label>
                  <input
                    type="number"
                    id={`co_count_${index}`}
                    name="co_count"
                    value={course.co_count}
                    onChange={(e) => handleChange(index, e)}
                    className="w-full border border-gray-300 rounded-md shadow-sm p-2"
                    min="1"
                    max="10"
                  />
                </div>

                <div className="w-full sm:w-1/2 px-3">
                  <label
                    htmlFor={`sem_${index}`}
                    className="block text-sm font-medium text-gray-700"
                  >
                    Semester
                  </label>
                  <select
                    id={`sem_${index}`}
                    name="sem"
                    value={course.sem}
                    onChange={(e) => handleChange(index, e)}
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
                    htmlFor={`branch_${index}`}
                    className="block text-sm font-medium text-gray-700"
                  >
                    Branch
                  </label>
                  <select
                    id={`branch_${index}`}
                    name="branch"
                    value={course.branch}
                    onChange={(e) => handleChange(index, e)}
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
                    htmlFor={`academic_year_${index}`}
                    className="block text-sm font-medium text-gray-700"
                  >
                    Academic Year
                  </label>
                  <select
                    id={`academic_year_${index}`}
                    name="academic_year"
                    value={course.academic_year}
                    onChange={(e) => handleChange(index, e)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  >
                    <option value="">Select Year</option>
                    {yearList.map((year, yearIndex) => (
                      <option key={yearIndex} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <label
                    htmlFor={`course_code_${index}`}
                    className="block text-sm font-medium text-gray-700"
                  >
                    Course Code
                  </label>
                  <input
                    type="text"
                    id={`course_code_${index}`}
                    name="course_code"
                    value={course.course_code}
                    onChange={(e) => handleChange(index, e)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                </div>
              </div>
            </div>
          ))}

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
