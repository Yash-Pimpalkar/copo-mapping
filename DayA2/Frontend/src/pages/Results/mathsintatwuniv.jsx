import React, { useEffect, useState } from "react";
import api from "../../api";
import * as XLSX from "xlsx";

const IntaTWUniv = ({ uid }) => {
  const [userCourseId, setUserCourseId] = useState(null);
  const [loData, setLoData] = useState([]);
  const [univAverage, setUnivAverage] = useState(0);
  const [intaAverage, setIntaAverage] = useState(0);
  const [twAverage, settwAverage] = useState(0);
  const [DirectTotalAttainSixty, setDirectTotalAttainSixty] = useState(0);
  const [DirectTotalAttainForty, setDirectTotalAttainForty] = useState(0);
  const [FinalDirectCourseAttainment, setFinalDirectCourseAttainment] =
    useState(0);
  const [FinalIndirectCourseAttainment, setFinalIndirectCourseAttainment] =
    useState(0);
  const [TotalAttainmentEighty, setTotalAttainmentEighty] = useState(0);
  const [TotalAttainmentTwenty, setTotalAttainmentTwenty] = useState(0);
  const [TotalAttainment, setTotalAttainment] = useState(0);
  const [AverageAttainment, setAverageAttainment] = useState(0);
  const [poPsoData, setPoPsoData] = useState([]);

  useEffect(() => {
    const fetchCosData = async (uid) => {
      try {
        // Make all API requests concurrently using Promise.all
        const [response1, response2, response3, response4, response5, response6] =
          await Promise.all([
            api.get(`/api/result/ia1attainment/ia1/${uid}`),
            api.get(`/api/result/ia2attainment/ia2/${uid}`),
            api.get(`/api/result/inta/${uid}`),
            api.get(`/api/result/univ/${uid}`),
            api.get(`/api/result/tw/${uid}`),
            api.get (`/api/result/indirect/${uid}`),
          ]);

        const ia1Data = response1.data || [];
        const ia2Data = response2.data || [];
        const intaData = response3.data || [];
        const univData = response4.data || [];
        const twData = response5.data || [];
        const indirectData= response6.data || [];
        api
          .get(`/api/result/popso/${uid}`)
          .then((response) => {
            console.log(response);
            setPoPsoData(response.data); // Assuming the data is returned in the required format
          })
          .catch((error) => {
            console.error("Error fetching PO, PSO data:", error);
          });

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

        const indirectMap = indirectData.reduce((acc, item) => {
          acc[item.coname] = Number(item.marks) || 0;
          return acc;
        }, {});

        const combinedData = Array.from(
          new Set([
            ...ia1Data.map((item) => item.coname),
            ...ia2Data.map((item) => item.coname),
            ...intaData.map((item) => item.coname),
            ...univData.map((item) => item.coname),
            ...twData.map((item) => item.coname),
            ...indirectData.map((item) => item.coname),
          ]),
        ).map((coname) => {
          const intaAttainment = intaMap[coname] || 0;
          const univAttainment = univMap[coname] || 0;
          const twattainment = twMap[coname] || 0;
          const directAttainment = (
            ((60 / 100) * ((intaAttainment + twattainment) / 2) +
              (40 / 100) * univAttainment) *
            (80 / 100)
          ).toFixed(2);

          //dummy data
          const indirectAttainmentvalues = indirectMap[coname] || 0; // Example calculation
          // const twattainment = (Math.random() * 3).toFixed(2);  // Dummy twattainment data

          const indirectAttainment = parseFloat(
            (indirectAttainmentvalues * (20 / 100))
        ).toFixed(2);
        
          const totalAttainment =
            parseFloat(directAttainment) + parseFloat(indirectAttainment);

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

        const univAverage =
          combinedData
            .filter((item) => item.univattainment)
            .reduce((sum, item) => sum + Number(item.univattainment), 0) /
          combinedData.length;

        const intaAverage =
          combinedData
            .filter((item) => item.attainment)
            .reduce((sum, item) => sum + Number(item.attainment), 0) /
          combinedData.length;

        const twAverage =
          combinedData
            .filter((item) => item.twattainment)
            .reduce((sum, item) => sum + Number(item.twattainment), 0) /
          combinedData.length;

        const finalIndirectAttainment =
          combinedData
            .filter((item) => item.indirect)
            .reduce((sum, item) => sum + Number(item.indirect), 0) /
          combinedData.length;

        const averageattainment = intaAverage + twAverage;

        const directAttainSixty = (60 / 100) * averageattainment;
        const directAttainForty = (40 / 100) * univAverage;

        const finalDirectAttainment = directAttainSixty + directAttainForty;
        const totalAttainmentEighty = (80 / 100) * finalDirectAttainment;
        const totalAttainmentTwenty = (20 / 100) * finalIndirectAttainment;
        const finalTotalAttainment =
          totalAttainmentEighty + totalAttainmentTwenty;

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

  // Move calculateAverage outside of the map function
  // const calculateAverage = (values) => {
  //   // Logging raw values passed into the function
  //   console.log("Raw values passed to calculateAverage:", values);

  //   // Filter out null, undefined, and invalid (NaN) values
  //   const validValues = values
  //     .filter((value) => value !== null && value !== undefined)
  //     .map((value) => parseFloat(value))
  //     .filter((value) => !isNaN(value)); // Ensure valid numbers

  //   // Log filtered valid values
  //   console.log("Valid values for averaging:", validValues);

  //   if (validValues.length === 0) {
  //     console.log('No valid values found, returning "-"');
  //     return "-"; // Handle case with no valid values
  //   }

  //   const sum = validValues.reduce((acc, curr) => acc + curr, 0);
  //   const average = (sum / validValues.length).toFixed(2);

  //   // Log calculated average
  //   console.log("Calculated average:", average);

  //   return average;
  // };

  const downloadExcel = () => {
    // Define the headers for the Excel sheet
    const headers1 = [
      {
        coname: "CO/LO",
        ia1_attainment: "IA1",
        ia2_attainment: "IA2",
        attainment: "INTA",
        twattainment: "TW",
        univattainment: "UNIV",
        conameIndirect: "Indirect CO/LO",
        indirect: "Indirect",
        direct: "Direct Attainment",
        indirectatt: "Indirect Attainment",
        total: "Total Attainment",
      },
    ];

    // Combine headers and data for LO
    const loDataForExport = [
      ...headers1,
      ...loData.map((item) => ({
        coname: item.coname,
        ia1_attainment: item.ia1_attainment,
        ia2_attainment: item.ia2_attainment,
        attainment: item.attainment,
        // average : item.average,
        univattainment: item.univattainment,
        twattainment: item.twattainment,
        conameIndirect: item.coname, // For the Indirect CO/LO column
        indirect: item.indirect,
        direct: item.direct,
        indirectatt: item.indirectatt,
        total: item.total,
      })),
    ];

    // Add the new table data with calculated attainment values
    const additionalData = [
      {
        coname: "Attainment",
        ia1_attainment: "",
        ia2_attainment: "",
        attainment: intaAverage,
        twattainment: twAverage,
        univattainment: univAverage,
        conameIndirect: "Final Indirect Course Attainment",
        indirect: FinalIndirectCourseAttainment,
      },
      {
        coname: "Average Attainment of TW and Inta",
        ia1_attainment: "",
        ia2_attainment: "",
        attainment: AverageAttainment,
      },
      {
        coname: "Weightage",
        ia1_attainment: "",
        ia2_attainment: "",
        attainment: "60%",
        twattainment: "",
        univattainment: "40%",
      },
      {
        coname: "Direct Total Attainment",
        ia1_attainment: "",
        ia2_attainment: "",
        attainment: DirectTotalAttainSixty,
        twattainment: "",
        univattainment: DirectTotalAttainForty,
      },
      {
        coname: "Final Direct Course Attainment",
        ia1_attainment: "",
        ia2_attainment: "",
        attainment: FinalDirectCourseAttainment,
        twattainment: "",
        univattainment: "",
      },
      {
        coname: "Weightage",
        ia1_attainment: "",
        ia2_attainment: "",
        attainment: "80%",
        twattainment: "",
        univattainment: "",
        conameIndirect: "20%",
        indirect: "",
      },
      {
        coname: "Total Attainment",
        ia1_attainment: "",
        ia2_attainment: "",
        attainment: TotalAttainmentEighty,
        twattainment: "",
        univattainment: "",
        conameIndirect: TotalAttainmentTwenty,
        indirect: "",
      },
      {
        coname: "Course Attainment",
        ia1_attainment: "",
        ia2_attainment: "",
        attainment: TotalAttainment,
        twattainment: "",
        univattainment: "",
        conameIndirect: "",
        indirect: "",
      },
    ];
    
   

    const headers = ['LO/CO', 'PO1', 'PO2', 'PO3', 'PO4', 'PO5', 'PO6', 'PO7', 'PO8', 'PO9', 'PO10', 'PO11', 'PO12', 'PSO1', 'PSO2'];

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
      headers,
      ...data,
    
    ];


    // Create worksheet and workbook
    const worksheet = XLSX.utils.json_to_sheet(finalDataForExport);
    const workbook = XLSX.utils.book_new();

    const poPsoStartRow = loDataForExport.length + additionalData.length;  // Adjusted starting row for PO/PSO

// Add merge properties for PO/PSO headers
// worksheet['!merges'] = [
//   {
//     s: { r: poPsoStartRow, c: 1 }, // Start at PO header row
//     e: { r: poPsoStartRow + 12, c: 1 }, // Rowspan of 13 for PO
//   },
//   {
//     s: { r: poPsoStartRow, c: 2 }, // Start at PSO header row
//     e: { r: poPsoStartRow + 1, c: 2 }, // Rowspan of 2 for PSO
//   },
// ];

    // Get dynamic lengths for the data
    const loDataLength = loDataForExport.length; // Length of the LO data
    const additionalDataLength = additionalData.length; // Length of the additional data

    // Define starting row for additional data (it starts after loDataForExport)
    const additionalDataStartRow = loDataLength + 1; // +1 for header row

    // Calculate dynamic row spans
    const univrowspan = 2;
    const indirectAttainmentRowSpan = 5; // Number of rows to merge for indirect attainment (adjust if needed)
    const directAttainmentStartRow =
      additionalDataStartRow + indirectAttainmentRowSpan; // Where direct attainment starts
    const totalAttainmentRow = directAttainmentStartRow + 2; // Where the final total attainment row will be (adjust if needed)

    // Now create the merges dynamically
    worksheet["!merges"] = [
      {
        s: { r: additionalDataStartRow, c: 0 }, // Dynamic average
        e: { r: additionalDataStartRow, c: 2 }, // Dynamic end row
      },
      {
        s: { r: additionalDataStartRow + 1, c: 0 }, // Dynamic weightage
        e: { r: additionalDataStartRow + 1, c: 2 }, // Dynamic end row
      },
      {
        s: { r: additionalDataStartRow, c: 5 }, // univ row span
        e: { r: additionalDataStartRow + univrowspan - 1, c: 5 },
      },
      {
        s: { r: additionalDataStartRow + 1, c: 3 }, // Dynamic weightage
        e: { r: additionalDataStartRow + 1, c: 4 }, // Dynamic end row
      },
      {
        s: { r: additionalDataStartRow + 2, c: 0 }, // Dynamic direct total attainment
        e: { r: additionalDataStartRow + 2, c: 2 }, // Dynamic end row
      },
      {
        s: { r: additionalDataStartRow + 2, c: 3 }, // direct total attainment
        e: { r: additionalDataStartRow + 2, c: 4 }, // Dynamic end row
      },
      {
        s: { r: additionalDataStartRow + 3, c: 0 }, // Dynamic Final direct course attainment
        e: { r: additionalDataStartRow + 3, c: 2 }, // Dynamic end row
      },
      {
        s: { r: additionalDataStartRow + 3, c: 3 }, // Dynamic Final direct course attainment
        e: { r: additionalDataStartRow + 3, c: 4 }, // Dynamic end row
      },
      {
        s: { r: additionalDataStartRow + 4, c: 0 }, // Dynamic Final direct course attainment
        e: { r: additionalDataStartRow + 4, c: 2 }, // Dynamic end row
      },
      {
        s: { r: additionalDataStartRow, c: 6 }, // Dynamic start for conameIndirect (row-spanned)
        e: { r: additionalDataStartRow + indirectAttainmentRowSpan - 1, c: 6 }, // Dynamic end row
      },
      {
        s: { r: additionalDataStartRow, c: 7 }, // Dynamic start for indirect (column-spanned)
        e: { r: additionalDataStartRow + indirectAttainmentRowSpan - 1, c: 7 }, // Dynamic end row
      },
      {
        s: { r: directAttainmentStartRow, c: 0 }, // Dynamic start for conameIndirect (row-spanned)
        e: { r: directAttainmentStartRow, c: 2 }, // Dynamic end row
      },
      {
        s: { r: directAttainmentStartRow + 1, c: 0 }, // Dynamic start for conameIndirect (row-spanned)
        e: { r: directAttainmentStartRow + 1, c: 2 }, // Dynamic end row
      },
      {
        s: { r: directAttainmentStartRow + 2, c: 0 }, // Dynamic start for conameIndirect (row-spanned)
        e: { r: directAttainmentStartRow + 2, c: 2 }, // Dynamic end row
      },

      // Merging for 'Final Direct Course Attainment'
      {
        s: { r: additionalDataStartRow + 4, c: 3 }, // finaldirectcourseattainment
        e: { r: additionalDataStartRow + 4, c: 5 }, // Merge across columns
      },
      {
        s: { r: directAttainmentStartRow, c: 3 }, // 80
        e: { r: directAttainmentStartRow, c: 5 }, // Merge across columns
      },
      {
        s: { r: directAttainmentStartRow, c: 6 }, // 20
        e: { r: directAttainmentStartRow, c: 7 }, // Merge across columns
      },
      {
        s: { r: directAttainmentStartRow + 1, c: 3 }, // Start row for miniproattainment and oralattainment
        e: { r: directAttainmentStartRow + 1, c: 5 }, // Merge across columns
      },
      {
        s: { r: directAttainmentStartRow + 1, c: 6 }, // Start row for miniproattainment and oralattainment
        e: { r: directAttainmentStartRow + 1, c: 7 }, // Merge across columns
      },
      {
        s: { r: directAttainmentStartRow + 1, c: 1 }, // Row for 80% miniproattainment
        e: { r: directAttainmentStartRow + 1, c: 2 }, // Merge across columns
      },
      {
        s: { r: directAttainmentStartRow + 1, c: 3 }, // Row for 20% oral attainment
        e: { r: directAttainmentStartRow + 1, c: 4 },
      },

      // Merging for 'Total Attainment'
      {
        s: { r: totalAttainmentRow, c: 3 }, // Start row for total attainment merge
        e: { r: totalAttainmentRow, c: 7 }, // Merge across all columns
      },
    ];

    // Append the worksheet
    XLSX.utils.book_append_sheet(workbook, worksheet, "Course Attainment");

    // Write and download the Excel file
    XLSX.writeFile(workbook, "IA1IA2INTATWUNIV_Attainment.xlsx");
  };

  const handlePsoAverage = (poValues, psoValues, poAverage, psoAverage, index) => {
    const check = () => {
    }
    console.log("handlePsoAverage", check)

    // You can also perform actions like API calls, state updates, etc.
  };

  console.log("handlePsoAverage", handlePsoAverage)

  return (
    <div className="p-4">
      {/* Course Attainment Table */}
      <h1 className="text-2xl md:text-3xl lg:text-4xl mb-6 text-blue-700 text-center font-bold">
        Maths inta tw univ Attainment Sheet
      </h1>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300 mb-4 text-sm md:text-base">
          <thead>
            <tr>
              <th className="divide-y border border-gray-300 p-2" colSpan={11}>
                Lab Course Attainment
              </th>
            </tr>
            <tr>
              <th
                className="border border-gray-300 p-2 text-center"  
                colSpan={6}
              >
                Direct Course Attainment Calculations
              </th>
              <th
                className="border border-gray-300 p-2 text-center"
                rowSpan={2}
                colSpan={2}
              >
                Indirect Course Attainment Calculation
              </th>
              <th
                className="border border-gray-300 p-2 text-center"
                rowSpan={2}
              >
                Direct Attainment
              </th>
              <th
                className="border border-gray-300 p-2 text-center"
                rowSpan={2}
              >
                Indirect Attainment
              </th>
              <th
                className="border border-gray-300 p-2 text-center"
                rowSpan={2}
              >
                Total Attainment
              </th>
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
          <tbody className="divide-y">
            {/* Data Rows */}
            {loData.map((item, index) => (
              <tr key={index}>
                <td className="border border-gray-300 p-2 text-center">
                  {item.coname}
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  {item.ia1_attainment}
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  {item.ia2_attainment}
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  {item.attainment}
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  {item.twattainment}
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  {item.univattainment}
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  {item.coname}
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  {item.indirect}
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  {item.direct}
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  {item.indirectatt}
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  {item.total || "NA"}
                </td>
              </tr>
            ))}

            {/* Attainment, Weightage Rows */}
            <tr>
              <td
                className="border border-gray-300 p-2 text-center"
                colSpan={3}
              >
                Attainment
              </td>
              <td className="border border-gray-300 p-2 text-center">
                {intaAverage}
              </td>
              <td className="border border-gray-300 p-2 text-center">
                {twAverage}
              </td>
              <td
                className="border border-gray-300 p-2 text-center"
                rowSpan={2}
              >
                {univAverage}
              </td>
              <td
                className="border border-gray-300 p-2 text-center"
                rowSpan={5}
              >
                Final Indirect Course Attainment
              </td>
              <td
                className="border border-gray-300 p-2 text-center"
                rowSpan={5}
              >
                {FinalIndirectCourseAttainment}
              </td>
            </tr>
            <tr>
              <td
                className="border border-gray-300 p-2 text-center"
                colSpan={3}
              >
                Average Attainment of TW and INTA
              </td>
              <td
                className="border border-gray-300 p-2 text-center"
                colSpan={2}
              >
                {AverageAttainment}
              </td>
            </tr>
            <tr>
              <td
                className="border border-gray-300 p-2 text-center"
                colSpan={3}
              >
                Weightage
              </td>
              <td
                className="border border-gray-300 p-2 text-center"
                colSpan={2}
              >
                60%
              </td>
              <td className="border border-gray-300 p-2 text-center">40%</td>
            </tr>
            <tr>
              <td
                className="border border-gray-300 p-2 text-center"
                colSpan={3}
              >
                Direct Total Attainment
              </td>
              <td
                className="border border-gray-300 p-2 text-center"
                colSpan={2}
              >
                {DirectTotalAttainSixty}
              </td>
              <td className="border border-gray-300 p-2 text-center">
                {DirectTotalAttainForty}
              </td>
            </tr>
            <tr>
              <td
                className="border border-gray-300 p-2 text-center"
                colSpan={3}
              >
                Final Direct Course Attainment
              </td>
              <td
                className="border border-gray-300 p-2 text-center"
                colSpan={3}
              >
                {FinalDirectCourseAttainment}
              </td>
            </tr>
            <tr>
              <td
                className="border border-gray-300 p-2 text-center"
                colSpan={3}
              >
                Weightage
              </td>
              <td
                className="border border-gray-300 p-2 text-center"
                colSpan={3}
              >
                80%
              </td>
              <td
                className="border border-gray-300 p-2 text-center"
                colSpan={2}
              >
                20%
              </td>
            </tr>
            <tr>
              <td
                className="border border-gray-300 p-2 text-center"
                colSpan={3}
              >
                Total Attainment
              </td>
              <td
                className="border border-gray-300 p-2 text-center"
                colSpan={3}
              >
                {TotalAttainmentEighty}
              </td>
              <td
                className="border border-gray-300 p-2 text-center"
                colSpan={2}
              >
                {TotalAttainmentTwenty}
              </td>
            </tr>
            <tr>
              <td
                className="border border-gray-300 p-2 text-center"
                colSpan={3}
              >
                <strong>Course Attainment:</strong>
              </td>
              <td
                className="border border-gray-300 p-2 text-center"
                colSpan={5}
              >
                {TotalAttainment}
              </td>
            </tr>
          </tbody>
        </table>
        <div className="flex justify-center m-8">
          <button
            onClick={downloadExcel}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded "
          >
            Download as Excel
          </button>
        </div>
      </div>

      {/* PO and PSO Attainment Table */}
      <h2 className="text-2xl md:text-3xl lg:text-4xl mb-6 text-blue-700 text-center font-bold">
        PO, PSO Attainment
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y border-collapse border border-gray-300 text-sm md:text-base">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2" colSpan={15}>
                PO, PSO Attainment
              </th>
            </tr>
            <tr>
              <th className="border border-gray-300 p-2" colSpan={13}>
                PO
              </th>
              <th className="border border-gray-300 p-2" colSpan={2}>
                PSO
              </th>
            </tr>
            <tr>
              <th className="border border-gray-300 p-2">LO</th>
              {[...Array(12).keys()].map((i) => (
                <th key={i} className="border border-gray-300 p-2">
                  PO{i + 1}
                </th>
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
                  <td className="border border-gray-300 p-2">
                    {loData[index]?.coname}
                  </td>
                  {item.po.map((poValue, i) => (
                    <td key={i} className="border border-gray-300 p-2">
                      {poValue !== null
                        ? ((poValue * totalatt) / 3).toFixed(2)
                        : "-"}
                    </td>
                  ))}
                  {item.pso.map((psoValue, i) => (
                    <td key={i} className="border border-gray-300 p-2">
                      {psoValue !== null
                        ? ((psoValue * totalatt) / 3).toFixed(2)
                        : "-"}
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
                console.log("poAverage",poAverage)
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
                console.log("psoAverage",psoAverage)
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

export default IntaTWUniv;