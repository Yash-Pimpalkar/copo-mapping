import express from "express";
import { MiniProject_Attainment, MiniProjectUpload, showMiniProjectData, upload_MiniProject_Questions, limit } from "../controller/Upload_miniproject.js";
const router =express.Router();


router.post("/create",upload_MiniProject_Questions);
router.get("/show/:uid",showMiniProjectData)
router.put("/",MiniProjectUpload);
router.get("/limit/:uid",limit);
router.post("/insert-co-averages",MiniProject_Attainment);
export default router;
