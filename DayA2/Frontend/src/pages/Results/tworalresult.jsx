import React from 'react';

const Tworalresult = () => {
  const loData = [
    { lo: 'ITL501.1', tw: 3, or: 3, indirect: 2.47, direct: 2.40, total: 2.89 },
    { lo: 'ITL501.2', tw: 3, or: 3, indirect: 2.44, direct: 2.40, total: 2.89 },
    { lo: 'ITL501.3', tw: 3, or: 3, indirect: 2.36, direct: 2.40, total: 2.87 },
    { lo: 'ITL501.4', tw: 3, or: 3, indirect: 2.39, direct: 2.40, total: 2.88 },
    { lo: 'ITL501.5', tw: 3, or: 3, indirect: 2.29, direct: 2.40, total: 2.86 },
    { lo: 'ITL501.6', tw: 3, or: 3, indirect: 2.31, direct: 2.40, total: 2.86 },
  ];

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
                <td className="border border-gray-300 p-2 text-center">{item.lo}</td>
                <td className="border border-gray-300 p-2 text-center">{item.tw}</td>
                <td className="border border-gray-300 p-2 text-center">{item.or}</td>
                <td className="border border-gray-300 p-2 text-center">{item.lo}</td>
                <td className="border border-gray-300 p-2 text-center">{item.indirect}</td>
                <td className="border border-gray-300 p-2 text-center">{item.direct}</td>
                <td className="border border-gray-300 p-2 text-center">{item.indirect}</td>
                <td className="border border-gray-300 p-2 text-center">{item.total}</td>
              </tr>
            ))}

            {/* Attainment, Weightage Rows */}
            <tr>
              <td className="border border-gray-300 p-2 text-center">Attainment</td>
              <td className="border border-gray-300 p-2 text-center">3.00</td>
              <td className="border border-gray-300 p-2 text-center">3.00</td>
              <td className="border border-gray-300 p-2 text-center" rowSpan={4}>Final Indirect Course Attainment</td>
              <td className="border border-gray-300 p-2 text-center" rowSpan={4}>2.38</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2 text-center">Weightage</td>
              <td className="border border-gray-300 p-2 text-center">60%</td>
              <td className="border border-gray-300 p-2 text-center">40%</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2 text-center">Direct Total Attainment</td>
              <td className="border border-gray-300 p-2 text-center">1.80</td>
              <td className="border border-gray-300 p-2 text-center">1.20</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2 text-center">Final Direct Course Attainment</td>
              <td className="border border-gray-300 p-2 text-center" colSpan={2}>3.00</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2 text-center">Weightage</td>
              <td className="border border-gray-300 p-2 text-center" colSpan={2}>80%</td>
              <td className="border border-gray-300 p-2 text-center" colSpan={2}>20%</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2 text-center">Total Attainment</td>
              <td className="border border-gray-300 p-2 text-center" colSpan={2}>2.40</td>
              <td className="border border-gray-300 p-2 text-center" colSpan={2}>0.48</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2 text-center">
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
    </div>
  );
};

export default Tworalresult;
