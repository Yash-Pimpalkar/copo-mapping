import React, { useEffect, useState } from 'react';
import api from "../../api";
import * as XLSX from 'xlsx';

const TWOnly = ({ uid }) => {
  const [userCourseId, setUserCourseId] = useState(null);
  const [loData, setLoData] = useState([]);
  const [twAverage, settwAverage] = useState(0);
  const [FinalIndirectCourseAttainment, setFinalIndirectCourseAttainment] = useState(0);
  const [TotalAttainmentEighty, setTotalAttainmentEighty] = useState(0);
  const [TotalAttainmentTwenty, setTotalAttainmentTwenty] = useState(0);
  const [TotalAttainment, setTotalAttainment] = useState(0);
  const [poPsoData, setPoPsoData] = useState([]);

  useEffect(() => {
    const fetchCosData = async (uid) => {
      try {
        // Make all API requests concurrently using Promise.all
        const [response1, response2] = await Promise.all([
          api.get(`/api/result/tw/${uid}`),
          api.get(`/api/result/indirect/${uid}`),
        ]);

        const twData = response1.data || [];
        const indirectData = response2.data || {};
        api.get(`/api/result/popso/${uid}`)
          .then(response => {
            console.log(response)
            setPoPsoData(response.data); // Assuming the data is returned in the required format
          })
          .catch(error => {
            console.error('Error fetching PO, PSO data:', error);
          });

        const twMap = twData.reduce((acc, twItem) => {
          acc[twItem.coname] = Number(twItem.attainment) || 0;
          return acc;
        }, {});

        const indirectMap = indirectData.reduce((acc, item) => {
          acc[item.coname] = Number(item.marks) || 0;
          return acc;
        }, {});

        const combinedData = Array.from(
          new Set([...twData.map(item => item.coname),
            ...indirectData.map((item) => item.coname),
          ])
        ).map((coname) => {
          const twattainment = twMap[coname] || 0;
          // const directAttainment = ((((60 / 100) * twattainment) + ((40 / 100) * oralattainment)) * (80 / 100)).toFixed(2);
          const directAttainment = ((80 / 100) * twattainment).toFixed(2);
          //dummy data
          const indirectAttainmentvalues = indirectMap[coname] || 0;  // Example calculation
          // const twattainment = (Math.random() * 3).toFixed(2);  // Dummy twattainment data

          const indirectAttainment = (indirectAttainmentvalues * (20 / 100)).toFixed(2);
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


  const downloadExcel = () => {
    // Define the headers for the Excel sheet
    const headers = [
      { coname: 'CO/LO', twattainment: 'TW', conameIndirect: 'Indirect CO/LO', indirect: 'Indirect', direct: 'Direct Attainment', indirectatt: 'Indirect Attainment', total: 'Total Attainment' }
    ];

    // Combine headers and data for LO
    const loDataForExport = [
      ...headers,
      ...loData.map((item) => ({
        coname: item.coname,
        twattainment: item.twattainment,
        conameIndirect: item.coname, // For the Indirect CO/LO column
        indirect: item.indirect,
        direct: item.direct,
        indirectatt: item.indirectatt,
        total: item.total,
      }))
    ];

    // Add the new table data with calculated attainment values
    const additionalData = [
      { coname: "Attainment", twattainment: twAverage, conameIndirect: "Final Indirect Course Attainment", indirect: FinalIndirectCourseAttainment },
      { coname: "Weightage", twattainment: "80%", conameIndirect: "20%" },
      { coname: "Total Attainment", twattainment: TotalAttainmentEighty, conameIndirect: TotalAttainmentTwenty },
      { coname: "Course Attainment", twattainment: TotalAttainment, conameIndirect: "", indirect: "", direct: "" }
    ];

    const headers3 = ['LO/CO', 'PO1', 'PO2', 'PO3', 'PO4', 'PO5', 'PO6', 'PO7', 'PO8', 'PO9', 'PO10', 'PO11', 'PO12', 'PSO1', 'PSO2'];

    // Data for the table body
    const data = poPsoData.map((item, index) => {
      const totalatt = parseFloat(loData[index]?.total) || 0;
      const row = [loData[index]?.coname];

      // Add PO values to the row
      item.po.forEach(poValue => {
        row.push(poValue !== null ? ((poValue * totalatt) / 3).toFixed(2) : '-');
      });

      // Add PSO values to the row
      item.pso.forEach(psoValue => {
        row.push(psoValue !== null ? ((psoValue * totalatt) / 3).toFixed(2) : '-');
      });

      return row;
    });

    // Add average row
    const avgRow = ['AVG'];

    // Calculate averages for PO columns
    poPsoData[0].po.forEach((_, i) => {
      const poValues = poPsoData
        .map((item, index) => {
          const totalatt = parseFloat(loData[index]?.total) || 0;
          const poValue = item.po[i] !== null ? parseFloat(item.po[i]) : null;
          return poValue !== null ? (poValue * totalatt) / 3 : null;
        })
        .filter(value => value !== null);
      const poSum = poValues.reduce((acc, val) => acc + val, 0);
      const poAverage = poValues.length > 0 ? poSum / poValues.length : 0;
      avgRow.push(poAverage.toFixed(2));
    });

    // Calculate averages for PSO columns
    poPsoData[0].pso.forEach((_, i) => {
      const psoValues = poPsoData
        .map((item, index) => {
          const totalatt = parseFloat(loData[index]?.total) || 0;
          const psoValue = item.pso[i] !== null ? parseFloat(item.pso[i]) : null;
          return psoValue !== null ? (psoValue * totalatt) / 3 : null;
        })
        .filter(value => value !== null);
      const psoSum = psoValues.reduce((acc, val) => acc + val, 0);
      const psoAverage = psoValues.length > 0 ? psoSum / psoValues.length : 0;
      avgRow.push(psoAverage.toFixed(2));
    });

    // Add the average row to the data
    data.push(avgRow);


    // Merge loDataForExport and additionalData for final export
    const dataForExport = [...loDataForExport, ...additionalData];
    // Create empty rows to separate sections
    const emptyRows = Array(2).fill({}); // Create 2 empty objects for spacing

    // Combine Course Attainment and PSO Data
    const finalDataForExport = [
      ...dataForExport,
      ...emptyRows,  // Add empty rows for spacing
      headers3,
      ...data,
    
    ];




    const poPsoStartRow = loDataForExport.length + additionalData.length; 

    // Create worksheet and workbook
    const worksheet = XLSX.utils.json_to_sheet(dataForExport);
    const workbook = XLSX.utils.book_new();

    // Get dynamic lengths for the data
    const loDataLength = loDataForExport.length; // Length of the LO data
    const additionalDataLength = additionalData.length; // Length of the additional data

    // Define starting row for additional data (it starts after loDataForExport)
    const additionalDataStartRow = loDataLength + 1; // +1 for header row

    // Calculate dynamic row spans
    // const indirectAttainmentRowSpan = 1; // Number of rows to merge for indirect attainment (adjust if needed)
    const WeightageStartRow = additionalDataStartRow + 1; // Where direct attainment starts
    const totalAttainmentRow = WeightageStartRow + 1; // Where the final total attainment row will be (adjust if needed)

    // Create dynamic merges based on row lengths
    worksheet['!merges'] = [

      // Merging for 'Weightage'
      {
        s: { r: additionalDataStartRow, c: 1 }, // attainment
        e: { r: additionalDataStartRow, c: 1 }, //merge
      },
      // {
      //     s: { r: WeightageStartRow, c: 2 }, // Row for '80%' attainment merge
      //     e: { r: WeightageStartRow, c: 2 }, // Merge across columns 1-2
      // },
      {
        s: { r: WeightageStartRow, c: 2 }, // Row for '20%' attainment merge
        e: { r: WeightageStartRow, c: 3 }, // Merge across columns 5-6
      },

      // Merging for 'Total Attainment'
      // {
      //     s: { r: totalAttainmentRow, c: 2 }, // Start row for total attainment merge
      //     e: { r: totalAttainmentRow, c: 2 }, // Merge across all columns 1-6
      // },
      // Merging for 'Total Attainment'
      {
        s: { r: totalAttainmentRow, c: 2 }, // Start row for total attainment merge
        e: { r: totalAttainmentRow, c: 3 }, // Merge across all columns 1-6
      },

      // Merging for 'Course Attainment'
      {
        s: { r: totalAttainmentRow + 1, c: 1 }, // Start row for course attainment merge
        e: { r: totalAttainmentRow + 1, c: 3 }, // Merge across all columns 2-4
      }
    ];

    // Append the worksheet
    XLSX.utils.book_append_sheet(workbook, worksheet, "Course Attainment");

    // Write and download the Excel file
    XLSX.writeFile(workbook, "TW_Attainment.xlsx");
  };

  // const poPsoData = [
  //   { lo: 'ITL501.1', po: [1.93, 1.93, 1.93, 1.93, 1.93, 0.96, '-', '-', '-', '-', '-', 1.93, 0.96, 0.96] },
  //   { lo: 'ITL501.2', po: [1.93, 1.93, 1.93, 1.93, 1.93, 0.96, '-', '-', '-', '-', '-', 1.93, 0.96, 0.96] },
  //   { lo: 'ITL501.3', po: [1.91, 1.91, 1.91, 1.87, 0.96, '-', '-', '-', '-', '-', 1.91, 1.91, 1.91] },
  //   { lo: 'ITL501.4', po: [1.92, 1.92, 1.92, 1.92, 1.92, 0.96, '-', '-', '-', '-', '-', 1.92, 1.92, 1.92] },
  //   { lo: 'ITL501.5', po: [2.86, 2.86, 2.86, 2.86, 2.86, 1.92, '-', '-', '-', '-', '-', 1.91, 2.86, 1.91] },
  //   { lo: 'ITL501.6', po: [2.86, 2.86, 2.86, 2.86, 2.86, 1.91, '-', '-', '-', '-', '-', 1.91, 2.86, 1.91] },
  // ];
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
        <div className="flex justify-center m-8">
          <button onClick={downloadExcel} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ">
            Download as Excel
          </button>
        </div>
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
            {poPsoData.map((item, index) => {
              const totalatt = parseFloat(loData[index]?.total) || 0;  // Access totalatt from loData
              return (
                <tr key={index}>
                  <td className="border border-gray-300 p-2">{loData[index]?.coname}</td>
                  {item.po.map((poValue, i) => (
                    <td key={i} className="border border-gray-300 p-2">
                      {poValue !== null ? (poValue * totalatt / 3).toFixed(2) : '-'}
                    </td>
                  ))}
                  {item.pso.map((psoValue, i) => (
                    <td key={i} className="border border-gray-300 p-2">
                      {psoValue !== null ? (psoValue * totalatt / 3).toFixed(2) : '-'}
                    </td>
                  ))}
                </tr>
              );
            })}
            {/* Average Row */}
            <tr>
              <td className="border border-gray-300 p-2">AVG</td>

              {/* Calculate Average for PO Columns */}
              {poPsoData.length > 0 && poPsoData[0].po.map((_, i) => {
                const poValues = poPsoData
                  .map((item, index) => {
                    const totalatt = parseFloat(loData[index]?.total) || 0;
                    const poValue = item.po[i] !== null ? parseFloat(item.po[i]) : null;
                    return poValue !== null ? (poValue * totalatt) / 3 : null;
                  })
                  .filter((value) => value !== null); // Filter out null values

                const poSum = poValues.reduce((acc, val) => acc + val, 0);
                const poAverage = poValues.length > 0 ? poSum / poValues.length : 0; // Use only the non-null values for average

                return (
                  <td key={i} className="border border-gray-300 p-2">
                    {poAverage.toFixed(2)}
                  </td>
                );
              })}

              {/* Calculate Average for PSO Columns */}
              {poPsoData.length > 0 && poPsoData[0].pso.map((_, i) => {
                const psoValues = poPsoData
                  .map((item, index) => {
                    const totalatt = parseFloat(loData[index]?.total) || 0;
                    const psoValue = item.pso[i] !== null ? parseFloat(item.pso[i]) : null;
                    return psoValue !== null ? (psoValue * totalatt) / 3 : null;
                  })
                  .filter((value) => value !== null); // Filter out null values

                const psoSum = psoValues.reduce((acc, val) => acc + val, 0);
                const psoAverage = psoValues.length > 0 ? psoSum / psoValues.length : 0; // Use only the non-null values for average

                return (
                  <td key={i} className="border border-gray-300 p-2">
                    {psoAverage.toFixed(2)}
                  </td>
                );
              })}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default TWOnly;
