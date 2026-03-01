// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

interface IERC20 {
    function transfer(address to, uint256 amount) external returns (bool);
}

contract VehicleNFT is ERC721, ERC721URIStorage, Ownable {
    uint256 private _nextTokenId;
    struct MaintenanceRecord {
        uint256 timestamp;
        string mileage;
        string description;
        string ipfsHash;
        address technician;
    }

    // Mapping from tokenId to list of maintenance records
    mapping(uint256 => MaintenanceRecord[]) public maintenanceHistory;
    
    // Mapping from VIN string to tokenId (for easy lookup)
    mapping(string => uint256) public vinToTokenId;
    mapping(string => bool) public vinExists;

    IERC20 public ozcarToken;
    uint256 public constant REWARD_AMOUNT = 15 ether;

    event VehicleRegistered(string vin, uint256 tokenId, address owner);
    event MaintenanceAdded(uint256 indexed tokenId, address indexed technician, string ipfsHash);

    constructor(address initialOwner, address _tokenAddress) ERC721("OzcarVehicle", "OZV") Ownable(initialOwner) {
        ozcarToken = IERC20(_tokenAddress);
    }

    function registerVehicle(address to, string memory vin, string memory uri) public returns (uint256) {
        require(!vinExists[vin], "VIN already registered");
        uint256 tokenId = _nextTokenId++;
        _mint(to, tokenId);
        _setTokenURI(tokenId, uri);
        
        vinToTokenId[vin] = tokenId;
        vinExists[vin] = true;
        
        emit VehicleRegistered(vin, tokenId, to);
        return tokenId;
    }

    function addMaintenanceRecord(
        uint256 tokenId, 
        string memory ipfsHash, 
        string memory mileage, 
        string memory description,
        address technician
    ) public {
        // In a real scenario, we might require the technician to be the msg.sender or authorized
        // require(ownerOf(tokenId) != address(0), "Vehicle does not exist");
        
        MaintenanceRecord memory newRecord = MaintenanceRecord({
            timestamp: block.timestamp,
            mileage: mileage,
            description: description,
            ipfsHash: ipfsHash,
            technician: technician
        });

        maintenanceHistory[tokenId].push(newRecord);

        // Attempt to reward the technician
        // The contract must have MINTER role or predefined allowance
        // For this demo, we assume the contract holds tokens to distribute OR has minting rights
        // Using a try-catch pattern or check balance to prevent revert
        try ozcarToken.transfer(technician, REWARD_AMOUNT) {
            // Reward success
        } catch {
            // Reward failed (contract empty?), but record still added
        }

        emit MaintenanceAdded(tokenId, technician, ipfsHash);
    }

    function getMaintenanceHistoryCount(uint256 tokenId) public view returns (uint256) {
        return maintenanceHistory[tokenId].length;
    }

    function getMaintenanceRecord(uint256 tokenId, uint256 index) public view returns (MaintenanceRecord memory) {
        return maintenanceHistory[tokenId][index];
    }

    // Overrides required by Solidity
    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
