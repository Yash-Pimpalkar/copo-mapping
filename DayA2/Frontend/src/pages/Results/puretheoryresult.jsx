import React, { useEffect, useState } from "react";
import api from "../../api";
import * as XLSX from 'xlsx';

const PureTheoryResult = ({ uid }) => {
  // const [userCourseId, setUserCourseId] = useState(null);
  // const [loData, setLoData] = useState(() => JSON.parse(localStorage.getItem('loData')) || []);
  // const [univAverage, setUnivAverage] = useState(() => localStorage.getItem('univAverage') || 0);
  // const [intaAverage, setIntaAverage] = useState(() => localStorage.getItem('intaAverage') || 0);
  // const [DirectTotalAttainSixty, setDirectTotalAttainSixty] = useState(() => localStorage.getItem('DirectTotalAttainSixty') || 0);
  // const [DirectTotalAttainForty, setDirectTotalAttainForty] = useState(() => localStorage.getItem('DirectTotalAttainForty') || 0);
  // const [FinalDirectCourseAttainment, setFinalDirectCourseAttainment] = useState(() => localStorage.getItem('FinalDirectCourseAttainment') || 0);
  // const [FinalIndirectCourseAttainment, setFinalIndirectCourseAttainment] = useState(() => localStorage.getItem('FinalIndirectCourseAttainment') || 0);
  // const [TotalAttainmentEighty, setTotalAttainmentEighty] = useState(() => localStorage.getItem('TotalAttainmentEighty') || 0);
  // const [TotalAttainmentTwenty, setTotalAttainmentTwenty] = useState(() => localStorage.getItem('TotalAttainmentTwenty') || 0);
  // const [TotalAttainment, setTotalAttainment] = useState(() => localStorage.getItem('TotalAttainment') || 0);

  const [userCourseId, setUserCourseId] = useState(null);
  const [loData, setLoData] = useState([]); // Start with an empty array
  const [univAverage, setUnivAverage] = useState(null); // Initially null, to be calculated
  const [intaAverage, setIntaAverage] = useState(null); // Initially null, to be calculated
  const [DirectTotalAttainSixty, setDirectTotalAttainSixty] = useState(null); // Initially null
  const [DirectTotalAttainForty, setDirectTotalAttainForty] = useState(null); // Initially null
  const [FinalDirectCourseAttainment, setFinalDirectCourseAttainment] = useState(null); // Initially null
  const [FinalIndirectCourseAttainment, setFinalIndirectCourseAttainment] = useState(null); // Initially null
  const [TotalAttainmentEighty, setTotalAttainmentEighty] = useState(null); // Initially null
  const [TotalAttainmentTwenty, setTotalAttainmentTwenty] = useState(null); // Initially null
  const [TotalAttainment, setTotalAttainment] = useState(null); // Initially null

  const [poPsoData, setPoPsoData] = useState([]);


  useEffect(() => {
    const fetchCosData = async (uid) => {
      console.log(uid);

      try {
        const [response1, response2, response3, response4, response5] = await Promise.all([
          api.get(`/api/result/ia1attainment/ia1/${uid}`),
          api.get(`/api/result/ia2attainment/ia2/${uid}`),
          api.get(`/api/result/inta/${uid}`),
          api.get(`/api/result/univ/${uid}`),
          api.get(`/api/result/indirect/${uid}`),
          // api.get(`/api/result/ia2attainment/popso/${uid}`)
        ]);

        const ia1Data = response1.data || [];
        const ia2Data = response2.data || [];
        const intaData = response3.data || [];
        const univData = response4.data || [];
        const indirectData = response5.data || [];
        api.get(`/api/result/popso/${uid}`)
          .then(response => {
            console.log(response)
            setPoPsoData(response.data); // Assuming the data is returned in the required format
          })
          .catch(error => {
            console.error('Error fetching PO, PSO data:', error);
          });

        const ia1Map = ia1Data.reduce((acc, ia1Item) => {
          acc[ia1Item.coname] = Number(ia1Item.ia1_attainment) || 0;
          return acc;
        }, {});

        const ia2Map = ia2Data.reduce((acc, ia2Item) => {
          acc[ia2Item.coname] = Number(ia2Item.ia2_attainment) || 0;
          return acc;
        }, {});

        const intaMap = intaData.reduce((acc, intaItem) => {
          acc[intaItem.coname] = Number(intaItem.attainment) || 0;
          return acc;
        }, {});

        const univMap = univData.reduce((acc, univItem) => {
          acc[univItem.coname] = Number(univItem.attainment) || 0;
          return acc;
        }, {});

        const indirectMap = indirectData.reduce((acc, item) => {
          acc[item.coname] = Number(item.marks) || 0;
          return acc;
        }, {});

        const combinedData = Array.from(
          new Set([...ia1Data.map(item => item.coname), ...ia2Data.map(item => item.coname), ...intaData.map(item => item.coname), ...univData.map(item => item.coname),...indirectData.map((item) => item.coname)])
        ).map((coname) => {
          const intaAttainment = intaMap[coname] || 0;
          const univAttainment = univMap[coname] || 0;
          console.log(intaAttainment, univAttainment);
          const directAttainment = ((((60 / 100) * intaAttainment) + ((40 / 100) * univAttainment)) * (80 / 100));


          // Dummy indirect attainment value
          const indirectAttainmentvalues = indirectMap[coname] || 0;

          const indirectAttainment = (indirectAttainmentvalues * (20 / 100)).toFixed(2);    // separate indirect attainment column 

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
        // localStorage.setItem('univAverage', univaverage.toFixed(1));


        const validIntaAttainments = combinedData
          .filter(item => item.attainment !== null && item.attainment !== undefined)
          .map(item => item.attainment);
        const intaaverage = validIntaAttainments.length > 0
          ? validIntaAttainments.reduce((sum, val) => sum + Number(val), 0) / validIntaAttainments.length
          : 0;
        setIntaAverage(intaaverage.toFixed(1));
        // localStorage.setItem('intaAverage', intaaverage.toFixed(1));

        const validFinalIndirectatt = combinedData
          .filter(item => item.indirect !== null && item.indirect !== undefined)
          .map(item => item.indirect);
        const indirectaverage = validFinalIndirectatt.length > 0
          ? validFinalIndirectatt.reduce((sum, val) => sum + Number(val), 0) / validFinalIndirectatt.length
          : 0;
        setFinalIndirectCourseAttainment(indirectaverage.toFixed(1));
        // localStorage.setItem('FinalIndirectCourseAttainment', indirectaverage.toFixed(1));

        // 60%
        const directattainsixty = (60 / 100) * intaaverage;
        setDirectTotalAttainSixty(directattainsixty.toFixed(1));
        // localStorage.setItem('DirectTotalAttainSixty', directattainsixty.toFixed(1));

        // 40%
        const directattainforty = (40 / 100) * univaverage;
        setDirectTotalAttainForty(directattainforty.toFixed(1));
        // localStorage.setItem('DirectTotalAttainForty', directattainforty.toFixed(1));

        // Total 60% and 40%
        const finaldirectattainment = directattainsixty + directattainforty;
        setFinalDirectCourseAttainment(finaldirectattainment.toFixed(1));
        // localStorage.setItem('FinalDirectCourseAttainment', finaldirectattainment.toFixed(1));

        // Total on 80%
        const totalattainmenteighty = (80 / 100) * finaldirectattainment;
        setTotalAttainmentEighty(totalattainmenteighty.toFixed(2));
        // localStorage.setItem('TotalAttainmentEighty', totalattainmenteighty.toFixed(2));

        //20%
        const totalattainmenttwenty = (20 / 100) * indirectaverage;
        setTotalAttainmentTwenty(totalattainmenttwenty.toFixed(2));
        // localStorage.setItem('TotalAttainmentTwenty', totalattainmenttwenty.toFixed(2));

        //Total attainment of 80 and 20 (i.e course attainment)
        const totalattainmentt = (totalattainmenteighty + totalattainmenttwenty);
        setTotalAttainment(totalattainmentt.toFixed(2));
        // localStorage.setItem('TotalAttainment', totalattainmentt.toFixed(2));


        setLoData(combinedData);
        // localStorage.setItem('loData', JSON.stringify(combinedData));

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
      { coname: 'CO/LO', ia1_attainment: 'IA1', ia2_attainment: 'IA2', attainment: 'INTA', univattainment: 'UNIV', conameIndirect: 'Indirect CO/LO', indirect: 'Indirect', direct: 'Direct Attainment', indirectatt: 'Indirect Attainment', total: 'Total Attainment' }
    ];

    // Combine headers and data for LO
    const loDataForExport = [
      ...headers,
      ...loData.map((item) => ({
        coname: item.coname,
        ia1_attainment: item.ia1_attainment,
        ia2_attainment: item.ia2_attainment,
        attainment: item.attainment,
        // average : item.average,
        univattainment: item.univattainment,
        // twAttainment: item.twAttainment,
        conameIndirect: item.coname, // For the Indirect CO/LO column
        indirect: item.indirect,
        direct: item.direct,
        indirectatt: item.indirectatt,
        total: item.total,
      }))
    ];

    // Add the new table data with calculated attainment values
    const additionalData = [
      { coname: "Attainment", ia1_attainment: "", ia2_attainment: "", attainment: intaAverage, univattainment: univAverage, conameIndirect: "Final Indirect Course Attainment", indirect: FinalIndirectCourseAttainment, direct: "" },
      { coname: "Weightage", ia1_attainment: "", ia2_attainment: "", attainment: "60%", univattainment: "40%", conameIndirect: "", indirect: "", direct: "" },
      { coname: "Direct Total Attainment", ia1_attainment: "", ia2_attainment: "", attainment: DirectTotalAttainSixty, univattainment: DirectTotalAttainForty, conameIndirect: "", indirect: "", direct: "" },
      { coname: "Final Direct Course Attainment", ia1_attainment: "", ia2_attainment: "", attainment: FinalDirectCourseAttainment, univattainment: "", conameIndirect: "", indirect: "", direct: "" },
      { coname: "Weightage", ia1_attainment: "", ia2_attainment: "", attainment: "80%", univattainment: "", conameIndirect: "20%", indirect: "", direct: "" },
      { coname: "Total Attainment", ia1_attainment: "", ia2_attainment: "", attainment: TotalAttainmentEighty, univattainment: "", conameIndirect: TotalAttainmentTwenty, indirect: "", direct: "" },
      { coname: "Course Attainment", ia1_attainment: "", ia2_attainment: "", attainment: TotalAttainment, univattainment: "", conameIndirect: "", indirect: "", direct: "" }
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
    const indirectAttainmentRowSpan = 4; // Number of rows to merge for indirect attainment (adjust if needed)
    const directAttainmentStartRow = additionalDataStartRow + indirectAttainmentRowSpan; // Where direct attainment starts
    const totalAttainmentRow = directAttainmentStartRow + 2; // Where the final total attainment row will be (adjust if needed)

    // Now create the merges dynamically
    worksheet['!merges'] = [
      {
        s: { r: additionalDataStartRow, c: 0 }, // Dynamic average
        e: { r: additionalDataStartRow, c: 2 } // Dynamic end row

      },
      {
        s: { r: additionalDataStartRow + 1, c: 0 }, // Dynamic weightage
        e: { r: additionalDataStartRow + 1, c: 2 }, // Dynamic end row

      },
      {
        s: { r: additionalDataStartRow + 2, c: 0 }, // Dynamic direct total attainment
        e: { r: additionalDataStartRow + 2, c: 2 }, // Dynamic end row

      },
      {
        s: { r: additionalDataStartRow + 2, c: 6 }, // direct total attainment
        e: { r: additionalDataStartRow + 2, c: 6 }, // Dynamic end row

      },
      {
        s: { r: additionalDataStartRow + 3, c: 0 }, // Dynamic Final direct course attainment heading 
        e: { r: additionalDataStartRow + 3, c: 2 }, // Dynamic end row

      },
      {
        s: { r: additionalDataStartRow + 3, c: 3 }, // Dynamic Final direct course attainment value
        e: { r: additionalDataStartRow + 3, c: 4 }, // Dynamic end row

      },
      // {
      //   s: { r: additionalDataStartRow, c: 7 }, // Dynamic start for conameIndirect (row-spanned)
      //   e: { r: additionalDataStartRow + indirectAttainmentRowSpan - 1, c: 7}, // Dynamic end row
      // },
      // {
      //   s: { r: additionalDataStartRow, c: 8 }, // Dynamic start for indirect (column-spanned)
      //   e: { r: additionalDataStartRow + indirectAttainmentRowSpan - 1, c: 8 }, // Dynamic end row
      // },
      {
        s: { r: directAttainmentStartRow, c: 0 }, // Dynamic start for conameIndirect (row-spanned)
        e: { r: directAttainmentStartRow, c: 2 } // Dynamic end row

      },
      {
        s: { r: directAttainmentStartRow + 1, c: 0 }, // Dynamic start for conameIndirect (row-spanned)
        e: { r: directAttainmentStartRow + 1, c: 2 } // Dynamic end row

      },
      {
        s: { r: directAttainmentStartRow + 2, c: 0 }, // Dynamic start for conameIndirect (row-spanned)
        e: { r: directAttainmentStartRow + 2, c: 2 } // Dynamic end row

      },

      // Merging for 'Final Indirect Course Attainment'
      {
        s: { r: additionalDataStartRow, c: 5 }, // Dynamic start for conameIndirect (row-spanned)
        e: { r: additionalDataStartRow + indirectAttainmentRowSpan - 1, c: 5 }, // Dynamic end row
      },
      {
        s: { r: additionalDataStartRow, c: 6 }, // Dynamic start for indirect (column-spanned)
        e: { r: additionalDataStartRow + indirectAttainmentRowSpan - 1, c: 6 }, // Dynamic end row
      },

      // // Merging for 'Final Direct Course Attainment'
      // {
      //   s: { r: directAttainmentStartRow-1, c: 3 }, // finaldirectcourseattainment
      //   e: { r: directAttainmentStartRow-1, c: 6 }, // Merge across columns
      // },
      {
        s: { r: directAttainmentStartRow, c: 3 }, // 80
        e: { r: directAttainmentStartRow, c: 4 }, // Merge across columns
      },
      {
        s: { r: directAttainmentStartRow, c: 5 }, // 20
        e: { r: directAttainmentStartRow, c: 6 }, // Merge across columns
      },
      {
        s: { r: directAttainmentStartRow + 1, c: 3 }, // total attainment of 80
        e: { r: directAttainmentStartRow + 1, c: 4 }, // Merge 
      },
      {
        s: { r: directAttainmentStartRow + 1, c: 5 }, // total attainment of 20
        e: { r: directAttainmentStartRow + 1, c: 6 }, // Merge across columns
      },
      {
        s: { r: directAttainmentStartRow + 1, c: 1 }, // heading
        e: { r: directAttainmentStartRow + 1, c: 2 }, // Merge across columns
      },

      // Merging for 'Total Attainment'
      {
        s: { r: totalAttainmentRow, c: 3 }, // Start row for total attainment merge
        e: { r: totalAttainmentRow, c: 6 }, // Merge across all columns
      }
    ];

    // Append the worksheet
    XLSX.utils.book_append_sheet(workbook, worksheet, "Course Attainment");

    // Write and download the Excel file
    XLSX.writeFile(workbook, "IA1IA2INTAUNIV_Attainment.xlsx");
  };

  // const poPsoData = [
  //   { lo: 'ITL501.1', po: [1.93, 1.93, 1.93, 1.93, 1.93, 0.96, '-', '-', '-', '-', '-', 1.93, 0.96, 0.96] },
  //   { lo: 'ITL501.2', po: [1.93, 1.93, 1.93, 1.93, 1.93, 0.96, '-', '-', '-', '-', '-', 1.93, 0.96, 0.96] },
  //   { lo: 'ITL501.3', po: [1.91, 1.91, 1.91, 1.87, 0.96, '-', '-', '-', '-', '-', 1.91, 1.91, 1.91] },
  //   { lo: 'ITL501.4', po: [1.92, 1.92, 1.92, 1.92, 1.92, 0.96, '-', '-', '-', '-', '-', 1.92, 1.92, 1.92] },
  //   { lo: 'ITL501.5', po: [2.86, 2.86, 2.86, 2.86, 2.86, 1.92, '-', '-', '-', '-', '-', 1.91, 2.86, 1.91] },
  // ];
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
              {loData.map((item, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 p-2 text-center">{item.coname}</td>
                  <td className="border border-gray-300 p-2 text-center">{item.ia1_attainment}</td>
                  <td className="border border-gray-300 p-2 text-center">{item.ia2_attainment}</td>
                  <td className="border border-gray-300 p-2 text-center">{item.attainment}</td>
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
                <td className="border border-gray-300 p-2 text-center">{univAverage}</td>
                <td className="border border-gray-300 p-2 text-center" rowSpan={4}>Final Indirect Course Attainment</td>
                <td className="border border-gray-300 p-2 text-center" rowSpan={4}>{FinalIndirectCourseAttainment}</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2 text-center" colSpan={3}>Weightage</td>
                <td className="border border-gray-300 p-2 text-center">60%</td>
                <td className="border border-gray-300 p-2 text-center">40%</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2 text-center" colSpan={3}>Direct Total Attainment</td>
                <td className="border border-gray-300 p-2 text-center">{DirectTotalAttainSixty}</td>
                <td className="border border-gray-300 p-2 text-center">{DirectTotalAttainForty}</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2 text-center" colSpan={3}>Final Direct Course Attainment</td>
                <td className="border border-gray-300 p-2 text-center" colSpan={2}>{FinalDirectCourseAttainment}</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2 text-center" colSpan={3}>Weightage</td>
                <td className="border border-gray-300 p-2 text-center" colSpan={2}>80%</td>
                <td className="border border-gray-300 p-2 text-center" colSpan={2}>20%</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2 text-center" colSpan={3}>Total Attainment</td>
                <td className="border border-gray-300 p-2 text-center" colSpan={2}>{TotalAttainmentEighty}</td>
                <td className="border border-gray-300 p-2 text-center" colSpan={2}>{TotalAttainmentTwenty}</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2 text-center" colSpan={3}>
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
      </>
      {/* )} */}
    </div>
  );
};

export default PureTheoryResult;