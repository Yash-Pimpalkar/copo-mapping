import express from "express";
import { ia1_addStudentsToClass, ia1_deleteAllStudentsFromClass, ia1_deleteStudentFromClass, ia1_get_Usercourse_Students, ia2_addStudentsToClass, ia2_deleteAllStudentsFromClass, ia2_deleteStudentFromClass, ia2_get_Usercourse_Students, oral_addStudentsToClass, oral_deleteAllStudentsFromClass, oral_deleteStudentFromClass, oral_get_Usercourse_Students, oralpce_addStudentsToClass, oralpce_deleteAllStudentsFromClass, oralpce_deleteStudentFromClass, oralpce_get_Usercourse_Students, sem_addStudentsToClass, sem_deleteAllStudentsFromClass, sem_deleteStudentFromClass, sem_get_Usercourse_Students } from "../controller/managestudents.js";
const router =express.Router();

//ia1
router.post("/addstudents/ia1/:sid",ia1_addStudentsToClass);
router.delete("/deleteallstudents/ia1/:uid", ia1_deleteAllStudentsFromClass);
router.delete("/deletestudent/ia1/:sid",ia1_deleteStudentFromClass);
router.get("/ia1/fetchstudents/:uid",ia1_get_Usercourse_Students);


//ia2
router.post("/addstudents/ia2/:sid",ia2_addStudentsToClass);
router.delete("/deleteallstudents/ia2/:uid", ia2_deleteAllStudentsFromClass);
router.delete("/deletestudent/ia2/:sid",ia2_deleteStudentFromClass);
router.get("/ia2/fetchstudents/:uid",ia2_get_Usercourse_Students);

//sem

router.post("/addstudents/sem/:sid",sem_addStudentsToClass);
router.delete("/deleteallstudents/sem/:uid", sem_deleteAllStudentsFromClass);
router.delete("/deletestudent/sem/:sid",sem_deleteStudentFromClass);
router.get("/sem/fetchstudents/:uid",sem_get_Usercourse_Students);

// Oral routes

router.post("/addstudents/oral/:sid", oral_addStudentsToClass);
router.delete("/deleteallstudents/oral/:uid", oral_deleteAllStudentsFromClass);
router.delete("/deletestudent/oral/:sid", oral_deleteStudentFromClass);
router.get("/oral/fetchstudents/:uid", oral_get_Usercourse_Students);

// Oral PCE Routes

router.post("/addstudents/oralpce/:sid", oralpce_addStudentsToClass);
router.delete("/deleteallstudents/oralpce/:uid", oralpce_deleteAllStudentsFromClass);
router.delete("/deletestudent/oralpce/:sid", oralpce_deleteStudentFromClass);
router.get("/oralpce/fetchstudents/:uid", oralpce_get_Usercourse_Students);



export default router;