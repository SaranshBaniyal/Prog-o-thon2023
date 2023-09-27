import React, { useState } from 'react';
import './navbar.css';
import { Link } from 'react-router-dom';
import Profile from './profile';

const Navbar = () => {
    const [isProfilePopupOpen, setProfilePopupOpen] = useState(false);

    const toggleProfilePopup = () => {
        setProfilePopupOpen(!isProfilePopupOpen);
    };

    return (
        <div className="navbar">
            <div className="navbar-left">
                <Link to='/'> <span>BlocBallot</span></Link>
            </div>
            <div className="navbar-right">
                <Link to='/home'>
                    <button className="nav-button">Home</button>
                </Link>
                <Link to='/leaderboard'>
                    <button className="nav-button">Leaderboard</button>
                </Link>
                <button className="nav-button" onClick={toggleProfilePopup}>
                    Profile
                </button>
                {isProfilePopupOpen && (
                    <div className="profile-popup-wrapper">
                        <div className="profile-popup">
                            <Profile />
                            <button onClick={toggleProfilePopup}>Close</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
