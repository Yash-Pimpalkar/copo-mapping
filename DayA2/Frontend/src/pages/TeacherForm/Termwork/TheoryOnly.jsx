import React, { useState, useEffect } from 'react';
import api from "../../../api";

const TheoryOnly = ({ user_courseid }) => {
    const [TheoryData, setTheoryData] = useState([
        { srNo: 1, id: 'VU4F2122001', name: 'Pukale Harshal', CO5: 8, CO1: 8, CO2: 10, CO3: 10, CO4: 10, CO6: 10, avgTU: 9, miniProject: 5, attendance: 5, total: 19 },
        { srNo: 2, id: 'VU4F2122002', name: 'Gupta Shweta Sanjay Kumar', CO5: 10, CO1: 10, CO2: 10, CO3: 10, CO4: 10, CO6: 10, avgTU: 10, miniProject: 5, attendance: 5, total: 20 },
        { srNo: 3, id: 'VU4F2122003', name: 'Kumar Aman', CO5: 9, CO1: 8, CO2: 9, CO3: 10, CO4: 9, CO6: 8, avgTU: 9, miniProject: 4, attendance: 5, total: 18 },
        { srNo: 4, id: 'VU4F2122004', name: 'Patil Sneha', CO5: 7, CO1: 7, CO2: 8, CO3: 8, CO4: 8, CO6: 9, avgTU: 8, miniProject: 5, attendance: 5, total: 18 },
    ]);
    const [editingRow, setEditingRow] = useState(null);
    const [loading, setLoading] = useState(false);
    const [marksData, setMarksData] = useState({});
    const [COsData, setCOsData] = useState([]);

    // Handle the start of editing a row
    const handleEditClick = (index) => {
        setEditingRow(index);
    };

    // Handle saving changes to a row
    const handleSaveClick = async (index) => {
        const student = TheoryData[index];
        const changes = Object.keys(marksData[index] || {}).map((qname) => ({
            sid: student.id, // Assuming `id` is the student's ID
            qname,
            marks: marksData[index][qname],
        }));

        try {
            await updateMarks(changes);
            console.log("Updated values:", changes);
            setEditingRow(null);
        } catch (error) {
            console.error("Error saving data:", error);
        }
    };

    // Handle changes to input fields
    const handleInputChange = (event, index, column) => {
        let value = event.target.value;

        if (value === "") {
            value = null;
        } else {
            value = parseInt(value, 10);
        }

        const coData = COsData.find((co) => co.qname === column);

        if (coData) {
            const maxLimit = coData.marks;

            if (value !== null) {
                value = Math.max(0, Math.min(value, maxLimit));
            }
        }

        setMarksData((prevMarksData) => ({
            ...prevMarksData,
            [index]: {
                ...prevMarksData[index],
                [column]: value,
            },
        }));

        const newData = [...TheoryData];
        newData[index][column] = value;
        setTheoryData(newData);
    };

    const updateMarks = async (changes) => {
      console.log(changes);
      try {
        setLoading(true);
        const response = await api.put("/api/ia/", changes);
        if (response.ok) {
          console.log("Marks updated successfully");
        } else {
          console.error("Failed to update marks");
        }
      } catch (error) {
        console.error("Error updating marks:", error);
      } finally {
        setLoading(false);
      }
    };

    const renderRows = () => {
        return TheoryData.map((student, index) => (
            <tr key={index} className="text-center">
                <td className="border border-black p-2">{student.srNo}</td>
                <td className="border border-black p-2">{student.id}</td>
                <td className="border border-black p-2">{student.name}</td>
                {["CO1", "CO2", "CO3", "CO4", "CO5", "CO6"].map((column) => (
                    <td key={column} className="border border-black p-2">
                        {editingRow === index ? (
                            <input
                                type="number"
                                value={marksData[index]?.[column] ?? student[column]}
                                onChange={(e) => handleInputChange(e, index, column)}
                                className="w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                min="0"
                                max="10"
                            />
                        ) : (
                            student[column]
                        )}
                    </td>
                ))}
                <td className="border border-black p-2">{student.avgTU}</td>
                <td className="border border-black p-2">{student.miniProject}</td>
                <td className="border border-black p-2">{student.attendance}</td>
                <td className="border border-black p-2">{student.total}</td>
                <td className="border border-black p-2">
                    {editingRow === index ? (
                        <button
                            onClick={() => handleSaveClick(index)}
                            className="bg-blue-500 text-white px-2 py-1 rounded"
                        >
                            Save
                        </button>
                    ) : (
                        <button
                            onClick={() => handleEditClick(index)}
                            className="bg-blue-500 text-white px-2 py-1 rounded"
                        >
                            Edit
                        </button>
                    )}
                </td>
            </tr>
        ));
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl md:text-4xl lg:text-5xl mb-6 text-blue-700 text-center font-bold my-6">
                Theory Only
            </h1>
            <div className='container mx-auto bg-white shadow-lg rounded-lg p-6'>
                <table className="min-w-full border-collapse border border-black mt-12">
                    <thead>
                        <tr>
                            <th className="border border-black text-center p-2" rowSpan={2}>Sr.no.</th>
                            <th className="border border-black text-center p-2" rowSpan={2}>ID</th>
                            <th className="border border-black text-center p-2" rowSpan={2}>STUDENT NAME</th>
                            {["CO1", "CO2", "CO3", "CO4", "CO5", "CO6"].map((co, i) => (
                                <th key={i} className="border border-black p-2">
                                    {co}
                                </th>
                            ))}
                            <th className="border border-black text-center p-2" colSpan="3">ALL CO</th>
                            <th className="border border-black text-center p-2" rowSpan={2}>TOTAL TW(OUT OF 25)</th>
                            <th className="border border-black text-center p-2" rowSpan={2}>Edit</th>
                        </tr>
                        <tr>
                            <th className="border border-black text-center p-2">TU1</th>
                            <th className="border border-black text-center p-2">TU2</th>
                            <th className="border border-black text-center p-2">TU3</th>
                            <th className="border border-black text-center p-2">TU4</th>
                            <th className="border border-black text-center p-2">TU5</th>
                            <th className="border border-black text-center p-2">TU6</th>
                            <th className="border border-black text-center p-2">AVG(TU)(OUT OF 20)</th>
                            <th className="border border-black text-center p-2">Mini project/ SCILAB</th>
                            <th className="border border-black text-center p-2">ATTENDANCE (OUT OF 5M)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderRows()}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TheoryOnly;
