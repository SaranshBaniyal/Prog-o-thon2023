import axios from 'axios';
import React, { useState, useContext } from 'react';
import { context } from '..';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';

const Login = () => {
    const { img, setImg, names, setNames, islogin, setIsLogg, isReg, setIsReg, emails, setEmails } = useContext(context);
    const navigate = useNavigate()
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
            })
            // console.log(data);
            // if (data.status === 200) {
            alert(`Logged in successfully`);
            setIsLogg(true);
            navigate('/home');
            setEmails(email);
            // }
            // setEmails(email);
        } catch (error) {
            console.error('Some error occured');
        }
    };

    return (
        <div style={styles.container}>
            <h2>Login</h2>
            <div style={styles.form}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={handleEmailChange}
                    style={styles.input}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={handlePasswordChange}
                    style={styles.input}
                />
                <button onClick={handleLogin} style={styles.button}>
                    Login
                </button>
                <Link to='/signup'><span>Not Registered</span></Link>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '100px',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    input: {
        width: '300px',
        padding: '10px',
        margin: '5px',
        fontSize: '16px',
    },
    button: {
        width: '150px',
        padding: '10px',
        margin: '10px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        fontSize: '18px',
    },
};

export default Login;
