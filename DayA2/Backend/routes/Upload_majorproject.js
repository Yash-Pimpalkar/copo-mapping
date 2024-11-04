import express from "express";
import {
  limit,
  Co_majorprosem,
  MajorProject_Attainment,
  MajorProjectUpload,
  showMajorProjectData,
  upload_MajorProject_Questions,
} from "../controller/Upload_majorproject.js";
const router = express.Router();

router.post("/create", upload_MajorProject_Questions);
router.get("/show/:uid", showMajorProjectData);
router.put("/", MajorProjectUpload);
router.get("/limit/:uid", limit);
router.post("/insert-co-averages", MajorProject_Attainment);
router.get("/coname/:uid", Co_majorprosem);

export default router;
