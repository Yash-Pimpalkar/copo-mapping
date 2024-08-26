import express from "express";
import { SemUpload, showSemData, upload_Sem_Questions } from "../controller/Upload_sem.js";
const router =express.Router();


router.post("/create",upload_Sem_Questions);
router.get("/show/:uid",showSemData)
router.put("/",SemUpload);
export default router;