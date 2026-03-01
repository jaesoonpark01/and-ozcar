// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface IOzcarEscrow {
    function deposit(uint256 _escrowId) external;
    function escrows(uint256 _escrowId) external view returns (
        uint256 escrowId,
        address buyer,
        address seller,
        address nftContract,
        uint256 tokenId,
        uint256 price,
        uint8 state,
        bool isFunded
    );
}

/**
 * @title OzcarLoanDisbursement
 * @dev Manages the approval and direct disbursement of loans for vehicle purchases.
 *      Ensures funds go directly to the transaction escrow.
 */
contract OzcarLoanDisbursement is AccessControl {
    bytes32 public constant LENDER_ROLE = keccak256("LENDER_ROLE");
    
    IERC20 public paymentToken;
    address public escrowContract;

    struct Loan {
        uint256 loanId;
        address borrower;
        uint256 amount;
        uint256 appraisalTokenId;
        bool disbursed;
        uint256 escrowId;
    }

    uint256 private _nextLoanId;
    mapping(uint256 => Loan) public loans;
    mapping(uint256 => uint256) public escrowToLoan; // escrowId => loanId

    event LoanApproved(uint256 indexed loanId, address indexed borrower, uint256 amount);
    event LoanDisbursed(uint256 indexed loanId, uint256 indexed escrowId);

    constructor(address _paymentToken, address _escrowContract) {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        paymentToken = IERC20(_paymentToken);
        escrowContract = _escrowContract;
    }

    /**
     * @dev Approves a loan for a buyer.
     */
    function approveLoan(
        address _borrower,
        uint256 _amount,
        uint256 _appraisalTokenId
    ) external onlyRole(LENDER_ROLE) returns (uint256) {
        uint256 loanId = _nextLoanId++;
        loans[loanId] = Loan({
            loanId: loanId,
            borrower: _borrower,
            amount: _amount,
            appraisalTokenId: _appraisalTokenId,
            disbursed: false,
            escrowId: 0
        });

        emit LoanApproved(loanId, _borrower, _amount);
        return loanId;
    }

    /**
     * @dev Disburses the loan directly to the Escrow contract.
     *      The loan amount must match the escrow price or be sufficient.
     */
    function disburseToEscrow(uint256 _loanId, uint256 _escrowId) external onlyRole(LENDER_ROLE) {
        Loan storage loan = loans[_loanId];
        require(!loan.disbursed, "Loan already disbursed");
        
        IOzcarEscrow escrow = IOzcarEscrow(escrowContract);
        (,,,,, uint256 price,,) = escrow.escrows(_escrowId);
        
        require(loan.amount >= price, "Loan insufficient for transaction");

        loan.disbursed = true;
        loan.escrowId = _escrowId;
        escrowToLoan[_escrowId] = _loanId;

        // 1. Approve Escrow to take tokens from this contract
        require(paymentToken.approve(escrowContract, price), "Approval failed");

        // 2. Trigger deposit in Escrow
        // Note: This requires OzcarEscrow to be updated to allow this contract as a funder
        // or to allow any contract to deposit if it has approval.
        escrow.deposit(_escrowId);

        emit LoanDisbursed(_loanId, _escrowId);
    }

    /**
     * @dev Admin function to update escrow address if needed.
     */
    function updateEscrow(address _newEscrow) external onlyRole(DEFAULT_ADMIN_ROLE) {
        escrowContract = _newEscrow;
    }
}
