import express, { Router } from "express";
import { upload_Ia } from "../controller/Upload_Ia1Controller.js";
const router =express.Router();

router.post("/create",upload_Ia);


export default router;