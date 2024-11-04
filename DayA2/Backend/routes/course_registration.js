import express from "express";

import { addCourses } from "../controller/course_registration.js";
const router = express.Router();

router.post("/addcourses", addCourses);

export default router;
