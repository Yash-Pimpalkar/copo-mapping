import express from "express";
import { nextSemester } from "../../controller/lms/next_sem.js";

const router = express.Router();

router.post("/admin/nextsem", nextSemester);

export default router;
