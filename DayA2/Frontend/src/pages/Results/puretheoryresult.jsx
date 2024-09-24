import React, { useEffect, useState } from "react";
import api from "../../api"; // Ensure this is set up to point to your API

const PureTheoryResult = ({ uid }) => {
  const [userCourseId, setUserCourseId] = useState(null);
  const [loData, setLoData] = useState([]);
  
  useEffect(() => {
  const fetchCosData = async (uid) => {
    console.log(uid)
    console.log(uid)
    try {
      const response = await api.get(`/api/result/ia1attaiment/tcstyperesult/${uid}`); // Fixed the query
      console.log("Fetched COS data:", response.data); // Log the fetched data
      setLoData(response.data); // Assuming you want to set co_name here
    } catch (error) {
      console.error("Error fetching COS data", error);
    }
  }
  if (uid) {
    fetchCosData(uid);
  }
},[uid])

  console.log(loData);

  const poPsoData = [
    { lo: 'ITL501.1', po: [1.93, 1.93, 1.93, 1.93, 1.93, 0.96, '-', '-', '-', '-', '-', 1.93, 0.96, 0.96] },
    { lo: 'ITL501.2', po: [1.93, 1.93, 1.93, 1.93, 1.93, 0.96, '-', '-', '-', '-', '-', 1.93, 0.96, 0.96] },
    { lo: 'ITL501.3', po: [1.91, 1.91, 1.91, 1.87, 0.96, '-', '-', '-', '-', '-', 1.91, 1.91, 1.91] },
    { lo: 'ITL501.4', po: [1.92, 1.92, 1.92, 1.92, 1.92, 0.96, '-', '-', '-', '-', '-', 1.92, 1.92, 1.92] },
    { lo: 'ITL501.5', po: [2.86, 2.86, 2.86, 2.86, 2.86, 1.92, '-', '-', '-', '-', '-', 1.91, 2.86, 1.91] },
  ];
  return (
    <div className="p-4">
      {/* Course Attainment Table */}
      {/* {loData.length > 0 && ( */}
      <>
      <h1 className="text-2xl md:text-3xl lg:text-4xl mb-6 text-blue-700 text-center font-bold">PURE THEORY RESULT</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300 mb-4 text-sm md:text-base">
          <thead>
            <tr>
              <th className='border border-gray-300 p-2' colSpan={10}>Lab Course Attainment</th>
            </tr>
            <tr>
              <th className="border border-gray-300 p-2 text-center" colSpan={5}>
                Direct Course Attainment Calculations
              </th>
              <th className="border border-gray-300 p-2 text-center" rowSpan={2} colSpan={2}>Indirect Course Attainment Calculation</th>
              <th className="border border-gray-300 p-2 text-center" rowSpan={2}>Direct Attainment</th>
              <th className="border border-gray-300 p-2 text-center" rowSpan={2}>Indirect Attainment</th>
              <th className="border border-gray-300 p-2 text-center" rowSpan={2}>Total Attainment</th>
            </tr>
            <tr>
              <th className="border border-gray-300 p-2 text-center">CO</th>
              <th className="border border-gray-300 p-2 text-center">IA1</th>
              <th className="border border-gray-300 p-2 text-center">IA2</th>
              <th className="border border-gray-300 p-2 text-center">INTA</th>
              <th className="border border-gray-300 p-2 text-center">UNIV</th>
            </tr>
          </thead>
          <tbody>
            {/* Data Rows */}
            {loData.map((item,index) => (
              <tr key={index}>
                <td className="border border-gray-300 p-2 text-center">{item.coname}</td>
                <td className="border border-gray-300 p-2 text-center">{item.ia1}</td>
                <td className="border border-gray-300 p-2 text-center">{item.ia2}</td>
                <td className="border border-gray-300 p-2 text-center">{item.inta}</td>
                <td className="border border-gray-300 p-2 text-center">{item.univ}</td>
                <td className="border border-gray-300 p-2 text-center">{item.coname}</td>
                <td className="border border-gray-300 p-2 text-center">{item.indirect}</td>
                <td className="border border-gray-300 p-2 text-center">{item.direct}</td>
                <td className="border border-gray-300 p-2 text-center">{item.indirect}</td>
                <td className="border border-gray-300 p-2 text-center">{item.total}</td>
              </tr>
            ))}

            {/* Attainment, Weightage Rows */}
            <tr>
              <td className="border border-gray-300 p-2 text-center" colSpan={3}>Attainment</td>
              <td className="border border-gray-300 p-2 text-center">3.00</td>
              <td className="border border-gray-300 p-2 text-center">3.00</td>
              <td className="border border-gray-300 p-2 text-center" rowSpan={4}>Final Indirect Course Attainment</td>
              <td className="border border-gray-300 p-2 text-center" rowSpan={4}>2.38</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2 text-center" colSpan={3}>Weightage</td>
              <td className="border border-gray-300 p-2 text-center">60%</td>
              <td className="border border-gray-300 p-2 text-center">40%</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2 text-center" colSpan={3}>Direct Total Attainment</td>
              <td className="border border-gray-300 p-2 text-center">1.80</td>
              <td className="border border-gray-300 p-2 text-center">1.20</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2 text-center" colSpan={3}>Final Direct Course Attainment</td>
              <td className="border border-gray-300 p-2 text-center" colSpan={2}>3.00</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2 text-center" colSpan={3}>Weightage</td>
              <td className="border border-gray-300 p-2 text-center" colSpan={2}>80%</td>
              <td className="border border-gray-300 p-2 text-center" colSpan={2}>20%</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2 text-center" colSpan={3}>Total Attainment</td>
              <td className="border border-gray-300 p-2 text-center" colSpan={2}>2.40</td>
              <td className="border border-gray-300 p-2 text-center" colSpan={2}>0.48</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2 text-center" colSpan={3}>
                <strong>Course Attainment:</strong>
              </td>
              <td className="border border-gray-300 p-2 text-center" colSpan={4}>
                 2.88
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* PO and PSO Attainment Table */}
      <h2 className="text-2xl md:text-3xl lg:text-4xl mb-6 text-blue-700 text-center font-bold">PO, PSO Attainment</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300 text-sm md:text-base">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2" colSpan={15}>PO, PSO Attainment</th>
            </tr>
            <tr>
              <th className="border border-gray-300 p-2" colSpan={13}>PO</th>
              <th className="border border-gray-300 p-2" colSpan={2}>PSO</th>
            </tr>
            <tr>
              <th className="border border-gray-300 p-2">LO</th>
              {[...Array(12).keys()].map(i => (
                <th key={i} className="border border-gray-300 p-2">PO{i + 1}</th>
              ))}
              <th className="border border-gray-300 p-2">PSO1</th>
              <th className="border border-gray-300 p-2">PSO2</th>
            </tr>
          </thead>
          <tbody>
            {poPsoData.map((item, index) => (
              <tr key={index}>
                <td className="border border-gray-300 p-2">{item.lo}</td>
                {item.po.map((value, i) => (
                  <td key={i} className="border border-gray-300 p-2">{value}</td>
                ))}
              </tr>
            ))}

            {/* Average Row */}
            <tr>
              <td className="border border-gray-300 p-2">AVG</td>
              {[2.23, 2.23, 2.08, 2.39, 2.08, 0.96, '-', '-', '-', '-', '-', 1.92, 1.91, 1.60].map((avg, i) => (
                <td key={i} className="border border-gray-300 p-2">{avg}</td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
      </>
      {/* )} */}
    </div>
  );
};

export default PureTheoryResult;