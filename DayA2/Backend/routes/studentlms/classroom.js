import express from "express";
import multer from "multer";
import { createSubmission, get_all_classroom_by_sid, getClassroomActivities, getSubmissionsByAssignmentAndStudent } from "../../controller/studentlms/classroom.js";
const router =express.Router()

const upload = multer();

router.get("/getclassroom/:sid",get_all_classroom_by_sid)
router.post("/classroom/getactivities/:cid",getClassroomActivities)
router.post("/submission/:aid",createSubmission )
router.post('/getsubmissions',upload.none(), getSubmissionsByAssignmentAndStudent);
export default router;