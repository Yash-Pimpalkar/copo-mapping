import express from "express";
import { limit, SemUpload, showSemData, upload_Sem_Questions } from "../controller/Upload_sem.js";
const router =express.Router();


router.post("/create",upload_Sem_Questions);
router.get("/show/:uid",showSemData)
router.put("/",SemUpload);
router.get("/limit/:uid",limit);
export default router;
