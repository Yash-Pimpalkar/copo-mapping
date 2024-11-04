import express from "express";
import {
  createActivity,
  downloadFile,
  getActivitiesByClassroom,
  getActivityDetails,
  getSubmissionsByAssignment,
  loadFile,
} from "../../controller/lms/ClassRoomActivities/classroomactivities.js";
const router = express.Router();

router.post("/create/:classroom_id", createActivity);

router.get("/show/:classroom_id", getActivitiesByClassroom);
router.get("/download/:fileId", downloadFile);
router.get("/download/:filename", loadFile);

router.get("/submissions/:assignmentId", getSubmissionsByAssignment);
router.get("/activities/:assignmentId", getActivityDetails);
export default router;
