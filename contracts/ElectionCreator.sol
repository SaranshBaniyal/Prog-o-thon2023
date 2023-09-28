// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Voting.sol";

contract ElectionCreator {
    address add;
    function createVotingContractInstance(string[] memory candidatesNameList, uint endDateTime, string memory position) public  {
        Voting newContract = new Voting(
            candidatesNameList, 
            endDateTime,
            position
        );

        add =  address(newContract);
    }
    function getAddress() public view returns(address){
        return add;
    }
}
