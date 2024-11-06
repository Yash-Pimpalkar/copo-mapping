import express from "express";
import {
  addStudentsToAttendance,
  assignment_addStudentsWithQuestions,
  assignment_deleteAllStudentsForAssignment,
  assignment_deleteStudentFromAssignment,
  assignment_getStudentsForAssignment,
  deleteAllAttendanceRecords,
  deleteAllStudentsFromJournal,
  deleteAllStudentsFromPPT,
  deleteStudentAttendanceRecord,
  deleteStudentFromJournal,
  deleteStudentFromPPT,
  experiment_addStudentsWithQuestions,
  experiment_deleteAllStudentsForExperiment,
  experiment_deleteStudentFromExperiment,
  experiment_getStudentsForExperiment,
  gd_addStudentsToGroupDiscussion,
  gd_deleteAllStudentsFromGroupDiscussion,
  gd_deleteStudentFromGroupDiscussion,
  gd_get_Usercourse_Students,
  get_Usercourse_Students,
  getUserCourseAttendanceRecords,
  ia1_addStudentsToClass,
  ia1_deleteAllStudentsFromClass,
  ia1_deleteStudentFromClass,
  ia1_get_Usercourse_Students,
  ia2_addStudentsToClass,
  ia2_deleteAllStudentsFromClass,
  ia2_deleteStudentFromClass,
  ia2_get_Usercourse_Students,
  journal_addStudents,
  minipro_addStudentsWithQuestions,
  minipro_deleteAllStudentsForMiniProject,
  minipro_deleteStudentFromMiniProject,
  minipro_getStudentsForMiniProject,
  oral_addStudentsToClass,
  oral_deleteAllStudentsFromClass,
  oral_deleteStudentFromClass,
  oral_get_Usercourse_Students,
  oralpce_addStudentsToClass,
  oralpce_deleteAllStudentsFromClass,
  oralpce_deleteStudentFromClass,
  oralpce_get_Usercourse_Students,
  ppt_addStudents,
  ppt_get_Usercourse_Students,
  scilab_addStudentsToPracticals,
  scilab_deleteAllStudentsFromPracticals,
  scilab_deleteStudentFromPracticals,
  scilab_get_Usercourse_Students,
  sem_addStudentsToClass,
  sem_deleteAllStudentsFromClass,
  sem_deleteStudentFromClass,
  sem_get_Usercourse_Students,
  trade_addStudentsWithQuestions,
  trade_deleteAllStudentsForTrade,
  trade_deleteStudentFromTrade,
  trade_getStudentsForTrade,
  minisem_addStudentsToClass,
  minisem_deleteAllStudentsFromClass,
  minisem_deleteStudentFromClass,
  minisem_get_Usercourse_Students,
  majorsem_addStudentsToClass,
  majorsem_deleteAllStudentsFromClass,
  majorsem_deleteStudentFromClass,
  majorsem_get_Usercourse_Students,
  addStudentsWithFeedbackQuestions,
  deleteAllStudentFeedbackForCourse,
  deleteStudentFeedbackForCourse,
  getStudentsForFeedbackCourse,
  addStudentsToReports,
  report_deleteAllStudentsFromClass,
  report_deleteStudentFromClass,
  report_get_Usercourse_Students,
} from "../controller/managestudents.js";
const router = express.Router();

//ia1
router.post("/addstudents/ia1/:sid", ia1_addStudentsToClass);
router.delete("/deleteallstudents/ia1/:uid", ia1_deleteAllStudentsFromClass);
router.delete("/deletestudent/ia1/:sid", ia1_deleteStudentFromClass);
router.get("/ia1/fetchstudents/:uid", ia1_get_Usercourse_Students);

//ia2
router.post("/addstudents/ia2/:sid", ia2_addStudentsToClass);
router.delete("/deleteallstudents/ia2/:uid", ia2_deleteAllStudentsFromClass);
router.delete("/deletestudent/ia2/:sid", ia2_deleteStudentFromClass);
router.get("/ia2/fetchstudents/:uid", ia2_get_Usercourse_Students);

//sem

router.post("/addstudents/sem/:sid", sem_addStudentsToClass);
router.delete("/deleteallstudents/sem/:uid", sem_deleteAllStudentsFromClass);
router.delete("/deletestudent/sem/:sid", sem_deleteStudentFromClass);
router.get("/sem/fetchstudents/:uid", sem_get_Usercourse_Students);

// Oral routes

router.post("/addstudents/oral/:sid", oral_addStudentsToClass);
router.delete("/deleteallstudents/oral/:uid", oral_deleteAllStudentsFromClass);
router.delete("/deletestudent/oral/:sid", oral_deleteStudentFromClass);
router.get("/oral/fetchstudents/:uid", oral_get_Usercourse_Students);

// Oral PCE Routes

router.post("/addstudents/oralpce/:sid", oralpce_addStudentsToClass);
router.delete(
  "/deleteallstudents/oralpce/:uid",
  oralpce_deleteAllStudentsFromClass
);
router.delete("/deletestudent/oralpce/:sid", oralpce_deleteStudentFromClass);
router.get("/oralpce/fetchstudents/:uid", oralpce_get_Usercourse_Students);

// Assignment Routes

router.post(
  "/addstudents/assignment/:sid",
  assignment_addStudentsWithQuestions
);
router.delete(
  "/deleteallstudents/assignment/:uid",
  assignment_deleteAllStudentsForAssignment
);
router.delete(
  "/deletestudent/assignment/:sid",
  assignment_deleteStudentFromAssignment
);
router.get(
  "/assignment/fetchstudents/:uid",
  assignment_getStudentsForAssignment
);

//attend Routes

router.post("/addstudents/attendance/:sid", addStudentsToAttendance);
router.delete("/deleteallstudents/attendance/:uid", deleteAllAttendanceRecords);
router.delete("/deletestudent/attendance/:sid", deleteStudentAttendanceRecord);
router.get("/attendance/fetchstudents/:uid", getUserCourseAttendanceRecords);

// Experiment Routes
router.post(
  "/addstudents/experiment/:sid",
  experiment_addStudentsWithQuestions
);
router.delete(
  "/deleteallstudents/experiment/:uid",
  experiment_deleteAllStudentsForExperiment
);
router.delete(
  "/deletestudent/experiment/:sid",
  experiment_deleteStudentFromExperiment
);
router.get(
  "/experiment/fetchstudents/:uid",
  experiment_getStudentsForExperiment
);

// Scilab Practical Routes
router.post("/addstudents/scilab/:sid", scilab_addStudentsToPracticals); // Route to add students to Scilab practicals
router.delete(
  "/deleteallstudents/scilab/:uid",
  scilab_deleteAllStudentsFromPracticals
); // Route to delete all students from a specific user course
router.delete("/deletestudent/scilab/:sid", scilab_deleteStudentFromPracticals); // Route to delete a specific student from a specific user course
router.get("/scilab/fetchstudents/:uid", scilab_get_Usercourse_Students); // Route to fetch all students for a specific user course

// Group Discussion (GD) Routes
router.post("/addstudents/gd/:sid", gd_addStudentsToGroupDiscussion); // Route to add students to Group Discussion
router.delete(
  "/deleteallstudents/gd/:uid",
  gd_deleteAllStudentsFromGroupDiscussion
); // Route to delete all students from a specific user course
router.delete("/deletestudent/gd/:sid", gd_deleteStudentFromGroupDiscussion); // Route to delete a specific student from a specific user course
router.get("/gd/fetchstudents/:uid", gd_get_Usercourse_Students); // Route to fetch all students for a specific user course

// Journal Routes
router.post("/addstudents/journal/:sid", journal_addStudents); // Route to add students to Journal
router.delete("/deleteallstudents/journal/:uid", deleteAllStudentsFromJournal); // Route to delete all students from a specific user course
router.delete("/deletestudent/journal/:sid", deleteStudentFromJournal); // Route to delete a specific student from a specific user course
router.get("/journal/fetchstudents/:uid", get_Usercourse_Students); // Route to fetch all students for a specific user course

// PPT Routes
router.post("/addstudents/ppt/:sid", ppt_addStudents); // Route to add students to PPT
router.delete("/deleteallstudents/ppt/:uid", deleteAllStudentsFromPPT); // Route to delete all students from a specific user course
router.delete("/deletestudent/ppt/:sid", deleteStudentFromPPT); // Route to delete a specific student from a specific user course
router.get("/ppt/fetchstudents/:uid", ppt_get_Usercourse_Students); // Route to fetch all students for a specific user course

// Trade Routes
router.post("/addstudents/trade/:sid", trade_addStudentsWithQuestions); // Route to add students to trades
router.delete("/deleteallstudents/trade/:uid", trade_deleteAllStudentsForTrade); // Route to delete all students from a specific user course
router.delete("/deletestudent/trade/:sid", trade_deleteStudentFromTrade); // Route to delete a specific student from a specific user course
router.get("/trade/fetchstudents/:uid", trade_getStudentsForTrade); // Route to fetch all students for a specific user course

// Mini Project Routes
router.post("/addstudents/minipro/:sid", minipro_addStudentsWithQuestions); // Route to add students to mini projects
router.delete(
  "/deleteallstudents/minipro/:uid",
  minipro_deleteAllStudentsForMiniProject
); // Route to delete all students from a specific user course
router.delete(
  "/deletestudent/minipro/:sid",
  minipro_deleteStudentFromMiniProject
); // Route to delete a specific student from a specific user course
router.get("/minipro/fetchstudents/:uid", minipro_getStudentsForMiniProject); // Route to fetch all students for a specific user course

//Mini Project for Semester 25 marks
router.post("/addstudents/miniprosem/:sid", minisem_addStudentsToClass); // Route to add students to mini projects
router.delete(
  "/deleteallstudents/miniprosem/:uid",
  minisem_deleteAllStudentsFromClass
); // Route to delete all students from a specific user course
router.delete("/deletestudent/miniprosem/:sid", minisem_deleteStudentFromClass); // Route to delete a specific student from a specific user course
router.get("/miniprosem/fetchstudents/:uid", minisem_get_Usercourse_Students); // Route to fetch all students for a specific user course

//Major Project for Semester 25 marks
router.post("/addstudents/majorprosem/:sid", majorsem_addStudentsToClass); // Route to add students to mini projects
router.delete(
  "/deleteallstudents/majorprosem/:uid",
  majorsem_deleteAllStudentsFromClass
); // Route to delete all students from a specific user course
router.delete(
  "/deletestudent/majorprosem/:sid",
  majorsem_deleteStudentFromClass
); // Route to delete a specific student from a specific user course
router.get("/majorprosem/fetchstudents/:uid", majorsem_get_Usercourse_Students); // Route to fetch all students for a specific user course





// Route to add students with feedback questions
router.post("/addstudents/feedback/:sid", addStudentsWithFeedbackQuestions);

// Route to delete all feedback for a specific user course
router.delete("/deleteallstudents/feedback/:uid", deleteAllStudentFeedbackForCourse);

// Route to delete a specific student's feedback for a specific user course
router.delete("/deletestudent/feedback/:sid", deleteStudentFeedbackForCourse);

// Route to fetch students for a specific feedback course
router.get("/feedback/fetchstudents/:uid", getStudentsForFeedbackCourse);


router.post("/addstudents/trade/:sid", trade_addStudentsWithQuestions); // Route to add students to trades
router.delete("/deleteallstudents/trade/:uid", trade_deleteAllStudentsForTrade); // Route to delete all students from a specific user course
router.delete("/deletestudent/trade/:sid", trade_deleteStudentFromTrade); // Route to delete a specific student from a specific user course
router.get("/trade/fetchstudents/:uid", trade_getStudentsForTrade); 



router.post("/addstudents/report/:sid",addStudentsToReports); // Route to add students to trades
router.delete("/deleteallstudents/report/:uid", report_deleteAllStudentsFromClass); // Route to delete all students from a specific user course
router.delete("/deletestudent/report/:sid", report_deleteStudentFromClass); // Route to delete a specific student from a specific user course
router.get("/report/fetchstudents/:uid", report_get_Usercourse_Students); 

export default router;
