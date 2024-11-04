import express from "express";
import { upload_tw_questions } from "../controller/uploadTW.js";
const router = express.Router();

router.post("/", upload_tw_questions);

export default router;
