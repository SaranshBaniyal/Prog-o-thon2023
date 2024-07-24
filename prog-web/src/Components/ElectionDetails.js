import React from 'react';
import { useParams, Link } from 'react-router-dom';
import './ElectionDetails.css';
import Navbar from './Navbar';

const ElectionDetails = () => {
    const { id } = useParams();
    const elections = [
        { id: 1, name: 'Presidential Election', status: 'Ongoing', description: 'Details about Presidential Election' },
        { id: 2, name: 'Senate Election', status: 'Upcoming', description: 'Details about Senate Election' }
    ];

    const election = elections.find(e => e.id === parseInt(id));

    if (!election) {
        return <div>Election not found</div>;
    }

    return (
        <div>
            <Navbar/>
            <div className="election-details-container">
                <h1>{election.name}</h1>
                <p>Status: {election.status}</p>
                <p>{election.description}</p>
                <Link to={`/vote/${election.id}`}>
                    <button className="vote-button">Vote</button>
                </Link>
            </div>
        </div>
    );
};

export default ElectionDetails;
