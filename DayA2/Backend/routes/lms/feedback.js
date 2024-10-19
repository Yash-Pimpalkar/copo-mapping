import express from "express";
import { create_feedback } from "../../controller/lms/feedback.js";

const router = express.Router();

router.post('/create', create_feedback);

export default router;