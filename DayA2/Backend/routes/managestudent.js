import express from "express";
import { ia1_addStudentsToClass, ia1_deleteAllStudentsFromClass, ia1_deleteStudentFromClass, ia1_get_Usercourse_Students, ia2_addStudentsToClass, ia2_deleteAllStudentsFromClass, ia2_deleteStudentFromClass, ia2_get_Usercourse_Students } from "../controller/managestudents.js";
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

export default router;