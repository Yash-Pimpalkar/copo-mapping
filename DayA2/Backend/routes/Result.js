import express, { Router } from "express";
<<<<<<< Updated upstream
import { fetchTermwork, ia1, ia2, Inta, Univ, Tw, Oral,Minipro,Majorpro,Popso, indirect} from "../controller/Result.js";
=======
import {
  fetchTermwork,
  ia1,
  ia2,
  Inta,
  Univ,
  Tw,
  Oral,
  Minipro,
  Majorpro,
  Popso,
} from "../controller/Result.js";
>>>>>>> Stashed changes

const router = express.Router();

router.get("/termwork/:uid", fetchTermwork);
router.get("/ia1attainment/ia1/:uid", ia1);
router.get("/ia2attainment/ia2/:uid", ia2);
<<<<<<< Updated upstream
router.get("/inta/:uid", Inta);
router.get("/univ/:uid", Univ);
router.get("/tw/:uid", Tw);
router.get("/oral/:uid",Oral);
router.get("/indirect/:uid",indirect);
router.get("/minipro/:uid",Minipro);
router.get("/majorpro/:uid",Majorpro);
router.get("/popso/:uid",Popso);
=======
router.get("/ia2attainment/inta/:uid", Inta);
router.get("/ia2attainment/univ/:uid", Univ);
router.get("/ia2attainment/tw/:uid", Tw);
router.get("/ia2attainment/oral/:uid", Oral);
router.get("/ia2attainment/minipro/:uid", Minipro);
router.get("/ia2attainment/majorpro/:uid", Majorpro);
router.get("/ia2attainment/popso/:uid", Popso);
>>>>>>> Stashed changes

export default router;
