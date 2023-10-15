import React, { useState } from 'react';
import './RegistrationScreen.css';

const RegistrationScreen = ({ onRegisterComplete, onBack }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");

  // Validation functions. start
  const isEmailValid = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
  };

  const isPasswordValid = (password) => {
    const regex = /^(?=.*[0-9])(?=.*[a-zA-Z]).{8,}$/;
    return regex.test(password);
  };
  // Validation functions. end

  const handleRegister = () => {
    // checking userData 
    if (!isEmailValid(email)) {
      setError('Invalid email. Please enter a valid email address.');
      return;
    }
    if (!isPasswordValid(password)) {
      setError('Invalid password. It must have at least 8 characters with at least one number and one letter.');
      return;
    }
    if (password !== confirmPassword) {
      setError('The passwords do not match. Please make sure both passwords are identical.');
      return;
    }

    onRegisterComplete({ email, password });
  };

  return (
    <div className="registration-container">
      <span onClick={onBack} className="back-arrow">{'<'}</span>
      <img src="/ai-bot.svg" alt="Application Logo" className="logo" />
      <p className="question">Your email</p>
      <input 
        type="email" 
        placeholder="example@gmail.com" 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="input-field email-input"
      />
      <p className="question">Create a password</p>
      <input 
        type="password" 
        placeholder="" 
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="input-field password-input"
      />
      <p className="question">Confirm password</p>
      <input 
        type="password" 
        placeholder="" 
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="input-field password-input"
      />
      <p className="password-requirements">*Password must consist of 8 characters. At least one number and at least one letter</p>
      <button onClick={handleRegister} className="registration-button">Registration</button>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default RegistrationScreen;
