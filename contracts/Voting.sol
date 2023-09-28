pragma solidity ^0.8.0;

contract Voting {
    struct Candidate {
        string name;
        uint votes;
    }
    Candidate[] public candidates;
    address owner;
    string public position;
    mapping (address => bool) public voters;
    uint public votingEndDateTime;

    constructor(string[] memory candidatesNameList, uint endDateTime, string memory electionPosition) {
    for (uint i = 0; i < candidatesNameList.length; i++) {
        candidates.push(Candidate({
            name: candidatesNameList[i],
            votes: 0
        }));
    }
    owner = msg.sender;
    votingEndDateTime = endDateTime;
    position = electionPosition;
}

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    function addCandidate(string memory candidateName) public onlyOwner {
        candidates.push(Candidate({
                name: candidateName,
                votes: 0
        }));
    }

    function vote(uint candidateIndex) public {
        require(!voters[msg.sender], "You have already voted.");
        require(candidateIndex < candidates.length, "Invalid candidate index.");

        candidates[candidateIndex].votes++;
        voters[msg.sender] = true;
    }

    function getAllVotesOfCandiates() public view returns (Candidate[] memory) {
        return candidates;
    }

    function getVotingStatus() public view returns (bool) {
        return (block.timestamp < votingEndDateTime);
    }
}