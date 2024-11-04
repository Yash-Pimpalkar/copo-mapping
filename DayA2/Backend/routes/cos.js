import express from "express";
import {
  addcos,
  show_cos,
  get_courses,
  add_cos_from_admin,
  remove_cos_from_admin,
  show_cos_for_admin,
  update_Cos,
} from "../controller/cos.js";

const router = express.Router();

router.post("/add", addcos);

router.post("/:uid", show_cos);

router.get("/admin/courses", get_courses);

router.get("/admin/showcos/:uid", show_cos_for_admin);

router.post("/admin/add/:uid", add_cos_from_admin);

router.put("/admin/update/:uid", update_Cos);

router.delete("/admin/remove/:uid", remove_cos_from_admin);

export default router;
