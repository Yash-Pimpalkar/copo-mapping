import express from "express";
import { fetchTermworkLabels, getTermworkData, submitTermworkId } from "../controller/termwork.js";
const router =express.Router();


router.get("/checkboxlabels/:userCourseId",fetchTermworkLabels);
router.post("/submit", submitTermworkId );
router.get("/gettermworkdata/:usercourseid",getTermworkData);
export default router;