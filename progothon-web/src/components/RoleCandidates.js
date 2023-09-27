import React, { useState } from 'react';
import './home.css'
const RoleCandidates = ({ role, candidates, voted, onVote }) => {
    const [selectedCandidate, setSelectedCandidate] = useState(null);

    const handleCandidateClick = (index) => {
        if (!voted) {
            setSelectedCandidate(index);
        }
    };

    const handleVoteClick = () => {
        if (!voted && selectedCandidate !== null) {
            // Call the onVote function to update the voted status
            onVote();
        }
    };

    return (
        <div className="role-candidates">
            <div className="role-time">
                <h2>{role}</h2>
                <h2>Remaining time :- </h2>
            </div>
            <ul className="candidates-list">
                {candidates.map((candidate, index) => (
                    <li
                        key={index}
                        className={`candidate-name ${selectedCandidate === index ? 'selected' : ''}`}
                        onClick={() => handleCandidateClick(index)}
                    >
                        {candidate}
                    </li>
                ))}
            </ul>
            {voted ? (
                <p>You have already voted for this role.</p>
            ) : (
                <div className='btn-2'>
                    <button onClick={() => setSelectedCandidate('')}>Reset</button>
                    <button disabled={!selectedCandidate} onClick={handleVoteClick}>Vote</button>
                </div>
            )}
        </div>
    );
};

export default RoleCandidates;
