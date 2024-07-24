import React, { useState } from 'react';
import * as XLSX from 'xlsx';

const Ia1 = () => {
    const [data, setData] = useState([
        { clgId: 'CLG-001', name: 'John Doe', division: 'A', q1a: '90', q1b: '80', q1c: '85', q2: '88', q3: '343', q4: '13', q5: '13', isEditing: false },
        { clgId: 'CLG-002', name: 'Jane Smith', division: 'B', q1a: '85', q1b: '90', q1c: '92', q2: '87', q3: '354', q4: '13', q5: '13', isEditing: false },
        { clgId: 'CLG-003', name: 'Michael Brown', division: 'C', q1a: '88', q1b: '82', q1c: '91', q2: '89', q3: '350', q4: '13', q5: '13', isEditing: false },
    ]);
    const [isCOEditing, setIsCOEditing] = useState(false);
    const [coValues, setCOValues] = useState({ CO1: 'CO1', CO2: 'CO1', CO3: 'CO2', CO4: 'CO3', CO5: 'CO4', CO6: 'CO5',CO7:'CO5' });

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

    const handleChange = (index, field, value) => {
        const newData = [...data];
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
                const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1});
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
            };
            reader.readAsArrayBuffer(file);
        }
    };

    const downloadTableAsExcel = () => {
        // Prepare data with line breaks
        const formattedData = data.map(item => ({
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
            Total: Number(item.q1a) + Number(item.q1b) + Number(item.q1c) + Number(item.q2) + Number(item.q3) + Number(item.q4) + Number(item.q5),
        }));
    
        // Create a worksheet from the formatted data
        const ws = XLSX.utils.json_to_sheet(formattedData);
    
        // Add subheader rows
        const headerRow = ["", "", "", "Q1a", "Q1b", "Q1c", "Q2", "Q3", "Q4", "Q5", "Total"];
        const subHeaderRow = ["", "", "", coValues.CO1, coValues.CO2, coValues.CO3, coValues.CO4, coValues.CO5, coValues.CO6, coValues.CO7, ""];
    
        // Convert header rows to sheet format
        XLSX.utils.sheet_add_aoa(ws, [headerRow], { origin: 'A1' });
        XLSX.utils.sheet_add_aoa(ws, [subHeaderRow], { origin: 'A2' });
        XLSX.utils.sheet_add_json(ws, formattedData, { skipHeader: true, origin: "A3" });
    
        // Adjust column widths to accommodate line breaks
        ws['!cols'] = [
            { wpx: 100 }, // Width for CLG-Id
            { wpx: 150 }, // Width for Name
            { wpx: 100 }, // Width for Division
            { wpx: 80 },  // Width for Q1a
            { wpx: 80 },  // Width for Q1b
            { wpx: 80 },  // Width for Q1c
            { wpx: 80 },  // Width for Q2
            { wpx: 80 },  // Width for Q3
            { wpx: 80 },  // Width for Q4
            { wpx: 80 },  // Width for Q5
            { wpx: 120 }, // Width for CO1
            { wpx: 120 }, // Width for CO2
            { wpx: 120 }, // Width for CO3
            { wpx: 120 }, // Width for CO4
            { wpx: 120 }, // Width for CO5
            { wpx: 120 }, // Width for CO6
            { wpx: 120 }, // Width for CO7
        ];
    
        // Create a workbook and append the worksheet
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "IA1 Data");
    
        // Write the file
        XLSX.writeFile(wb, "IA1_Data.xlsx");
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

    return (
        <div className="relative overflow-x-auto">
            <h1 className='text-3xl mb-6 text-blue-500 text-center mt-5'>IA1</h1>
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
            <table className="w-full text-sm text-left rtl:text-right text-black bg-white">
                <thead className="text-xs text-black uppercase bg-gray-100">
                    <tr>
                        <th scope="col" rowSpan="2" className="px-6 py-3">Sr.No</th>
                        <th scope="col" rowSpan="2" className="px-6 py-3">CLG-Id</th>
                        <th scope="col" rowSpan="2" className="px-6 py-3">Name</th>
                        <th scope="col" rowSpan="2" className="px-6 py-3">Division</th>
                        <th scope="col" colSpan="3" className="px-6 py-3 text-center">Q1</th>
                        <th scope="col" rowSpan="2" className="px-6 py-3">Q2</th>
                        <th scope="col" rowSpan="2" className="px-6 py-3">Q3</th>
                        <th scope="col" rowSpan="2" className="px-6 py-3">Q4</th>
                        <th scope="col" rowSpan="2" className="px-6 py-3">Q5</th>
                        <th scope="col" rowSpan="2" className="px-6 py-3">Total</th>
                        <th scope="col" rowSpan="2" className="px-6 py-3">Actions</th>
                    </tr>
                    <tr>
                        <th scope="col" className="px-6 py-3 text-center">Q1a</th>
                        <th scope="col" className="px-6 py-3 text-center">Q1b</th>
                        <th scope="col" className="px-6 py-3 text-center">Q1c</th>
                    </tr>
                    <tr>
                        <th scope="col" className="px-6 py-3"></th>
                        <th scope="col" className="px-6 py-3"></th>
                        <th scope="col" className="px-6 py-3"></th>
                        <th scope="col" className="px-6 py-3"></th>
                       
                        {isCOEditing ? (
                            <>
                                <th scope="col" className="px-6 py-3 text-center">
                                    <input
                                        type="text"
                                        value={coValues.CO1}
                                        onChange={(e) => handleCOChange('CO1', e.target.value)}
                                        className="border border-gray-300 p-1"
                                    />
                                </th>
                                <th scope="col" className="px-6 py-3 text-center">
                                    <input
                                        type="text"
                                        value={coValues.CO2}
                                        onChange={(e) => handleCOChange('CO2', e.target.value)}
                                        className="border border-gray-300 p-1"
                                    />
                                </th>
                                <th scope="col" className="px-6 py-3 text-center">
                                    <input
                                        type="text"
                                        value={coValues.CO3}
                                        onChange={(e) => handleCOChange('CO3', e.target.value)}
                                        className="border border-gray-300 p-1"
                                    />
                                </th>
                                <th scope="col" className="px-6 py-3 text-center">
                                    <input
                                        type="text"
                                        value={coValues.CO4}
                                        onChange={(e) => handleCOChange('CO4', e.target.value)}
                                        className="border border-gray-300 p-1"
                                    />
                                </th>
                                <th scope="col" className="px-6 py-3 text-center">
                                    <input
                                        type="text"
                                        value={coValues.CO5}
                                        onChange={(e) => handleCOChange('CO5', e.target.value)}
                                        className="border border-gray-300 p-1"
                                    />
                                </th>
                                <th scope="col" className="px-6 py-3 text-center">
                                    <input
                                        type="text"
                                        value={coValues.CO6}
                                        onChange={(e) => handleCOChange('CO6', e.target.value)}
                                        className="border border-gray-300 p-1"
                                    />
                                </th>
                                <th scope="col" className="px-6 py-3 text-center">
                                    <input
                                        type="text"
                                        value={coValues.CO7}
                                        onChange={(e) => handleCOChange('CO7', e.target.value)}
                                        className="border border-gray-300 p-1"
                                    />
                                </th>
                            </>
                        ) : (
                            <>
                                <th scope="col" className="px-6 py-3 text-center">{coValues.CO1}</th>
                                <th scope="col" className="px-6 py-3 text-center">{coValues.CO2}</th>
                                <th scope="col" className="px-6 py-3 text-center">{coValues.CO3}</th>
                                <th scope="col" className="px-6 py-3 text-center">{coValues.CO4}</th>
                                <th scope="col" className="px-6 py-3 text-center">{coValues.CO5}</th>
                                <th scope="col" className="px-6 py-3 text-center">{coValues.CO6}</th>
                                <th scope="col" className="px-6 py-3 text-center">{coValues.CO7}</th>
                            </>
                        )}
                        <th scope="col" className="px-6 py-3"></th>
                        <th scope="col" className="px-6 py-3"> {isCOEditing ? (
                                <button className="bg-green-500 text-white px-2 py-1 rounded" onClick={handleSaveCO}>Save</button>
                            ) : (
                                <button className="bg-blue-500 text-white px-2 py-1 rounded" onClick={handleEditCO}>Edit</button>
                            )}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index} className="bg-white border-b">
                            <td className="px-6 py-4">{index + 1}</td>
                            <td className="px-6 py-4">
                                {item.isEditing ? (
                                    <input
                                        type="text"
                                        value={item.clgId}
                                        onChange={(e) => handleChange(index, 'clgId', e.target.value)}
                                        className="border border-gray-300 p-1"
                                    />
                                ) : (
                                    item.clgId
                                )}
                            </td>
                            <td className="px-6 py-4">
                                {item.isEditing ? (
                                    <input
                                        type="text"
                                        value={item.name}
                                        onChange={(e) => handleChange(index, 'name', e.target.value)}
                                        className="border border-gray-300 p-1"
                                    />
                                ) : (
                                    item.name
                                )}
                            </td>
                            <td className="px-6 py-4">
                                {item.isEditing ? (
                                    <input
                                        type="text"
                                        value={item.division}
                                        onChange={(e) => handleChange(index, 'division', e.target.value)}
                                        className="border border-gray-300 p-1"
                                    />
                                ) : (
                                    item.division
                                )}
                            </td>
                            <td className="px-6 py-4">
                                {item.isEditing ? (
                                    <input
                                        type="text"
                                        value={item.q1a}
                                        onChange={(e) => handleChange(index, 'q1a', e.target.value)}
                                        className="border border-gray-300 p-1"
                                    />
                                ) : (
                                    item.q1a
                                )}
                            </td>
                            <td className="px-6 py-4">
                                {item.isEditing ? (
                                    <input
                                        type="text"
                                        value={item.q1b}
                                        onChange={(e) => handleChange(index, 'q1b', e.target.value)}
                                        className="border border-gray-300 p-1"
                                    />
                                ) : (
                                    item.q1b
                                )}
                            </td>
                            <td className="px-6 py-4">
                                {item.isEditing ? (
                                    <input
                                        type="text"
                                        value={item.q1c}
                                        onChange={(e) => handleChange(index, 'q1c', e.target.value)}
                                        className="border border-gray-300 p-1"
                                    />
                                ) : (
                                    item.q1c
                                )}
                            </td>
                            <td className="px-6 py-4">
                                {item.isEditing ? (
                                    <input
                                        type="text"
                                        value={item.q2}
                                        onChange={(e) => handleChange(index, 'q2', e.target.value)}
                                        className="border border-gray-300 p-1"
                                    />
                                ) : (
                                    item.q2
                                )}
                            </td>
                            <td className="px-6 py-4">
                                {item.isEditing ? (
                                    <input
                                        type="text"
                                        value={item.q3}
                                        onChange={(e) => handleChange(index, 'q3', e.target.value)}
                                        className="border border-gray-300 p-1"
                                    />
                                ) : (
                                    item.q3
                                )}
                            </td>
                            <td className="px-6 py-4">
                                {item.isEditing ? (
                                    <input
                                        type="text"
                                        value={item.q4}
                                        onChange={(e) => handleChange(index, 'q4', e.target.value)}
                                        className="border border-gray-300 p-1"
                                    />
                                ) : (
                                    item.q4
                                )}
                            </td>
                            <td className="px-6 py-4">
                                {item.isEditing ? (
                                    <input
                                        type="text"
                                        value={item.q5}
                                        onChange={(e) => handleChange(index, 'q5', e.target.value)}
                                        className="border border-gray-300 p-1"
                                    />
                                ) : (
                                    item.q5
                                )}
                            </td>
                            <td className="px-6 py-4">
                                {Number(item.q1a) + Number(item.q1b) + Number(item.q1c) + Number(item.q2) + Number(item.q3) + Number(item.q4) + Number(item.q5)}
                            </td>
                            <td className="px-6 py-4">
                                {item.isEditing ? (
                                    <button
                                        onClick={() => handleSave(index)}
                                        className="bg-green-500 text-white px-2 py-1 rounded"
                                    >
                                        Save
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => handleEdit(index)}
                                        className="bg-blue-500 text-white px-2 py-1 rounded"
                                    >
                                        Edit
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Ia1;