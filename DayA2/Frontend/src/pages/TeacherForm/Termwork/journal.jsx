// import React, { useEffect, useState } from 'react';
// import api from '../../../api';
// import * as XLSX from 'xlsx';
// import Pagination from '../../../component/Pagination/Pagination';

// const Journal = ({ uid }) => {
//   const [journalData, setJournalData] = useState([]);
//   const [itemsPerPage] = useState(10);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [editingRow, setEditingRow] = useState(null);
//   const [editedMarks, setEditedMarks] = useState({});
//   const [currentPage, setCurrentPage] = useState(1);
//   const [maxLimit, setMaxLimit] = useState(0);

//   useEffect(() => {
//     const fetchJournalData = async () => {
//       try {
//         const res = await api.get(`/api/termwork/show/journal/${uid}`);
//         setJournalData(res.data);
//         console.log(res);
//         const res1 = await api.get(`/api/termwork/journal/limit/${uid}`);
//         setMaxLimit(res1.data[0].maxmarks);
//       } catch (error) {
//         console.error("Error fetching journal data:", error);
//       }
//     };

//     if (uid) {
//       fetchJournalData();
//     }
//   }, [uid]);

//   const filteredData = journalData.filter((item) => {
//     const query = searchQuery.toUpperCase();
//     return (
//       item.student_name?.toUpperCase().includes(query) ||
//       item.sid?.toString().includes(query) ||
//       item.stud_clg_id?.toUpperCase().includes(query)
//     );
//   });

//   const totalItems = filteredData.length;
//   const totalPages = Math.ceil(totalItems / itemsPerPage);
//   const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

//   const handleFileUpload = (event) => {
//     const file = event.target.files[0];
//     const reader = new FileReader();
//     reader.onload = async (e) => {
//       const data = new Uint8Array(e.target.result);
//       const workbook = XLSX.read(data, { type: "array" });
//       const sheetName = workbook.SheetNames[0];
//       const worksheet = workbook.Sheets[sheetName];
//       let jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

//       const headers = jsonData[0];
//       const rows = jsonData.slice(1); // Skip header row

//       const validatedData = rows.map((row) => {
//         const student = {};
//         headers.forEach((header, index) => {
//           student[header] = row[index];
//         });
//         return student;
//       });

//       try {
//         await api.put("/api/termwork/journal/update", validatedData);
//         setJournalData(validatedData);
//         alert("File is uploaded");
//         window.location.reload();
//       } catch (error) {
//         console.error("Error updating journal data:", error);
//       }
//     };
//     reader.readAsArrayBuffer(file);
//   };

//   const handleFileDownload = () => {
//     const formattedData = journalData.map((student) => ({
//       att_id: student.att_id,
//       stud_clg_id: student.stud_clg_id,
//       student_name: student.student_name,
//       marks: student.marks,
//     }));

//     const headers = ["att_id", "Student ID", "Student Name", "Marks"];
//     const dataWithHeaders = [headers, ...formattedData.map(Object.values)];

//     const worksheet = XLSX.utils.aoa_to_sheet(dataWithHeaders);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "JournalData");
//     XLSX.writeFile(workbook, "journal_data.xlsx");
//   };

//   const handleEditClick = (index) => {
//     setEditingRow(index);
//     setEditedMarks({
//       ...editedMarks,
//       [index]: journalData[index].marks,
//     });
//   };

//   const handleSaveClick = async (index) => {
//     const att_id = journalData[index].att_id;
//     const marks = editedMarks[index];

//     try {
//       await api.put("/api/termwork/journal/update", { att_id: att_id, Marks: marks });
//       setJournalData((prevData) =>
//         prevData.map((item, idx) =>
//           idx === index ? { ...item, marks } : item
//         )
//       );
//       setEditingRow(null);
//     } catch (error) {
//       console.error("Error saving marks:", error);
//     }
//   };

//   const handleCancelClick = () => {
//     setEditingRow(null);
//     setEditedMarks({});
//   };

//   const handleMarksChange = (event, index) => {
//     const value = event.target.value;

//     if (value === "") {
//       setEditedMarks((prev) => ({ ...prev, [index]: null }));
//       return;
//     }

//     if (value > maxLimit) {
//       alert(`Value should not be greater than ${maxLimit}`);
//       return;
//     }

//     if (value < 0) {
//       alert("Value should not be less than 0");
//       return;
//     }

//     setEditedMarks((prev) => ({ ...prev, [index]: value }));
//   };

//   return (
//     <div className="overflow-x-auto min-h-screen">
//       {/* Container for Export, Import and Search Bar */}
//       <div className="mb-4 flex justify-between items-center bg-white shadow-lg rounded-lg p-4">
//         {/* File Upload */}
//         <input
//           type="file"
//           accept=".xlsx, .xls"
//           onChange={handleFileUpload}
//           className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
//         />

//         {/* Search Bar */}
//         <input
//           type="text"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           placeholder="Search by student name or ID"
//           className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
//         />

//         {/* Download Excel Button */}
//         <button onClick={handleFileDownload} className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300">
//           Download Excel
//         </button>
//       </div>

//       {/* Table */}
//       <table className="min-w-full bg-white border-collapse border border-gray-400 shadow-md rounded-lg">
//         <thead className="bg-indigo-100">
//           <tr>
//             <th className="border border-gray-300 px-4 py-2">Index</th>
//             <th className="border border-gray-300 px-4 py-2">Student ID</th>
//             <th className="border border-gray-300 px-4 py-2">Student Name</th>
//             <th className="border border-gray-300 px-4 py-2">Marks</th>
//             <th className="border border-gray-300 px-4 py-2">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {paginatedData.map((student, index) => (
//             <tr key={index} className="hover:bg-gray-100 transition duration-200">
//               <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
//               <td className="border border-gray-300 px-4 py-2">{student.sid}</td>
//               <td className="border border-gray-300 px-4 py-2">{student.student_name}</td>
//               <td className="border border-gray-300 px-4 py-2">
//                 {editingRow === index ? (
//                   <input
//                     type="text"
//                     value={editedMarks[index] || student.marks}
//                     onChange={(e) => handleMarksChange(e, index)}
//                     className="border border-gray-300 rounded-md px-2 py-1 focus:ring-indigo-500"
//                   />
//                 ) : (
//                   student.marks
//                 )}
//               </td>
//               <td className="border border-gray-300 px-4 py-2 flex justify-center">
//                 {editingRow === index ? (
//                   <>
//                     <button onClick={() => handleSaveClick(index)} className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300">
//                       Save
//                     </button>
//                     <button onClick={handleCancelClick} className="bg-red-500 text-white px-4 py-2 rounded-md ml-2 hover:bg-red-600 transition duration-300">
//                       Cancel
//                     </button>
//                   </>
//                 ) : (
//                   <button onClick={() => handleEditClick(index)} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300">
//                     Edit
//                   </button>
//                 )}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Pagination Component */}
//       {filteredData.length > itemsPerPage && (
//         <Pagination
//           currentPage={currentPage}
//           totalPages={totalPages}
//           onPageChange={setCurrentPage}
//         />
//       )}
//     </div>
//   );
// };

// export default Journal;
