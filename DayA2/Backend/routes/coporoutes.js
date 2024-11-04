import express from "express";
import { showCopo, showCourse, updateCopo } from "../controller/coposhow.js";
const router = express.Router();
router.get("/:uid", showCourse);
router.get("/show/:uid", showCopo);
router.put("/update/:co_id", updateCopo);
export default router;
