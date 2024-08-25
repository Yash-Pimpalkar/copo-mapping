import express from "express";
import {    Ia2COsName, Ia2Upload, IaCOsName, IaUpload, showIa2Data, showIaData,  upload_Ia2_questions,  upload_Ia_questions } from "../controller/Upload_Ia1Controller.js";
const router =express.Router();

router.post("/create",upload_Ia_questions);
router.post("/create/ia2",upload_Ia2_questions);
router.get("/:uid",showIaData);
router.get("/cos/:uid",IaCOsName);
router.get("/cos/ia2/:uid",Ia2COsName);
router.put("/",IaUpload);
router.get("/ia2/:uid",showIa2Data);
router.put("/ia2/",Ia2Upload);
export default router;