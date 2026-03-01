
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title OzcarTradeInSettlement
 * @dev Escrow contract for secure Vehicle Trade-In settlements.
 * Holds funds until off-chain inspection and AI verification are confirmed.
 */
contract OzcarTradeInSettlement is Ownable, ReentrancyGuard {
    
    enum State { Created, Locked, InspectionPassed, Completed, Refunded }

    struct Trade {
        uint256 tradeId;
        address seller;
        address buyer;
        address tokenDetails; // Address of Stablecoin (USDC) or address(0) for Native
        uint256 amount;
        uint256 validUntil;
        State state;
        string vehicleVin;
        string inspectionIpfsHash;
    }

    mapping(uint256 => Trade) public trades;
    uint256 public tradeCounter;

    // Events
    event TradeCreated(uint256 indexed tradeId, address indexed seller, address indexed buyer, uint256 amount);
    event FundsLocked(uint256 indexed tradeId, uint256 amount);
    event InspectionVerified(uint256 indexed tradeId, string ipfsHash);
    event TradeCompleted(uint256 indexed tradeId);
    event TradeRefunded(uint256 indexed tradeId);

    constructor(address initialOwner) Ownable(initialOwner) {}

    /**
     * @dev Create a new trade agreement.
     * @param _seller Address of the vehicle seller.
     * @param _token Address of payment token (USDC/USDT). Use address(0) for native MATIC.
     * @param _amount Amount to be paid.
     * @param _vehicleVin VIN of the vehicle.
     * @param _durationSeconds How long the trade is valid before a refund can be claimed.
     */
    function createTrade(
        address _seller, 
        address _token, 
        uint256 _amount, 
        string memory _vehicleVin,
        uint256 _durationSeconds
    ) external returns (uint256) {
        require(_seller != address(0), "Invalid seller");
        require(_amount > 0, "Invalid amount");

        uint256 tradeId = ++tradeCounter;
        
        trades[tradeId] = Trade({
            tradeId: tradeId,
            seller: _seller,
            buyer: msg.sender,
            tokenDetails: _token,
            amount: _amount,
            validUntil: block.timestamp + _durationSeconds,
            state: State.Created,
            vehicleVin: _vehicleVin,
            inspectionIpfsHash: ""
        });

        emit TradeCreated(tradeId, _seller, msg.sender, _amount);
        return tradeId;
    }

    /**
     * @dev Buyer deposits funds into the escrow.
     */
    function depositFunds(uint256 _tradeId) external payable nonReentrant {
        Trade storage trade = trades[_tradeId];
        require(trade.state == State.Created, "Invalid state");
        require(msg.sender == trade.buyer, "Only buyer can deposit");

        if (trade.tokenDetails == address(0)) {
            require(msg.value == trade.amount, "Incorrect ETH amount");
        } else {
            IERC20 token = IERC20(trade.tokenDetails);
            require(token.transferFrom(msg.sender, address(this), trade.amount), "Token transfer failed");
        }

        trade.state = State.Locked;
        emit FundsLocked(_tradeId, trade.amount);
    }

    /**
     * @dev Operator (App Backend/AI Sentinel) confirms vehicle inspection passed.
     */
    function confirmInspection(uint256 _tradeId, string memory _ipfsHash) external onlyOwner {
        Trade storage trade = trades[_tradeId];
        require(trade.state == State.Locked, "Funds not locked");
        
        trade.inspectionIpfsHash = _ipfsHash;
        trade.state = State.InspectionPassed;
        
        emit InspectionVerified(_tradeId, _ipfsHash);
    }

    /**
     * @dev Finalize trade and release funds to seller.
     * Can be called by Owner (Auto-settle) or Buyer (Manual confirm).
     */
    function completeTrade(uint256 _tradeId) external nonReentrant {
        Trade storage trade = trades[_tradeId];
        require(trade.state == State.InspectionPassed, "Inspection not passed");
        require(msg.sender == owner() || msg.sender == trade.buyer, "Unauthorized");

        trade.state = State.Completed;

        uint256 fee = (trade.amount * 50) / 10000; // 0.5% Platform Fee
        uint256 sellerAmount = trade.amount - fee;

        // Transfer Funds
        if (trade.tokenDetails == address(0)) {
            (bool success, ) = payable(trade.seller).call{value: sellerAmount}("");
            require(success, "Transfer to seller failed");
            (bool feeSuccess, ) = payable(owner()).call{value: fee}("");
            require(feeSuccess, "Fee transfer failed");
        } else {
            IERC20 token = IERC20(trade.tokenDetails);
            require(token.transfer(trade.seller, sellerAmount), "Token transfer to seller failed");
            require(token.transfer(owner(), fee), "Fee transfer failed");
        }

        emit TradeCompleted(_tradeId);
    }

    /**
     * @dev Refund buyer if inspection fails or time expires.
     */
    function refundTrade(uint256 _tradeId) external nonReentrant {
        Trade storage trade = trades[_tradeId];
        require(trade.state == State.Locked, "Funds not locked");
        
        // Refund allowed if:
        // 1. Owner (Admin/AI) cancels due to failed inspection.
        // 2. Time expired.
        bool isExpired = block.timestamp > trade.validUntil;
        require(msg.sender == owner() || (msg.sender == trade.buyer && isExpired), "Refund not available");

        trade.state = State.Refunded;

        if (trade.tokenDetails == address(0)) {
            (bool success, ) = payable(trade.buyer).call{value: trade.amount}("");
            require(success, "Refund failed");
        } else {
            IERC20 token = IERC20(trade.tokenDetails);
            require(token.transfer(trade.buyer, trade.amount), "Token refund failed");
        }

        emit TradeRefunded(_tradeId);
    }
}
