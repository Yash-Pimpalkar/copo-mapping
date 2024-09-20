import express from "express";
import { AttendanceLimit, AttendanceUpload, fetchTermworkLabels, getAssignmentsAndCOs, getExperimentAndCOs, getExperimentData, getTermworkAssignment, getTermworkData, showAttendanceData, submitTermworkId, updateAssignments, updateExperiments } from "../controller/termwork.js";
const router =express.Router();


router.get("/checkboxlabels/:userCourseId",fetchTermworkLabels);
router.post("/submit", submitTermworkId );
router.get("/gettermworkdata/:usercourseid",getTermworkData);
router.get("/gettwassignmentdata/:usercourseid",getTermworkAssignment);
router.get('/getassignments/:usercourseid', getAssignmentsAndCOs);
router.put('/assignment/update', updateAssignments);
router.get("/getexperimentdata/:usercourseid", getExperimentData);

// Route to get assignments related to experiments for a specific user course ID
router.get('/getexperiment/:usercourseid', getExperimentAndCOs);

// Route to update experiments
router.put('/experiment/update', updateExperiments);


router.get("/show/attendance/:uid",showAttendanceData)
router.put("/attendance/update",AttendanceUpload);
router.get("/attendance/limit/:uid",AttendanceLimit);

export default router;
