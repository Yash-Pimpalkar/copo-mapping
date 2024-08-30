import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
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

  return (
    <>
      <Navbar />
      <Routes>
        {token ? (
          usertype == 1 ? (
            <>
              <Route path="/" element={<Dashboard />} />
              {/* Add other routes for usertype === 1 here */}
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
              <Route path="*"  element={<NotFound />} />
              {/* Add other routes for usertype === 2 here */}
            </>
          ) : usertype == 3 ? (
            <>
              <Route path="/userselection" element={<UserSelection />} />
              <Route path="/AssignCourse" element={<AssignCourse />} />
              {/* Add other routes for usertype === 3 here */}
            </>
          ) : (
            // Handle other user types if needed
            <>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} /> //Redirect to default route or error page
        </>
          )
        ) : (
          <>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </>
        )}
        {/* Handle unknown routes */}
        {/* <Route path="*" element={<Navigate to="/" />} /> */}
      </Routes>
    </>
  );
}

export default App;
