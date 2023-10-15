import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import LoginRegisterPage from './pages/LoginRegisterPage';
import HomePage from './pages/HomePage';
import OrganizationsList from './pages/OrganizationsList';
import OrganizationCreate from './pages/OrganizationCreate';

const App = () => {
  const [user, setUser] = useState(null); 
  const [token, setToken] = useState(null); 
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("access_token");
    if (storedToken) {
      try {
        const { token, expirationTime } = JSON.parse(storedToken);
        const currentTime = new Date().getTime();

        if (currentTime < expirationTime) {
          const decodedData = jwt_decode(token).sub;
          setUser(decodedData);
          setToken(token);
          console.log(user);
        } else {
          localStorage.removeItem("access_token");
          navigate('/entrance');
          window.location.reload();
        }
      } catch (error) {
        console.error("Error parsing JSON token:", error);
        localStorage.removeItem("access_token");
      }
    }
  }, [navigate, user]);

  
  return (
  <>
    <Routes>
      <Route path="/" element={user ? <HomePage user = {user}/> : <Navigate to="/entrance" />}/>
      <Route path="/user-orgs" element={user ? <OrganizationsList token = {token}/> : <Navigate to="/entrance" />}/>
      <Route path="/create-org" element={user ? <OrganizationCreate token = {token}/> : <Navigate to="/entrance" />}/>
      <Route path="/entrance" element={user ? <Navigate to="/" /> : <LoginRegisterPage />}/>
    </Routes>
  </>
  );
}

export default App;