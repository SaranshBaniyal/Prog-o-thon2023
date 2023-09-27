import React, { useState } from 'react';
import Navbar from './Navbar';
import './home.css';

const Home = () => {
    const initialRolesData = [
        {
            role: 'President',
            candidates: ['Candidate 1', 'Candidate 2', 'Candidate 3'],
            voted: false,
            selectedCandidate: '',
        },
        // Add more roles as needed
    ];

    // State to hold the roles data
    const [rolesData, setRolesData] = useState(initialRolesData);

    // Function to handle candidate click
    const handleCandidateClick = (roleIndex, candidateIndex) => {
        const updatedRolesData = [...rolesData];
        updatedRolesData[roleIndex].selectedCandidate = candidateIndex;
        setRolesData(updatedRolesData);
    };

    // Function to handle the vote for a specific role
    const handleVoteClick = (roleIndex) => {
        const updatedRolesData = [...rolesData];
        const selectedCandidateIndex = updatedRolesData[roleIndex].selectedCandidate;

        if (selectedCandidateIndex !== '') {
            // Perform the voting logic here (e.g., update voted status)
            updatedRolesData[roleIndex].voted = true;

            // Now, you can update the state to re-render the component and reflect the changes
            setRolesData(updatedRolesData);
        }
    };

    return (
        <div>
            <Navbar />
            <h1>Welcome to the voting website</h1>
            <div className="roles-container">
                {rolesData.map((role, roleIndex) => (
                    <div className="role-candidates" key={roleIndex}>
                        <div className="role-time">
                            <h2>{role.role}</h2>
                            <h2>Remaining time :- </h2>
                        </div>
                        <ul className="candidates-list">
                            {role.candidates.map((candidate, candidateIndex) => (
                                <li
                                    key={candidateIndex}
                                    className={`candidate-name ${role.selectedCandidate === candidateIndex ? 'selected' : ''
                                        }`}
                                    onClick={() => handleCandidateClick(roleIndex, candidateIndex)}
                                >
                                    {candidate}
                                </li>
                            ))}
                        </ul>
                        {role.voted ? (
                            <p>You have already voted for this role.</p>
                        ) : (
                            <div className='btn-2'>
                                <button onClick={() => handleCandidateClick(roleIndex, '')}>Reset</button>
                                <button
                                    disabled={role.selectedCandidate === ''}
                                    onClick={() => handleVoteClick(roleIndex)}
                                >
                                    Vote
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
