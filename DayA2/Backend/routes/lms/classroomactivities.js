import express from "express";
import { createActivity, downloadFile, getActivitiesByClassroom, loadFile } from "../../controller/lms/ClassRoomActivities/classroomactivities.js";
const router = express.Router();

router.post('/create/:classroom_id',createActivity);

router.get('/show/:classroom_id', getActivitiesByClassroom);
router.get('/download/:fileId', downloadFile);
router.get('/download/:filename',loadFile);
export default router;
