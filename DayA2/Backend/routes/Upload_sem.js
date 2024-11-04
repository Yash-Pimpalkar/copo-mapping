import express from "express";
import {
  limit,
  Semester_Attainment,
  SemUpload,
  showSemData,
  upload_Sem_Questions,
} from "../controller/Upload_sem.js";
const router = express.Router();

router.post("/create", upload_Sem_Questions);
router.get("/show/:uid", showSemData);
router.put("/", SemUpload);
router.get("/limit/:uid", limit);
router.post("/insert-co-averages", Semester_Attainment);
export default router;
