import React, { useEffect, useState } from "react";
import api from "../../api";
import LoadingButton from "../../component/Loading/Loading";

const UploadOral = ({ uid }) => {
  const [courses, setCourses] = useState([]);
  const [distinctCourses, setDistinctCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [numQuestions, setNumQuestions] = useState(1); // Default to 1
  const [formData, setFormData] = useState({});
  const [questions, setQuestions] = useState([]);
  const [userCourseId, setUserCourseId] = useState(null);
  const [cocount, SetCoCount] = useState(null);
  const [error, setError] = useState(null); // Error state
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/api/copo/${uid}`);
        setCourses(res.data);
        const distinct = Array.from(
          new Set(res.data.map((course) => course.course_name))
        ).map((course_name) => ({
          course_name,
          academic_year: res.data.find(
            (course) => course.course_name === course_name
          ).academic_year,
        }));

        setDistinctCourses(distinct);
      } catch (error) {
        console.error("Error fetching course data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (uid) {
      fetchCourseData();
    }
  }, [uid]);

  const handleCourseChange = (event) => {
    const selectedCourse = event.target.value;
    setSelectedCourse(selectedCourse);
    setSelectedYear("");
    setQuestions([]);
    setFormData({});
    setUserCourseId(
      courses.find((course) => course.course_name === selectedCourse)
        ?.usercourse_id || null
    );
  };

  const handleYearChange = (event) => {
    const selectedYear = event.target.value;
    setSelectedYear(selectedYear);
    setQuestions([]);
    setFormData({});
  };

  const handleNumQuestionsChange = () => {
    const num = 1; // Default to 1 question, non-changeable
    setNumQuestions(num);

    const initialQuestions = Array.from({ length: num }, (_, index) => ({
      qid: index + 1,
      cocount: "",
      marks: 25, // Default to 25
    }));
    setQuestions(initialQuestions);

    // Initialize formData with default values
    const initialFormData = initialQuestions.reduce((acc, question, index) => {
      acc[index] = {
        cocount: "",
        marks: 25, // Default to 25
      };
      return acc;
    }, {});

    setFormData(initialFormData);
  };

  useEffect(() => {
    if (userCourseId && selectedYear) handleNumQuestionsChange();
  }, [userCourseId, selectedYear]);

  const handleFormChange = (index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [index]: {
        ...prev[index],
        [field]:
          field === "marks"
            ? isNaN(value) || value === ""
              ? ""
              : Number(value)
            : value.toUpperCase(), // Handle marks as number
      },
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!userCourseId) {
      alert("Please select a valid course and academic year.");
      return;
    }

    // Format data
    const formattedData = Object.entries(formData).reduce(
      (acc, [key, data]) => {
        acc[key] = {
          marks: parseInt(data.marks, 10) || 0, // Convert marks to number
          usercourseid: userCourseId,
          cocount: cocount || "",
        };
        return acc;
      },
      {}
    );

    try {
      setLoading(true);
      console.log(formattedData);
      console.log("Submitting started");
      await api.post("/api/oral/create", {
        formDataWithUserCourseId: formattedData,
      });
      console.log("Submitting completed");
      alert("Data submitted successfully");
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error("Error submitting data:", error);
      setError(error.response?.data?.error || "Failed to submit data"); // Set error message
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchCoCount = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/api/usercourse/cocount/${userCourseId}`);
        SetCoCount(res.data[0].co_count);
      } catch (error) {
        console.error("Error fetching CO count:", error);
      } finally {
        setLoading(false);
      }
    };
    if (userCourseId && selectedYear) {
      fetchCoCount();
    }
  }, [userCourseId, selectedYear]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Upload Oral</h1>

      <div className="mb-4">
        <label
          htmlFor="course-select"
          className="block text-sm font-medium text-gray-700"
        >
          Select a Course
        </label>
        <select
          id="course-select"
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          value={selectedCourse}
          onChange={handleCourseChange}
        >
          <option value="">Select a course</option>
          {distinctCourses.map((course, index) => (
            <option key={index} value={course.course_name}>
              {course.course_name}
            </option>
          ))}
        </select>
      </div>

      {selectedCourse && (
        <div className="mb-4">
          <label
            htmlFor="year-select"
            className="block text-sm font-medium text-gray-700"
          >
            Select Academic Year
          </label>
          <select
            id="year-select"
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={selectedYear}
            onChange={handleYearChange}
          >
            <option value="">Select an academic year</option>
            {courses
              .filter((course) => course.course_name === selectedCourse)
              .map((course) => (
                <option key={course.usercourse_id} value={course.academic_year}>
                  {course.academic_year}
                </option>
              ))}
          </select>
        </div>
      )}

      {selectedCourse && selectedYear && (
        <div className="mb-4">
          <div className="text-center">{numQuestions}</div>
        </div>
      )}

      {questions.length > 0 && (
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            {questions.map((question, index) => (
              <div
                key={question.qid}
                className="p-4 border rounded-md shadow-sm"
              >
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="col-span-1">
                    <label className="block text-sm text-center font-medium text-gray-700 uppercase">
                      Index
                    </label>
                    <div className="text-center">{question.qid}</div>
                  </div>
                  <div className="col-span-1">
                    <label className="block text-sm text-center font-medium text-gray-700 uppercase">
                      CO COUNT
                    </label>
                    <div className="text-center"> {cocount}</div>
                  </div>
                  <div className="col-span-1">
                    <label className="block text-sm text-center font-medium text-gray-700 uppercase">
                      Max Marks
                    </label>
                    <input
                      type="text" // Changed type to text
                      value={formData[index]?.marks || ""} // Default 80 handled in formData initialization
                      onChange={(e) =>
                        handleFormChange(index, "marks", e.target.value)
                      }
                      className="mt-1 block text-center w-full border border-gray-300 rounded-md shadow-sm"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          {error && (
            <div className="mt-4 text-red-600 text-center font-medium">
              {error}
            </div>
          )}
          <div className="flex justify-center">
            <button
              type="submit"
              className="mt-4 py-2 px-4 bg-indigo-500 text-white rounded-md shadow-md hover:bg-indigo-600 focus:outline-none"
            >
              Submit
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default UploadOral;
