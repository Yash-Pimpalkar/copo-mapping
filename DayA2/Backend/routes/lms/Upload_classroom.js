import express from "express";
import {
  upload_classroom,
  show_classroom,
  delete_classroom,
} from "../../controller/lms/Upload_classroom.js";

const router = express.Router();

router.post("/create", upload_classroom);
router.get("/show/:uid", show_classroom);
router.delete("/delete/:id", delete_classroom);

export default router;
