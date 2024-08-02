import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import Papa from 'papaparse'; // Ensure to install papaparse using npm or yarn

const Practical = () => {
  const initialData = [
    {
      name: "MHATRE JAY H",
      scores: [15, 14, 14, 15, 14, 14, 14, 14, 14, 14, ''],
      coValues: { CO1: 'CO1', CO2: 'CO2', CO3: 'CO3', CO4: 'CO4', CO5: 'CO5', PO1: 'PO1', PO2: 'PO2', PSO1: 'PSO1', PSO2: 'PSO2' }
    },
    {
      name: "RUPANWAR ROHAN N",
      scores: [15, 15, 14, 14, 14, 14, 14, 14, 14, 14, ''],
      coValues: { CO1: 'CO1', CO2: 'CO2', CO3: 'CO3', CO4: 'CO4', CO5: 'CO5', PO1: 'PO1', PO2: 'PO2', PSO1: 'PSO1', PSO2: 'PSO2' }
    },
    {
      name: "KSHIRSAGAR VAISHNAVI A",
      scores: [14, 13, 13, 14, 14, 14, 14, 14, 14, 14, ''],
      coValues: { CO1: 'CO1', CO2: 'CO2', CO3: 'CO3', CO4: 'CO4', CO5: 'CO5', PO1: 'PO1', PO2: 'PO2', PSO1: 'PSO1', PSO2: 'PSO2' }
    },
    // ... add the rest of the data here
  ];

  const itemsPerPage = 5; // Number of items per page

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [data, setData] = useState(initialData);
  const [editIndex, setEditIndex] = useState(-1);
  const [editScores, setEditScores] = useState([]);
  const [isCOEditing, setIsCOEditing] = useState(false);
  const [coValues, setCOValues] = useState({
    CO1: 'CO1', CO2: 'CO2', CO3: 'CO3', CO4: 'CO4', CO5: 'CO5',
    PO1: 'PO1', PO2: 'PO2', PSO1: 'PSO1', PSO2: 'PSO2'
  });

  useEffect(() => {
    setTotalPages(Math.ceil(data.length / itemsPerPage));
  }, [data]);

  const downloadExcel = () => {
    const Total_marks=0;
    const columnNames = {
      PO1: coValues.PO1,
      PSO1: coValues.PSO1,
      CO1: coValues.CO1,
      PO2: coValues.PO2,
      PSO2: coValues.PSO2,
      CO2: coValues.CO2,
      CO3: coValues.CO3,
      CO4: coValues.CO4,
      CO5: coValues.CO5,
      Total_marks: Total_marks,
    };

    const ws = XLSX.utils.json_to_sheet(data.map(row => {
      const totalMarks = row.scores.reduce((sum, score) => sum + score, 0);
      const avgmarks = totalMarks /10;
      return {
        'Name of Students': row.name,
        [`${columnNames.PO1} ${columnNames.PSO1} ${columnNames.CO1}`]: row.scores[0],
        [`${columnNames.PO2} ${columnNames.PSO2} ${columnNames.CO2}`]: row.scores[1],
        [`${columnNames.PO1} ${columnNames.PSO1} ${columnNames.CO3}`]: row.scores[2],
        [`${columnNames.PO2} ${columnNames.PSO2} ${columnNames.CO4}`]: row.scores[3],
        [`${columnNames.PO1} ${columnNames.PSO1} ${columnNames.CO5}`]: row.scores[4],
        [`${columnNames.PO2} ${columnNames.PSO2} ${columnNames.CO1}`]: row.scores[5],
        [`${columnNames.PO1} ${columnNames.PSO1} ${columnNames.CO2}`]: row.scores[6],
        [`${columnNames.PO2} ${columnNames.PSO2} ${columnNames.CO3}`]: row.scores[7],
        [`${columnNames.PO1} ${columnNames.PSO1} ${columnNames.CO4}`]: row.scores[8],
        [`${columnNames.PO2} ${columnNames.PSO2} ${columnNames.CO5}`]: row.scores[9],
        'Marks out of 15':  avgmarks,
      };
    }));

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "practical.xlsx");
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

  const uploadFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type === 'text/csv') {
        Papa.parse(file, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            const jsonData = results.data.map(row => ({
              name: row['Name of Students'],
              scores: [
                Number(row['PO2 PSO2 CO1']),
                Number(row['PO2 PSO2 CO2']),
                Number(row['PO1 PSO1 CO3']),
                Number(row['PO2 PSO2 CO4']),
                Number(row['PO1 PSO1 CO5']),
                Number(row['PO2 PSO2 CO1']),
                Number(row['PO1 PSO1 CO2']),
                Number(row['PO2 PSO2 CO3']),
                Number(row['PO1 PSO1 CO4']),
                Number(row['PO2 PSO2 CO5']),
                Number(row['Marks out of 15']),
              ]
            }));
  
            // Extract and update CO values from the header row
            const headers = results.meta.fields;
            const updatedCOValues = {
              CO1: headers[1].split(' ')[2], // Assuming the format "PO2 PSO2 CO1"
              CO2: headers[2].split(' ')[2],
              CO3: headers[3].split(' ')[2],
              CO4: headers[4].split(' ')[2],
              CO5: headers[5].split(' ')[2],
              PO1: headers[1].split(' ')[0],
              PO2: headers[2].split(' ')[0],
              PSO1: headers[1].split(' ')[1],
              PSO2: headers[2].split(' ')[1],
            };
  
            setCOValues(updatedCOValues);
            setData(jsonData);
          },
        });
      } else if (file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
        const reader = new FileReader();
  
        reader.onload = function (event) {
          const data = new Uint8Array(event.target.result);
          const workbook = XLSX.read(data, { type: 'array' });
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          const json = XLSX.utils.sheet_to_json(sheet, { header: 1 });
  
          const jsonData = json.slice(1).map(row => ({
            name: row[0],
            scores: row.slice(1).map(Number)
          }));
  
          // Extract and update CO values from the header row
          const headers = json[0];
          const updatedCOValues = {
            CO1: headers[1].split(' ')[2], // Assuming the format "PO2 PSO2 CO1"
            CO2: headers[2].split(' ')[2],
            CO3: headers[3].split(' ')[2],
            CO4: headers[4].split(' ')[2],
            CO5: headers[5].split(' ')[2],
            PO1: headers[1].split(' ')[0],
            PO2: headers[2].split(' ')[0],
            PSO1: headers[1].split(' ')[1],
            PSO2: headers[2].split(' ')[1],
          };
  
          setCOValues(updatedCOValues);
          setData(jsonData);
        };
  
        reader.readAsArrayBuffer(file);
      }
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
    <div className="relative overflow-x-auto">
      <h1 className='text-3xl mb-6 text-blue-500 text-center mt-5'>Practical</h1>
      <div className="flex justify-between items-center mb-6">
        <label className="bg-blue-500 text-white ml-5 px-4 py-2 rounded cursor-pointer">
          Upload
          <input
            type="file"
            accept=".csv, .xlsx"
            onChange={uploadFile}
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
            <th rowSpan="2" className="px-6 py-3 border border-black">Name of Students</th>
            <th colSpan="10" className="px-6 py-3 text-center border border-black">Experiments</th>
            <th rowSpan="2" className="px-6 py-3 border border-black">Marks out of 15</th>
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
          {data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((student, index) => (
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
  );
};

export default Practical;
