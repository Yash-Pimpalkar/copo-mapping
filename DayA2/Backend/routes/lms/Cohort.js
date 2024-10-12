import express from "express";
import { createCohort, deleteCohort, getAllCohorts, getCohortById, ManageStudents, updateCohort } from "../../controller/lms/Cohort.js";

const router =express.Router()



router.get('/show', getAllCohorts);
router.get('/:id', getCohortById);
router.post('/', createCohort);
router.put('/:id', updateCohort);
router.delete('/:id', deleteCohort);
router.get('/students',ManageStudents)

export default router;