import express, { Router } from "express";
import { show_CoCount, show_user_course, user_course_registration } from "../controller/user_course.js";
const router =express.Router();


router.post("/",user_course_registration);
router.post("/:uid",show_user_course);
router.get("/cocount/:uid",show_CoCount);
export default router;