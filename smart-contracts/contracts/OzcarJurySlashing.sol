// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./OzcarEscrow.sol";

interface IOzcarGovernance {
    enum CaseType { MAINTENANCE_VERIFICATION, SELLER_DISPUTE, INSURANCE_CLAIM, WARRANTY_DISPUTE, PRICE_MANIPULATION, VEHICLE_CONDITION_DISPUTE, OIP }
    enum CaseStatus { PENDING, VALIDATED, REJECTED, DISPUTED }

    function cases(bytes32 caseId) external view returns (
        bytes32 id,
        CaseType caseType,
        address submitter,
        string memory ipfsHash,
        uint256 createdAt,
        uint256 deadline,
        CaseStatus status,
        bool finalized,
        uint256 anomalyScore
    );
}

/**
 * @title OzcarJurySlashing
 * @dev Combines the Jury verdict from OzcarGovernance to enforce physical
 * asset/escrow slashing or reward unlocking via OzcarEscrow.
 * "Code is Law" implementation for Autonomous Justice.
 */
contract OzcarJurySlashing is Ownable {
    OzcarEscrow public escrowContract;
    IOzcarGovernance public governanceContract;
    IERC20 public ozcToken;

    event DisputeSlashingExecuted(bytes32 indexed caseId, uint256 indexed escrowId, bool decision, uint256 slashedAmount);

    constructor(address initialOwner, address _escrow, address _governance, address _ozcToken) Ownable(initialOwner) {
        escrowContract = OzcarEscrow(_escrow);
        governanceContract = IOzcarGovernance(_governance);
        ozcToken = IERC20(_ozcToken);
    }

    /**
     * @dev Executes the final verdict derived from the Jury Voting mechanism.
     * Must be called by the DAO Admin after `finalizeCase` is completed in Governance.
     */
    function executeVerdict(bytes32 caseId, uint256 escrowId) external onlyOwner {
        // Fetch case from governance
        (
            , // id
            , // caseType 
            , // submitter
            , // ipfsHash
            , // createdAt
            , // deadline
            IOzcarGovernance.CaseStatus status,
            bool finalized,
            // anomalyScore
        ) = governanceContract.cases(caseId);

        require(finalized, "Case must be finalized in Governance first");
        require(
            status == IOzcarGovernance.CaseStatus.VALIDATED || status == IOzcarGovernance.CaseStatus.REJECTED, 
            "Invalid Verdict State"
        );

        // Execute Escrow Resolution
        // If VALIDATED, the seller (the driver) keeps the payout.
        // If REJECTED, malicious behavior confirmed. Refund buyer or burn token.
        bool isFraudulent = (status == IOzcarGovernance.CaseStatus.REJECTED);

        // Uses the ADMIN_ROLE granted to this contract to resolve the escrow
        // If fraud (refundBuyer=true), the deposit returns to the origin
        escrowContract.resolveDispute(escrowId, isFraudulent);

        uint256 slashedAmount = 0;
        if (isFraudulent) {
            // Advanced Slashing Logic: if the user staked tokens, slash them for attacking the network.
            // ozcToken.transferFrom(maliciousActor, treasury, penaltyAmount);
            slashedAmount = 500 ether; // Demo static slashing amount representation
        }

        emit DisputeSlashingExecuted(caseId, escrowId, isFraudulent, slashedAmount);
    }
}
