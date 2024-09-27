import React, { useEffect, useState} from 'react';
import api from "../../api";

const IntaTWUniv = ({ uid }) => {
  const [userCourseId, setUserCourseId] = useState(null);
  const [loData, setLoData] = useState([]);
  const [univAverage, setUnivAverage] = useState(0);
  const [intaAverage, setIntaAverage] = useState(0);
  const [twAverage, settwAverage] = useState(0);
  const [DirectTotalAttainSixty, setDirectTotalAttainSixty] = useState(0);
  const [DirectTotalAttainForty, setDirectTotalAttainForty] = useState(0);
  const [FinalDirectCourseAttainment, setFinalDirectCourseAttainment] = useState(0);
  const [FinalIndirectCourseAttainment, setFinalIndirectCourseAttainment] = useState(0);
  const [TotalAttainmentEighty, setTotalAttainmentEighty] = useState(0);
  const [TotalAttainmentTwenty, setTotalAttainmentTwenty] = useState(0);
  const [TotalAttainment, setTotalAttainment] = useState(0);
  const [AverageAttainment, setAverageAttainment] = useState(0);

  useEffect(() => {
    const fetchCosData = async (uid) => {
      try {
        // Make all API requests concurrently using Promise.all
        const [response1, response2, response3, response4,response5] = await Promise.all([
          api.get(`/api/result/ia1attainment/ia1/${uid}`),
          api.get(`/api/result/ia2attainment/ia2/${uid}`),
          api.get(`/api/result/ia2attainment/inta/${uid}`),
          api.get(`/api/result/ia2attainment/univ/${uid}`),
          api.get(`/api/result/ia2attainment/tw/${uid}`)
        ]);

        const ia1Data = response1.data || [];
        const ia2Data = response2.data || [];
        const intaData = response3.data || [];
        const univData = response4.data || [];
        const twData = response5.data || [];

        const ia1Map = ia1Data.reduce((acc, item) => {
          acc[item.coname] = item.ia1_attainment;
          return acc;
        }, {});

        const ia2Map = ia2Data.reduce((acc, item) => {
          acc[item.coname] = item.ia2_attainment;
          return acc;
        }, {});

        const intaMap = intaData.reduce((acc, item) => {
          acc[item.coname] = item.attainment;
          return acc;
        }, {});

        const univMap = univData.reduce((acc, item) => {
          acc[item.coname] = item.attainment;
          return acc;
        }, {});

        const twMap = twData.reduce((acc, twItem) => {
          acc[twItem.coname] = Number(twItem.attainment) || 0;
          return acc;
        }, {});

        const combinedData = Array.from(
          new Set([...ia1Data.map(item => item.coname), ...ia2Data.map(item => item.coname), ...intaData.map(item => item.coname), ...univData.map(item => item.coname), ...twData.map(item => item.coname)])
        ).map((coname) => {
          const intaAttainment = intaMap[coname] || 0;
          const univAttainment = univMap[coname] || 0;
          const twattainment = twMap[coname] || 0;
          const directAttainment = ((((60 / 100) * ((intaAttainment+twattainment)/2)) + ((40 / 100) * univAttainment)) * (80 / 100)).toFixed(2);

          //dummy data
          const indirectAttainmentvalues = (Math.random() * 3) .toFixed(2);  // Example calculation
          // const twattainment = (Math.random() * 3).toFixed(2);  // Dummy twattainment data

          const indirectAttainment = (indirectAttainmentvalues * (20/100)).toFixed(2); ;
          const totalAttainment = parseFloat(directAttainment) + parseFloat(indirectAttainment);

          return {
            coname,
            ia1_attainment: ia1Map[coname] || 0,
            ia2_attainment: ia2Map[coname] || 0,
            attainment: intaAttainment,
            twattainment: twattainment,
            univattainment: univAttainment,
            indirect: indirectAttainmentvalues,
            direct: directAttainment,
            indirectatt: indirectAttainment,
            total: totalAttainment.toFixed(2),
          };
        });

        const univAverage = combinedData
          .filter(item => item.univattainment)
          .reduce((sum, item) => sum + Number(item.univattainment), 0) / combinedData.length;

        const intaAverage = combinedData
          .filter(item => item.attainment)
          .reduce((sum, item) => sum + Number(item.attainment), 0) / combinedData.length;

        const twAverage = combinedData
          .filter(item => item.twattainment)
          .reduce((sum, item) => sum + Number(item.twattainment), 0) / combinedData.length;


        const finalIndirectAttainment = combinedData
          .filter(item => item.indirect)
          .reduce((sum, item) => sum + Number(item.indirect), 0) / combinedData.length;

        const averageattainment = intaAverage + twAverage;

        const directAttainSixty = (60 / 100) * averageattainment;
        const directAttainForty = (40 / 100) * univAverage;

        const finalDirectAttainment = directAttainSixty + directAttainForty;
        const totalAttainmentEighty = (80 / 100) * finalDirectAttainment;
        const totalAttainmentTwenty = (20 / 100) * finalIndirectAttainment;
        const finalTotalAttainment = totalAttainmentEighty + totalAttainmentTwenty;

        setUnivAverage(univAverage.toFixed(2));
        setIntaAverage(intaAverage.toFixed(2));
        settwAverage(twAverage.toFixed(2));
        setFinalIndirectCourseAttainment(finalIndirectAttainment.toFixed(2));
        setDirectTotalAttainSixty(directAttainSixty.toFixed(2));
        setDirectTotalAttainForty(directAttainForty.toFixed(2));
        setFinalDirectCourseAttainment(finalDirectAttainment.toFixed(2));
        setTotalAttainmentEighty(totalAttainmentEighty.toFixed(2));
        setTotalAttainmentTwenty(totalAttainmentTwenty.toFixed(2));
        setTotalAttainment(finalTotalAttainment.toFixed(2));
        setAverageAttainment(averageattainment.toFixed(2));
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
  ];
  return (
    <div className="p-4">
      {/* Course Attainment Table */}
      <h1 className="text-2xl md:text-3xl lg:text-4xl mb-6 text-blue-700 text-center font-bold">Maths inta tw univ Attainment Sheet</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300 mb-4 text-sm md:text-base">
          <thead>
            <tr>
              <th className='border border-gray-300 p-2' colSpan={11}>Lab Course Attainment</th>
            </tr>
            <tr>
              <th className="border border-gray-300 p-2 text-center" colSpan={6}>
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
              <th className="border border-gray-300 p-2 text-center">TW</th>
              <th className="border border-gray-300 p-2 text-center">UNIV</th>
            </tr>
          </thead>
          <tbody>
            {/* Data Rows */}
            {loData.map((item, index) => (
              <tr key={index}>
                <td className="border border-gray-300 p-2 text-center">{item.coname}</td>
                <td className="border border-gray-300 p-2 text-center">{item.ia1_attainment}</td>
                <td className="border border-gray-300 p-2 text-center">{item.ia2_attainment}</td>
                <td className="border border-gray-300 p-2 text-center">{item.attainment}</td>
                <td className="border border-gray-300 p-2 text-center">{item.twattainment}</td>
                <td className="border border-gray-300 p-2 text-center">{item.univattainment}</td>
                <td className="border border-gray-300 p-2 text-center">{item.coname}</td>
                <td className="border border-gray-300 p-2 text-center">{item.indirect}</td>
                <td className="border border-gray-300 p-2 text-center">{item.direct}</td>
                <td className="border border-gray-300 p-2 text-center">{item.indirectatt}</td>
                <td className="border border-gray-300 p-2 text-center">{item.total || 'NA'}</td>
              </tr>
            ))}

            {/* Attainment, Weightage Rows */}
            <tr>
              <td className="border border-gray-300 p-2 text-center" colSpan={3}>Attainment</td>
              <td className="border border-gray-300 p-2 text-center">{intaAverage}</td>
              <td className="border border-gray-300 p-2 text-center">{twAverage}</td>
              <td className="border border-gray-300 p-2 text-center" rowSpan={2}>{univAverage}</td>
              <td className="border border-gray-300 p-2 text-center" rowSpan={5}>Final Indirect Course Attainment</td>
              <td className="border border-gray-300 p-2 text-center" rowSpan={5}>{FinalIndirectCourseAttainment}</td>
            </tr>
            <tr>
                <td className="border border-gray-300 p-2 text-center" colSpan={3}>Average Attainment of TW and INTA</td>
                <td className="border border-gray-300 p-2 text-center"colSpan={2}>{AverageAttainment}</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2 text-center" colSpan={3}>Weightage</td>
              <td className="border border-gray-300 p-2 text-center" colSpan={2}>60%</td>
              <td className="border border-gray-300 p-2 text-center">40%</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2 text-center" colSpan={3}>Direct Total Attainment</td>
              <td className="border border-gray-300 p-2 text-center"colSpan={2}>{DirectTotalAttainSixty}</td>
              <td className="border border-gray-300 p-2 text-center">{DirectTotalAttainForty}</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2 text-center" colSpan={3}>Final Direct Course Attainment</td>
              <td className="border border-gray-300 p-2 text-center" colSpan={3}>{FinalDirectCourseAttainment}</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2 text-center" colSpan={3}>Weightage</td>
              <td className="border border-gray-300 p-2 text-center" colSpan={3}>80%</td>
              <td className="border border-gray-300 p-2 text-center" colSpan={2}>20%</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2 text-center" colSpan={3}>Total Attainment</td>
              <td className="border border-gray-300 p-2 text-center" colSpan={3}>{TotalAttainmentEighty}</td>
              <td className="border border-gray-300 p-2 text-center" colSpan={2}>{TotalAttainmentTwenty}</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2 text-center" colSpan={3}>
                <strong>Course Attainment:</strong> 
              </td>
              <td className="border border-gray-300 p-2 text-center" colSpan={5}>
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

export default IntaTWUniv;
