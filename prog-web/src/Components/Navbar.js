import React, { useContext, useState } from 'react';
import './navbar.css';
import { Link } from 'react-router-dom';
// import Profile from './profile';
import { context } from '..';

const Navbar = () => {
    const { img, setImg, names, setNames, islogin, setIsLogg, isReg, setIsReg, emails, setEmails } = useContext(context);

    const [isProfilePopupOpen, setProfilePopupOpen] = useState(false);

    const toggleProfilePopup = () => {
        setProfilePopupOpen(!isProfilePopupOpen);
    };

    return (
        // <div className="navbar">
        //     <div className="navbar-left">
        //         <Link to='/'> <span>BlocBallot</span></Link>
        //     </div>
        //     <div className="navbar-right">
        //         <Link to='/home'>
        //             <button className="nav-button">Home</button>
        //         </Link>
        //         <Link to='/leaderboard'>
        //             <button className="nav-button">Leaderboard</button>
        //         </Link>
        //         <button className="nav-button" onClick={toggleProfilePopup}>
        //             Profile
        //         </button>
        //         {isProfilePopupOpen && (
        //             <div className="profile-popup-wrapper">
        //                 <div className="profile-popup">
        //                     <Profile />
        //                     <button onClick={toggleProfilePopup}>Close</button>
        //                 </div>
        //             </div>
        //         )}
        //     </div>
        // </div>

        <div className={`navbar`}>
            <div className="logo">
                <h1>BlocBallot</h1>
            </div>
            {/* <button className="menu-button" onClick={toggleMenu}>
                <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
            </button> */}
            <div className="options">
                <span><Link to='/home'>
                    Home
                </Link></span>
                <span><Link to='/leaderboard'>
                    Leaderboard
                </Link></span>

                {/* <span onClick={toggleProfilePopup}>Profile</span> */}

                <span><button className='signin'>{emails}</button></span>
            </div>
        </div>
    );
};

export default Navbar;
