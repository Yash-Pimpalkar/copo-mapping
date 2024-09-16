import express from "express";
import { fetchTermworkLabels, getAssignmentsAndCOs, getTermworkAssignment, getTermworkData, submitTermworkId } from "../controller/termwork.js";
const router =express.Router();


router.get("/checkboxlabels/:userCourseId",fetchTermworkLabels);
router.post("/submit", submitTermworkId );
router.get("/gettermworkdata/:usercourseid",getTermworkData);
router.get("/gettwassignmentdata/:usercourseid",getTermworkAssignment);
router.get('/getassignments/:usercourseid', getAssignmentsAndCOs);
export default router;