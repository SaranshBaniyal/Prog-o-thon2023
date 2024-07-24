import React, { useState } from 'react';
import Webcam from 'react-webcam';
import { useParams, useNavigate } from 'react-router';
import './VotingPage.css';
import Navbar from './Navbar';

const VotingPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [imageSrc, setImageSrc] = useState(null);
    const [verified, setVerified] = useState(false);
    const webcamRef = React.useRef(null);

    const capture = () => {
        const image = webcamRef.current.getScreenshot();
        setImageSrc(image);
        // Simulate verification process
        setTimeout(() => setVerified(true), 1000); // Mock verification
    };

    const submitVote = () => {
        // Submit the vote
        alert('Vote submitted successfully!');
        navigate('/confirmation');
    };

    return (
        <div>
           <Navbar/>
        <div className="voting-page">
            {!verified ? (
                <div className="face-verification">
                    <h1>Face Verification</h1>
                    <Webcam
                        audio={false}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        width="100%"
                    />
                    <button onClick={capture}>Verify Face</button>
                    {imageSrc && <img src={imageSrc} alt="Captured" />}
                </div>
            ) : (
                <div className="vote-section">
                    <h1>Presidential Election</h1>
                    <p>Select your candidate:</p>
                    <ul>
                        <li><input type="radio" name="candidate" value="Candidate A" /> Candidate A</li>
                        <li><input type="radio" name="candidate" value="Candidate B" /> Candidate B</li>
                        <li><input type="radio" name="candidate" value="Candidate C" /> Candidate C</li>
                    </ul>
                    <button onClick={submitVote}>Submit Vote</button>
                </div>
            )}
        </div>
        </div>
    );
};

export default VotingPage;
