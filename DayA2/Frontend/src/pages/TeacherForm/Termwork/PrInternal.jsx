// export const updateExperiments = async (req, res) => {
//     const { sid, experiments } = req.body;
//     console.log(sid,experiments)
//     // Check if the input is for a single student or multiple students
//     let studentExperimentsData = [];
  
//     if (sid && Array.isArray(experiments)) {
//       // Single student case
//       studentExperimentsData = [{ sid, experiments }];
//       console.log("Single student case:", JSON.stringify(studentExperimentsData[0].experiments, null, 2));
//     } else if (Array.isArray(experiments) && experiments.length > 0 && experiments[0].sid) {
//       // Multiple students case
//       studentExperimentsData = experiments;
//       console.log("Multiple students case:", JSON.stringify(studentExperimentsData, null, 2));
//     } else {
//       return res.status(400).json({ message: 'Invalid input data' });
//     }
  
//     try {
//       // Array to store promises for database queries
//       const updatePromises = [];
  
//       // Loop through each student's experiment data
//       for (const studentData of studentExperimentsData) {
//         const { sid, experiments: studentExperiments } = studentData;
  
//         // Validate student ID
//         if (!sid || typeof sid !== 'number') {
//           return res.status(400).json({ message: 'Invalid or missing student ID (sid)' });
//         }
  
//         // Loop through each experiment and prepare the query promises
//         for (const experiment of studentExperiments) {
//           const { question_id, value } = experiment;
  
//           if (!question_id) {
//             return res.status(400).json({ message: `Invalid Experiment data for student ID: ${sid}` });
//           }
  
//           console.log(`Preparing query for student ${sid}, question_id ${question_id}, value ${value}`);
  
// //   
//           // Create a promise for each query
//           const updatePromise = new Promise((resolve, reject) => {
//             const updateQuery = `
//               UPDATE main_trade SET marks = ? WHERE trade_id = ? and sid = ? 
//             `;
  
//             // Handle `null` values for the marks field in SQL
//             const queryValue = value === null ? null : value;
  
//             // Execute the query
//             db.query(updateQuery, [queryValue, question_id, sid], (error, results) => {
//               if (error) {
//                 console.error(`Error executing query for sid ${sid}, question_id ${question_id}:`, error);
//                 reject(error);  // Reject the promise if there is an error
//               } else {
//                 console.log(`Query successful for sid ${sid}, question_id ${question_id}, value ${queryValue}`);
//                 resolve(results);  // Resolve the promise if the query succeeds
//               }
//             });
//           });
  
  
//           // Add the promise to the array
//           updatePromises.push(updatePromise);
//         }
//       }
  
//       // Wait for all promises to complete
//       await Promise.all(updatePromises);
  
//       // If all updates succeed, send a success response
//       res.status(200).json({ message: 'Experiments updated successfully' });
//     } catch (error) {
//       console.error('Error updating experiments:', error);
//       return res.status(500).json({ message: 'An error occurred while updating experiments' });
//     }
//   };