import React, { useState, useCallback } from 'react';
import axios from "axios";
import LoadingScreen from '../components/LoadingScreen';
import LandingScreen from '../components/LandingScreen';
import RegistrationScreen from '../components/RegistrationScreen';
import ModalWindow from '../components/ModalWindow';
import LoginScreen from '../components/LoginScreen';

const LoginRegisterPage = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const [loading, setLoading] = useState(true);
  const [screen, setScreen] = useState("landing");
  const [showModalWindow, setShowModalWindow] = useState(false);
  
  const handleLoadingComplete = useCallback(() => {
    setLoading(false);
  }, []);

  // login and registration page screens handlers. start
  const handleRegister = useCallback(() => {
    setScreen("registration");
  }, []);
  const handleLogin = useCallback(() => {
    setScreen("login");
  }, []);
  const handleBackToLanding = useCallback(() => {
    setScreen("landing");
  }, []);
  // login and registration page screens handlers. end
  
  const handleShowModalWindow = useCallback(() => {
    setShowModalWindow(true);
    setTimeout(() => {
      setShowModalWindow(false);
      setScreen("landing");
    }, 1500);
  }, []);

  const handleRegistrationComplete = useCallback(async (userData) => {
    try {
      const res = await axios.post(`${BASE_URL}/signup`, userData)
      console.log(res);
      handleShowModalWindow();
    } catch (error) {
      console.log(error);
    }

    console.log(userData);
  }, [handleShowModalWindow, BASE_URL]);

  
  if (loading) return <LoadingScreen onLoadingComplete={handleLoadingComplete} />;
  if (screen === "landing") return <LandingScreen onRegister={handleRegister} onLogin={handleLogin} />;
  if (screen === "registration") 
    return (
      <>
        <RegistrationScreen onRegisterComplete={handleRegistrationComplete} onBack={handleBackToLanding} />;
        {showModalWindow && <ModalWindow />}
      </>
    );
  if (screen === "login") return <LoginScreen onBack={handleBackToLanding} />;
}

export default LoginRegisterPage