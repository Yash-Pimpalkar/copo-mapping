import React, { useEffect, useState } from "react";
import api from "../../api";
import LoadingButton from "../../component/Loading/Loading";

const CoposhowComponent = ({ uid }) => {
  const [courses, setCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [copo, setCopo] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/api/copo/${uid}`);
        setCourses(res.data);
      } catch (error) {
        console.error("Error fetching course data:", error);
      } finally{
        setLoading(false);
      }
    };

    if (uid) {
      fetchCourseData();
    }
  }, [uid]);

  const fetchCopo = async (usercourse) => {
    try {
      setLoading(true);
      const res = await api.get(`/api/copo/show/${usercourse}`);
      setCopo(res.data);
    } catch (error) {
      console.error("Error fetching CO-PO data:", error);
    } finally{
      setLoading(false);
    }
  };

  const handleCourseChange = (event) => {
    const selectedId = event.target.value;
    setSelectedCourseId(selectedId);
    fetchCopo(selectedId);
  };

  const handleChange = (index, field, value) => {
    const updatedCopo = [...copo];
    const intValue = parseInt(value, 10);
    updatedCopo[index][field] = (intValue >= 1 && intValue <= 3) ? intValue : null;
    setCopo(updatedCopo);
  };

  const handleSave = async (coId) => {
    const item = copo.find(c => c.co_id === coId);
    try {
      setLoading(true);
      await api.put(`/api/copo/update/${coId}`, {
        po_1: item.po_1,
        po_2: item.po_2,
        po_3: item.po_3,
        po_4: item.po_4,
        po_5: item.po_5,
        po_6: item.po_6,
        po_7: item.po_7,
        po_8: item.po_8,
        po_9: item.po_9,
        po_10: item.po_10,
        po_11: item.po_11,
        po_12: item.po_12,
        pso_1: item.pso_1,
        pso_2: item.pso_2
      });
      alert("Changes saved successfully!");
    } catch (error) {
      console.error("Error saving changes:", error);
    } finally {
      setLoading(false);
    }
  };

  const headers = [
    "CO Name",
    "PO1", "PO2", "PO3", "PO4", "PO5", "PO6", "PO7", "PO8", "PO9", "PO10", "PO11", "PO12",
    "PSO1", "PSO2",
    "Actions"
  ];

  const calculateAverages = () => {
    const columnTotals = {
      po_1: 0, po_2: 0, po_3: 0, po_4: 0, po_5: 0, po_6: 0,
      po_7: 0, po_8: 0, po_9: 0, po_10: 0, po_11: 0, po_12: 0,
      pso_1: 0, pso_2: 0
    };
    const columnCounts = {
      po_1: 0, po_2: 0, po_3: 0, po_4: 0, po_5: 0, po_6: 0,
      po_7: 0, po_8: 0, po_9: 0, po_10: 0, po_11: 0, po_12: 0,
      pso_1: 0, pso_2: 0
    };

    copo.forEach(item => {
      Object.keys(columnTotals).forEach(col => {
        if (item[col] !== null && item[col] !== 0) {
          columnTotals[col] += item[col];
          columnCounts[col] += 1;
        }
      });
    });

    const averages = {};
    Object.keys(columnTotals).forEach(col => {
      averages[col] = columnCounts[col] === 0 ? 0 : (columnTotals[col] / columnCounts[col]).toFixed(2);
    });

    return averages;
  };

  const averages = calculateAverages();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">CO PO Mapping</h1>
      <div className="mb-4">
        <label htmlFor="course-select" className="block text-sm font-medium text-gray-700">Select a Course</label>
        <select
          id="course-select"
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          onChange={handleCourseChange}
        >
          <option value="">Select a course</option>
          {courses.map(course => (
            <option key={course.usercourse_id} value={course.usercourse_id}>
              {course.course_name}
            </option>
          ))}
        </select>
      </div>
      {selectedCourseId && copo.length > 0 && (
      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-blue-500 ">
              <tr>
                {headers.map(header => (
                  <th
                    key={header}
                    className={`px-6 py-3 text-left text-xs font-medium text-white-500 uppercase tracking-wider ${header === 'CO Name' ? 'sticky left-0  bg-blue-600 z-10' : ''} ${header === 'Average' ? 'sticky right-0  bg-blue-500 z-10' : ''}`}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {copo.map((item, index) => (
                <tr key={item.co_id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 sticky left-0 bg-white z-10">{item.co_name}</td>
                  {[...Array(12)].map((_, poIndex) => (
                    <td key={`po_${poIndex + 1}`} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <input
                        type="number"
                        min="1"
                        max="3"
                        value={item[`po_${poIndex + 1}`] !== null ? item[`po_${poIndex + 1}`] : ""}
                        onChange={(e) => handleChange(index, `po_${poIndex + 1}`, e.target.value)}
                        className="w-full border-gray-300 rounded-md shadow-sm"
                      />
                    </td>
                  ))}
                  {[1, 2].map(pso => (
                    <td key={`pso_${pso}`} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <input
                        type="number"
                        min="1"
                        max="3"
                        value={item[`pso_${pso}`] !== null ? item[`pso_${pso}`] : ""}
                        onChange={(e) => handleChange(index, `pso_${pso}`, e.target.value)}
                        className="w-full border-gray-300 rounded-md shadow-sm"
                      />
                    </td>
                  ))}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button
                      onClick={() => handleSave(item.co_id)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm"
                    >
                      Save
                    </button>
                  </td>
                </tr>
              ))}
              <tr className="bg-gray-50 font-semibold">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 sticky left-0 bg-white z-10">Average</td>
                {[...Array(12)].map((_, poIndex) => (
                  <td key={`avg_po_${poIndex + 1}`} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {averages[`po_${poIndex + 1}`]}
                  </td>
                ))}
                {[1, 2].map(pso => (
                  <td key={`avg_pso_${pso}`} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {averages[`pso_${pso}`]}
                  </td>
                ))}
                <td className="px-6 py-4 whitespace-nowrap"></td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CoposhowComponent;
