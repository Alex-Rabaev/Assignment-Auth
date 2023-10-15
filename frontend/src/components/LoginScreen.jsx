import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import './LoginScreen.css';

const LoginScreen = ({ onBack }) => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [message, setMessage] = useState("");

    const [isFetching, setIsFetching] = useState(false)

    const navigate = useNavigate();
    

    const handleLoginComplete = async () => {
        try {
            const response = await axios.post(`${BASE_URL}/signin`, {
                    email: email,
                    password: password
                })
            const data = response.data;
            if (response.status === 200) {
                setIsFetching(!isFetching);
                setMessage("Welcome!");
                const expirationTime = new Date().getTime() + 15 * 60 * 1000;
                localStorage.setItem("access_token", JSON.stringify({
                    token: data.access_token,
                    expirationTime: expirationTime
                }));
                setTimeout(() => {
                    navigate(`/`);
                    window.location.reload();
                }, 1500)
            } 
            
        } catch (error) {
            console.log(error);
            setMessage(error.response.data.msg);
        }
    }
    
    return (
        <div className="login-container">
            <span onClick={onBack} className="back-arrow">{'<'}</span>
            <img src="/ai-bot.svg" alt="Application Logo" className="logo" />
            <p className="instruction">Enter your email</p>
            <input 
                type="email" 
                placeholder="example@gmail.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field email-input"
            />
            <p className="question">Enter your password</p>
            <input 
                type="password" 
                placeholder="" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field password-input"
            />
            <button onClick={handleLoginComplete} className="login-complete-button" disabled={isFetching}>
                {isFetching ? <CircularProgress color="success" size={'15px'}/> : "Login"}
            </button>
            <h2>{message}</h2>
        </div>
    );
};

export default LoginScreen;