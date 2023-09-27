import React, { useEffect, useState } from 'react';
import './signup.css';
import { ethers } from 'ethers';
import axios from 'axios';
import AllCameras from './AllCameras';
import Camera from './Camera';

const Signup = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    // const [role, setRole] = useState('club');
    const [password, setPassword] = useState('');
    const [rollNo, setRollNo] = useState('');
    const [branch, setBranch] = useState('');
    const [year, setYear] = useState('');


    const [publicKey, setPublicKey] = useState('');
    const [connected, setConnected] = useState(false)
    // useEffect(() => {
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
    //     getPublicKey();
    // }, []);


    const handleSubmit = async (e) => {
        // You can send this data to your server for further processing
        e.preventDefault();
        try {
            const response = await axios.post('url', {
                name: fullName,
                branch: branch,
                rollNo: rollNo,
                password: password,
                email: email,
                wallet_id: publicKey,
            });
            if (response.status === 201) {
                alert(`Account created successfully`);
            }
        }
        catch (err) {
            console.error(err);
        }
    };
    const [cameraactive, setCameraactive] = useState(false);
    return (
        <div className="App">
            <h1>Signup</h1>
            {!connected &&
                <div>
                    <h1>Metamask is not connected</h1>
                    <button onClick={() => getPublicKey()}>Connect to metamask</button></div>}
            {connected && <div> <h1>Metamask is connected</h1>
                <h1>Conneted wallet is :- {publicKey}</h1>
            </div>}
            <form onSubmit={handleSubmit}>
                <label htmlFor="fullName">Full Name:</label>
                <input type="text" id="fullName" name="fullName" value={fullName} onChange={() => setFullName(fullName)} />

                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" value={email} onChange={() => setEmail(email)} />

                <label htmlFor="role">Branch:</label>
                <select id="role" name="role" value={branch} onChange={() => setBranch(branch)}>
                    <option value="club">CSE</option>
                    <option value="faculty">ECE</option>
                    <option value="faculty">IT</option>
                </select>

                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" value={password} onChange={() => password(password)} />

                <label htmlFor="rollNo">Roll No:</label>
                <input type="text" id="rollNo" name="rollNo" value={rollNo} onChange={() => setRollNo(rollNo)} />

                <label htmlFor="year">Year:</label>
                <select id="role" name="role" value={year} onChange={() => setYear(year)}>
                    <option value="club">1</option>
                    <option value="faculty">2</option>
                    <option value="faculty">3</option>
                    <option value="faculty">4</option>
                </select>
                {/* <AllCameras /> */}
                <button className='cptre' onClick={() => setCameraactive(true)}>Capture image</button>
                {cameraactive && <Camera />}
                {/* <button className='cptre'>Capture Image</button> */}
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
}

export default Signup;
