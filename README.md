# Prog-o-thon 2023 - BlocBallot

Welcome to the README for the **BlocBallot** project, developed as part of Prog-o-thon 2023! BlocBallot is a comprehensive voting system designed for student elections. It utilizes a Solidity smart contract for secure and transparent voting on the Sepolia Testnet. Additionally, it features a Django-based backend that connects Metamask wallets to college student email addresses. To enhance security and verify voter identity, BlocBallot incorporates webcam-based facial recognition using Python's dlib library.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Usage](#usage)
- [Technology Stack](#technology-stack)
- [Project Team](#project-team)
- [About Prog-o-thon and MERAKI](#MERAKI)

## Introduction

**BlocBallot** is a voting system aimed at improving the integrity and accessibility of student elections. It leverages blockchain technology for transparent and tamper-proof voting, ensuring that each vote is accurately counted. The integration of a Django-based backend enhances user experience by mapping Metamask wallets to student email addresses, simplifying the registration process. Most importantly, BlocBallot employs facial recognition to verify the identity of voters, preventing fraudulent votes.

## Features

- **Blockchain-based Voting**: Utilizes a Solidity smart contract deployed on the Sepolia Testnet to handle the voting process securely and transparently.

- **Metamask Integration**: Seamlessly connects Metamask wallets to college student email addresses through a Django backend, simplifying user registration.

- **Facial Recognition**: Employs Python's dlib library to capture webcam-based facial images during registration and verifies the user's face identity during subsequent voting attempts.

- **User-Friendly Interface**: Provides an intuitive web interface for users to cast their votes easily.

- **Security**: Ensures the security and integrity of the election process through blockchain and facial recognition technology.

### Usage

To use **BlocBallot** for your student elections, follow these steps:

1. **Sign Up**:
   - Visit the BlocBallot website.
   - Create an account using your college student email and Metamask wallet.
   
2. **Facial Recognition**:
   - During registration, capture a webcam-based facial image.
   - BlocBallot will securely store this image for identity verification.

3. **Casting Your Vote**:
   - Log in to your account.
   - Choose the candidate or option you want to vote for.
   - Confirm your choice.

4. **Identity Verification**:
   - BlocBallot will verify your identity using facial recognition.
   - Ensure proper lighting and positioning for accurate verification.

5. **Election Results**:
   - Monitor real-time election results on the BlocBallot website.
   
### Technology Stack

**BlocBallot** is built using the following technologies:

- **Solidity**: Smart contract development for blockchain-based voting.
- **Python**: Backend development and facial recognition components.
- **Django**: Web framework for the backend, providing user authentication and interaction.
- **Metamask**: Integration for wallet connectivity, allowing users to interact with the blockchain.
- **dlib**: Facial recognition library used for identity verification.
- **Sepolia Testnet**: Ethereum testnet used for deploying and testing smart contracts.

These technologies work together to create a secure, user-friendly, and transparent voting system for student elections.

### Project Team

**BlocBallot** was created by **Team Rogue**, consisting of the following members:

- Saransh Baniyal: Developed the Django backend, created the solidity smart contracts.
- Lakshay Arora: Created the frontend and integrated the smart contract to the frontend using ethers.js.
- Mitesh Singla: Designed the UI and also worked on the yet-to-be-updated Kotlin-based Android app.


### About Prog-o-thon and MERAKI

**BlocBallot** was developed as part of **Prog-o-thon 2023**, a 48-hour-long annual hackathon organized by **IIIT Una** as part of their tech fest, **MERAKI**.

**Prog-o-thon** provides a platform for participants to showcase their programming skills and creativity by developing innovative projects in a limited time frame. It serves as a unique opportunity for students to collaborate, learn, and create technology solutions to real-world problems.

**MERAKI**, the tech fest organized by IIIT Una, fosters a culture of innovation and technological advancement among students, bringing together participants from various backgrounds to explore the world of technology.