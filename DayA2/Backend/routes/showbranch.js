import express, { Router } from "express";
import { showBranch } from "../controller/showbranch.js";
const router = express.Router();

router.get("/show", showBranch);

export default router;
