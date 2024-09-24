import express from "express";
import {    Ia1_Attainment,  Ia2_Attainment,  Ia2COsName, Ia2Upload, IaCOsName, IaUpload, showIa2Data, showIaData,  upload_Ia2_questions,  upload_Ia_questions } from "../controller/Upload_Ia1Controller.js";
const router =express.Router();

router.post("/create",upload_Ia_questions);
router.post("/create/ia2",upload_Ia2_questions);
router.get("/:uid",showIaData);
router.get("/cos/:uid",IaCOsName);
router.get("/cos/ia2/:uid",Ia2COsName);
router.put("/",IaUpload);
router.get("/ia2/:uid",showIa2Data);
router.put("/ia2",Ia2Upload);
router.post("/insert-co-averages",Ia1_Attainment);
router.post("/ia2/insert-co-averages",Ia2_Attainment);
export default router;