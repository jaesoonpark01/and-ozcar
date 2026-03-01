// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title Escrow
 * @dev Secure stablecoin payment escrow system for Ozcar global transactions.
 */
contract Escrow is Ownable, ReentrancyGuard {
    IERC20 public stablecoin;

    enum State { Created, Deposited, Confirmed, Released, Refunded }

    struct Transaction {
        bytes32 orderId;
        address buyer;
        address seller;
        uint256 amount;
        State state;
    }

    // Mapping from orderId to Transaction
    mapping(bytes32 => Transaction) public transactions;
    
    // Event definitions
    event Deposited(bytes32 indexed orderId, address indexed buyer, uint256 amount);
    event Confirmed(bytes32 indexed orderId);
    event Released(bytes32 indexed orderId, address indexed seller, uint256 amount);
    event Refunded(bytes32 indexed orderId, address indexed buyer, uint256 amount);

    constructor(address _stablecoinAddress) Ownable(msg.sender) {
        stablecoin = IERC20(_stablecoinAddress);
    }

    /**
     * @dev Buyer deposits stablecoins into the escrow.
     * @param _orderId Unique order identifier.
     * @param _seller Address of the seller.
     * @param _amount Amount of stablecoin to deposit.
     */
    function deposit(bytes32 _orderId, address _seller, uint256 _amount) external nonReentrant {
        require(transactions[_orderId].state == State.Created, "Order already exists or invalid state");
        require(_amount > 0, "Amount must be greater than 0");

        // Transfer funds from buyer to this contract
        bool success = stablecoin.transferFrom(msg.sender, address(this), _amount);
        require(success, "Transfer failed");

        transactions[_orderId] = Transaction({
            orderId: _orderId,
            buyer: msg.sender,
            seller: _seller,
            amount: _amount,
            state: State.Deposited
        });

        emit Deposited(_orderId, msg.sender, _amount);
    }

    /**
     * @dev Operator/Admin confirms the deposit (e.g. from fiat on-ramp webhook).
     * This function can also be used if the funds were sent directly to the contract address via a different mechanism
     * but we are tracking it via this contract state.
     * For pure on-chain flows, 'deposit' sets state to Deposited. 
     * If we need an explicit confirmation step from an off-chain oracle/system before release is allowed:
     */
    function confirmDeposit(bytes32 _orderId) external onlyOwner {
        Transaction storage txn = transactions[_orderId];
        require(txn.state == State.Deposited, "Invalid state for confirmation");

        txn.state = State.Confirmed;
        emit Confirmed(_orderId);
    }

    /**
     * @dev Release funds to the seller after verification conditions are met.
     * Can be called by the owner (admin/oracle) or potentially automating via logic.
     */
    function releaseToSeller(bytes32 _orderId) external onlyOwner nonReentrant {
        Transaction storage txn = transactions[_orderId];
        require(txn.state == State.Confirmed || txn.state == State.Deposited, "Invalid state for release");

        uint256 amount = txn.amount;
        txn.state = State.Released;

        bool success = stablecoin.transfer(txn.seller, amount);
        require(success, "Transfer to seller failed");

        emit Released(_orderId, txn.seller, amount);
    }

    /**
     * @dev Refund funds to the buyer if transaction is cancelled.
     */
    function refundToBuyer(bytes32 _orderId) external onlyOwner nonReentrant {
        Transaction storage txn = transactions[_orderId];
        require(txn.state == State.Confirmed || txn.state == State.Deposited, "Invalid state for refund");

        uint256 amount = txn.amount;
        txn.state = State.Refunded;

        bool success = stablecoin.transfer(txn.buyer, amount);
        require(success, "Transfer to buyer failed");

        emit Refunded(_orderId, txn.buyer, amount);
    }
}
