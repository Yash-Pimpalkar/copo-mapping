import express from "express";
import { assignStudentsToCohort, createCohort, deleteCohort, getAllCohorts, getCohortById, getCohortStudents, ManageStudents, updateCohort } from "../../controller/lms/Cohort.js";

const router =express.Router()

router.get('/managestudents',ManageStudents);

router.get('/show', getAllCohorts);
router.get('/:id', getCohortById);
router.post('/', createCohort);
router.put('/:id', updateCohort);
router.delete('/:id', deleteCohort);
router.post('/assignstudents/:cohort_id', assignStudentsToCohort);
router.get('/cohortstudents/:cohort_id', getCohortStudents);


export default router;