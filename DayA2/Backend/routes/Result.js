import express, { Router } from "express";
import { fetchTermwork, tcstyperesult } from "../controller/Result.js";

const router =express.Router();



router.get("/termwork/:uid",fetchTermwork);
router.get("/ia1attaiment/tcstyperesult/:uid", tcstyperesult);


export default router;