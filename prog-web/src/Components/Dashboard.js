import React from 'react';
import { useNavigate } from 'react-router';
import './Dashboard.css';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import img1 from './Group 1 (1).svg';

const Dashboard = () => {
    const navigate = useNavigate();
    const elections = [
        { id: 1, name: 'Presidential Election', status: 'Ongoing' },
        { id: 2, name: 'Senate Election', status: 'Upcoming' }
    ];

    const getStatusClass = (status) => {
        switch (status) {
            case 'Ongoing':
                return 'election-ongoing';
            case 'Upcoming':
                return 'election-upcoming';
            case 'Completed':
                return 'election-completed';
            default:
                return '';
        }
    };

    return (
        <div>
            <Navbar />
        <div className="election-list-container">
            <img src={img1} className='home-img' alt="BlocBallot illustration" />
            <h1>Welcome to BlocBallot</h1>
            <h1>Election List</h1>
            <ul className="election-list">
                {elections.map(election => (
                    <li key={election.id} className={`election-item ${getStatusClass(election.status)}`}>
                        <Link to={`/election/${election.id}`}>
                            <h2>{election.name}</h2>
                            <p>Status: {election.status}</p>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
        </div>
    );
};

export default Dashboard;
