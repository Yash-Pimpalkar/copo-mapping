import express, { Router } from "express";
import { fetchTermwork, ia1, ia2, Inta, Univ} from "../controller/Result.js";


const router =express.Router();



router.get("/termwork/:uid",fetchTermwork);
router.get("/ia1attainment/ia1/:uid", ia1);
router.get("/ia2attainment/ia2/:uid", ia2);
router.get("/ia2attainment/inta/:uid", Inta);
router.get("/ia2attainment/univ/:uid", Univ);


export default router;