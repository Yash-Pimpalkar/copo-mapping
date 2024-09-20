import express from "express";
import { fetchTermworkLabels, getAssignmentsAndCOs, getExperimentAndCOs, getExperimentData, getTermworkAssignment, getTermworkData, submitTermworkId, updateAssignments, updateExperiments } from "../controller/termwork.js";
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

export default router;
