import React, { useEffect, useState } from "react";
import api from "../../api";

const UploadSem = ({ uid }) => {
  const [courses, setCourses] = useState([]);
  const [distinctCourses, setDistinctCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [numQuestions, setNumQuestions] = useState(0);
  const [formData, setFormData] = useState({});
  const [questions, setQuestions] = useState([]);
  const [userCourseId, setUserCourseId] = useState(null);
  const [cocount, SetCoCount] = useState(null);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
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
      }
    };

    if (uid) {
      fetchCourseData();
    }
  }, [uid]);
  // console.log(cocount)
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
  console.log(selectedCourse);
  const handleYearChange = (event) => {
    const selectedYear = event.target.value;
    setSelectedYear(selectedYear);
    setQuestions([]);
    setFormData({});
  };

  const handleNumQuestionsChange = () => {
    const num = 1; // Limit to max 10 questions
    setNumQuestions(num);
    setQuestions(
      Array.from({ length: num }, (_, index) => ({
        qid: index + 1,
        qname: "",
        cocount: "",
        marks: 0,
      }))
    );
  };

  useEffect(() => {
    if (userCourseId && selectedYear) handleNumQuestionsChange();
  }, [userCourseId, selectedYear]);

  const handleFormChange = (index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [index]: {
        ...prev[index],
        [field]: value.toUpperCase(), // Convert input to uppercase
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
          qname: data.qname || "",
          cocount: cocount || "",
          marks: parseInt(data.marks, 80) || 0, // Convert marks to number
          usercourseid: userCourseId,
        };
        return acc;
      },
      {}
    );

    try {
      console.log(formattedData);
      await api.post("/api/ia/create/ia2", {
        formDataWithUserCourseId: formattedData,
      });
      alert("Data submitted successfully");
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("Failed to submit data");
    }
  };

  useEffect(() => {
    const fetchCoCount = async () => {
      try {
        // console.log(userCourseId)
        const res = await api.get(`/api/usercourse/cocount/${userCourseId}`);
        //   console.log(res.data)
        SetCoCount(res.data[0].co_count);
      } catch (error) {
        console.error("Error fetching course data:", error);
      }
    };
    if (userCourseId && selectedYear) {
      fetchCoCount();
    }
  }, [userCourseId, selectedYear]);
  //  console.log(cocount)
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Upload Sem</h1>

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
          <label
            htmlFor="num-questions"
            className="block text-sm font-medium text-gray-700"
          >
            Number of Questions (Max 10)
          </label>
          {/* <input
            id="num-questions"
            type="number"
            value={numQuestions}
            onChange={handleNumQuestionsChange}
            min="0"
            max="10"
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          /> */}

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
                <div className="grid grid-cols-4 gap-4 mb-4">
                  <div className="col-span-1">
                    <label className="block text-sm text-center font-medium text-gray-700 uppercase">
                      Index
                    </label>
                    <div className="text-center">{question.qid}</div>
                  </div>
                  <div className="col-span-1">
                    <label className="block text-sm text-center font-medium text-gray-700 uppercase">
                      Question Name
                    </label>
                    <input
                      type="text"
                      value={formData[index]?.qname || question.qname || "MARKS"}
                      onChange={(e) =>
                        handleFormChange(index, "qname", e.target.value)
                      }
                      className="mt-1 block text-center w-full border border-gray-300 rounded-md shadow-sm"
                    />
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
                    type="number"
                    value={formData[index]?.marks || question.marks || 80}
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
          <button
            type="submit"
            className="mt-4 py-2 px-4 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700"
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default UploadSem;
