import express from "express";
import {
  createOrFetchAttendance,
  getStudentAttendancePercentage,
  submitAttendance,
} from "../../controller/lms/lms_attendance.js";

const router = express.Router();

router.post("/getattendance", createOrFetchAttendance);

router.post("/submitattendance", submitAttendance);

router.get("/percentage/:sid/:classroom_id", getStudentAttendancePercentage);
export default router;
