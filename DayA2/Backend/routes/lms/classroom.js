import express from "express";
import { upload_classroom, show_classroom, delete_classroom,  fetch_cohorts_byuser, addStudentsToClass, deleteAllStudentsFromClass, deleteStudentFromClass, getClassroomStudents} from "../../controller/lms/classroom.js";

const router = express.Router();

router.post('/create', upload_classroom);
router.get('/show/:uid', show_classroom);
router.delete('/delete/:id', delete_classroom);
router.get("/fetchcohorts/:uid",fetch_cohorts_byuser);

router.post('/assignstudents/:classId', addStudentsToClass);

// Delete All Students from Class
router.delete('/deletestudents/:classId', deleteAllStudentsFromClass);

// Delete One Student from Class
router.delete('/deletestudent/:classId/:sid', deleteStudentFromClass);

router.get('/fetchstudents/:classId',getClassroomStudents);

export default router;
