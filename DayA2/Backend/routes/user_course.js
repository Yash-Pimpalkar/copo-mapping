import express, { Router } from "express";
import { user_course_registration } from "../controller/user_course.js";
const router =express.Router();


router.post("/",user_course_registration);

export default router;