import express from "express";
import { create_feedback, show_feedback, student_submit_feedback } from "../../controller/lms/feedback.js";

const router = express.Router();

router.post('/create', create_feedback);
router.get('/show/:uid', show_feedback);
router.post('/submit/:sid/:uid', student_submit_feedback);

export default router;