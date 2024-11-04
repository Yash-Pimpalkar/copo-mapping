import express, { Router } from "express";
import { fetchTermwork, ia1, ia2, Inta, Univ, Tw, Oral,Minipro,Majorpro,Popso, indirect} from "../controller/Result.js";

const router = express.Router();

router.get("/termwork/:uid", fetchTermwork);
router.get("/ia1attainment/ia1/:uid", ia1);
router.get("/ia2attainment/ia2/:uid", ia2);
router.get("/inta/:uid", Inta);
router.get("/univ/:uid", Univ);
router.get("/tw/:uid", Tw);
router.get("/oral/:uid",Oral);
router.get("/indirect/:uid",indirect);
router.get("/minipro/:uid",Minipro);
router.get("/majorpro/:uid",Majorpro);
router.get("/popso/:uid",Popso);

export default router;
