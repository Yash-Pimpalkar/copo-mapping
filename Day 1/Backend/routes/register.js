import express, { Router } from "express";
const router =express.Router();
import { getemail, register } from "../controller/register.js"

router.post("/",register);
router.post('/getemail/:id',getemail);

export default router;