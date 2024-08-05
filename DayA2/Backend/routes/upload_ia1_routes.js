import express from "express";
import {    IaCOsName, IaUpload, showIaData,  upload_Ia_questions } from "../controller/Upload_Ia1Controller.js";
const router =express.Router();

router.post("/create",upload_Ia_questions);
router.get("/:uid",showIaData);
router.get("/cos/:uid",IaCOsName);
router.put("/",IaUpload);
export default router;