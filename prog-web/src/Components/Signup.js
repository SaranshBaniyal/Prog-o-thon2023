import React, { useContext, useState } from "react";
import "./signup.css";
import img1 from './9c386e8294f09b69097268c82c083301 1.svg'
import Camera from "./Camera";
import { context } from '..';
import { useNavigate } from 'react-router';
import { ethers } from 'ethers';
import axios from 'axios';

const Signup = () => {
    const { img, setImg, names, setNames, isReg, setIsReg, emails, setEmails } = useContext(context);
    const navigate = useNavigate();

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rollNo, setRollNo] = useState("");
    const [branch, setBranch] = useState("");
    const [year, setYear] = useState("");

    const [publicKey, setPublicKey] = useState('');
    const [connected, setConnected] = useState(false);


    const getPublicKey = async () => {
        try {
            if (typeof window.ethereum !== 'undefined') {
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                const address = await signer.getAddress();
                setPublicKey(address);
                setConnected(true);
            } else {
                alert("MetaMask is not installed.");
            }
        } catch (error) {
            console.error("Error fetching public key:", error);
        }
    };

    const handleFullNameChange = (e) => {
        setFullName(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleRollNoChange = (e) => {
        setRollNo(e.target.value);
    };

    const handleBranchChange = (e) => {
        setBranch(e.target.value);
    };

    const handleYearChange = (e) => {
        setYear(e.target.value);
    };

    // const [connected, setConnected] = useState(false);
    const [cameraactive, setCameraactive] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://057a-220-158-168-162.ngrok-free.app/api/signup/', {
                name: fullName,
                email: email,
                branch: branch,
                rollno: rollNo,
                year: year,
                wallet_id: publicKey,
                password: password,
                image_base64: img.toString()
            }, {
                headers: {
                    "Content-Type": "application/json",
                    // 'ngrok-skip-browser-warning': 'abc'
                }
            });
            if (response.status === 201) {
                alert(`Account created successfully`);
                setIsReg(true);
                navigate('/home');
                setEmails(email);
                setNames(fullName);
            }
        } catch (err) {
            console.error(err);
        }
    };


    return (

        <div className="App">

            {/* <form onSubmit={handleSubmit}> */}
            <div>
                {" "}
                <h1>Sign in to Continue</h1>

                {/* <label htmlFor="fullName">Full Name:</label> */}
                <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={fullName}
                    placeholder="Full Name"
                    onChange={handleFullNameChange}
                />
                {/* <label htmlFor="email">Email:</label> */}
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    placeholder="Email"
                    onChange={handleEmailChange}
                />
                {/* <label htmlFor="password">Password:</label> */}
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    placeholder="Password"
                    onChange={handlePasswordChange}
                />
                {/* <label htmlFor="rollNo">Roll No:</label> */}
                <input
                    type="text"
                    id="rollNo"
                    name="rollNo"
                    value={rollNo}
                    placeholder="Roll No:-"
                    onChange={handleRollNoChange}
                />
                {/* <label htmlFor="role">Branch:</label> */}
                <input
                    type="text"
                    id="role"
                    name="role"
                    value={branch}
                    placeholder="Branch"
                    onChange={handleBranchChange}
                />

                {/* <label htmlFor="year">Year:</label> */}
                <input
                    type="text"
                    id="year"
                    name="year"
                    value={year}
                    placeholder="Year"
                    onChange={handleYearChange}
                />

                {!connected &&
                    <div>
                        <h1>Metamask is not connected</h1>
                        <button onClick={getPublicKey}>Connect to metamask</button>
                    </div>}
                {connected && <div>
                    <h1>Metamask is connected</h1>
                    <h1>Connected wallet is {publicKey}</h1>
                </div>}

                <button className='cptre' onClick={() => setCameraactive(true)}>Capture image</button>
                {cameraactive && <Camera />}
                <button type="submit" onClick={handleSubmit}>Sign Up</button>

            </div>
            <div className="image-container">
                {/* Your image here */}
                <img src={img1} className="img-signup" alt="Your Image" />
            </div>

        </div>
    );
};

export default Signup;
