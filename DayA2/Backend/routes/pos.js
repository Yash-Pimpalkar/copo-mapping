import express from "express";
import { deletepos, editpos, savenewpos, showpos } from "../controller/pos.js";

const router = express.Router();

router.post("/show", showpos);
router.post("/admin/update", editpos);
router.delete("/admin/delete", deletepos);
router.post("/admin/create", savenewpos);

export default router;
