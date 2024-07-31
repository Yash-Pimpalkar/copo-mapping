import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';

const Ia2 = () => {
    const [data, setData] = useState([
        { clgId: 'CLG-001', name: 'John Doe', division: 'A', q1a: '90', q1b: '80', q1c: '85', q2: '88', q3: '343', q4: '13', q5: '13', isEditing: false },
        { clgId: 'CLG-002', name: 'Jane Smith', division: 'B', q1a: '85', q1b: '90', q1c: '92', q2: '87', q3: '354', q4: '13', q5: '13', isEditing: false },
        { clgId: 'CLG-003', name: 'Michael Brown', division: 'C', q1a: '88', q1b: '82', q1c: '91', q2: '89', q3: '350', q4: '13', q5: '13', isEditing: false },
        { clgId: 'CLG-004', name: 'Alice Johnson', division: 'A', q1a: '90', q1b: '85', q1c: '88', q2: '92', q3: '355', q4: '12', q5: '11', isEditing: false },
        { clgId: 'CLG-005', name: 'Bob White', division: 'B', q1a: '87', q1b: '89', q1c: '85', q2: '86', q3: '340', q4: '14', q5: '15', isEditing: false },
        { clgId: 'CLG-006', name: 'Charlie Green', division: 'C', q1a: '84', q1b: '83', q1c: '87', q2: '90', q3: '330', q4: '13', q5: '14', isEditing: false },
        { clgId: 'CLG-007', name: 'David Black', division: 'A', q1a: '85', q1b: '82', q1c: '86', q2: '88', q3: '320', q4: '12', q5: '13', isEditing: false },
        { clgId: 'CLG-008', name: 'Ella Brown', division: 'B', q1a: '88', q1b: '90', q1c: '89', q2: '85', q3: '325', q4: '15', q5: '12', isEditing: false },
        { clgId: 'CLG-009', name: 'Frank White', division: 'C', q1a: '86', q1b: '87', q1c: '84', q2: '87', q3: '310', q4: '13', q5: '14', isEditing: false },
        { clgId: 'CLG-010', name: 'Grace Green', division: 'A', q1a: '82', q1b: '85', q1c: '83', q2: '89', q3: '300', q4: '14', q5: '15', isEditing: false },
    ]);

    const [isCOEditing, setIsCOEditing] = useState(false);
    const [coValues, setCOValues] = useState({ CO1: 'CO1', CO2: 'CO1', CO3: 'CO2', CO4: 'CO3', CO5: 'CO4', CO6: 'CO5', CO7: 'CO5' });

    const itemsPerPage = 5; // Number of items per page

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const rowsPerPage = 5;

    const handleEdit = (index) => {
        const newData = [...data];
        newData[index].isEditing = true;
        setData(newData);
    };

    const handleSave = (index) => {
        const newData = [...data];
        newData[index].isEditing = false;
        setData(newData);
    };

    const generateVisiblePages = () => {
        const visiblePages = [];
        const numPagesToShow = 5;

        if (totalPages <= numPagesToShow + 2) {
            for (let i = 1; i <= totalPages; i++) {
                visiblePages.push(i);
            }
        } else {
            let start = Math.max(1, currentPage - 2);
            let end = Math.min(totalPages, currentPage + 2);

            if (start > 1) visiblePages.push(1);
            if (start > 2) visiblePages.push('...');
            
            for (let i = start; i <= end; i++) {
                visiblePages.push(i);
            }
            
            if (end < totalPages - 1) visiblePages.push('...');
            if (end < totalPages) visiblePages.push(totalPages);
        }

        return visiblePages;
    };

    const visiblePages = generateVisiblePages();

    useEffect(() => {
        generateVisiblePages(currentPage, totalPages);
    });

    const handleChange = (index, field, value) => {
        const newData = [...data];
        if (['q1a', 'q1b'].includes(field)) {
            if (Number(value) > 2 || Number(value) < 0) value = 2;
        }
        if (field === 'q1c') {
            if (Number(value) > 1 || Number(value) < 0) value = 1;
        }
        if (['q2', 'q3', 'q4', 'q5'].includes(field)) {
            if (Number(value) > 5 || Number(value) < 0) value = 5;
        }
        newData[index][field] = value;
        setData(newData);
    };

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: 'array' });
                const worksheet = workbook.Sheets[workbook.SheetNames[0]];
                const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
                const formattedData = jsonData.slice(2).map((row) => ({
                    clgId: row[0],
                    name: row[1],
                    division: row[2],
                    q1a: row[3],
                    q1b: row[4],
                    q1c: row[5],
                    q2: row[6],
                    q3: row[7],
                    q4: row[8],
                    q5: row[9],
                    isEditing: false
                }));
                setData(formattedData);

                const totalRows = jsonData.length - 1; // Subtract 1 if the first row is the header
                const totalPages = Math.ceil(totalRows / rowsPerPage);
                setTotalPages(totalPages);
            };
            reader.readAsArrayBuffer(file);
        }
    };

    const downloadTableAsExcel = () => {
        const formattedData = data.map(item => {
            const q2q5Scores = [Number(item.q2), Number(item.q3), Number(item.q4), Number(item.q5)];
            const topThreeScores = q2q5Scores.sort((a, b) => b - a).slice(0, 3);

            const total = topThreeScores.reduce((sum, score) => sum + score, 0);

            return {
                clgId: item.clgId,
                name: item.name,
                division: item.division,
                q1a: item.q1a,
                q1b: item.q1b,
                q1c: item.q1c,
                q2: item.q2,
                q3: item.q3,
                q4: item.q4,
                q5: item.q5,
                Total: total > 20 ? 20 : total,
            };
        });


        const ws = XLSX.utils.json_to_sheet(formattedData);

        const headerRow = ["", "", "", "Q1a", "Q1b", "Q1c", "Q2", "Q3", "Q4", "Q5", "Total"];
        const subHeaderRow = ["", "", "", coValues.CO1, coValues.CO2, coValues.CO3, coValues.CO4, coValues.CO5, coValues.CO6, coValues.CO7, ""];

        XLSX.utils.sheet_add_aoa(ws, [headerRow], { origin: 'A1' });
        XLSX.utils.sheet_add_aoa(ws, [subHeaderRow], { origin: 'A2' });
        XLSX.utils.sheet_add_json(ws, formattedData, { skipHeader: true, origin: "A3" });

        ws['!cols'] = [
            { wpx: 100 },
            { wpx: 150 },
            { wpx: 100 },
            { wpx: 80 },
            { wpx: 80 },
            { wpx: 80 },
            { wpx: 80 },
            { wpx: 80 },
            { wpx: 80 },
            { wpx: 80 },
            { wpx: 120 },
            { wpx: 120 },
            { wpx: 120 },
            { wpx: 120 },
            { wpx: 120 },
            { wpx: 120 },
            { wpx: 120 },
        ];

        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "IA2 Data");

        XLSX.writeFile(wb, "IA2_Data.xlsx");
    };

    const handleEditCO = () => {
        setIsCOEditing(true);
    };

    const handleSaveCO = () => {
        setIsCOEditing(false);
    };

    const handleCOChange = (field, value) => {
        setCOValues(prev => ({ ...prev, [field]: value }));
    };

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentData = data.slice(indexOfFirstItem, indexOfLastItem);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prevPage => prevPage - 1);
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
        // Perform additional actions like fetching new data here
    };

    return (
        <div className="overflow-x-auto">
            <h1 className='text-3xl mb-6 text-blue-500 text-center mt-5'>IA2</h1>
            <div className="flex justify-between items-center mb-6">
                <label className="bg-blue-500 text-white ml-5 px-4 py-2 rounded cursor-pointer">
                    Upload
                    <input
                        type="file"
                        accept=".xlsx, .xls"
                        onChange={handleFileUpload}
                        className="hidden"
                    />
                </label>
                <select
                    className="flex-grow px-4 py-2 border border-gray-300 rounded mx-4">
                    <option value="">Select Course...</option>
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                    {/* Add more options as needed */}
                </select>
                <input
                    type="text"
                    placeholder="Search..."
                    className="flex-grow px-4 py-2 border border-gray-300 rounded mx-4"
                />
                <button
                    className="bg-blue-500 text-white mr-5 px-4 py-2 rounded"
                    onClick={downloadTableAsExcel}
                >
                    Download
                </button>
            </div>
            <table className="w-full text-sm text-left rtl:text-right text-black bg-white border border-collapse border-black">
                <thead className="text-xs text-black uppercase bg-white-100 border border-black">
                    <tr>
                        <th scope="col" rowSpan="2" className="px-6 py-3 border sticky border-black">Sr.No</th>
                        <th scope="col" rowSpan="2" className="px-6 py-3 border sticky border-black">CLG-Id</th>
                        <th scope="col" rowSpan="2" className="px-6 py-3 border sticky border-black">Name</th>
                        <th scope="col" rowSpan="2" className="px-6 py-3 border sticky border-black">Division</th>
                        <th scope="col" colSpan="3" className="px-6 py-3 text-center border border-black">Q1</th>
                        <th scope="col" rowSpan="2" className="px-6 py-3 border border-black">Q2</th>
                        <th scope="col" rowSpan="2" className="px-6 py-3 border border-black">Q3</th>
                        <th scope="col" rowSpan="2" className="px-6 py-3 border border-black">Q4</th>
                        <th scope="col" rowSpan="2" className="px-6 py-3 border border-black">Q5</th>
                        <th scope="col" rowSpan="2" className="px-6 py-3 border border-black">Total</th>
                        <th scope="col" rowSpan="2" className="px-6 py-3 border border-black">Actions</th>
                    </tr>
                    <tr>
                        <th scope="col" className="px-6 py-3 text-center border border-black">Q1a</th>
                        <th scope="col" className="px-6 py-3 text-center border border-black">Q1b</th>
                        <th scope="col" className="px-6 py-3 text-center border border-black">Q1c</th>
                    </tr>
                    <tr>
                        <th scope="col" className="px-6 py-3 border border-black"></th>
                        <th scope="col" className="px-6 py-3 border border-black"></th>
                        <th scope="col" className="px-6 py-3 border border-black"></th>
                        <th scope="col" className="px-6 py-3 border border-black"></th>
                        {Object.keys(coValues).map(coKey => (
                            isCOEditing ? (
                                <th key={coKey} scope="col" className="px-6 py-3 text-center border border-black">
                                    <input
                                        type="text"
                                        value={coValues[coKey]}
                                        onChange={(e) => handleCOChange(coKey, e.target.value)}
                                        className="text-center"
                                    />
                                </th>
                            ) : (
                                <th key={coKey} scope="col" className="px-6 py-3 text-center border border-black">
                                    {coValues[coKey]}
                                </th>
                            )
                        ))}
                        <th scope="col" className="px-6 py-3 border border-black"></th>
                        <th scope="col" className="px-6 py-3 border border-black">
                            {isCOEditing ? (
                                <button
                                    className="bg-blue-500 text-white px-2 py-1 rounded"
                                    onClick={handleSaveCO}
                                >
                                    Save
                                </button>
                            ) : (
                                <button
                                    className="bg-blue-500 text-white px-2 py-1 rounded"
                                    onClick={handleEditCO}
                                >
                                    Edit
                                </button>
                            )}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {currentData.map((item, index) => (
                        <tr key={index} className="bg-white border-b border-black">
                            <td className="px-6 py-4 border border-black">{indexOfFirstItem + index + 1}</td>
                            <td className="px-6 py-4 border border-black">
                                {item.isEditing ? (
                                    <input
                                        type="text"
                                        value={item.clgId}
                                        onChange={(e) => handleChange(indexOfFirstItem + index, 'clgId', e.target.value)}
                                        className="text-center"
                                    />
                                ) : (
                                    item.clgId
                                )}
                            </td>
                            <td className="px-6 py-4 border border-black">
                                {item.isEditing ? (
                                    <input
                                        type="text"
                                        value={item.name}
                                        onChange={(e) => handleChange(indexOfFirstItem + index, 'name', e.target.value)}
                                        className="text-center"
                                    />
                                ) : (
                                    item.name
                                )}
                            </td>
                            <td className="px-6 py-4 border border-black">
                                {item.isEditing ? (
                                    <input
                                        type="text"
                                        value={item.division}
                                        onChange={(e) => handleChange(indexOfFirstItem + index, 'division', e.target.value)}
                                        className="text-center"
                                    />
                                ) : (
                                    item.division
                                )}
                            </td>
                            <td className="px-6 py-4 border border-black">
                                {item.isEditing ? (
                                    <input
                                        type="text"
                                        value={item.q1a}
                                        onChange={(e) => handleChange(indexOfFirstItem + index, 'q1a', e.target.value)}
                                        className="text-center"
                                    />
                                ) : (
                                    item.q1a
                                )}
                            </td>
                            <td className="px-6 py-4 border border-black">
                                {item.isEditing ? (
                                    <input
                                        type="text"
                                        value={item.q1b}
                                        onChange={(e) => handleChange(indexOfFirstItem + index, 'q1b', e.target.value)}
                                        className="text-center"
                                    />
                                ) : (
                                    item.q1b
                                )}
                            </td>
                            <td className="px-6 py-4 border border-black">
                                {item.isEditing ? (
                                    <input
                                        type="text"
                                        value={item.q1c}
                                        onChange={(e) => handleChange(indexOfFirstItem + index, 'q1c', e.target.value)}
                                        className="text-center"
                                    />
                                ) : (
                                    item.q1c
                                )}
                            </td>
                            <td className="px-6 py-4 border border-black">
                                {item.isEditing ? (
                                    <input
                                        type="text"
                                        value={item.q2}
                                        onChange={(e) => handleChange(indexOfFirstItem + index, 'q2', e.target.value)}
                                        className="text-center"
                                    />
                                ) : (
                                    item.q2
                                )}
                            </td>
                            <td className="px-6 py-4 border border-black">
                                {item.isEditing ? (
                                    <input
                                        type="text"
                                        value={item.q3}
                                        onChange={(e) => handleChange(indexOfFirstItem + index, 'q3', e.target.value)}
                                        className="text-center"
                                    />
                                ) : (
                                    item.q3
                                )}
                            </td>
                            <td className="px-6 py-4 border border-black">
                                {item.isEditing ? (
                                    <input
                                        type="text"
                                        value={item.q4}
                                        onChange={(e) => handleChange(indexOfFirstItem + index, 'q4', e.target.value)}
                                        className="text-center"
                                    />
                                ) : (
                                    item.q4
                                )}
                            </td>
                            <td className="px-6 py-4 border border-black">
                                {item.isEditing ? (
                                    <input
                                        type="text"
                                        value={item.q5}
                                        onChange={(e) => handleChange(indexOfFirstItem + index, 'q5', e.target.value)}
                                        className="text-center"
                                    />
                                ) : (
                                    item.q5
                                )}
                            </td>
                            <td className="px-6 py-4 border border-black">
                                {Number(item.q1a) + Number(item.q1b) + Number(item.q1c) + Number(item.q2) + Number(item.q3) + Number(item.q4) + Number(item.q5)}
                            </td>
                            <td className="px-6 py-4 border border-black">
                                {item.isEditing ? (
                                    <button
                                        className="bg-blue-500 text-white px-2 py-1 rounded"
                                        onClick={() => handleSave(indexOfFirstItem + index)}
                                    >
                                        Save
                                    </button>
                                ) : (
                                    <button
                                        className="bg-blue-500 text-white px-2 py-1 rounded"
                                        onClick={() => handleEdit(indexOfFirstItem + index)}
                                    >
                                        Edit
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex justify-center mt-4">
                <button
                    className={`bg-blue-500 text-white px-4 py-2 rounded mr-5 ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <button
                    className={`bg-blue-500 text-white px-4 py-2 rounded space-x-2 ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""}`}
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
            <div>
            {/* Pagination Component */}
            <div className="flex justify-center my-4">
                {visiblePages.map((page, index) => (
                    <button
                        key={index}
                        className={`px-4 py-2 mx-1 rounded ${currentPage === page ? "bg-white-500 text-black" : "bg-blue-500 text-white"}`}
                        onClick={() => typeof page === 'number' && handlePageChange(page)}
                        disabled={typeof page !== 'number'}
                    >
                        {page}
                    </button>
                ))}
            </div>
        </div>
    </div>
    );
};

export default Ia2;
