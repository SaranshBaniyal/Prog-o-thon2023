import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <div className="hero-container">
      <header className="hero-header">
        <div className="logo">BlocBallot</div>
        <nav className="nav-links">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>
      <div className="hero-content">
        <h1>Welcome to BlocBallot</h1>
        <p>Your trusted blockchain-based voting system</p>
        <a href="/login" className="cta-button">Get Started</a>
      </div>
      {/* <footer className="hero-footer">
        <a href="#privacy">Privacy Policy</a>
        <a href="#terms">Terms of Service</a>
      </footer> */}
    </div>
  );
};

export default Hero;
