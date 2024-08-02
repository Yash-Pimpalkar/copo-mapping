import express from "express";
import {  showpos } from "../controller/pos.js";

const router =express.Router()

router.post('/show', showpos); 


export default router;