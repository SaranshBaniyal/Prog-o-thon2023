import React from 'react';
import './ProfilePage.css';
import Navbar from './Navbar';

const ProfilePage = () => {
    const user = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        faceVerified: true
    };

    return (
        <div>
            <Navbar/>
            <div className="profile-page">
                <h1>User Profile</h1>
                <p>Name: {user.name}</p>
                <p>Email: {user.email}</p>
                <p>Face Verification Status: {user.faceVerified ? 'Verified' : 'Not Verified'}</p>
                <button>Update Profile</button>
            </div>
        </div>
    );
};

export default ProfilePage;
