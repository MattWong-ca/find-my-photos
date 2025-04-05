// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract PhotoFinder2 {
    address public owner;
    
    constructor() {
        owner = msg.sender;
    }

    function payForSearch() public payable {
        require(msg.value >= 0.01 ether, "Payment required");
    }

    function withdraw() public {
        require(msg.sender == owner, "Only owner can withdraw");
        (bool success, ) = owner.call{value: address(this).balance}("");
        require(success, "Withdrawal failed");
    }

    receive() external payable {}
    fallback() external payable {}
}