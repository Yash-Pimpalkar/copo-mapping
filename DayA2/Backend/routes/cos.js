import express from "express";
import { addcos, show_cos } from "../controller/cos.js";


const router =express.Router()

router.post('/add', addcos); 

router.post('/:uid', show_cos); 

export default router;