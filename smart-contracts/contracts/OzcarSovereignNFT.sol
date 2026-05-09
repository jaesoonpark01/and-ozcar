// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title OzcarSovereignNFT
 * @dev Replaces the basic OzcarNFT with a Sovereign Node model featuring Rarity tiers,
 * Upgradeable Parts (Mining Power), and lifetime Data Yield tracking.
 */
contract OzcarSovereignNFT is ERC721URIStorage, Ownable {
    uint256 private _nextTokenId;

    enum Rarity { BASIC, GOLD, PLATINUM, DIAMOND }

    struct SovereignData {
        string vin;
        Rarity rarity;
        uint256 miningPower;       // Default scaling starts at 100 (1.0x)
        uint256 partsUpgrades;     // Track how many season parts were applied
        uint256 totalDataYield;    // Lifetime OZC mined
        bool isSlashingPenalty;    // True if caught by AI Sentinel/Jury
    }

    mapping(uint256 => SovereignData) public vehicleData;
    mapping(bytes32 => bool) private vinHashExists;

    event SovereignMinted(uint256 indexed tokenId, string vin, Rarity rarity, address owner);
    event PartsUpgraded(uint256 indexed tokenId, uint256 powerIncrease, uint256 newMiningPower);
    event YieldRecorded(uint256 indexed tokenId, uint256 amount);
    event SlashingPenaltyApplied(uint256 indexed tokenId, uint256 powerReduced);

    constructor(address initialOwner) ERC721("OzcarSovereign", "OZS") Ownable(initialOwner) {}

    /**
     * @dev The Genesis Minting process called via external Edge Function once API verification passes
     */
    function mintGenesis(address to, string memory vin, string memory tokenURI, Rarity rarity) external onlyOwner returns (uint256) {
        bytes32 vinHash = keccak256(abi.encodePacked(vin));
        require(!vinHashExists[vinHash], "VIN already registered");

        uint256 tokenId = ++_nextTokenId;
        _mint(to, tokenId);
        _setTokenURI(tokenId, tokenURI);

        uint256 power = 100;
        if (rarity == Rarity.GOLD) power = 120; // 1.2x
        else if (rarity == Rarity.PLATINUM) power = 150; // 1.5x
        else if (rarity == Rarity.DIAMOND) power = 200; // 2.0x

        vehicleData[tokenId] = SovereignData({
            vin: vin,
            rarity: rarity,
            miningPower: power,
            partsUpgrades: 0,
            totalDataYield: 0,
            isSlashingPenalty: false
        });

        vinHashExists[vinHash] = true;

        emit SovereignMinted(tokenId, vin, rarity, to);
        return tokenId;
    }

    /**
     * @dev Upgrade the vehicle using NFT Parts attained from Leaderboard seasons
     */
    function upgradeParts(uint256 tokenId, uint256 powerIncrease) external onlyOwner {
        require(ownerOf(tokenId) != address(0), "Nonexistent token");
        require(!vehicleData[tokenId].isSlashingPenalty, "Cannot upgrade penalized node");
        
        vehicleData[tokenId].miningPower += powerIncrease;
        vehicleData[tokenId].partsUpgrades += 1;
        
        emit PartsUpgraded(tokenId, powerIncrease, vehicleData[tokenId].miningPower);
    }

    /**
     * @dev Record OZC yield onto the NFT's permanent record
     */
    function recordDataYield(uint256 tokenId, uint256 yieldAmount) external onlyOwner {
        require(ownerOf(tokenId) != address(0), "Nonexistent token");
        vehicleData[tokenId].totalDataYield += yieldAmount;
        
        emit YieldRecorded(tokenId, yieldAmount);
    }

    /**
     * @dev Slashing function called by the DAO Governance contract
     */
    function applyJuryPenalty(uint256 tokenId) external onlyOwner {
        require(ownerOf(tokenId) != address(0), "Nonexistent token");
        
        vehicleData[tokenId].isSlashingPenalty = true;
        // Severe penalty: reduce mining power by 50%
        uint256 penaltyReduction = vehicleData[tokenId].miningPower / 2;
        vehicleData[tokenId].miningPower -= penaltyReduction;
        
        emit SlashingPenaltyApplied(tokenId, penaltyReduction);
    }
}
