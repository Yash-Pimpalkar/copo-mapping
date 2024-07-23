import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './component/Navbar/Navbar';
import Course_reg from './pages/Course_reg';
import Pos_reg from './pages/Pos_reg';
import Dashboard from './pages/Dashboard';
import RegisterForm from './pages/RegisterForm';
import { useEffect, useState } from 'react';
import UserSelection from './component/Admin/UserSelection/UserSelection';

function App() {
  const [token, setToken] = useState("");
  const [user_id, setUID] = useState(0);
  const [usertype, setUserType] = useState(0);
  const [isRegister, setIsRegister] = useState(-1);

  useEffect(() => {
    const storedToken = window.localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);

      const uid = window.localStorage.getItem("uid");
      const user_type = window.localStorage.getItem("user_type");
      const isRegister = window.localStorage.getItem("isregister");

      if (uid && user_type && isRegister) {
        setUID(parseInt(uid));
        setUserType(parseInt(user_type));
        setIsRegister(parseInt(isRegister));
      }
    }
  }, []);

  return (
    <>
    <Navbar />
    <Routes>
    {isRegister == 0 ? (
            <>
               <Route path="/" element={<DashBoard />} />
            </>
          ) : isRegister == 1 ? (
            <>
              {/* Check usertype for coordinator */}
              {
                usertype === 1 ? (
                  <>
                   {/* Check usertype for stuednt */}
                  <Route path="/"   element={<DashBoard /> } />
             
                    {/* Check usertype for student */}
                   </>
                ) : usertype === 2 ? (
                  <>
                    {/* co-ordinator routes */}
                    <Route path="/" element={<DashBoard />} />
                    {/* co-ordinator routes */}
                  </>
                ) : usertype === 3(
                  <>
                   <Route path="/" element={<DashBoard />} />
                  </>
                ) /* Handle other user types as needed */
              }
            </>
          ) : (
            // Handle other user types if needed
            <Navigate to="/" /> // Redirect to default route or error page
          )
        ) : (
          <>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </>
        )}
        {/* Handle unknown routes */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
