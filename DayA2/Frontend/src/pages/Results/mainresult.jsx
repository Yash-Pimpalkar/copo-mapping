import React, { useEffect, useState } from "react";
import CourseSelector from "../../component/CourseSelector/CourseSelector";
import api from "../../api";
import Tcstyperesult from "./tcstyperesult";
import IntaTWUniv from './mathsintatwuniv'; 
import TWOnly from './physicsonlytw'; 
import Tworalresult from './tworalresult'; 
import PureTheoryResult from "./puretheoryresult";
import Tworalresultmini from "./tworalresultmini";
import Tworalresultmajor from "./tworalresultmajor";

const Mainresult = ({ uid }) => {
  // State for userCourseId, coming from CourseSelector
  const [userCourseId, setUserCourseId] = useState(null);
  const [Termworkdata, setTermworkdata] = useState(null);

  useEffect(() => {
    const fetchExperimentData = async () => {
      try {
        const response = await api.get(
          `/api/result/termwork/${userCourseId}`
        );
        // Ensure that you're setting the correct value for Termworkdata
        setTermworkdata(response.data[0].tw_id);
      } catch (error) {
        console.error("Error fetching experiment data:", error);
      }
    };

    if (userCourseId) {
      fetchExperimentData();
    }
  }, [userCourseId]);

  console.log(Termworkdata); // Check the value of Termworkdata in the console

  return (
    <div className="container mx-auto p-4 md:px-8 lg:px-10 bg-white shadow-lg rounded-lg">
      {/* Heading */}
      {/* <h1 className="text-3xl md:text-4xl font-bold text-blue-800 mb-6">
       
      </h1> */}

      <div className="flex flex-col items-center mb-6">
    {/* Centered Title */}
    <h1 className="text-3xl md:text-4xl lg:text-5xl text-blue-700 font-bold text-center pb-6">
    Results
    </h1>
 

      {/* Course Selector Card */}
      <div className="w-full max-w-lg md:max-w-2xl lg:max-w-3xl mb-6">
        <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200">
          <CourseSelector uid={uid} onUserCourseIdChange={setUserCourseId} />
        </div>
      </div>
      
      {/* Display course and academic year details */}
      {userCourseId && (
        <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-lg md:max-w-2xl lg:max-w-3xl border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Course and Academic Year Selected
          </h2>
          <p className="text-gray-700">
            Course ID: {userCourseId} {/* Display selected course and academic year */}
          </p>
        </div>
      )}
</div>
      {/* Conditional rendering based on Termworkdata */}
          <div>
      {Termworkdata !== null && (
        <>
          {Termworkdata === 9 ? (
            <Tcstyperesult uid={userCourseId} />
          ) : Termworkdata === 1 ? (
            <PureTheoryResult uid={userCourseId}/>
          ) : Termworkdata === 2 ? (
            <IntaTWUniv uid={userCourseId}/>
          ) : Termworkdata === 3 || Termworkdata === 8 || Termworkdata === 5 || Termworkdata === 6 || Termworkdata === 12 ? (
            <TWOnly uid={userCourseId} />
          ) : Termworkdata === 4 || Termworkdata === 7 || Termworkdata === 10 || Termworkdata === 11 ? (
            <Tworalresult uid={userCourseId} />
          ) : Termworkdata == 13  ? (
            <Tworalresultmini uid={userCourseId} />
          ) : Termworkdata == 14  ? (
            <Tworalresultmajor uid={userCourseId} />
          ) :null}
        </>
      )}
    </div>
    </div>
  );
};

export default Mainresult;
