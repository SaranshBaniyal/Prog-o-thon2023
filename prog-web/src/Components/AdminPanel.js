import React, { useContext, useState } from 'react'
import Navbar from './Navbar'
import { context } from '..';
const ethers = require('ethers');

const providers = new ethers.providers.JsonRpcProvider('https://sepolia.infura.io/v3/10ebf381d586457a83347cde8f4b3e47');
const walletaddress = '0x4720c61C6EA4E13795E2f103F1ccbf39ee07a0e3';

const wallerAbi = [
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



const AdminHome = () => {
    const { voteadd, setVoteadd } = useContext(context);
    const [names, setNames] = useState('');
    const [endDateTime, setEndDateTime] = useState('');
    const [electionPosition, setElectionPosition] = useState('');

    const addelection = async () => {
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            await provider.send('eth_requestAccounts', []);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(walletaddress, wallerAbi, signer);

            // Split user-entered names by comma and trim whitespace
            const candidateNames = names.split(',').map(name => name.trim());
            console.log(candidateNames);
            // Convert endDateTime to a Unix timestamp (you might want to handle user-friendly date/time input)
            const endTimestamp = parseInt(endDateTime, 10);

            await contract.createVotingContractInstance(candidateNames, endTimestamp, electionPosition);

            const walletcontract = new ethers.Contract(walletaddress, wallerAbi, providers);
            const add = await walletcontract.getAddress();
            console.log(add);
            setVoteadd(add);
        } catch (error) {
            console.error("Error creating election:", error);
        }
    };

    return (
        <div>
            <Navbar />
            <h1>Admin panel for the college election</h1>
            <label>
                Candidate Names (comma-separated):
                <input type="text" value={names} onChange={e => setNames(e.target.value)} />
            </label>
            <label>
                End Date/Time (Unix timestamp):
                <input type="text" value={endDateTime} onChange={e => setEndDateTime(e.target.value)} />
            </label>
            <label>
                Election Position:
                <input type="text" value={electionPosition} onChange={e => setElectionPosition(e.target.value)} />
            </label>
            <button onClick={addelection}>Create new election</button>
        </div>
    );
};

export default AdminHome;