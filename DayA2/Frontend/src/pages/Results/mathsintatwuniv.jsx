import React, { useEffect, useState} from 'react';
import api from "../../api";

const IntaTWUniv = ({uid}) => {
  const [userCourseId, setUserCourseId] = useState(null);
  const [loData, setLoData] = useState(() => JSON.parse(localStorage.getItem('loData')) || []);
  const [univAverage, setUnivAverage] = useState(() => localStorage.getItem('univAverage') || 0);
  const [intaAverage, setIntaAverage] = useState(() => localStorage.getItem('intaAverage') || 0);
  const [DirectTotalAttainSixty, setDirectTotalAttainSixty] = useState(() => localStorage.getItem('DirectTotalAttainSixty') || 0);
  const [DirectTotalAttainForty, setDirectTotalAttainForty] = useState(() => localStorage.getItem('DirectTotalAttainForty') || 0);
  const [FinalDirectCourseAttainment, setFinalDirectCourseAttainment] = useState(() => localStorage.getItem('FinalDirectCourseAttainment') || 0);
  const [FinalIndirectCourseAttainment, setFinalIndirectCourseAttainment] = useState(() => localStorage.getItem('FinalIndirectCourseAttainment') || 0);
  const [TotalAttainmentEighty, setTotalAttainmentEighty] = useState(() => localStorage.getItem('TotalAttainmentEighty') || 0);
  const [TotalAttainmentTwenty, setTotalAttainmentTwenty] = useState(() => localStorage.getItem('TotalAttainmentTwenty') || 0);
  const [TotalAttainment, setTotalAttainment] = useState(() => localStorage.getItem('TotalAttainment') || 0);
  
  useEffect(() => {
    const fetchCosData = async (uid) => {
      console.log(uid);

      try {
        // Make all API requests concurrently using Promise.all
        const [response1, response2, response3, response4] = await Promise.all([
          api.get(`/api/result/ia1attainment/ia1/${uid}`),
          api.get(`/api/result/ia2attainment/ia2/${uid}`),
          api.get(`/api/result/ia2attainment/inta/${uid}`),
          api.get(`/api/result/ia2attainment/univ/${uid}`) // Adding the correct endpoint for INT attainment
        ]);

        // Log the fetched data from all three requests
        console.log("Fetched IA1 COS data:", response1.data);
        console.log("Fetched IA2 COS data:", response2.data);
        console.log("Fetched INTA COS data:", response3.data);
        console.log("Fetched UNIV COS data:", response4.data)

        const ia1Data = response1.data || [];
        const ia2Data = response2.data || [];
        const intaData = response3.data || [];
        const univData = response4.data || [];

        // Create a dictionary (map) for IA1, IA2, and INT data using 'coname' as the key
        const ia1Map = ia1Data.reduce((acc, ia1Item) => {
          acc[ia1Item.coname] = ia1Item.ia1_attainment; // Storing IA1 attainment
          return acc;
        }, {});

        const ia2Map = ia2Data.reduce((acc, ia2Item) => {
          acc[ia2Item.coname] = ia2Item.ia2_attainment; // Storing IA2 attainment
          return acc;
        }, {});

        const intaMap = intaData.reduce((acc, intaItem) => {
          acc[intaItem.coname] = intaItem.attainment; // Storing INT attainment
          return acc;
        }, {});

        const univMap = univData.reduce((acc, univItem) => {
            acc[univItem.coname] = univItem.attainment; // Storing INT attainment
            return acc;
          }, {});

        // Combine all sets of data based on 'coname'
        const combinedData = Array.from(
          new Set([...ia1Data.map(item => item.coname), ...ia2Data.map(item => item.coname), ...intaData.map(item => item.coname), ...univData.map(item => item.coname)])
        ).map((coname) => {
          const intaAttainment = intaMap[coname] || 0;
          const univAttainment = univMap[coname] || 0;
          console.log(intaAttainment, univAttainment);
          const directAttainment = ((((60 / 100) * intaAttainment) + ((40 / 100) * univAttainment)) * (80 / 100)); 
          
           
          // Dummy indirect attainment value
          const dummyIndirectAttainment = (coname) => {
            return (Math.random() * 3).toFixed(2); 
          };
          const indirectAttainmentvalues = Number(dummyIndirectAttainment(coname));
          

          const indirectAttainment = (indirectAttainmentvalues * (20/100)).toFixed(2);    // separate indirect attainment column 
          
          const totalatt = parseFloat(directAttainment) + parseFloat(indirectAttainment);
          

          return {
            coname,
            ia1_attainment: ia1Map[coname] || 0,
            ia2_attainment: ia2Map[coname] || 0,
            attainment: intaAttainment,
            univattainment: univMap[coname] || 0,
            direct: directAttainment.toFixed(2),
            indirect: indirectAttainmentvalues,
            indirectatt: indirectAttainment,
            total: totalatt
          };
        });
   
        const validUnivAttainments = combinedData
          .filter(item => item.univattainment !== null && item.univattainment !== undefined)
          .map(item => item.univattainment);
        const univaverage = validUnivAttainments.length > 0
          ? validUnivAttainments.reduce((sum, val) => sum + Number(val), 0) / validUnivAttainments.length
          : 0;
        setUnivAverage(univaverage.toFixed(1));
        localStorage.setItem('univAverage', univaverage.toFixed(1));


        const validIntaAttainments = combinedData
          .filter(item => item.attainment !== null && item.attainment !== undefined)
          .map(item => item.attainment);
        const intaaverage = validIntaAttainments.length > 0
          ? validIntaAttainments.reduce((sum, val) => sum + Number(val), 0) / validIntaAttainments.length
          : 0;
        setIntaAverage(intaaverage.toFixed(1));
        localStorage.setItem('intaAverage', intaaverage.toFixed(1));
  
        const validFinalIndirectatt = combinedData
          .filter(item => item.indirect !== null && item.indirect !== undefined)
          .map(item => item.indirect);
        const indirectaverage = validFinalIndirectatt.length > 0 
          ? validFinalIndirectatt.reduce((sum, val) => sum + Number(val), 0) / validFinalIndirectatt.length
          : 0;
        setFinalIndirectCourseAttainment(indirectaverage.toFixed(1));
        localStorage.setItem('FinalIndirectCourseAttainment', indirectaverage.toFixed(1));

        // 60%
        const directattainsixty = (60 / 100) * intaaverage;
        setDirectTotalAttainSixty(directattainsixty.toFixed(1));
        localStorage.setItem('DirectTotalAttainSixty', directattainsixty.toFixed(1));
        
        // 40%
        const directattainforty = (40 / 100) * univaverage;
        setDirectTotalAttainForty(directattainforty.toFixed(1));
        localStorage.setItem('DirectTotalAttainForty', directattainforty.toFixed(1));
        
        // Total 60% and 40%
        const finaldirectattainment = directattainsixty + directattainforty;
        setFinalDirectCourseAttainment(finaldirectattainment.toFixed(1));
        localStorage.setItem('FinalDirectCourseAttainment', finaldirectattainment.toFixed(1));

        // Total on 80%
        const totalattainmenteighty = (80 / 100) * finaldirectattainment;
        setTotalAttainmentEighty(totalattainmenteighty.toFixed(2));
        localStorage.setItem('TotalAttainmentEighty', totalattainmenteighty.toFixed(2));

        //20%
        const totalattainmenttwenty = (20 / 100) * indirectaverage;
        setTotalAttainmentTwenty(totalattainmenttwenty.toFixed(2));
        localStorage.setItem('TotalAttainmentTwenty', totalattainmenttwenty.toFixed(2));

        //Total attainment of 80 and 20 (i.e course attainment)
        const totalattainmentt = (totalattainmenteighty + totalattainmenttwenty);
        setTotalAttainment(totalattainmentt.toFixed(2));
        localStorage.setItem('TotalAttainment', totalattainmentt.toFixed(2));

   
        setLoData(combinedData);
        localStorage.setItem('loData', JSON.stringify(combinedData));
        
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
                <td className="border border-gray-300 p-2 text-center">{item.tw}</td>
                <td className="border border-gray-300 p-2 text-center">{item.univattainment}</td>
                <td className="border border-gray-300 p-2 text-center">{item.coname}</td>
                <td className="border border-gray-300 p-2 text-center">{item.indirect}</td>
                <td className="border border-gray-300 p-2 text-center">{item.direct}</td>
                <td className="border border-gray-300 p-2 text-center">{item.indirectatt}</td>
                <td className="border border-gray-300 p-2 text-center">{item.total.toFixed(2) || 'NA'}</td>
              </tr>
            ))}

            {/* Attainment, Weightage Rows */}
            <tr>
              <td className="border border-gray-300 p-2 text-center" colSpan={3}>Attainment</td>
              <td className="border border-gray-300 p-2 text-center">{intaAverage}</td>
              <td className="border border-gray-300 p-2 text-center">3.00</td>
              <td className="border border-gray-300 p-2 text-center" rowSpan={2}>0.00</td>
              <td className="border border-gray-300 p-2 text-center" rowSpan={5}>Final Indirect Course Attainment</td>
              <td className="border border-gray-300 p-2 text-center" rowSpan={5}>2.38</td>
            </tr>
            <tr>
                <td className="border border-gray-300 p-2 text-center" colSpan={3}>Average Attainment of TW and INTA</td>
                <td className="border border-gray-300 p-2 text-center"colSpan={2}>2.40</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2 text-center" colSpan={3}>Weightage</td>
              <td className="border border-gray-300 p-2 text-center" colSpan={2}>60%</td>
              <td className="border border-gray-300 p-2 text-center">40%</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2 text-center" colSpan={3}>Direct Total Attainment</td>
              <td className="border border-gray-300 p-2 text-center"colSpan={2}>1.80</td>
              <td className="border border-gray-300 p-2 text-center">1.20</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2 text-center" colSpan={3}>Final Direct Course Attainment</td>
              <td className="border border-gray-300 p-2 text-center" colSpan={3}>3.00</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2 text-center" colSpan={3}>Weightage</td>
              <td className="border border-gray-300 p-2 text-center" colSpan={3}>80%</td>
              <td className="border border-gray-300 p-2 text-center" colSpan={2}>20%</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2 text-center" colSpan={3}>Total Attainment</td>
              <td className="border border-gray-300 p-2 text-center" colSpan={3}>2.40</td>
              <td className="border border-gray-300 p-2 text-center" colSpan={2}>0.48</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2 text-center" colSpan={3}>
                <strong>Course Attainment:</strong> 
              </td>
              <td className="border border-gray-300 p-2 text-center" colSpan={5}>
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
    </div>
  );
};

export default IntaTWUniv;
