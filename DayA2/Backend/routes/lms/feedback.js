import express from "express";
import {
  create_feedback,
  show_feedback,
  student_submit_feedback,
  show_student_side_feedback,
} from "../../controller/lms/feedback.js";

const router = express.Router();

router.post("/create", create_feedback);
router.get("/show/teacher/:uid", show_feedback);
router.post("/submit/:sid/:uid", student_submit_feedback);
router.get("/show/student/:sid", show_student_side_feedback);

export default router;
