// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/AccessControl.sol";

/**
 * @title OzcarVehicleHistory
 * @dev Manages the full lifecycle history of vehicles and rewards honest technicians.
 */
contract OzcarVehicleHistory is AccessControl {
    bytes32 public constant TECHNICIAN_ROLE = keccak256("TECHNICIAN_ROLE");
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");

    // 1. Data Structures
    struct MaintenanceRecord {
        uint256 timestamp;
        uint256 mileage;
        string description;
        string ipfsHash; // IPFS CID for photos/videos
        address technician;
    }

    struct Vehicle {
        string vin;
        address currentOwner;
        bytes32 ownerSecretHash; // SHA-256 hash of owner's secret for 2FA
        bool isScrapped;
        MaintenanceRecord[] records;
        bool exists;
    }

    // 2. State Variables
    mapping(string => Vehicle) private vehicles; // VIN => Vehicle
    // We leverage AccessControl for authorized technicians instead of a manual mapping

    // 3. Events
    event VehicleRegistered(string indexed vin, address indexed owner);
    event RecordAdded(string indexed vin, address indexed technician, uint256 mileage, string ipfsHash);
    event Scrapped(string indexed vin);

    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(ADMIN_ROLE, msg.sender);
    }

    // 4. Modifiers
    // AccessControl modifiers are used directly in function definitions

    // 5. Core Functions

    /**
     * @dev Registers a new vehicle in the system.
     * @param _vin Vehicle Identification Number
     * @param _owner Initial owner address
     * @param _secretHash Hash of the owner's secret password
     */
    function registerVehicle(string memory _vin, address _owner, bytes32 _secretHash) external onlyRole(ADMIN_ROLE) {
        require(!vehicles[_vin].exists, "Vehicle already registered");

        Vehicle storage v = vehicles[_vin];
        v.vin = _vin;
        v.currentOwner = _owner;
        v.ownerSecretHash = _secretHash;
        v.isScrapped = false;
        v.exists = true;

        emit VehicleRegistered(_vin, _owner);
    }

    /**
     * @dev Adds a maintenance record. Mining logic (minting tokens) should be handled 
     *      either by an external service listening to events or by calling a Reward contract.
     *      For gas optimization, we keep it simple here.
     * @param _vin Vehicle Identification Number
     * @param _mileage Current mileage
     * @param _desc Description of work
     * @param _ipfsHash IPFS CID of evidence
     * @param _ownerSecret Plain pretext secret provided by owner at POS
     */
    function addMaintenanceRecord(
        string memory _vin,
        uint256 _mileage,
        string memory _desc,
        string memory _ipfsHash,
        string memory _ownerSecret
    ) external onlyRole(TECHNICIAN_ROLE) {
        Vehicle storage v = vehicles[_vin];
        require(v.exists, "Vehicle not registered");
        require(!v.isScrapped, "Vehicle is scrapped");

        // generic check for mileage rollback (can be more sophisticated)
        if (v.records.length > 0) {
            require(_mileage >= v.records[v.records.length - 1].mileage, "Mileage rollback detected");
        }

        // 2FA: Verify Owner Consent
        // Keccak256 is used for hashing in Solidity (sha3)
        require(keccak256(abi.encodePacked(_ownerSecret)) == v.ownerSecretHash, "Owner consent failed: Invalid Secret");

        v.records.push(MaintenanceRecord({
            timestamp: block.timestamp,
            mileage: _mileage,
            description: _desc,
            ipfsHash: _ipfsHash,
            technician: msg.sender
        }));

        emit RecordAdded(_vin, msg.sender, _mileage, _ipfsHash);
    }

    /**
     * @dev Updates the owner secret. Only the current owner can do this (or admin for recovery).
     *      Simplified for this MVP to Admin only for now.
     */
    function updateOwnerSecret(string memory _vin, bytes32 _newSecretHash) external onlyRole(ADMIN_ROLE) {
        require(vehicles[_vin].exists, "Vehicle not registered");
        vehicles[_vin].ownerSecretHash = _newSecretHash;
    }

    // --- View Functions ---

    function getVehicle(string memory _vin) external view returns (
        string memory vin, 
        address currentOwner, 
        bool isScrapped, 
        bool exists
    ) {
        Vehicle storage v = vehicles[_vin];
        return (v.vin, v.currentOwner, v.isScrapped, v.exists);
    }

    function getVehicleHistory(string memory _vin) external view returns (MaintenanceRecord[] memory) {
        return vehicles[_vin].records;
    }
    
    function isTechnician(address _tech) external view returns (bool) {
        return hasRole(TECHNICIAN_ROLE, _tech);
    }
}
