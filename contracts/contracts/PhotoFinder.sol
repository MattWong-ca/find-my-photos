// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/interfaces/IERC721.sol";

contract PhotoFinder is Ownable {
    uint256 public constant REGULAR_PRICE = 1 ether;
    uint256 public constant HOLDER_PRICE = 0.01 ether;
    
    // All the pack contracts we want to check
    address[] public packContracts = [
        0x69B4e2BD6D5c5eeeB7E152FB9bc9b6c4364fA410, // Pioneer Pack
        0x27479dd41a85002F5987B8C7E999ca0e07Dba817  // Partner Pack
    ];

    // Whitelist for specific addresses that get the discount
    mapping(address => bool) public whitelisted;

    constructor() Ownable(msg.sender) {
        // Add your address to whitelist in constructor
        whitelisted[0xB68918211aD90462FbCf75b77a30bF76515422CE] = true;
    }

    function isPackHolder(address user) public view returns (bool) {
        // Check whitelist first
        if (whitelisted[user]) {
            return true;
        }

        // Check all pack contracts
        for (uint i = 0; i < packContracts.length; i++) {
            IERC721 pack = IERC721(packContracts[i]);
            try pack.balanceOf(user) returns (uint256 balance) {
                if (balance > 0) {
                    return true;
                }
            } catch {
                // Skip if contract call fails
                continue;
            }
        }
        return false;
    }

    function payForSearch() public payable {
        uint256 requiredPrice = isPackHolder(msg.sender) ? HOLDER_PRICE : REGULAR_PRICE;
        require(msg.value >= requiredPrice, "Insufficient payment");
        
        // If they sent too much, refund the excess
        if (msg.value > requiredPrice) {
            payable(msg.sender).transfer(msg.value - requiredPrice);
        }

        emit SearchPaid(msg.sender, requiredPrice);
    }

    // Owner can add/remove addresses from whitelist
    function setWhitelisted(address user, bool status) external onlyOwner {
        whitelisted[user] = status;
    }

    // Owner can update pack contract addresses
    function setPackContracts(address[] calldata _packContracts) external onlyOwner {
        packContracts = _packContracts;
    }

    // Event for tracking searches
    event SearchPaid(address indexed user, uint256 amount);

    // Allow owner to withdraw funds
    function withdraw() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
} 