import React, { useEffect } from 'react';
import 'animate.css';
import './LoadingScreen.css';

const LoadingScreen = ({ onLoadingComplete }) => {
  useEffect(() => {
    const timer = setTimeout(onLoadingComplete, 2000);
    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  return (
    <div className="loading-screen">
      <div className='logo-container'>
        <img className='animate__animated animate__pulse' src="/ai-bot.svg" alt="App Logo" />
      </div>
    </div>
  );
};

export default LoadingScreen;