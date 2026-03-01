// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

/**
 * @title OzcarAppraisalNFT
 * @dev Issues NFTs representing verified AI appraisals for vehicles.
 *      Used as collateral or trust certificates for loans.
 */
contract OzcarAppraisalNFT is ERC721URIStorage, AccessControl {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    
    struct AppraisalData {
        string vin;
        uint256 appraisedValue; // In USD (with 2 decimals, e.g., 2500000 = $25,000.00)
        uint8 trustScore;       // 0-100
        uint256 timestamp;
        string modelVersion;    // AI Model version used
    }

    mapping(uint256 => AppraisalData) public appraisals;
    uint256 private _nextTokenId;

    event AppraisalMinted(uint256 indexed tokenId, string indexed vin, uint256 appraisedValue);

    constructor() ERC721("Ozcar Appraisal Certificate", "OZCERT") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
    }

    /**
     * @dev Mints an appraisal NFT for a vehicle.
     * @param _to Recipient address (vehicle owner)
     * @param _vin Vehicle Identification Number
     * @param _value Appraised value in cents
     * @param _score Trust score (0-100)
     * @param _tokenURI Metadata URI (IPFS link to full AI report)
     * @param _modelVersion Version of the AI model used
     */
    function mintAppraisal(
        address _to,
        string memory _vin,
        uint256 _value,
        uint8 _score,
        string memory _tokenURI,
        string memory _modelVersion
    ) external onlyRole(MINTER_ROLE) returns (uint256) {
        uint256 tokenId = _nextTokenId++;
        _safeMint(_to, tokenId);
        _setTokenURI(tokenId, _tokenURI);

        appraisals[tokenId] = AppraisalData({
            vin: _vin,
            appraisedValue: _value,
            trustScore: _score,
            timestamp: block.timestamp,
            modelVersion: _modelVersion
        });

        emit AppraisalMinted(tokenId, _vin, _value);
        return tokenId;
    }

    // --- View Functions ---

    function getAppraisal(uint256 _tokenId) external view returns (AppraisalData memory) {
        require(_ownerOf(_tokenId) != address(0), "Appraisal does not exist");
        return appraisals[_tokenId];
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721URIStorage, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
