import express from "express";
import { AttendanceLimit, AttendanceUpload, fetchTermworkLabels, GdLimit, GdUpload, getAssignmentsAndCOs, getExperimentAndCOs, getExperimentData, getTermworkAssignment, getTermworkData, SciLabLimit, SciLabUpload, showAttendanceData, showGdData, showSciLabData, submitTermworkId, updateAssignments, updateExperiments } from "../controller/termwork.js";
const router =express.Router();

// main termwork
router.get("/checkboxlabels/:userCourseId",fetchTermworkLabels);
router.post("/submit", submitTermworkId );
router.get("/gettermworkdata/:usercourseid",getTermworkData);

// assignment route
router.get("/gettwassignmentdata/:usercourseid",getTermworkAssignment);
router.get('/getassignments/:usercourseid', getAssignmentsAndCOs);
router.put('/assignment/update', updateAssignments);

//Experimnet routes
router.get("/getexperimentdata/:usercourseid", getExperimentData);
// Route to get assignments related to experiments for a specific user course ID
router.get('/getexperiment/:usercourseid', getExperimentAndCOs);
// Route to update experiments
router.put('/experiment/update', updateExperiments);


router.get("/show/attendance/:uid",showAttendanceData)
router.put("/attendance/update",AttendanceUpload);
router.get("/attendance/limit/:uid",AttendanceLimit);
// GD Routes
router.get("/show/gd/:uid", showGdData);
router.put("/gd/update", GdUpload);
router.get("/gd/limit/:uid", GdLimit);

// Scilab Route
router.get("/show/scilab/:uid", showSciLabData);
router.put("/scilab/update", SciLabUpload);
router.get("/scilab/limit/:uid", SciLabLimit);



export default router;
