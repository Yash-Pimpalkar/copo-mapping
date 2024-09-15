import express from "express";
import { limit, Oral_Attainment, OralUpload, showOralData, upload_Oral_Questions } from "../controller/Upload_oral.js";
const router =express.Router();

router.post("/create",upload_Oral_Questions);
router.get("/show/:uid",showOralData)
router.put("/",OralUpload);
router.get("/limit/:uid",limit);
router.post("/insert-co-averages",Oral_Attainment);
export default router;