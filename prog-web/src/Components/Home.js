import React, { useContext, useEffect, useState } from 'react'
import Navbar from './Navbar'
import img1 from './Group 1 (1).svg'
import './home.css'
import Camera from './Camera2';
import { context } from '..';
import { useNavigate } from 'react-router';
const { ethers } = require('ethers');

const providers1 = new ethers.providers.JsonRpcProvider('https://sepolia.infura.io/v3/10ebf381d586457a83347cde8f4b3e47');
const walletaddress1 = '0x4720c61C6EA4E13795E2f103F1ccbf39ee07a0e3';

const wallerAbi1 = [
    {
        "inputs": [
            {
                "internalType": "string[]",
                "name": "candidatesNameList",
                "type": "string[]"
            },
            {
                "internalType": "uint256",
                "name": "endDateTime",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "position",
                "type": "string"
            }
        ],
        "name": "createVotingContractInstance",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getAddress",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
]

const walletaddress = '0x0C5a6Dd883dBd55a4991De1862155e7de0A95Dbf';
const providers = new ethers.providers.JsonRpcProvider('https://sepolia.infura.io/v3/10ebf381d586457a83347cde8f4b3e47');

const wallerAbi = [
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "candidateName",
                "type": "string"
            }
        ],
        "name": "addCandidate",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string[]",
                "name": "candidatesNameList",
                "type": "string[]"
            },
            {
                "internalType": "uint256",
                "name": "endDateTime",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "electionPosition",
                "type": "string"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "candidateIndex",
                "type": "uint256"
            }
        ],
        "name": "vote",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "candidates",
        "outputs": [
            {
                "internalType": "string",
                "name": "name",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "votes",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getAllVotesOfCandiates",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "string",
                        "name": "name",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "votes",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct Voting.Candidate[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getVotingStatus",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "position",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "voters",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "votingEndDateTime",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];
const Home = () => {
    const Navigate = useNavigate();
    const { succeeded, setSuccess, islogin } = useContext(context);


    const initialRolesData = [
        {
            role: 'President',
            candidates: ['Candidate 1', 'Candidate 2', 'Candidate 3'],
            voted: false,
            selectedCandidate: '',
        }
    ];


    const [rolesData, setRolesData] = useState(initialRolesData);
    const [candidates, setCandidates] = useState([]);
    const [pos, setPos] = useState('');
    const [remTime, setRemtime] = useState();
    const [opencamera, setOpencamera] = useState(false);

    // const getstate = async () => {
    // const signer = await provider.getSigner();


    // useEffect(() => {
    //     getstate();
    //     //console.log(state)
    // }, [])

    const handleCandidateClick = (roleIndex, candidateIndex) => {
        const updatedRolesData = [...rolesData];
        updatedRolesData[roleIndex].selectedCandidate = candidateIndex;
        setRolesData(updatedRolesData);
    };

    // console.log)
    // const vote = async (candidateIndex) => {
    //     await state.contract.vote(candidateIndex)
    // }
    const vote = async (roleIndex, candidateIndex) => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send('eth_requestAccounts', []);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(walletaddress1, wallerAbi1, signer);
        await contract.createVotingContractInstance(['a', 'b', 'v'], 1456622, 'pres');
        setVote(true)
        // await contract.getVotingStatus()

        // console.log(ge);

    }        //vote(0)
    useEffect(() => {
        const getAddress = async () => {

        }
        const remtimepos = async () => {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const walletContract = new ethers.Contract(walletaddress, wallerAbi, provider);
            const getVotingStatus = await walletContract.votingEndDateTime();
            const position = await walletContract.position();
            const date = new Date(Number(getVotingStatus) * 1000);
            setPos(position);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based, so add 1 and pad with 0 if necessary
            const day = String(date.getDate()).padStart(2, '0');
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            const seconds = String(date.getSeconds()).padStart(2, '0');
            const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
            setRemtime(formattedDateTime);
            const getallvotes = await walletContract.getAllVotesOfCandiates();
            const formattedCandidates = getallvotes.map(candidate => ({
                name: candidate.name,
                votes: candidate.votes.toNumber(),
            }));
            setCandidates(formattedCandidates);
        }
        if (!islogin) {
            Navigate('/');
        }


        remtimepos();
    })

    const [vote12, setVote] = useState(false);

    return (
        <div>
            <Navbar />
            <img src={img1} className='home-img' alt="" />
            <h1 className='maintxt'>EPMOC Elections</h1>
            <div className="roles-container">
                {rolesData?.map((role, roleIndex) => (
                    <div className="role-candidates" key={roleIndex}>
                        <div className="role-time">
                            <h2>{pos}</h2>
                            <h2>Valid till: {remTime} </h2>
                        </div>
                        <ul className="candidates-list">
                            {candidates.map((candidate, candidateIndex) => (
                                <li
                                    key={candidateIndex}
                                    className={`candidate-name ${role.selectedCandidate === candidate.name ? 'selected' : ''}`}
                                    onClick={() => handleCandidateClick(roleIndex, candidate.name)}
                                >
                                    <div>
                                        <h1>0{candidateIndex + 1}.</h1>
                                        <h2>{candidate.name}</h2>
                                        <h3>Votes:- {candidate.votes}</h3>
                                        {/* {vote12 && <h3>Votes:- {candidate.votes}</h3>} */}
                                    </div>
                                </li>
                            ))}
                        </ul>

                        {/* <button onClick={() => vote(roleIndex, role.selectedCandidate)}>Vote for me</button> */}
                        <div className='nextbtn'><button className='btn123' onClick={() => setOpencamera(true)}>Proceed Next</button></div>
                        <div className='camera12'>{opencamera && <Camera />}</div>
                        {succeeded && <button className='btn12' onClick={() => vote(roleIndex, role.selectedCandidate)}>Vote</button>}
                    </div>

                ))}
            </div>
        </div>
    )
}

export default Home