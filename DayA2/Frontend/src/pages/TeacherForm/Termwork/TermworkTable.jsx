import React, { useEffect, useState } from "react";
import CourseSelector from "../../../component/CourseSelector/CourseSelector";
import api from "../../../api";
import TheoryOnly from "./TheoryOnly";
import TheoryAssignment from "./TheoryAssignment";
import Experiment from "./Experiment";

const TermworkTable = ({ uid }) => {
  const [userCourseId, setUserCourseId] = useState(null);
  const [twdata, setTwData] = useState(null);
  const [keysWithValueOne, setKeysWithValueOne] = useState([]);
   
  useEffect(() => {
    const fetchTermworkLabels = async () => {
      try {
        const response = await api.get(
          `/api/termwork/gettermworkdata/${userCourseId}`
        );
        setTwData(response.data);

        const newKeysWithValueOne = response.data.flatMap((item) =>
          Object.entries(item)
            .filter(
              ([key, value]) =>
                value === 1 &&
                key !== "th_only_id" &&
                key !== "twid" &&
                key !== "twbody"
            )
            .map(([key]) => key)
        );

        setKeysWithValueOne(newKeysWithValueOne);
      } catch (error) {
        console.error("Error fetching termwork labels:", error);
      }
    };

    if (userCourseId) {
      fetchTermworkLabels();
    }
  }, [userCourseId]);





  return (
    <div className="min-h-screen flex flex-col items-center bg-white  p-6">
      {/* Heading */}
      <h1 className="text-3xl md:text-4xl font-bold text-blue-800 mb-6">
        Termwork
      </h1>

      {/* Course Selector Card */}
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
            <>{/* Render alternative content if needed */}
             <TheoryAssignment userCourseId={userCourseId} />
   
            
            </>
          ) : twdata[0].twid === 3 ? (
            <>{/* Render alternative content if needed */}
             <Experiment userCourseId={userCourseId}  />
   
            
            </>
          ) : null}
        </>
      )}
    </div>
  );
};

export default TermworkTable;
