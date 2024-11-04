import express from "express";
const app = express()
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";

import registerRoute from "./routes/register.js"
import loginRoute from "./routes/login.js"
import courseRoute from "./routes/course_registration.js"
import UserCourseRoute from "./routes/user_course.js"
import cosRoute from "./routes/cos.js"
import posRoute from "./routes/pos.js"
import copoRoute from "./routes/coporoutes.js"
import IaRoute from "./routes/upload_ia1_routes.js"
import SemRoute from "./routes/Upload_sem.js"
import TermworkRoute from "./routes/termwork.js"
import UploadTermworkRoute from "./routes/upload_TW.js"
import UploadOralRoute from "./routes/Upload_oral.js"
import UploadMajorProjectRoute from "./routes/Upload_majorproject.js"
import UploadMiniProjectRoute from "./routes/Upload_miniproject.js";
import ResultRoute from "./routes/Result.js"
import BranchRoute from "./routes/showbranch.js"
import CohortRoute from "./routes/lms/Cohort.js"
import LMSClassRoom from "./routes/lms/classroom.js"
import ClassActivitiesRoute from "./routes/lms/classroomactivities.js"
import FeedbackClassroomRoute from "./routes/lms/feedback.js"
import ManageStudentsRoute from "./routes/managestudent.js"
import NextSemRoute from "./routes/lms/next_sem.js"
import StudentLmsRoute from "./routes/studentlms/classroom.js"
import LMSAttendanceRoute from "./routes/lms/lms_attendance.js"
// import LMSClassRoom from "./routes/lms/Upload_classroom.js"
const port = 8081;

app.use(cors())
app.use(express.json());
app.use(bodyParser.json());

app.use(cookieParser())
app.use("/api/register",registerRoute)
app.use("/api/login/",loginRoute)
app.use("/api/course",courseRoute)
app.use("/api/usercourse",UserCourseRoute)
app.use("/api/cos",cosRoute)
app.use("/api/pos",posRoute)
app.use("/api/copo",copoRoute)
app.use("/api/ia",IaRoute)
app.use("/api/sem",SemRoute)
app.use("/api/termwork",TermworkRoute)
app.use("/api/tw/upload",UploadTermworkRoute)
app.use("/api/oral",UploadOralRoute)
app.use("/api/uploadmajorprosem",UploadMajorProjectRoute)
app.use("/api/uploadminiprosem",UploadMiniProjectRoute);
app.use("/api/result",ResultRoute);
app.use("/api/branch",BranchRoute);
app.use("/api/cohorts",CohortRoute);
app.use("/api/lmsclassroom",LMSClassRoom);
app.use("/api/lmsclassroom/activities",ClassActivitiesRoute)
app.use("/api/lmsclassroom/feedback", FeedbackClassroomRoute);
app.use("/api/students/", ManageStudentsRoute);
app.use("/api/lmsstudents/", NextSemRoute);
app.use("/api/studentlms/",StudentLmsRoute)
app.use("/api/lmsclassroom/attendance",LMSAttendanceRoute)

app.listen(port, () => {
  console.log("Server is Running on PORT :", port);
});

