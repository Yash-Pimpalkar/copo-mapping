import React, { useEffect, useState} from 'react';
import api from "../../api";

const TWOnly  = ({uid}) => {
  const [userCourseId, setUserCourseId] = useState(null);
  const [loData, setLoData] = useState([]);
  const [twAverage, settwAverage] = useState(0);
  const [FinalIndirectCourseAttainment, setFinalIndirectCourseAttainment] = useState(0);
  const [TotalAttainmentEighty, setTotalAttainmentEighty] = useState(0);
  const [TotalAttainmentTwenty, setTotalAttainmentTwenty] = useState(0);
  const [TotalAttainment, setTotalAttainment] = useState(0);
  
  useEffect(() => {
    const fetchCosData = async (uid) => {
      try {
        // Make all API requests concurrently using Promise.all
        const [ response1] = await Promise.all([
          api.get(`/api/result/ia2attainment/tw/${uid}`),
        ]);

        const twData = response1.data || [];

        const twMap = twData.reduce((acc, twItem) => {
          acc[twItem.coname] = Number(twItem.attainment) || 0;
          return acc;
        }, {});

        const combinedData = Array.from(
          new Set([ ...twData.map(item => item.coname)])
        ).map((coname) => {
          const twattainment = twMap[coname] || 0;
          // const directAttainment = ((((60 / 100) * twattainment) + ((40 / 100) * oralattainment)) * (80 / 100)).toFixed(2);
          const directAttainment = ((80/100)*twattainment).toFixed(2);
          //dummy data
          const indirectAttainmentvalues = (Math.random() * 3) .toFixed(2);  // Example calculation
          // const twattainment = (Math.random() * 3).toFixed(2);  // Dummy twattainment data

          const indirectAttainment = (indirectAttainmentvalues * (20/100)).toFixed(2); ;
          const totalAttainment = parseFloat(directAttainment) + parseFloat(indirectAttainment);

          return {
            coname,
            twattainment: twattainment,
            direct: directAttainment,
            indirect: indirectAttainmentvalues,
            indirectatt: indirectAttainment,
            total: totalAttainment.toFixed(2),
          };
        });

        const twAverage = combinedData
          .filter(item => item.twattainment)
          .reduce((sum, item) => sum + Number(item.twattainment), 0) / combinedData.length;

        const finalIndirectAttainment = combinedData
          .filter(item => item.indirect)
          .reduce((sum, item) => sum + Number(item.indirect), 0) / combinedData.length;

        const totalAttainmentEighty = (80 / 100) * twAverage;
        const totalAttainmentTwenty = (20 / 100) * finalIndirectAttainment;
        const finalTotalAttainment = totalAttainmentEighty + totalAttainmentTwenty;

        settwAverage(twAverage.toFixed(2));
        setFinalIndirectCourseAttainment(finalIndirectAttainment.toFixed(2));
        setTotalAttainmentEighty(totalAttainmentEighty.toFixed(2));
        setTotalAttainmentTwenty(totalAttainmentTwenty.toFixed(2));
        setTotalAttainment(finalTotalAttainment.toFixed(2));
        setLoData(combinedData);

      } catch (error) {
        console.error("Error fetching COS data", error);
      }
    };

    if (uid) {
      fetchCosData(uid);
    }
  }, [uid]);
  console.log(loData);

  const poPsoData = [
    { lo: 'ITL501.1', po: [1.93, 1.93, 1.93, 1.93, 1.93, 0.96, '-', '-', '-', '-', '-', 1.93, 0.96, 0.96] },
    { lo: 'ITL501.2', po: [1.93, 1.93, 1.93, 1.93, 1.93, 0.96, '-', '-', '-', '-', '-', 1.93, 0.96, 0.96] },
    { lo: 'ITL501.3', po: [1.91, 1.91, 1.91, 1.87, 0.96, '-', '-', '-', '-', '-', 1.91, 1.91, 1.91] },
    { lo: 'ITL501.4', po: [1.92, 1.92, 1.92, 1.92, 1.92, 0.96, '-', '-', '-', '-', '-', 1.92, 1.92, 1.92] },
    { lo: 'ITL501.5', po: [2.86, 2.86, 2.86, 2.86, 2.86, 1.92, '-', '-', '-', '-', '-', 1.91, 2.86, 1.91] },
    { lo: 'ITL501.6', po: [2.86, 2.86, 2.86, 2.86, 2.86, 1.91, '-', '-', '-', '-', '-', 1.91, 2.86, 1.91] },
  ];
  return (
    <div className="p-4">
      {/* Course Attainment Table */}
      <h1 className="text-2xl md:text-3xl lg:text-4xl mb-6 text-blue-700 text-center font-bold">physics sheet tw only</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300 mb-4 text-sm md:text-base">
          <thead>
            <tr>
              <th className='border border-gray-300 p-2' colSpan={8}>Lab Course Attainment</th>
            </tr>
            <tr>
              <th className="border border-gray-300 p-2 text-center" colSpan={2}>
                Direct Course Attainment Calculations
              </th>
              <th className="border border-gray-300 p-2 text-center" rowSpan={2} colSpan={2}>Indirect Course Attainment Calculation</th>
              <th className="border border-gray-300 p-2 text-center" rowSpan={2}>Direct Attainment</th>
              <th className="border border-gray-300 p-2 text-center" rowSpan={2}>Indirect Attainment</th>
              <th className="border border-gray-300 p-2 text-center" rowSpan={2}>Total Attainment</th>
            </tr>
            <tr>
              <th className="border border-gray-300 p-2 text-center">CO/LO</th>
              <th className="border border-gray-300 p-2 text-center">TW</th>
              
            </tr>
          </thead>
          <tbody>
            {/* Data Rows */}
            {loData.map((item, index) => (
              <tr key={index}>
                <td className="border border-gray-300 p-2 text-center">{item.coname}</td>
                <td className="border border-gray-300 p-2 text-center">{item.twattainment}</td>
                <td className="border border-gray-300 p-2 text-center">{item.coname}</td>
                <td className="border border-gray-300 p-2 text-center">{item.indirect}</td>
                <td className="border border-gray-300 p-2 text-center">{item.direct}</td>
                <td className="border border-gray-300 p-2 text-center">{item.indirectatt}</td>
                <td className="border border-gray-300 p-2 text-center">{item.total}</td>
              </tr>
            ))}

            {/* Attainment, Weightage Rows */}
            <tr>
              <td className="border border-gray-300 p-2 text-center">Attainment</td>
              <td className="border border-gray-300 p-2 text-center">{twAverage}</td>
              <td className="border border-gray-300 p-2 text-center">Final Indirect Course Attainment</td>
              <td className="border border-gray-300 p-2 text-center">{FinalIndirectCourseAttainment}</td>
            </tr>
            
            <tr>
              <td className="border border-gray-300 p-2 text-center">Weightage</td>
              <td className="border border-gray-300 p-2 text-center">80%</td>
              <td className="border border-gray-300 p-2 text-center" colSpan={2}>20%</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2 text-center">Total Attainment</td>
              <td className="border border-gray-300 p-2 text-center">{TotalAttainmentEighty}</td>
              <td className="border border-gray-300 p-2 text-center" colSpan={2}>{TotalAttainmentTwenty}</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2 text-center">
                <strong>Course Attainment:</strong> 
              </td>
              <td className="border border-gray-300 p-2 text-center" colSpan={3}>
                {TotalAttainment}
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
    </div>
  );
};

export default TWOnly;
