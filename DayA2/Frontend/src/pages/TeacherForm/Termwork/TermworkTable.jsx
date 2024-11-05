import React, { useEffect, useState } from "react";
import CourseSelector from "../../../component/CourseSelector/CourseSelector";
import api from "../../../api";
import TheoryOnly from "./TheoryOnly";
import TheoryAssignment from "./TheoryAssignment";
import Attendance from "./Attendance";
import Experiment from "./Experiment";
import SciLab from "./Scilab";
import MiniProject from "./MiniProject";
import GroupDiscussion from "./GroupDiscussion"; 
import PPT from "./PPT";
import Report from "./Report";
import Journal from "./JournalTable";
import Trade from "./Trade";
import AttainmentListDisplay from "./AttainmentListDisplay";
const TermworkTable = ({ uid }) => {
  const [userCourseId, setUserCourseId] = useState(null);
  const [twdata, setTwData] = useState(null);
  const [currentComponent, setCurrentComponent] = useState("TheoryAssignment");
  const [attainmentList, setAttainmentList] = useState([]); // State for attainment list
  const [experimentList, setExperimentList] = useState([]); // 
  const [miniprojectList, setminiprojectList] = useState([]);

  const [tw_id ,setTWid]= useState(0)  // const [showAttainmentList, setShowAttainmentList] = useState(false); 
  useEffect(() => {
    const fetchTermworkLabels = async () => {
      try {
        const response = await api.get(`/api/termwork/gettermworkdata/${userCourseId}`);
        setTwData(response.data);
       
      } catch (error) {
        console.error("Error fetching termwork labels:", error);
      }
    };

    if (userCourseId) {
      fetchTermworkLabels();
    }
  }, [userCourseId]);


  const updateAttainmentList = (list) => {
    setAttainmentList(list);
    
  };

  // Function to update the experiment list
  const updateExperimentList = (list) => {
    setExperimentList(list);
  };

  const updateMiniProjectList = (list) => {
    setminiprojectList(list);
  };
//  console.log(experimentList,attainmentList)
useEffect(() => {
  if (twdata && twdata.length > 0) {
    setTWid(twdata[0].twid); // Assuming setTWid is a state setter function
  }
}, [twdata]); // Dependency array should be closed correctly

console.log(tw_id)
useEffect(() => {
  // Clear local storage whenever tw_id changes
  localStorage.removeItem("AssignmentAttainmentData");
localStorage.removeItem("ExperimentAttainmentData");
 localStorage.removeItem("MiniProjectAttainmentData"); // Assuming mini-project data is stored similarly
 localStorage.removeItem("PPTAttainmentData"); // For PPT
   localStorage.removeItem("ReportAttainmentData"); // For report
localStorage.removeItem("TradeAttainmentData"); // For trade
  localStorage.removeItem("JournalAttainmentData");
  localStorage.removeItem("ScilabAttainmentData")
  console.log("Local storage cleared due to tw_id change.");
}, [tw_id]);
  return (
    <div className="min-h-screen flex flex-col items-center bg-white p-6">
      {/* Heading */}
      <h1 className="text-3xl md:text-4xl font-bold text-blue-800 mb-6">
        Termwork
      </h1>

      {/* Course Selector */}
      <div className="w-full max-w-lg md:max-w-2xl lg:max-w-3xl mb-6">
        <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200">
          <CourseSelector uid={uid} onUserCourseIdChange={setUserCourseId} />
        </div>
      </div>


      {twdata && twdata.length > 0 && (
        <>
          {twdata[0].twid === 1 ? (
            <TheoryOnly />
          ) : twdata[0].twid === 2 ? (
            <>
              {currentComponent === "TheoryAssignment" ? (
                <>
                  <TheoryAssignment  tw_id={tw_id}  userCourseId={userCourseId}   onUpdateAttainmentList={updateAttainmentList}  />
                  <button 
                    onClick={() => setCurrentComponent("Attendance")}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                  >
                    Next: Show Attendance
                  </button>
                </>
              ) : currentComponent === "Attendance" ? (
                <>
                  <Attendance   tw_id={tw_id}  uid={userCourseId} />
                  <button
                    onClick={() => setCurrentComponent("SciLab")}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                  >
                    Next: Show Scilab
                  </button>
                  <button
                    onClick={() => setCurrentComponent("TheoryAssignment")}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded ml-2"
                  >
                    Back to Theory Assignment
                  </button>
                </>
              ) : (
                <>
                  <SciLab  tw_id={tw_id}  uid={userCourseId} />
                  <button
                    onClick={() => setCurrentComponent("Attendance")}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                  >
                    Back to Attendance
                  </button>
                </>
              )}
            </>
          ) : twdata[0].twid === 3 ? (
            <>
              {currentComponent === "Experiment" ? (
                <>
                  <Experiment  tw_id={tw_id}  userCourseId={userCourseId}  updateExperimentList={updateExperimentList}/>
                  <button
                    onClick={() => setCurrentComponent("Attendance")}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                  >
                    Next: Show Attendance
                  </button>
                </>
              ) : currentComponent === "Attendance" ? (
                <>
                  <Attendance  tw_id={tw_id}  uid={userCourseId} />
                  <button
                    onClick={() => setCurrentComponent("MiniProject")}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                  >
                    Next: Show Mini Project
                  </button>
                </>
              ) : (
                <>
                  <MiniProject  tw_id={tw_id}  userCourseId={userCourseId}  onUpdateMiniProjectList={updateMiniProjectList}  />
                  <button
                    onClick={() => setCurrentComponent("Experiment")}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                  >
                    Back to Experiment
                  </button>
                </>
              )}
            </>
          ) : twdata[0].twid === 4 ? (
            <>
              {currentComponent === "TheoryAssignment" ? (
                <>
                   <TheoryAssignment  tw_id={tw_id}  userCourseId={userCourseId}   onUpdateAttainmentList={updateAttainmentList}  />
                  <button
                    onClick={() => setCurrentComponent("Attendance")}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                  >
                    Next: Show Attendance
                  </button>
                </>
              ) : (
                <>
                  <Attendance  tw_id={tw_id}  uid={userCourseId} />
                  <button
                    onClick={() => setCurrentComponent("TheoryAssignment")}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                  >
                    Back to Theory Assignment
                  </button>
                </>
              )}
            </>
          ) : twdata[0].twid === 5 || twdata[0].twid === 10 ? (
            <>
              {currentComponent === "Experiment" ? (
                <>
                  <Experiment  tw_id={tw_id}  userCourseId={userCourseId}  updateExperimentList={updateExperimentList}/>
                  <button
                    onClick={() => setCurrentComponent("TheoryAssignment")}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                  >
                    Next: Show Theory Assignment
                  </button>
                </>
              ) : currentComponent === "TheoryAssignment" ? (
                <>
                    <TheoryAssignment  tw_id={tw_id}  userCourseId={userCourseId}   onUpdateAttainmentList={updateAttainmentList}  />
                  <button
                    onClick={() => setCurrentComponent("Attendance")}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                  >
                    Next: Show Attendance
                  </button>
                </>
              ) : (
                <>
                  <Attendance  tw_id={tw_id}  uid={userCourseId} />
                  <button
                    onClick={() => setCurrentComponent("Experiment")}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                  >
                    Back to Experiment
                  </button>
                </>
              )}
            </>
          ) : twdata[0].twid === 6 || twdata[0].twid === 11  ? (
            <>
              {currentComponent === "Experiment" ? (
                <>
                   <Experiment  tw_id={tw_id}  userCourseId={userCourseId}  updateExperimentList={updateExperimentList}/>
                  <button
                    onClick={() => setCurrentComponent("TheoryAssignment")}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                  >
                    Next: Show Theory Assignment
                  </button>
                </>
              ) : currentComponent === "TheoryAssignment" ? (
                <>
                     <TheoryAssignment  tw_id={tw_id}  userCourseId={userCourseId}   onUpdateAttainmentList={updateAttainmentList}  />
                  <button
                    onClick={() => setCurrentComponent("Attendance")}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                  >
                    Next: Show Attendance
                  </button>
                </>
              ) : currentComponent === "Attendance" ? (
                <>
                  <Attendance  tw_id={tw_id}  uid={userCourseId} />
                  <button
                    onClick={() => setCurrentComponent("MiniProject")}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                  >
                    Next: Show Mini Project
                  </button>
                </>
              ) : (
                <>
                  <MiniProject  tw_id={tw_id}  userCourseId={userCourseId}   onUpdateMiniProjectList={updateMiniProjectList} />
                  <button
                    onClick={() => setCurrentComponent("Experiment")}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                  >
                    Back to Experiment
                  </button>
                </>
              )}
            </>
          ) : twdata[0].twid === 7 ? (
            <>
              {currentComponent === "TheoryAssignment" ? (
                <>
                  <TheoryAssignment  tw_id={tw_id}  userCourseId={userCourseId}   onUpdateAttainmentList={updateAttainmentList}  />
                  <button
                    onClick={() => setCurrentComponent("Attendance")}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                  >
                    Next: Show Attendance
                  </button>
                </>
              ) : currentComponent === "Attendance" ? (
                <>
                  <Attendance  tw_id={tw_id}  uid={userCourseId} />
                  <button
                    onClick={() => setCurrentComponent("PPT")}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                  >
                    Next: Show PPT
                  </button>
                </>
              ) : currentComponent === "PPT" ? (
                <>
                  <PPT  tw_id={tw_id}  uid={userCourseId} />
                  <button
                    onClick={() => setCurrentComponent("Report")}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                  >
                    Next: Show Report
                  </button>
                </>
              ) : (
                <>
                  <Report  tw_id={tw_id}  uid={userCourseId} />
                  <button
                    onClick={() => setCurrentComponent("TheoryAssignment")}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                  >
                    Back to Assignment
                  </button>
                </>
              )}
            </>
          ) : twdata[0].twid === 8 ? (
            <>
              {currentComponent === "Attendance" ? (
                <>
                  <Attendance  tw_id={tw_id}  uid={userCourseId} />
                  <button
                    onClick={() => setCurrentComponent("Trade")}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                  >
                    Next: Show Trade
                  </button>
                </>
              ) : currentComponent === "Trade" ? (
                <>
                  <Trade  tw_id={tw_id}  uid={userCourseId} />
                  <button
                    onClick={() => setCurrentComponent("Journal")}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                  >
                    Next: Show Journal
                  </button>
                </>
              ) : (
                <>
                  <Journal  tw_id={tw_id}  uid={userCourseId} />
                  <button
                    onClick={() => setCurrentComponent("Trade")}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                  >
                    Back to Trade
                  </button>
                </>
              )}
            </>
          ) : (
            <>
              {currentComponent === "TheoryAssignment" ? (
                <>
                   <TheoryAssignment  tw_id={tw_id}  userCourseId={userCourseId}   onUpdateAttainmentList={updateAttainmentList}  />
                  <button
                    onClick={() => setCurrentComponent("Attendance")}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                  >
                    Next: Show Attendance
                  </button>
                
           
          
                </>
              ) : (
                <>
                  <Attendance  tw_id={tw_id}  uid={userCourseId} />
                  <button
                    onClick={() => setCurrentComponent("TheoryAssignment")}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                  >
                    Back to Theory Assignment
                  </button>
                </>
              )}
              
              
            </>
          )}
          
          <AttainmentListDisplay 
              userCourseId={userCourseId}
              tw_id={tw_id}  // Pass the experiment list
            />
        </>
      )}
    </div>
  );
};


export default TermworkTable;
