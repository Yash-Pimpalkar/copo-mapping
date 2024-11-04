import express from "express";
import {
  assignStudentsToCohort,
  cohort_name,
  createCohort,
  deleteCohort,
  getAllCohorts,
  getCohortById,
  getCohortStudents,
  ManageStudents,
  removeAllStudentsFromCohort,
  removeStudentFromCohort,
  updateCohort,
} from "../../controller/lms/Cohort.js";

const router = express.Router();

router.get("/managestudents", ManageStudents);

router.get("/show", getAllCohorts);
router.get("/:id", getCohortById);

router.post("/", createCohort);
router.put("/:id", updateCohort);
router.delete("/:id", deleteCohort);
router.post("/assignstudents/:cohort_id", assignStudentsToCohort);
router.get("/cohortstudents/:cohort_id", getCohortStudents);
// router.post('/cohorts/assignstudent/:cohortId', assignStudentToCohort);

// // Route to remove a student from a cohort
// router.delete('/cohorts/removestudent/:cohortId/:sid', removeStudentFromCohort);
router.delete("/removestudent/:cohortId/:studentId", removeStudentFromCohort);

// Route to remove all students from the cohort
router.delete("/deletestudents/:cohortId", removeAllStudentsFromCohort);
router.get("/cohortname/:cohort_id", cohort_name);

export default router;
