<div className="container mx-auto p-4 md:px-8 lg:px-10 bg-white shadow-lg rounded-lg">
    
<>
  <div className="flex flex-col items-center mb-6">
    {/* Centered Title */}
    <h1 className="text-3xl md:text-4xl lg:text-5xl text-blue-700 font-bold text-center">
      TCS TYPE IA1 AND IA2 Attainment
    </h1>
  </div>

  <div className="overflow-x-auto ">
    <table className="min-w-full border-collapse border border-gray-400">
      <thead className="sticky top-0 bg-white z-10">
        <tr>
          <th className="border border-gray-300 p-2" colSpan={12}>
            Lab Course Attainment
          </th>
        </tr>
        <tr>
          <th
            className="border border-gray-300 p-2 text-center"
            colSpan={7}
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
          <th className="border border-gray-300 p-2 text-center">
            ASSIGNMENTS
          </th>
          <th className="border border-gray-300 p-2 text-center">
            AVERAGE
          </th>
          <th className="border border-gray-300 p-2 text-center">UNIV</th>
        </tr>
      </thead>
      <tbody>
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
              {item.twAttainment}
            </td>
            <td className="border border-gray-300 p-2 text-center">
              {item.average}
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
              {item.total.toFixed(2) || "NA"}
            </td>
          </tr>
        ))}

        <tr>
          <td
            className="border border-gray-300 p-2 text-center"
            colSpan={5}
          >
            AVERAGE
          </td>
          <td className="border border-gray-300 p-2 text-center">
            {Average}
          </td>
          <td className="border border-gray-300 p-2 text-center">
            {univAverage}
          </td>
          <td
            className="border border-gray-300 p-2 text-center"
            rowSpan={4}
          >
            Final Indirect Course Attainment
          </td>
          <td
            className="border border-gray-300 p-2 text-center"
            rowSpan={4}
          >
            {FinalIndirectCourseAttainment}
          </td>
        </tr>
        <tr>
          <td
            className="border border-gray-300 p-2 text-center"
            colSpan={5}
          >
            Weightage
          </td>
          <td className="border border-gray-300 p-2 text-center">60%</td>
          <td className="border border-gray-300 p-2 text-center">40%</td>
        </tr>
        <tr>
          <td
            className="border border-gray-300 p-2 text-center"
            colSpan={5}
          >
            Direct Total Attainment
          </td>
          <td className="border border-gray-300 p-2 text-center">
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
            colSpan={4}
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
            colSpan={4}
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
            colSpan={4}
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
            colSpan={6}
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
  <div className="w-full max-w-screen-3xl mx-auto">
    <div className="overflow-x-auto sm:overflow-x-scroll md:overflow-x-scroll lg:overflow-x-scroll xl:overflow-x-auto 2xl:overflow-x-auto 3xl:overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
      <table className="min-w-full border-collapse border border-gray-300 text-sm md:text-base lg:text-lg font-sans">
        <thead>
          <tr className="border-b border-gray-400">
            <th className="border border-gray-300 p-2" colSpan={15}>
              PO, PSO Attainment
            </th>
          </tr>
          <tr className="border-b border-gray-400">
            <th className="border border-gray-300 p-2" colSpan={13}>
              PO
            </th>
            <th className="border border-gray-300 p-2" colSpan={2}>
              PSO
            </th>
          </tr>
          <tr className="border-b border-gray-400 bg-gray-100">
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
              <tr key={index} className="border-b border-gray-300">
                <td className="border border-gray-300 p-2">
                  {loData[index]?.coname}
                </td>
                {item.po.map((poValue, i) => (
                  <td
                    key={i}
                    className="border border-gray-300 p-2 whitespace-nowrap"
                  >
                    {poValue !== null
                      ? ((poValue * totalatt) / 3).toFixed(2)
                      : "-"}
                  </td>
                ))}
                {item.pso.map((psoValue, i) => (
                  <td
                    key={i}
                    className="border border-gray-300 p-2 whitespace-nowrap"
                  >
                    {psoValue !== null
                      ? ((psoValue * totalatt) / 3).toFixed(2)
                      : "-"}
                  </td>
                ))}
              </tr>
            );
          })}

          {/* Average Row */}
          <tr className="border-b border-gray-300">
            <td className="border border-gray-300 p-2">AVG</td>
            {poPsoData.length > 0 &&
              poPsoData[0].po.map((_, i) => {
                const poValues = poPsoData
                  .map((item, index) => {
                    const totalatt =
                      parseFloat(loData[index]?.total) || 0;
                    const poValue =
                      item.po[i] !== null ? parseFloat(item.po[i]) : null;
                    return poValue !== null
                      ? (poValue * totalatt) / 3
                      : null;
                  })
                  .filter((value) => value !== null);

                const poSum = poValues.reduce((acc, val) => acc + val, 0);
                const poAverage =
                  poValues.length > 0 ? poSum / poValues.length : 0;

                return (
                  <td
                    key={i}
                    className="border border-gray-300 p-2 whitespace-nowrap"
                  >
                    {poAverage.toFixed(2)}
                  </td>
                );
              })}
            {poPsoData.length > 0 &&
              poPsoData[0].pso.map((_, i) => {
                const psoValues = poPsoData
                  .map((item, index) => {
                    const totalatt =
                      parseFloat(loData[index]?.total) || 0;
                    const psoValue =
                      item.pso[i] !== null
                        ? parseFloat(item.pso[i])
                        : null;
                    return psoValue !== null
                      ? (psoValue * totalatt) / 3
                      : null;
                  })
                  .filter((value) => value !== null);

                const psoSum = psoValues.reduce(
                  (acc, val) => acc + val,
                  0
                );
                const psoAverage =
                  psoValues.length > 0 ? psoSum / psoValues.length : 0;

                return (
                  <td
                    key={i}
                    className="border border-gray-300 p-2 whitespace-nowrap"
                  >
                    {psoAverage.toFixed(2)}
                  </td>
                );
              })}
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</>
</div>