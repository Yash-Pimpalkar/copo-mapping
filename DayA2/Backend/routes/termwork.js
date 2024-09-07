import express from "express";
import { fetchTermworkLabels, submitTermworkId } from "../controller/termwork.js";
const router =express.Router();


router.get("/checkboxlabels/:userCourseId",fetchTermworkLabels);
router.post("/submit", submitTermworkId );
export default router;