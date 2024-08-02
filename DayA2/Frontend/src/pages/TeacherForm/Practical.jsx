// src/StudentTable.js

import React from 'react';

const Practical = () => {
  const data = [
    { name: "MHATRE JAY H", scores: [15, 14, 14, 15, 14, 14, 14, 14, 14, 14, 14] },
    { name: "RUPANWAR ROHAN N", scores: [15, 15, 14, 14, 14, 14, 14, 14, 14, 14, 14] },
    { name: "KSHIRSAGAR VAISHNAVI A", scores: [14, 13, 13, 14, 14, 14, 14, 14, 14, 14, 14] },
    // ... add the rest of the data here
  ];

  const downloadCSV = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Name of Students,1,2,3,4,5,6,7,8,9,10,Marks out of 15\n";
    data.forEach(row => {
      csvContent += row.name + "," + row.scores.join(",") + "\n";
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "student_scores.csv");
    document.body.appendChild(link);
    link.click();
  };

  const uploadCSV = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(event) {
        const text = event.target.result;
        console.log(text); // You can process the CSV data here
      };
      reader.readAsText(file);
    }
  };

  const containerStyle = {
    textAlign: 'center',
    margin: '20px',
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    margin: '20px 0',
  };

  const thTdStyle = {
    border: '1px solid black',
    padding: '8px',
  };

  const thStyle = {
    ...thTdStyle,
    
  };

  const buttonContainerStyle = {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'space-between',
  };

  const buttonStyle = {
    backgroundColor: 'blue',
    color: 'white',
    padding: '10px',
    border: 'none',
    cursor: 'pointer',
  };

  return (
    
    <div style={containerStyle}>
      <h1 className='text-3xl mb-6 text-blue-500 text-center mt-5'>
        Practical 
      </h1>
      
      <table style={tableStyle}>
        <thead>
          <tr>
            <th rowSpan="2" style={thStyle}>Name of Students</th>
            <th colSpan="10" style={thStyle}>Experiments</th>
            <th rowSpan="2" style={thStyle}>Marks out of 15</th>
            <th rowSpan="2" style={thStyle}>Actions</th>
          </tr>
          <tr>
            {[...Array(10)].map((_, index) => (
              <th key={index} style={thStyle}>
                PO{index % 2 + 1} <br /> PSO{index % 2 + 1} <br /> CO{index % 5 + 1}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((student, index) => (
            <tr key={index}>
              <td style={thTdStyle}>{student.name}</td>
              {student.scores.map((score, scoreIndex) => (
                <td key={scoreIndex} style={thTdStyle}>{score}</td>
              ))}
              <td style={thTdStyle}>{Math.max(...student.scores)}</td>
              <td style={thTdStyle}>
                <button style={buttonStyle}>Edit</button>
                <button style={buttonStyle}>Save</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={buttonContainerStyle}>
        <button onClick={downloadCSV} style={buttonStyle}>Download CSV</button>
        <input type="file" accept=".csv" onChange={uploadCSV} />
      </div>
    </div>
  );
};

export default Practical;
