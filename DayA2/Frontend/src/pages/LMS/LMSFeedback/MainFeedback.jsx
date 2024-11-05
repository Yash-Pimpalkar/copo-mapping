import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../../api";
import PreviewQuestions from "./PreviewQuestions";
import LoadingButton from "../../../component/Loading/Loading";
import CourseSelector from "../../../component/CourseSelector/CourseSelector";
import dummyfeedback from "./dummyfeedback";
import Dummyfeedback from "./dummyfeedback";
import FeedbackForm from "./FeedbackForm";
import Analysis from "./Analysis";
import Responses from "./Responses";

// Helper function to format the date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return (
    date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }) +
    ", " +
    date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
  );
};

const FeedbackPage = ({ uid }) => {
  const [showActualFeedback, setShowActualFeedback] = useState(false);
  const [showResponseFeedback, setShowResponseFeedback] = useState(false);
  const [showDummyFeedback, setShowDummyFeedback] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [courses, setCourses] = useState([]);
  const [distinctCourses, setDistinctCourses] = useState([]);
  const [Err, setErr] = useState();
  const [FeedbackData, setFeedbackData] = useState([]);
  const [COsData, setCOsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [QuestionData, setQuestionData] = useState([]);
  const [userCourseId, setUserCourseId] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/lms/editlmsquestions/${userCourseId}`);
  };
  console.log(uid);

  // Fetch courses on mount
  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/api/copo/${uid}`);
        setCourses(res.data);
        console.log(res.data);

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

  // Handle course selection change
  const handleCourseChange = (event) => {
    const selectedCourse = event.target.value;
    setSelectedCourse(selectedCourse);
    setSelectedYear("");
    setUserCourseId(null);
  };

  console.log(userCourseId);

  // Handle year selection change
  const handleYearChange = (event) => {
    const selectedYear = event.target.value;
    setSelectedYear(selectedYear);
    const course = courses.find(
      (course) =>
        course.course_name === selectedCourse &&
        course.academic_year === selectedYear
    );
    setUserCourseId(course?.usercourse_id || null);
  };

  useEffect(() => {
    const fetchFeedbackData = async () => {
      if (userCourseId) {
        setErr("");
        setLoading(true);
        try {
          console.log("userCourseId", userCourseId);
          console.log("Reached here");
          const res = await api.get(
            `/api/lmsclassroom/feedback/show/teacher/${userCourseId}`
          );
          const fetchedFeedbackData = res.data.feedbackData;
          console.log("fetchedFeedbackData", fetchedFeedbackData);
          setFeedbackData(fetchedFeedbackData);
          console.log(fetchedFeedbackData);
        } catch (error) {
          console.error("Error fetching feedback data:", error);
          setErr(error.response?.data?.error || "An unexpected error occurred");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchFeedbackData();
  }, [userCourseId]);

  console.log(FeedbackData);

  // Function to toggle the display of dummyfeedback content
  const handlePreviewClick = () => {
    setShowDummyFeedback(!showDummyFeedback);
  };

  const handleActualClick = () => {
    setShowActualFeedback(!showActualFeedback);
  };

  const handleAnalysisClick = () => {
    setShowAnalysis(!showAnalysis);
  };

  const handleResponseClick = () => {
    setShowResponseFeedback(!showResponseFeedback);
  };

  return (
    <>
      <div className="p-4 sm:p-8 lg:p-12 bg-gray-100 min-h-screen flex flex-col items-center bg-gradient-to-r from-blue-50 to-blue-100">
        {/* Header */}
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md w-full max-w-8xl">
          <h2 className="text-lg sm:text-xl font-semibold">Feedback</h2>

          {/* Tabs */}
          <div className="flex flex-wrap justify-between sm:justify-start space-y-2 sm:space-y-0 space-x-0 sm:space-x-4 mt-4 border-b border-gray-200">
            <button className="py-2 px-4 w-full sm:w-auto border-b-0 border-blue-500 text-gray-600 font-medium hover:text-blue-500 font-medium">
              Feedback
            </button>
            {/* <button className="py-2 px-4 w-full sm:w-auto text-gray-600">Settings</button>
                        <button className="py-2 px-4 w-full sm:w-auto text-gray-600">Templates</button> */}
            <button
              onClick={handleAnalysisClick}
              className="py-2 px-4 w-full sm:w-auto text-gray-600 font-medium hover:text-blue-500 font-medium"
            >
              Analysis
            </button>
            <button
              onClick={handleResponseClick}
              className="py-2 px-4 w-full sm:w-auto text-gray-600 font-medium hover:text-blue-500 font-medium"
            >
              Responses
            </button>
          </div>

          {/* Course Selector */}
          <div className="w-full mt-6">
            <div className="bg-white shadow-lg rounded-xl p-4 sm:p-6 md:p-8 border border-gray-200">
              <CourseSelector
                uid={uid}
                onUserCourseIdChange={setUserCourseId}
              />
            </div>
          </div>

          {userCourseId &&
            !showAnalysis &&
            !showResponseFeedback &&
            FeedbackData &&
            FeedbackData.length > 0 && (
              <>
                {/* Feedback Box */}
                <div className="mt-6 bg-gray-50 p-4 rounded-lg border border-gray-200 shadow-sm">
                  <p className="mt-4 text-gray-700">
                    <span className="font-semibold">Opened:</span>{" "}
                    {FeedbackData[0].created_at
                      ? formatDate(FeedbackData[0].created_at)
                      : "N/A"}
                    <br />
                    <span className="font-semibold">Closes:</span>{" "}
                    {FeedbackData[0].deadline
                      ? formatDate(FeedbackData[0].deadline)
                      : "N/A"}
                  </p>
                </div>
              </>
            )}
          {userCourseId && (
            <>
              <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0 mt-6">
                <button
                  onClick={handleNavigate}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 hover:text-white w-full sm:w-auto text-center"
                >
                  Edit Questions
                </button>
                <button
                  onClick={handlePreviewClick}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 hover:text-white w-full sm:w-auto text-center"
                >
                  Preview questions
                </button>
                {/* <button onClick={handleActualClick} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 hover:text-white w-full sm:w-auto text-center">
                                    Answer the questions
                                </button> */}
              </div>

              {/* Dummy Feedback Content */}
              {showDummyFeedback && !showActualFeedback && (
                <div className="mt-6 bg-gray-50 p-4 rounded-lg border border-gray-200 shadow-sm">
                  <PreviewQuestions uid={userCourseId} />
                </div>
              )}
              {showActualFeedback && !showDummyFeedback && (
                <div className="mt-6 bg-gray-50 p-4 rounded-lg border border-gray-200 shadow-sm">
                  <FeedbackForm uid={userCourseId} />
                </div>
              )}
            </>
          )}

          {showAnalysis && !showResponseFeedback && (
            <div className="mt-6 bg-gray-50 p-4 rounded-lg border border-gray-200 shadow-sm">
              <Analysis usercourseid={userCourseId} />
            </div>
          )}

          {showResponseFeedback && !showAnalysis && (
            <div className="mt-6 bg-gray-50 p-4 rounded-lg border border-gray-200 shadow-sm">
              <Responses uid={userCourseId} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default FeedbackPage;
