import React, { useContext, useState } from "react";
import "./signup.css";
import img1 from './undraw_voting_nvu7.svg'
import CameraPopup from "./CameraPopup";
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
    const [cameraActive, setCameraActive] = useState(false);


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

        <div className="signup-container">
        {cameraActive && 
            <CameraPopup 
                onClose={() => setCameraActive(false)} 
                onSubmit={(image) => {
                    setImg(image);
                    setCameraActive(false);
                }} 
            />
        }
        <div className="signup-form-container">
            <div className="form-header">
                <h1>BlocBallot.</h1>
                <h2>Sign in to Continue</h2>
            </div>
            <form className="signup-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <input 
                        type="text" 
                        id="fullName" 
                        name="fullName" 
                        value={fullName} 
                        placeholder="Name" 
                        onChange={(e) => setFullName(e.target.value)} 
                    />
                </div>
                <div className="form-group">
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <input 
                        type="text" 
                        id="rollNo" 
                        name="rollNo" 
                        value={rollNo} 
                        placeholder="Roll No." 
                        onChange={(e) => setRollNo(e.target.value)} 
                    />
                </div>
                <div className="form-group image-upload-group">
                    {!img && <label htmlFor="image" onClick={() => setCameraActive(true)} className="image-upload-label">Add your Image</label>}
                    {img && <label htmlFor="image" onClick={() => setCameraActive(true)} className="image-upload-label">Your Image is uploaded, click here to re-click the photo</label>}
                </div>

                {!connected && 
                    <div className="metamask-container">
                        <button type="button" onClick={getPublicKey} className="metamask-button">
                            Connect with Metamask
                        </button>
                    </div>
                }
                {connected && 
                    <div className="metamask-container">
                        <h1>Metamask is connected</h1>
                        <h1>Connected wallet is {publicKey}</h1>
                    </div>
                }
                <button type="submit" className="submit-button">Sign Up</button>
            </form>
        </div>
        <div className="image-container">
            <img src={img1} className="img-signup" alt="Astronaut" />
        </div>
    </div>
    );
};

export default Signup;
