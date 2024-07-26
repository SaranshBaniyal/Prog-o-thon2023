pragma solidity ^0.8.0;

contract Voting {
    struct Candidate {
        string name;
        uint votes;
    }
    
    struct Election {
        string position;
        Candidate[] candidates;
        uint votingEndDateTime;
        mapping(address => bool) hasVoted;
        mapping(address => bool) faceVerified;
    }
    
    address public owner;
    mapping(uint => Election) public elections;
    uint public electionCount;
    mapping(address => bool) public voters;
    address[] public voterList;  // Array to store voter addresses

    constructor() {
        owner = 0xAC6A0813bBE546806ACB342307435014a37Ad15d;
    }

    modifier onlyOwner {
        require(msg.sender == owner, "Only owner can perform this action.");
        _;
    }

    function createElection(string[] memory candidateNames, uint endDateTime, string memory position) public onlyOwner {
        electionCount++;
        Election storage newElection = elections[electionCount];
        newElection.position = position;
        newElection.votingEndDateTime = endDateTime;
        
        for (uint i = 0; i < candidateNames.length; i++) {
            newElection.candidates.push(Candidate({
                name: candidateNames[i],
                votes: 0
            }));
        }
    }

    function addVoter(address voter) public onlyOwner {
        require(!voters[voter], "Voter is already registered.");  // Check if voter is already added
        voters[voter] = true;
        voterList.push(voter);  // Add voter to the array
    }

    function verifyVoterFace(uint electionId, address voter) public onlyOwner {
        require(electionId > 0 && electionId <= electionCount, "Invalid election ID.");
        elections[electionId].faceVerified[voter] = true;
    }

    function vote(uint electionId, uint candidateIndex) public {
        require(electionId > 0 && electionId <= electionCount, "Invalid election ID.");
        require(voters[msg.sender], "You are not authorized to vote.");
        Election storage election = elections[electionId];
        require(election.faceVerified[msg.sender], "Your face verification is not completed.");
        require(!election.hasVoted[msg.sender], "You have already voted in this election.");
        require(block.timestamp < election.votingEndDateTime, "Voting has ended.");
        require(candidateIndex < election.candidates.length, "Invalid candidate index.");

        election.candidates[candidateIndex].votes++;
        election.hasVoted[msg.sender] = true;
    }

    function getAllVotesOfCandidates(uint electionId) public view returns (Candidate[] memory) {
        require(electionId > 0 && electionId <= electionCount, "Invalid election ID.");
        return elections[electionId].candidates;
    }

    function getVotingStatus(uint electionId) public view returns (bool) {
        require(electionId > 0 && electionId <= electionCount, "Invalid election ID.");
        return (block.timestamp < elections[electionId].votingEndDateTime);
    }

    function getVoterList() public view returns (address[] memory) {
        return voterList;
    }
}
