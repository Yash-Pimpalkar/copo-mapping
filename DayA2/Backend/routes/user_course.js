import express, { Router } from "express";
import {
  coname,
  show_specific_user_course,
  edit_specific_course,
  show_CoCount,
  show_user_course,
  user_course_registration,
} from "../controller/user_course.js";
const router = express.Router();

router.post("/", user_course_registration);
router.get("/:uid", show_user_course);
router.get("/cocount/:uid", show_CoCount);
router.get("/coname/:uid", coname);
router.get("/specific/:uid", show_specific_user_course);
router.put("/edit/specific/:uid", edit_specific_course);
export default router;
