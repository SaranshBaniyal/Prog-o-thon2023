import axios from 'axios';
import React, { useState, useContext } from 'react';
import { context } from '..';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import img1 from './undraw_voting_nvu7.svg'
import './Login.css';

const Login = () => {
    const { img, setImg, names, setNames, islogin, setIsLogg, isReg, setIsReg, emails, setEmails } = useContext(context);
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('https://057a-220-158-168-162.ngrok-free.app/api/login/', {
                email: email,
                password: password
            }, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            alert(`Logged in successfully`);
            setIsLogg(true);
            navigate('/home');
            setEmails(email);
        } catch (error) {
            console.error('Some error occurred');
        }
    };

    return (
        <div className="login-container">
            <div className="login-form-container">
                <div className="form-header">
                    <h1>BlocBallot.</h1>
                    <h2>Sign in to Continue</h2>
                </div>
                <form className="login-form" onSubmit={handleLogin}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            value={email}
                            onChange={handleEmailChange}
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password" 
                            id="password" 
                            name="password" 
                            value={password}
                            onChange={handlePasswordChange}
                            required 
                        />
                    </div>
                    <button type="submit" className="submit-button">Login</button>
                </form>
                <div className="signup-link">
                    <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
                </div>
            </div>
            <div className="image-container">
                <img src={img1} alt="Astronaut" />
            </div>
        </div>
    );
};

export default Login;
