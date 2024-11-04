import express from "express";
import {
  limit,
  upload_OralPce_Questions,
  Oral_Attainment,
  OralUpload,
  showOralData,
  upload_Oral_Questions,
  showOralPCEData,
  OralPCEUpload,
  limitPCE,
  OralPCE_Attainment,
  OralPCECOsName,
  OralPCEActualCOsName,
} from "../controller/Upload_oral.js";
const router = express.Router();

router.post("/create", upload_Oral_Questions);
router.get("/show/:uid", showOralData);
router.put("/", OralUpload);
router.get("/limit/:uid", limit);
router.post("/insert-co-averages", Oral_Attainment);
router.post("/create/pce", upload_OralPce_Questions);
router.get("/show/pce/:uid", showOralPCEData);
router.put("/pce/", OralPCEUpload);
router.get("/cos/pce/:uid", OralPCECOsName);
router.get("/limit/pce/:uid", limitPCE);
router.get("/pce/actualco/:uid", OralPCEActualCOsName);
router.post("/pce/insert-co-averages", OralPCE_Attainment);

export default router;
