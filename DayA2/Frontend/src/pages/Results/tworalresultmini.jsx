import React, { useEffect, useState } from 'react';
import api from "../../api";
import * as XLSX from 'xlsx';

const Tworalresultmini = ({ uid }) => {
  const [userCourseId, setUserCourseId] = useState(null);
  const [loData, setLoData] = useState([]);
  const [miniproAverage, setminiproAverage] = useState(0);
  const [oralAverage, setoralAverage] = useState(0);
  const [DirectTotalAttainSixty, setDirectTotalAttainSixty] = useState(0);
  const [DirectTotalAttainForty, setDirectTotalAttainForty] = useState(0);
  const [FinalDirectCourseAttainment, setFinalDirectCourseAttainment] = useState(0);
  const [FinalIndirectCourseAttainment, setFinalIndirectCourseAttainment] = useState(0);
  const [TotalAttainmentEighty, setTotalAttainmentEighty] = useState(0);
  const [TotalAttainmentTwenty, setTotalAttainmentTwenty] = useState(0);
  const [TotalAttainment, setTotalAttainment] = useState(0);
  const [poPsoData, setPoPsoData] = useState([]);

  useEffect(() => {
    const fetchCosData = async (uid) => {
      try {
        // Make all API requests concurrently using Promise.all
        const [response1, response2, response3] = await Promise.all([
          api.get(`/api/result/minipro/${uid}`),
          api.get(`/api/result/oral/${uid}`),
          api.get(`/api/result/indirect/${uid}`),
        ]);

        const miniproData = response1.data || [];
        const oralData = response2.data || [];
        const indirectData = response3.data || [];
        api.get(`/api/result/popso/${uid}`)
          .then(response => {
            console.log(response)
            setPoPsoData(response.data); // Assuming the data is returned in the required format
          })
          .catch(error => {
            console.error('Error fetching PO, PSO data:', error);
          });

        const miniproMap = miniproData.reduce((acc, miniproItem) => {
          acc[miniproItem.coname] = Number(miniproItem.attainment) || 0;
          return acc;
        }, {});

        const oralMap = oralData.reduce((acc, oralItem) => {
          acc[oralItem.coname] = Number(oralItem.attainment) || 0;
          return acc;
        }, {});

        const indirectMap = indirectData.reduce((acc, item) => {
          acc[item.coname] = Number(item.marks) || 0;
          return acc;
        }, {});

        const combinedData = Array.from(
          new Set([...miniproData.map(item => item.coname), ...oralData.map(item => item.coname), ...indirectData.map(item => item.coname)])
        ).map((coname) => {
          const miniproattainment = miniproMap[coname] || 0;
          const oralattainment = oralMap[coname] || 0;
          const directAttainment = ((((60 / 100) * miniproattainment) + ((40 / 100) * oralattainment)) * (80 / 100)).toFixed(2);

          //dummy data
          const indirectAttainmentvalues = indirectMap[coname] || 0;  // Example calculation
          // const twattainment = (Math.random() * 3).toFixed(2);  // Dummy twattainment data

          const indirectAttainment = (indirectAttainmentvalues * (20 / 100)).toFixed(2);;
          const totalAttainment = parseFloat(directAttainment) + parseFloat(indirectAttainment);

          return {
            coname,
            miniproattainment: miniproattainment,
            oralattainment: oralattainment,
            indirect: indirectAttainmentvalues,
            direct: directAttainment,
            indirectatt: indirectAttainment,
            total: totalAttainment.toFixed(2),
          };
        });

        const miniproAverage = combinedData
          .filter(item => item.miniproattainment)
          .reduce((sum, item) => sum + Number(item.miniproattainment), 0) / combinedData.length;

        const oralAverage = combinedData
          .filter(item => item.oralattainment)
          .reduce((sum, item) => sum + Number(item.oralattainment), 0) / combinedData.length;


        const finalIndirectAttainment = combinedData
          .filter(item => item.indirect)
          .reduce((sum, item) => sum + Number(item.indirect), 0) / combinedData.length;


        const directAttainSixty = (60 / 100) * miniproAverage;
        const directAttainForty = (40 / 100) * oralAverage;

        const finalDirectAttainment = directAttainSixty + directAttainForty;
        const totalAttainmentEighty = (80 / 100) * finalDirectAttainment;
        const totalAttainmentTwenty = (20 / 100) * finalIndirectAttainment;
        const finalTotalAttainment = totalAttainmentEighty + totalAttainmentTwenty;

        setminiproAverage(miniproAverage.toFixed(2));
        setoralAverage(oralAverage.toFixed(2))
        setFinalIndirectCourseAttainment(finalIndirectAttainment.toFixed(2));
        setDirectTotalAttainSixty(directAttainSixty.toFixed(2));
        setDirectTotalAttainForty(directAttainForty.toFixed(2));
        setFinalDirectCourseAttainment(finalDirectAttainment.toFixed(2));
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

  // Move calculateAverage outside of the map function
  const calculateAverage = (values) => {
    const validValues = values.filter(value => value !== null && value !== undefined);
    if (validValues.length === 0) return '-'; // Return '-' if no valid values
    const sum = validValues.reduce((acc, val) => acc + Number(val), 0);
    return (sum / validValues.length).toFixed(2); // Calculate average
  };


  const downloadExcel = () => {
    // Define the headers for the Excel sheet
    const headers = [
      { coname: 'CO/LO', miniproattainment: 'TW', oralattainment: 'OR', conameIndirect: 'Indirect CO/LO', indirect: 'Indirect', direct: 'Direct Attainment', indirectatt: 'Indirect Attainment', total: 'Total Attainment' }
    ];

    // Combine headers and data for LO
    const loDataForExport = [
      ...headers,
      ...loData.map((item) => ({
        coname: item.coname,
        miniproattainment: item.miniproattainment,
        oralattainment: item.oralattainment,
        conameIndirect: item.coname, // For the Indirect CO/LO column
        indirect: item.indirect,
        direct: item.direct,
        indirectatt: item.indirectatt,
        total: item.total,
      }))
    ];

    // Add the new table data with calculated attainment values
    const additionalData = [
      { coname: "Attainment", miniproattainment: miniproAverage, oralattainment: oralAverage, conameIndirect: "Final Indirect Course Attainment", indirect: FinalIndirectCourseAttainment },
      { coname: "Weightage", miniproattainment: "60%", oralattainment: "40%" },
      { coname: "Direct Total Attainment", miniproattainment: DirectTotalAttainSixty, oralattainment: DirectTotalAttainForty },
      { coname: "Final Direct Course Attainment", miniproattainment: FinalDirectCourseAttainment, oralattainment: "", conameIndirect: "", indirect: "" },
      { coname: "Weightage", miniproattainment: "80%", oralattainment: "", conameIndirect: "20%" },
      { coname: "Total Attainment", miniproattainment: TotalAttainmentEighty, oralattainment: "", conameIndirect: TotalAttainmentTwenty },
      { coname: "Course Attainment", miniproattainment: TotalAttainment, oralattainment: "", conameIndirect: "", indirect: "" }
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


    // Create worksheet and workbook
    const worksheet = XLSX.utils.json_to_sheet(finalDataForExport);
    const workbook = XLSX.utils.book_new();

    const poPsoStartRow = loDataForExport.length + additionalData.length; 

    // Get dynamic lengths for the data
    const loDataLength = loDataForExport.length; // Length of the LO data
    const additionalDataLength = additionalData.length; // Length of the additional data

    // Define starting row for additional data (it starts after loDataForExport)
    const additionalDataStartRow = loDataLength + 1; // +1 for header row

    // Calculate dynamic row spans
    const indirectAttainmentRowSpan = 4; // Number of rows to merge for indirect attainment (adjust if needed)
    const directAttainmentStartRow = additionalDataStartRow + indirectAttainmentRowSpan; // Where direct attainment starts
    const totalAttainmentRow = directAttainmentStartRow + 2; // Where the final total attainment row will be (adjust if needed)

    // Now create the merges dynamically
    worksheet['!merges'] = [
      // Merging for 'Final Indirect Course Attainment'
      {
        s: { r: additionalDataStartRow, c: 3 }, // Dynamic start for conameIndirect (row-spanned)
        e: { r: additionalDataStartRow + indirectAttainmentRowSpan - 1, c: 3 }, // Dynamic end row
      },
      {
        s: { r: additionalDataStartRow, c: 4 }, // Dynamic start for indirect (column-spanned)
        e: { r: additionalDataStartRow + indirectAttainmentRowSpan - 1, c: 4 }, // Dynamic end row
      },

      // Merging for 'Final Direct Course Attainment'
      {
        s: { r: directAttainmentStartRow - 1, c: 1 }, // Start row for miniproattainment and oralattainment
        e: { r: directAttainmentStartRow - 1, c: 2 }, // Merge across columns
      },
      {
        s: { r: directAttainmentStartRow, c: 1 }, // Start row for miniproattainment and oralattainment
        e: { r: directAttainmentStartRow, c: 2 }, // Merge across columns
      },
      {
        s: { r: directAttainmentStartRow, c: 3 }, // Start row for miniproattainment and oralattainment
        e: { r: directAttainmentStartRow, c: 4 }, // Merge across columns
      },
      {
        s: { r: directAttainmentStartRow + 1, c: 1 }, // Row for 80% miniproattainment
        e: { r: directAttainmentStartRow + 1, c: 2 }, // Merge across columns
      },
      {
        s: { r: directAttainmentStartRow + 1, c: 3 }, // Row for 20% oral attainment
        e: { r: directAttainmentStartRow + 1, c: 4 }, // Merge across columns
      },

      // Merging for 'Total Attainment'
      {
        s: { r: totalAttainmentRow, c: 1 }, // Start row for total attainment merge
        e: { r: totalAttainmentRow, c: 4 }, // Merge across all columns
      }
    ];

    // Append the worksheet
    XLSX.utils.book_append_sheet(workbook, worksheet, "Course Attainment");

    // Write and download the Excel file
    XLSX.writeFile(workbook, "TW_ORAL_MiniPro_Attainment.xlsx");
  };

  return (
    <div className="p-4">
      {/* Course Attainment Table */}
      <h1 className="text-2xl md:text-3xl lg:text-4xl mb-6 text-blue-700 text-center font-bold">TW+ORAL(LAB) Attainment</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300 mb-4 text-sm md:text-base">
          <thead>
            <tr>
              <th className='border border-gray-300 p-2' colSpan={8}>Lab Course Attainment</th>
            </tr>
            <tr>
              <th className="border border-gray-300 p-2 text-center" colSpan={3}>
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
              <th className="border border-gray-300 p-2 text-center">OR</th>
            </tr>
          </thead>
          <tbody>
            {/* Data Rows */}
            {loData.map((item, index) => (
              <tr key={index}>
                <td className="border border-gray-300 p-2 text-center">{item.coname}</td>
                <td className="border border-gray-300 p-2 text-center">{item.miniproattainment}</td>
                <td className="border border-gray-300 p-2 text-center">{item.oralattainment}</td>
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
              <td className="border border-gray-300 p-2 text-center">{miniproAverage}</td>
              <td className="border border-gray-300 p-2 text-center">{oralAverage}</td>
              <td className="border border-gray-300 p-2 text-center" rowSpan={4}>Final Indirect Course Attainment</td>
              <td className="border border-gray-300 p-2 text-center" rowSpan={4}>{FinalIndirectCourseAttainment}</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2 text-center">Weightage</td>
              <td className="border border-gray-300 p-2 text-center">60%</td>
              <td className="border border-gray-300 p-2 text-center">40%</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2 text-center">Direct Total Attainment</td>
              <td className="border border-gray-300 p-2 text-center">{DirectTotalAttainSixty}</td>
              <td className="border border-gray-300 p-2 text-center">{DirectTotalAttainForty}</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2 text-center">Final Direct Course Attainment</td>
              <td className="border border-gray-300 p-2 text-center" colSpan={2}>{FinalDirectCourseAttainment}</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2 text-center">Weightage</td>
              <td className="border border-gray-300 p-2 text-center" colSpan={2}>80%</td>
              <td className="border border-gray-300 p-2 text-center" colSpan={2}>20%</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2 text-center">Total Attainment</td>
              <td className="border border-gray-300 p-2 text-center" colSpan={2}>{TotalAttainmentEighty}</td>
              <td className="border border-gray-300 p-2 text-center" colSpan={2}>{TotalAttainmentTwenty}</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2 text-center">
                <strong>Course Attainment:</strong>
              </td>
              <td className="border border-gray-300 p-2 text-center" colSpan={4}>
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
              const totalatt = parseFloat(loData[index]?.total) || 0; // Access totalatt from loData
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


export default Tworalresultmini;
