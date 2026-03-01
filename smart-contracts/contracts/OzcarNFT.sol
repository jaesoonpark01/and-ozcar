// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract OzcarNFT is ERC721URIStorage, Ownable {
    uint256 private _nextTokenId;

    // Mapping from TokenID to VIN hash to ensure uniqueness
    mapping(uint256 => bytes32) public tokenIdToVinHash;
    mapping(bytes32 => bool) private vinHashExists;

    event VehicleRegistered(uint256 indexed tokenId, string vin, address owner);
    event MaintenanceRecordAdded(uint256 indexed tokenId, string ipfsHash, uint256 mileage);

    struct MaintenanceRecord {
        uint256 timestamp;
        string ipfsHash;
        uint256 mileage;
        string description;
        address technician;
    }

    mapping(uint256 => MaintenanceRecord[]) public maintenanceHistory;

    constructor(address initialOwner) ERC721("OzcarVehicle", "OZCAR") Ownable(initialOwner) {}

    function registerVehicle(address to, string memory vin, string memory tokenURI) external onlyOwner returns (uint256) {
        bytes32 vinHash = keccak256(abi.encodePacked(vin));
        require(!vinHashExists[vinHash], "VIN already registered");

        uint256 tokenId = _nextTokenId++;
        _mint(to, tokenId);
        _setTokenURI(tokenId, tokenURI);

        tokenIdToVinHash[tokenId] = vinHash;
        vinHashExists[vinHash] = true;

        emit VehicleRegistered(tokenId, vin, to);
        return tokenId;
    }

    function addMaintenanceRecord(
        uint256 tokenId,
        string memory ipfsHash,
        uint256 mileage,
        string memory description,
        address technician
    ) external {
        // In integration, this might be restricted to authorized technicians or contract calls
        require(ownerOf(tokenId) != address(0), "Vehicle does not exist");
        
        maintenanceHistory[tokenId].push(MaintenanceRecord({
            timestamp: block.timestamp,
            ipfsHash: ipfsHash,
            mileage: mileage,
            description: description,
            technician: technician
        }));

        emit MaintenanceRecordAdded(tokenId, ipfsHash, mileage);
    }

    function getMaintenanceHistoryCount(uint256 tokenId) external view returns (uint256) {
        return maintenanceHistory[tokenId].length;
    }

    function getMaintenanceRecord(uint256 tokenId, uint256 index) external view returns (MaintenanceRecord memory) {
        return maintenanceHistory[tokenId][index];
    }
}
