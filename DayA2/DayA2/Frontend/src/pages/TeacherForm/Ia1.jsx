import React, { useState } from 'react';
import * as XLSX from 'xlsx';

const Ia1 = () => {
    const [data, setData] = useState([
        { clgId: 'CLG-001', name: 'John Doe', division: 'A', q1a: '90', q1b: '80', q1c: '85', q2: '88', q3: '343', q4: '13', q5: '13', isEditing: false },
        { clgId: 'CLG-002', name: 'Jane Smith', division: 'B', q1a: '85', q1b: '90', q1c: '92', q2: '87', q3: '354', q4: '13', q5: '13', isEditing: false },
        { clgId: 'CLG-003', name: 'Michael Brown', division: 'C', q1a: '88', q1b: '82', q1c: '91', q2: '89', q3: '350', q4: '13', q5: '13', isEditing: false },
    ]);
    const [isCOEditing, setIsCOEditing] = useState(false);
    const [coValues, setCOValues] = useState({ CO1: 'CO1', CO2: 'CO1', CO3: 'CO2', CO4: 'CO3', CO5: 'CO4', CO6: 'CO5', CO7: 'CO5' });

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
        XLSX.utils.book_append_sheet(wb, ws, "IA1 Data");

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
            <table className="w-full text-sm text-left rtl:text-right text-black bg-white border border-collapse border-black">
                <thead className="text-xs text-black uppercase bg-white-100 border border-black">
                    <tr>
                        <th scope="col" rowSpan="2" className="px-6 py-3 border border-black">Sr.No</th>
                        <th scope="col" rowSpan="2" className="px-6 py-3 border border-black">CLG-Id</th>
                        <th scope="col" rowSpan="2" className="px-6 py-3 border border-black">Name</th>
                        <th scope="col" rowSpan="2" className="px-6 py-3 border border-black">Division</th>
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
                    {data.map((item, index) => (
                        <tr key={index} className="bg-white border-b border-black">
                            <td className="px-6 py-4 border border-black">{index + 1}</td>
                            <td className="px-6 py-4 border border-black">
                                {item.isEditing ? (
                                    <input 
                                        type="text" 
                                        value={item.clgId} 
                                        onChange={(e) => handleChange(index, 'clgId', e.target.value)} 
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
                                        onChange={(e) => handleChange(index, 'name', e.target.value)} 
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
                                        onChange={(e) => handleChange(index, 'division', e.target.value)} 
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
                                        onChange={(e) => handleChange(index, 'q1a', e.target.value)} 
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
                                        onChange={(e) => handleChange(index, 'q1b', e.target.value)} 
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
                                        onChange={(e) => handleChange(index, 'q1c', e.target.value)} 
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
                                        onChange={(e) => handleChange(index, 'q2', e.target.value)} 
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
                                        onChange={(e) => handleChange(index, 'q3', e.target.value)} 
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
                                        onChange={(e) => handleChange(index, 'q4', e.target.value)} 
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
                                        onChange={(e) => handleChange(index, 'q5', e.target.value)} 
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
                                        onClick={() => handleSave(index)}
                                    >
                                        Save
                                    </button>
                                ) : (
                                    <button 
                                        className="bg-blue-500 text-white px-2 py-1 rounded" 
                                        onClick={() => handleEdit(index)}
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
