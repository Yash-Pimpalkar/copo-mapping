import React, { useState } from 'react';
import api from "../../../api";
import * as XLSX from "xlsx";

const TheoryAssg = ({ user_courseid }) => {
    const [TheoryData, setTheoryData] = useState([
        { srNo: 1, id: 'VU4F2122001', name: 'Pukale Harshal', CO5: 8, CO1: 8, CO2: 10, CO3: 10, CO4: 10, CO6: 10, avgTU: 9, miniProject: 5, attendance: 5, total: 19 },
        { srNo: 2, id: 'VU4F2122002', name: 'Gupta Shweta Sanjay Kumar', CO5: 10, CO1: 10, CO2: 10, CO3: 10, CO4: 10, CO6: 10, avgTU: 10, miniProject: 5, attendance: 5, total: 20 },
        { srNo: 3, id: 'VU4F2122003', name: 'Kumar Aman', CO5: 9, CO1: 8, CO2: 9, CO3: 10, CO4: 9, CO6: 8, avgTU: 9, miniProject: 4, attendance: 5, total: 18 },
        { srNo: 4, id: 'VU4F2122004', name: 'Patil Sneha', CO5: 7, CO1: 7, CO2: 8, CO3: 8, CO4: 8, CO6: 9, avgTU: 8, miniProject: 5, attendance: 5, total: 18 },
    ]);
    const [searchQuery, setSearchQuery] = useState("");
    const [editingRow, setEditingRow] = useState(null);
    const [loading, setLoading] = useState(false);
    const [marksData, setMarksData] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [COsData, setCOsData] = useState([]);

    const [attainmentData, setAttainmentData] = useState({
        passedPercentage: 50,
    });

    // Get unique question columns from COsData
    const getQuestionColumns = () => {
        return COsData.map((data) => ({
            id: data.idtable_ia,
            qname: data.qname,
            coname: data.coname,
            marks: data.marks,
        }));
    };

    const questionColumns = getQuestionColumns();


    //function to calculate no of student attempted the per question

    // Function to extract column names based on COsData
    const extractColumnNames = () => {
        const q1Columns = [];
        const specialColumns = [];

        COsData.forEach((item) => {
            if (item.marks === 5) {
                specialColumns.push(item.qname);
            } else {
                q1Columns.push(item.qname);
            }
        });

        return { q1Columns, specialColumns };
    };

    const { q1Columns, specialColumns } = extractColumnNames();

    const calculateTotal = (row) => {
        // Helper function to parse and constrain values, handling null
        const parseAndConstrainValue = (value, min, max) => {
            if (value === null || value === "") {
                return null; // Return null if the value is null or empty
            }
            value = parseFloat(value);
            if (isNaN(value)) return ""; // Handle cases where conversion to number fails
            return Math.max(min, Math.min(value, max));
        };

        // Parse and constrain the values for Q1 columns
        const q1Values = q1Columns.map((col) => {
            // Get the max marks for the current qname from COsData
            const correspondingCoData = COsData.find((data) => data.qname === col);
            const maxMarks = correspondingCoData ? correspondingCoData.marks : 0;

            let value = parseAndConstrainValue(row[col], 0, maxMarks);
            return value !== null ? value : 0; // Replace null with 0 for calculation
        });

        // Parse and constrain the values for special columns
        const specialValues = specialColumns.map((col) => {
            // Get the max marks for the current qname from COsData
            const correspondingCoData = COsData.find((data) => data.qname === col);
            const maxMarks = correspondingCoData ? correspondingCoData.marks : 0;

            let value = parseAndConstrainValue(row[col], 0, maxMarks);
            return value !== null ? value : 0; // Replace null with 0 for calculation
        });

        // Get the highest three values from special columns
        const highestSpecialValues = specialValues
            .sort((a, b) => b - a)
            .slice(0, 3);

        // Calculate the total for Q1 columns
        const q1Total = q1Values.reduce((acc, value) => acc + value, 0);

        // Calculate the total for the highest three special columns
        const specialTotal = highestSpecialValues.reduce(
            (acc, value) => acc + value,
            0
        );

        // Sum both totals to get the final total
        const total = q1Total + specialTotal;

        return total;
    };

    const getTotalStudentsAttempted = () => {
        const attemptedCounts = questionColumns.map((col) => {
            return TheoryData.filter(
                (student) => student[col.qname] !== null && student[col.qname] >= 0
            ).length;
        });
        return attemptedCounts;
    };

    // function to calculate no of student according to percentage criteria
    const getTotalStudentsPassedPerQuestion = (percentage) => {
        const passedCounts = questionColumns.map((col) => {
            // Find the corresponding object in COsData that matches the qname
            const correspondingCoData = COsData.find(
                (data) => data.qname === col.qname
            );

            // Get the maximum marks from the matched object
            const maxMarks = correspondingCoData ? correspondingCoData.marks : 0;
            console.log("Max Marks:", maxMarks);

            return TheoryData.filter((student) => {
                // Get the marks for the current question
                const studentMarks = student[col.qname];

                // Calculate the percentage for the student's marks in this specific question
                const studentPercentage = studentMarks
                    ? (studentMarks / maxMarks) * 100
                    : 0;
                console.log("Student Percentage:", studentPercentage);

                return (
                    studentPercentage >= percentage &&
                    student[col.qname] !== null &&
                    student[col.qname] >= 0
                );
            }).length;
        });

        return passedCounts;
    };

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
        let value = parseInt(event.target.value, 10);

        // Cap the value at 10
        if (value > 10) {
            value = 10;
        }

        // Ensure the value is not less than 0 and is a valid number
        if (isNaN(value) || value < 0) {
            value = 0;
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

    // Handle file download
    const handleFileDownload = () => {
        // Step 1: Prepare the IA Data (Table 1)

        // Create a new array to include the Total column for IA data
        const dataWithTotal = TheoryData.map((row) => ({
            ...row,
            Total: calculateTotal(row),
        }));

        // Create headers for the IA data
        const iaHeaders = [
            "sid",
            "student_name",
            "stud_clg_id",
            ...questionColumns.map((col) => col.qname),
            "Total",
        ];
        const coHeaders = [
            "",
            "",
            "",
            ...questionColumns.map((col) => col.coname),
            "",
        ];

        // Combine headers with the IA data
        const iaDataForExport = [
            iaHeaders,
            coHeaders,
            ...dataWithTotal.map((row) => [
                row.sid,
                row.student_name,
                row.stud_clg_id,
                ...questionColumns.map((col) => row[col.qname]),
                row.Total,
            ]),
        ];

        // Step 2: Prepare the Attainment Data (Table 2)

        const attainmentHeaders = [
            "Type",
            ...questionColumns.map((col) => col.qname),
        ];

        const passedRow = [
            `Passed >= ${attainmentData.passedPercentage}%`,
            ...getTotalStudentsPassedPerQuestion(attainmentData.passedPercentage),
        ];

        const attemptedRow = [
            "Students Attempted Per Question",
            ...getTotalStudentsAttempted(),
        ];

        const coAttainmentRow = [
            "CO Attainment",
            ...getTotalStudentsPassedPerQuestion(attainmentData.passedPercentage).map(
                (passedCount, index) => {
                    const attemptedCount = getTotalStudentsAttempted()[index];
                    return attemptedCount
                        ? ((passedCount / attemptedCount) * 100).toFixed(2) + " %"
                        : "0 %";
                }
            ),
        ];

        // Add dynamic rows for CO averages
        const coAverageRows = ["CO1", "CO2"].map((coName) => {
            const coColumns = questionColumns
                .map((col, index) => ({ ...col, index })) // include index for mapping
                .filter((col) => col.coname === coName); // filter by CO name

            const coAverage = coColumns.length
                ? (
                    coColumns.reduce((sum, col) => {
                        const attainmentValue = getTotalStudentsPassedPerQuestion(
                            attainmentData.passedPercentage
                        )[col.index];
                        const attemptedCount = getTotalStudentsAttempted()[col.index];
                        const attainment = attemptedCount
                            ? (attainmentValue / attemptedCount) * 100
                            : 0;
                        return sum + attainment;
                    }, 0) / coColumns.length
                ).toFixed(2)
                : 0;

            return [coName + " Average", coAverage + " %"];
        });

        const attainmentDataForExport = [
            attainmentHeaders,
            passedRow,
            attemptedRow,
            coAttainmentRow,
            ...coAverageRows.map((row) => [
                ...row,
                ...Array(questionColumns.length - 1).fill(""),
            ]),
        ];

        // Step 3: Combine IA Data and Attainment Data into the same worksheet

        // Convert IA data to worksheet
        const worksheet = XLSX.utils.aoa_to_sheet(iaDataForExport);

        // Calculate starting row for the second table (Attainment Data)
        const attainmentStartRow = iaDataForExport.length + 2; // Leave a couple of rows between tables

        // Append Attainment Data to the worksheet
        XLSX.utils.sheet_add_aoa(worksheet, attainmentDataForExport, {
            origin: { r: attainmentStartRow, c: 0 },
        });

        // Step 4: Create a new workbook and append the worksheet
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "IA1 Data & Attainment");

        // Step 5: Write the workbook to a file
        XLSX.writeFile(workbook, "ia_data_and_attainment.xlsx");
    };

    // Handle search input change
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    // Filter data based on search query
    const filteredData = TheoryData.filter((item) => {
        item.student_name = item.student_name
            ? item.student_name.toUpperCase()
            : "";
        item.sid = item.sid ? item.sid.toString() : "";
        item.stud_clg_id = item.stud_clg_id ? item.stud_clg_id.toUpperCase() : "";

        const query = searchQuery.toUpperCase();

        return (
            item.student_name.includes(query) ||
            item.sid.includes(query) ||
            item.stud_clg_id.includes(query)
        );
    });

    // Handle file upload
    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = async (e) => {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: "array" });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            let jsonData = XLSX.utils.sheet_to_json(worksheet);

            jsonData = jsonData.filter((_, index) => index !== 1 - 1);

            let errors = [];
            const validatedData = jsonData.map((student, rowIndex) => {
                const validatedStudent = { ...student };

                COsData.forEach((col) => {
                    let marks = student[col.qname];

                    // Ensure marks are within limits and handle null
                    const maxLimit = col.marks;
                    if (marks !== null && marks > maxLimit) {
                        errors.push(
                            `Row ${rowIndex + 2}: ${col.qname
                            } has marks ${marks}, which exceeds the limit of ${maxLimit}.`
                        );
                        marks = Math.min(marks, maxLimit); // Adjust the marks to be within the limit
                    }

                    validatedStudent[col.qname] = marks;
                });

                return validatedStudent;
            });

            if (errors.length > 0) {
                alert("Errors found:\n" + errors.join("\n"));
            } else {
                setTheoryData(validatedData);

                const changes = [];
                validatedData.forEach((student) => {
                    COsData.forEach((col) => {
                        const marks = student[col.qname];
                        if (marks !== undefined) {
                            changes.push({
                                sid: student.sid,
                                qid: col.idtable_ia,
                                marks: marks,
                            });
                        }
                    });
                });

                try {
                    await updateMarks(changes);
                } catch (error) {
                    console.error("Error updating marks:", error);
                }
            }
        };

        reader.readAsArrayBuffer(file);
    };

    const renderRows = () => {
        return TheoryData.map((student, index) => (
            <tr key={index} className="text-center">
                <td className="border border-black p-2">{student.srNo}</td>
                <td className="border border-black p-2">{student.id}</td>
                <td className="border border-black p-2">{student.name}</td>
                {Object.keys(student).filter(key => key.startsWith("CO")).map((column) => (
                    <td key={column} className="border border-black p-2">
                        {editingRow === index ? (
                            <input
                                type="number"
                                value={marksData[index]?.[column] ?? student[column]}
                                onChange={(e) => handleInputChange(e, index, column)}
                                className="w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        ) : (
                            student[column]
                        )}
                    </td>
                ))}
                <td className="border border-black p-2">
                    {(
                        (student.CO1 + student.CO2 + student.CO3 + student.CO4 + student.CO5 + student.CO6) / 6
                    ).toFixed(0)}
                </td>
                <td className="border border-black p-2">
                    {editingRow === index ? (
                        <input
                            type="number"
                            value={marksData[index]?.miniProject ?? student.miniProject}
                            onChange={(e) => handleInputChange(e, index, "miniProject")}
                            className="w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            min="0"
                            max="10"
                        />
                    ) : (
                        student.miniProject
                    )}
                </td>
                <td className="border border-black p-2">
                    {editingRow === index ? (
                        <input
                            type="number"
                            value={marksData[index]?.attendance ?? student.attendance}
                            onChange={(e) => handleInputChange(e, index, "attendance")}
                            className="w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            min="0"
                            max="5"
                        />
                    ) : (
                        student.attendance
                    )}
                </td>
                <td className="border border-black p-2">
                    {(
                        (((student.CO1 + student.CO2 + student.CO3 + student.CO4 + student.CO5 + student.CO6) / 6) + student.miniProject + student.attendance)
                    ).toFixed(0)}
                </td>
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
        <div className="overflow-x-auto">
            <h1 className="text-3xl md:text-4xl lg:text-5xl mb-6 text-blue-700 text-center font-bold mt-12">
                Theory + Assignment
            </h1>
            {/* Upload, Search, and Download Controls */}
            <div className="flex flex-col md:flex-row md:space-x-4 mb-4 items-center">
                <div className="mb-4 md:mb-0 flex-1">
                    <label
                        htmlFor="file-upload"
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        Upload File
                    </label>
                    <input
                        type="file"
                        accept=".xlsx"
                        onChange={handleFileUpload}
                        className="block w-full border p-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>

                <div className="mb-4 md:mb-0 flex-1">
                    <label
                        htmlFor="search-bar"
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        Search
                    </label>
                    <input
                        type="text"
                        id="search-bar"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        placeholder="Search by student name or ID"
                        className="block w-full border p-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>

                <div className="mb-4 md:mb-0 flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Download Data
                    </label>
                    <button
                        onClick={handleFileDownload}
                        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                        Download
                    </button>
                </div>
            </div>
            <div className='container mx-auto bg-white shadow-lg rounded-lg p-6'>
                <table className="min-w-full border-collapse border border-black mt-12">
                    <thead>
                        <tr>
                            <th className="border border-black text-center p-2" rowSpan={2}>Sr.no.</th>
                            <th className="border border-black text-center p-2" rowSpan={2}>ID</th>
                            <th className="border border-black text-center p-2" rowSpan={2}>STUDENT NAME</th>
                            <th className="border border-black text-center p-2">TU1</th>
                            <th className="border border-black text-center p-2">TU2</th>
                            <th className="border border-black text-center p-2">TU3</th>
                            <th className="border border-black text-center p-2">TU4</th>
                            <th className="border border-black text-center p-2">TU5</th>
                            <th className="border border-black text-center p-2">TU6</th>

                            <th className="border border-black text-center p-2" colSpan="3">ALL CO</th>
                            <th className="border border-black text-center p-2" rowSpan={2}>TOTAL TW(OUT OF 25)</th>
                            <th className="border border-black text-center p-2" rowSpan={2}>Edit</th>
                        </tr>
                        <tr>
                            <th className="border border-black text-center p-2">CO5</th>
                            <th className="border border-black text-center p-2">CO1</th>
                            <th className="border border-black text-center p-2">CO2</th>
                            <th className="border border-black text-center p-2">CO3</th>
                            <th className="border border-black text-center p-2">CO4</th>
                            <th className="border border-black text-center p-2">CO6</th>
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

export default TheoryAssg;
