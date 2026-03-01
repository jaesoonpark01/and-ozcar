
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./OzcarReputation.sol";
import "./OzcarToken.sol";

/**
 * @title OzcarRewardCalculator
 * @dev Calculates and distributes OZC rewards based on reputation and activity.
 */
contract OzcarRewardCalculator is Ownable {
    OzcarReputation public reputationContract;
    OzcarToken public tokenContract;

    uint256 public constant BASE_REWARD = 100 ether; // 100 OZC base

    // OIP-1 Allocation Ratios (in basis points: 10000 = 100%)
    uint256 public constant RATIO_DRIVING = 4000;      // 40%
    uint256 public constant RATIO_MAINTENANCE = 4500;  // 45%
    uint256 public constant RATIO_SOCIAL = 1500;       // 15%

    event RewardDistributed(address indexed user, uint256 amount, string activityType);

    constructor(address _reputation, address _token, address _initialOwner) Ownable(_initialOwner) {
        reputationContract = OzcarReputation(_reputation);
        tokenContract = OzcarToken(_token);
    }

    function calculateReward(address userAddr, string memory activityType, bool hasMedia, bool isVerified) public view returns (uint256) {
        (,,,, uint256 score,) = reputationContract.technicians(userAddr);
        
        uint256 baseAmount = BASE_REWARD;
        uint256 ratio = 0;

        // Apply OIP-1 ratios based on activity type
        if (keccak256(abi.encodePacked(activityType)) == keccak256(abi.encodePacked("DRIVING"))) {
            ratio = RATIO_DRIVING;
        } else if (keccak256(abi.encodePacked(activityType)) == keccak256(abi.encodePacked("MAINTENANCE"))) {
            ratio = RATIO_MAINTENANCE;
        } else if (keccak256(abi.encodePacked(activityType)) == keccak256(abi.encodePacked("SOCIAL"))) {
            ratio = RATIO_SOCIAL;
        } else {
            ratio = 1000; // Default 10% for unknown types
        }

        uint256 mult = 100; // 1.0x

        // Grade Multipliers based on Reputation Score
        if (score >= 90) {
            mult = 200;      // Master: 2.0x
        } else if (score >= 70) {
            mult = 150; // Gold: 1.5x
        } else if (score >= 40) {
            mult = 120; // Silver: 1.2x
        }

        // Activity Bonuses
        if (hasMedia) mult += 20;   // +0.2x
        if (isVerified) mult += 10; // +0.1x
        
        uint256 rawReward = (baseAmount * mult) / 100;
        return (rawReward * ratio) / 10000;
    }

    // Called by backend (operator) after verifying off-chain work
    function distributeReward(address userAddr, string memory activityType, bool hasMedia, bool isVerified) external onlyOwner {
        uint256 rewardAmount = calculateReward(userAddr, activityType, hasMedia, isVerified);
        require(rewardAmount > 0, "Reward amount is zero");
        
        tokenContract.mint(userAddr, rewardAmount);
        
        emit RewardDistributed(userAddr, rewardAmount, activityType);
    }

    function updateContracts(address _reputation, address _token) external onlyOwner {
        reputationContract = OzcarReputation(_reputation);
        tokenContract = OzcarToken(_token);
    }
}
