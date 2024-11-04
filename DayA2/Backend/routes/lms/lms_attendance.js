import express from "express";
import { createOrFetchAttendance, submitAttendance } from "../../controller/lms/lms_attendance.js";


const router = express.Router();

router.post('/getattendance',createOrFetchAttendance)

router.post('/submitattendance',submitAttendance)
export default router;