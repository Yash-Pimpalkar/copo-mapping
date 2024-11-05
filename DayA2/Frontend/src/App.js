import './App.css';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Navbar from './component/Navbar/Navbar';
import Course_reg from './pages/TeacherRegistration/Course_reg';
import Pos_reg from './pages/TeacherRegistration/Pos_reg';
import Dashboard from './component/Dashboard/Dashboard';
import Cos_reg from './pages/TeacherRegistration/Co_reg';
import Ia1 from './pages/TeacherForm/Ia1';
import Ia2 from './pages/TeacherForm/Ia2';
import Practical from './pages/TeacherForm/Practical';
import { useEffect, useState } from 'react';
import UserSelection from './component/Admin/UserSelection/UserSelection';
import User_course from './pages/TeacherRegistration/User_course';
import RegistrationForm from './pages/TeacherRegistration/RegisterForm';
import ShowCos from './pages/TeacherRegistration/ShowCos';
import Coposhow from './pages/TeacherForm/CoposhowComponent';
import Demo from './pages/TeacherForm/Demo';
import TeacherDashboard from './component/Dashboard/TeacherDashboard';
import UploadIa1 from './pages/Questions/UploadIa';
import UploadIa2 from './pages/Questions/UploadIa2';
import UploadSem from './pages/Questions/UploadSem';
import Semester from './pages/TeacherForm/Semester';
import AssignCourse from './component/Admin/UserSelection/AssignCourse';
import Termwork from './pages/TeacherForm/Termwork';
import NotFound from './component/PageNotfound/NotFound';
import TheoryOnly from './pages/TeacherForm/Termwork/TheoryOnly';
import TheoryAssignment from './pages/TeacherForm/Termwork/TheoryAssignment';
import UploadTermwork from './pages/Termwork/UploadTermwork';
import Oral from './pages/TeacherForm/Oral';
import UploadOral from './pages/Questions/UploadOral';
import TermworkTable from "./pages/TeacherForm/Termwork/TermworkTable";
import UploadMajorproSem from "./pages/TeacherForm/Projects/uploadmajorprosem";
import UploadMiniproSem from "./pages/TeacherForm/Projects/uploadminiprosem";
import MiniproSem from "./pages/TeacherForm/Projects/miniprosem";
import MajorproSem from "./pages/TeacherForm/Projects/majorprosem"
import Experiment from './pages/TeacherForm/Termwork/Experiment';
import Tworalresult from './pages/Results/tworalresult';
import Tcstyperesult from './pages/Results/tcstyperesult';
import IntaTWUniv from './pages/Results/mathsintatwuniv';
import TWOnly from './pages/Results/physicsonlytw';
import PureTheoryResult from './pages/Results/puretheoryresult';
import MainResult from './pages/Results/mainresult';
import OralPCE from './pages/TeacherForm/OralPCE';
import UploadPCE from './pages/Questions/UploadOralPCE';
import FeedbackPage from './pages/LMS/LMSFeedback/MainFeedback';
import EditQuestionsPage from './pages/LMS/LMSFeedback/EditQuestionsPage';
import TeacherlmsDashboard from './pages/LMS/Teacher/TeacherlmsDashboard';
import CreateClassroom from './pages/LMS/Classroom/CreateClassroom';
import StudentLmsAttendance from './pages/LMS/Attendance/StudentlmsAttendance';
import LMSTeacherNavbar from './component/LmsNavbar/LmsNavbar';
import Dummyfeedback from './pages/LMS/LMSFeedback/dummyfeedback';
import LMSStudentNavbar from './component/LmsNavbar/StudentNavbar';
import StudentlmsDashboard from './pages/LMS/Student/StudentlmsDashboard';
import CreateEvents from './pages/LMS/Events/CreateEvents';
import CreateCohorts from './pages/LMS/Cohort/CreateCohort';
import ManageCohorts from './pages/LMS/Cohort/ManageCohorts';
import EditCohort from './pages/LMS/Cohort/EditCohort';
import ManageStudents from './pages/LMS/Cohort/ManageStudents';
import ManageClassroom from './pages/LMS/Classroom/ManageClassroom';
import EditCourse from './pages/TeacherRegistration/EditCourse';
import ManageClassroomStudents from './pages/LMS/Classroom/ManageClassroomStudents';
import ViewAllClassroom from './pages/LMS/Classroom/ViewAllClassroom';
import ClassroomActivities from './pages/LMS/Classroom/ClassroomActivities';
import Admin_Cos_Edit from './component/Admin/COsData';
import AdminCOs_course from './component/Admin/EditCOs';
import AdminSideShowCOs from './component/Admin/AdminSideShowCOs';
import AdminSideEditCourse from './component/Admin/AdminSideEditCourse';
import AddStudent from './pages/TeacherForm/AddStudent';
import EditPOs from './component/Admin/EditPOs';
import NextSemButton from './component/Admin/NextSem'
import StudentLogin from './pages/auth/StudentLogin';
import ViewClassroom from './pages/LMS/Student/ViewAllClassroom';
import StudentClassRoomActivities from './pages/LMS/Student/StudentClassRoomActivities';
import ActivityDetail from './pages/LMS/Student/Activitydetails';
import AssignmentSubmissions from './pages/LMS/Classroom/AssignmentSubmissions';
import StudentSideFeedback from './pages/LMS/Student/StudentSideFeedback';
import FeedbackForm from './pages/LMS/LMSFeedback/FeedbackForm';
import ViewFeedback from './pages/LMS/Student/ViewFeedback';

function App() {
  const [token, setToken] = useState("");
  const [user_id, setUID] = useState(0);
  const [usertype, setUserType] = useState(0);

  useEffect(() => {
    const storedToken = window.localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);

      const uid = window.localStorage.getItem("uid");
      const user_type = window.localStorage.getItem("user_type");

      if (uid && user_type) {
        setUID(parseInt(uid));
        setUserType(parseInt(user_type));
      }
    }
  }, []);
  const location = useLocation(); 
  return (
    <>
      <Navbar />
      {location.pathname.startsWith('/TeacherlmsDashboard') || 
       location.pathname.startsWith('/lms') ? (
        <LMSTeacherNavbar /> // Render the LMS Navbar alongside the main Navbar
      ) : null }
      <Routes>
        {token ? (
          usertype == 1 ? (
            <>
              <Route path="/" element={<StudentlmsDashboard uid={user_id} />} />
              <Route path="/viewclassroom" element={<ViewClassroom uid={user_id} />} />
              <Route path="/viewclassroom/:classroomId" element={<StudentClassRoomActivities uid={user_id} />} />
              <Route path="/lms/activity-detail/:id" element={<ActivityDetail  uid={user_id} />} />
              <Route path="/feedback-student" element={<StudentSideFeedback uid={user_id} />} />
              <Route path="/viewfeedback/:feedbackid" element={<ViewFeedback uid={user_id}/>} />
            </>
         
          ) : usertype == 2 ? (
            <>
              <Route path='/' element={<TeacherDashboard  uid={user_id}/>} />
              <Route path="/coform" element={<Cos_reg />} />
              <Route path="/posform" element={<Pos_reg />} />
              <Route path="/courseform" element={<Course_reg />} />
              <Route path="/ia1" element={<Ia1 uid={user_id} />} />
              <Route path="/ia2" element={<Ia2 uid={user_id} />} />
              <Route path="/semester" element={<Semester uid={user_id} />} />
              <Route path="/practical" element={<Practical />} />
              <Route path="/userselection" element={<UserSelection />} />
              <Route path='/registerform' element={<RegistrationForm uid={user_id}/>} />
              <Route path='/usercourse' element={<User_course uid={user_id}/>} />
              <Route path='/cos' element={<ShowCos />} />
              <Route path='/coposhow' element={<Coposhow  uid={user_id}/>} />
              <Route path='/demo' element={<Demo  uid={user_id}/>} />
              <Route path='/uploadia1' element={<UploadIa1  uid={user_id}/>} />
              <Route path='/uploadia2' element={<UploadIa2  uid={user_id}/>} />
              <Route path='/uploadsem' element={<UploadSem  uid={user_id}/>} />
              <Route path='/termwork' element={<Termwork uid={user_id}/>}/>
              <Route path='/theoryonly' element={<TheoryOnly uid={user_id}/>}/>
              <Route path='/showtermwork' element={<TermworkTable uid={user_id}/>}/>
              <Route path='/uploadtermwork' element={<UploadTermwork uid={user_id}/>}/>
              <Route path='/uploadoral' element={<UploadOral uid={user_id}/>}/>
              <Route path='/oralpractical' element={<Oral uid={user_id}/>}/>
              <Route path='/uploadoralpce' element={<UploadPCE uid={user_id}/>}/>
              <Route path='/oralpce' element={<OralPCE uid={user_id}/>}/>
              <Route path='/UploadMajorproSem' element={<UploadMajorproSem uid={user_id}/>}/>
              <Route path='/Uploadminiprosem' element={<UploadMiniproSem uid={user_id}/>}/>
              <Route path='/MiniproSem' element={<MiniproSem uid={user_id}/>}/>
              <Route path='/MajorproSem' element={<MajorproSem uid={user_id}/>}/>
              <Route path='/Experiment' element={<Experiment uid={user_id}/>}/>
              <Route path='/Tworalresult' element={<Tworalresult uid={user_id}/>}/>
              <Route path='/Tcstyperesult' element={<Tcstyperesult uid={user_id}/>}/>
              <Route path='/Intatwuniv' element={<IntaTWUniv uid={user_id}/>}/>
              <Route path='/Twonly' element={<TWOnly uid={user_id}/>}/>
              <Route path='/PureTheoryResult' element={<PureTheoryResult uid={user_id}/>}/>
              <Route path='/Mainresult' element={<MainResult uid={user_id}/>}/>
              <Route path='/lms/StudentFeedback' element={<FeedbackPage uid={user_id}/>}/>
              <Route path='/lms/editlmsquestions/:usercourseId' element={<EditQuestionsPage uid={user_id}/>} />
              <Route path='/TeacherlmsDashboard' element={<TeacherlmsDashboard uid={user_id}/>} />
              <Route path='/lms/CreateClassroom' element={<CreateClassroom uid={user_id}/>} />
              <Route path='/lms/StudentLmsAttendance' element={<StudentLmsAttendance uid={user_id}/>} />
              <Route path='/lms/CreateEvents' element={<CreateEvents uid={user_id}/>} />
              <Route path='/lms/dummyfeedback' element={<Dummyfeedback uid={user_id}/>}/>
              <Route path='/lms/CreateCohorts' element={<CreateCohorts uid={user_id}/>} />
              <Route path='/lms/ManageCohorts' element={<ManageCohorts uid={user_id}/>} />
              <Route path="/lms/EditCohort/:cohortId" element={<EditCohort uid={user_id}/>} />
              <Route path='/EditCourse/:usercourse_id' element={<EditCourse uid={user_id}/>} />
              <Route path="/lms/managestudents/:cohortId" element={<ManageStudents uid={user_id}/>} />
              <Route path='/lms/manageclassroom/:classroomId' element={<ManageClassroom uid={user_id}/>} />
           

              <Route path= "/lms/manageclasstudents/:classId" element={<ManageClassroomStudents uid={user_id}/>} />
              <Route path= "/lms/viewclassroom/" element={<ViewAllClassroom uid={user_id}/>} />
              <Route path= "/lms/viewclassroom/:classroomId" element={<ClassroomActivities uid={user_id}/>} />
              

             
              
              
              <Route path= "/lms/manageclassstudents/:classId" element={<ManageClassroomStudents uid={user_id}/>} />
              <Route path= "/lms/viewclasssroom/" element={<ViewAllClassroom uid={user_id}/>} />
              <Route path="/AddStudent/:curriculum/:userCourseId" element={<AddStudent  uid={user_id} />} />
              <Route path="/lms/viewclassroom/:classroomId/submissions/:assignmentId" element={<AssignmentSubmissions  uid={user_id}/>} />
             
              <Route path="/viewfeedback/:feedbackid" element={<FeedbackForm uid={user_id}/>} />
              <Route path="*"  element={<NotFound />} />
              {/* Add other routes for usertype === 2 here */}
            </>
          ) : usertype == 3 ? (
            <>
              <Route path="/userselection" element={<UserSelection />} />
              <Route path="/AssignCourse" element={<AssignCourse />} />
              <Route path="/EditPOs" element={<EditPOs />} />
              <Route path="/editcos" element={<AdminCOs_course />}/>
              <Route path="/nextsem" element={<NextSemButton />}/>
              <Route path="/addremovecos" element={<Admin_Cos_Edit />}/>
              <Route path="/adminshowcos" element={<AdminSideShowCOs />} />
              <Route path="/AdminEditCourse/:userCourseId" element={<AdminSideEditCourse />} />
              {/* Add other routes for usertype === 3 here */}
            </>
          ) : (
            // Handle other user types if needed
            <>
        <Route path="/teacher" element={<Login />} />
        <Route path="/register" element={<Register />} /> 
        <Route path="/" element={<StudentLogin />} />
        </>
          )
        ) : (
          <>
        <Route path="/teacher" element={<Login />} />
        <Route path="/teacher/register" element={<Register />} /> 
        <Route path="/" element={<StudentLogin />} />
          </>
        )}
        {/* Handle unknown routes */}
        {/* <Route path="*" element={<Navigate to="/" />} /> */}
      </Routes>
    </>
  );
}

export default App;
