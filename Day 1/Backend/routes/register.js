import express, { Router } from "express";
const router =express.Router();
import { getemail, getusers, register, setusertype } from "../controller/register.js"

router.post("/",register);
router.post('/getemail/:id',getemail);
router.post('/getusers',getusers);
router.post('/updateusertype',setusertype);
export default router;