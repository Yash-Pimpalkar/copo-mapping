import React, { useState } from 'react';
import * as XLSX from 'xlsx';

const Semester = () => {
  const initialData = [
    { name: "MHATRE JAY H", scores: [15, 14, 14, 15, 14, 14, 14, 14, 14, 14, 14] },
    { name: "RUPANWAR ROHAN N", scores: [15, 15, 14, 14, 14, 14, 14, 14, 14, 14, 14] },
    { name: "KSHIRSAGAR VAISHNAVI A", scores: [14, 13, 13, 14, 14, 14, 14, 14, 14, 14, 14] },
    // ... add the rest of the data here
  ];

  const [data, setData] = useState(initialData);
  const [editIndex, setEditIndex] = useState(-1);
  const [editScores, setEditScores] = useState([]);
  const [isCOEditing, setIsCOEditing] = useState(false);
  const [coValues, setCOValues] = useState({
    CO1: 'CO1', CO2: 'CO2', CO3: 'CO3', CO4: 'CO4', CO5: 'CO5',
    PO1: 'PO1', PO2: 'PO2', PSO1: 'PSO1', PSO2: 'PSO2'
  });

  const downloadExcel = () => {
    const ws = XLSX.utils.json_to_sheet(data.map(row => ({
      'Name of Students': row.name,
      'PO1 PSO1 CO1': row.scores[0],
      'PO2 PSO2 CO2': row.scores[1],
      'PO1 PSO1 CO3': row.scores[2],
      'PO2 PSO2 CO4': row.scores[3],
      'PO1 PSO1 CO5': row.scores[4],
      'PO2 PSO2 CO1': row.scores[5],
      'PO1 PSO1 CO2': row.scores[6],
      'PO2 PSO2 CO3': row.scores[7],
      'PO1 PSO1 CO4': row.scores[8],
      'PO2 PSO2 CO5': row.scores[9],
      'Marks out of 15': row.scores[10]
    })));

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet2");
    XLSX.writeFile(wb, "semester.xlsx");
  };

  const uploadCSV = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (event) {
        const text = event.target.result;
        console.log(text); // You can process the CSV data here
      };
      reader.readAsText(file);
    }
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditScores([...data[index].scores]);
  };

  const handleSave = (index) => {
    const updatedData = [...data];
    updatedData[index].scores = editScores;
    setData(updatedData);
    setEditIndex(-1);
  };

  const handleScoreChange = (scoreIndex, value) => {
    const newScores = [...editScores];
    newScores[scoreIndex] = Number(value);
    setEditScores(newScores);
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
    <div className="relative overflow-x-auto" style={{ maxHeight: '600px', overflowY: 'auto' }}>
      <h1 className='text-3xl mb-6 text-blue-500 text-center mt-5'>Semester</h1>
      <div className="flex justify-between items-center mb-6">
        <label className="bg-blue-500 text-white ml-5 px-4 py-2 rounded cursor-pointer">
          Upload
          <input
            type="file"
            accept=".csv"
            onChange={uploadCSV}
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
          onClick={downloadExcel}
        >
          Download
        </button>
      </div>
      <table className="w-full text-sm text-left rtl:text-right text-black bg-white border border-collapse border-black mb-20">
        <thead className="text-xs text-black uppercase bg-white-100 border border-black">
          <tr>
            <th rowSpan="2" className="px-6 py-3 border border-black sticky">Name of Students</th>
            <th colSpan="10" className="px-6 py-3 text-center border border-black">Semester Questions</th>
            <th rowSpan="2" className="px-6 py-3 border border-black">Marks out of 80</th>
            <th rowSpan="2" className="px-6 py-3 border border-black">Actions
              {isCOEditing ? (
                <button
                  className="bg-blue-500 text-white px-2 py-1 rounded"
                  onClick={handleSaveCO}
                >
                  Save
                </button>
              ) : (
                <button
                  className="bg-blue-500 text-white px-2 py-1 rounded m-2 mt-5"
                  onClick={handleEditCO}
                >
                  Edit
                </button>
              )}
            </th>
          </tr>
          <tr>
            {[...Array(10)].map((_, index) => (
              <th key={index} className="px-6 py-3 text-center border border-black">
                {isCOEditing ? (
                  <>
                    <input
                      type="text"
                      value={coValues[`PO${index % 2 + 1}`]}
                      onChange={(e) => handleCOChange(`PO${index % 2 + 1}`, e.target.value)}
                      className="text-center"
                    />
                    <br />
                    <input
                      type="text"
                      value={coValues[`PSO${index % 2 + 1}`]}
                      onChange={(e) => handleCOChange(`PSO${index % 2 + 1}`, e.target.value)}
                      className="text-center"
                    />
                    <br />
                    <input
                      type="text"
                      value={coValues[`CO${index % 5 + 1}`]}
                      onChange={(e) => handleCOChange(`CO${index % 5 + 1}`, e.target.value)}
                      className="text-center"
                    />
                  </>
                ) : (
                  <>
                    {coValues[`PO${index % 2 + 1}`]} <br />
                    {coValues[`PSO${index % 2 + 1}`]} <br />
                    {coValues[`CO${index % 5 + 1}`]}
                  </>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((student, index) => (
            <tr key={index} className="bg-white border-b border-black">
              <td className="px-6 py-4 border border-black">{student.name}</td>
              {student.scores.map((score, scoreIndex) => (
                <td key={scoreIndex} className="px-6 py-4 border border-black">
                  {editIndex === index ? (
                    <input
                      type="number"
                      value={editScores[scoreIndex]}
                      onChange={(e) => handleScoreChange(scoreIndex, e.target.value)}
                      className="w-full text-center"
                    />
                  ) : (
                    score
                  )}
                </td>
              ))}
              <td className="px-6 py-4 border border-black">
                {editIndex === index ? (
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded m-2"
                    onClick={() => handleSave(index)}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded m-2"
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

export default Semester;