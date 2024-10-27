import express from "express";
import { addcos, show_cos, get_courses, remove_cos, show_cos_for_admin, update_Cos } from "../controller/cos.js";


const router =express.Router()

router.post('/add', addcos); 

router.delete('/remove',remove_cos);

router.post('/:uid', show_cos); 

router.get('/admin/courses', get_courses);

router.get('/admin/showcos/:uid', show_cos_for_admin);

router.put('/admin/update/:uid', update_Cos);
export default router;