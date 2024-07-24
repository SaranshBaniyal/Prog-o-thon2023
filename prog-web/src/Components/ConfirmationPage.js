import React from 'react';
import { useNavigate } from 'react-router';
import './ConfirmationPage.css';
import Navbar from './Navbar';

const ConfirmationPage = () => {
    const navigate = useNavigate();

    return (
        <div>
            <Navbar/>
        <div className="confirmation-page">
            <h1>Vote Submitted Successfully!</h1>
            <p>Thank you for voting.</p>
            <button onClick={() => navigate('/dashboard')}>Back to Dashboard</button>
        </div>
        </div>
    );
};

export default ConfirmationPage;
