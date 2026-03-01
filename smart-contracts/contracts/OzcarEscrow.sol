// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";

/**
 * @title OzcarEscrow
 * @dev Secure escrow contract with Security Sentinel integration and Circuit Breaker.
 */
contract OzcarEscrow is AccessControl, Pausable {
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    bytes32 public constant FUNDER_ROLE = keccak256("FUNDER_ROLE");

    IERC20 public paymentToken;

    enum State { AWAITING_DEPOSIT, AWAITING_DELIVERY, COMPLETE, DISPUTE, REFUNDED }

    struct Escrow {
        uint256 escrowId;
        address buyer;
        address seller;
        address nftContract;
        uint256 tokenId;
        uint256 price;
        State state;
        bool isFunded;
        bool isFrozen; 
    }

    uint256 public nextEscrowId;
    mapping(uint256 => Escrow) public escrows;

    event EscrowCreated(uint256 indexed escrowId, address buyer, address seller, uint256 tokenId, uint256 price);
    event Deposited(uint256 indexed escrowId, uint256 amount);
    event DeliveryConfirmed(uint256 indexed escrowId);
    event FundsReleased(uint256 indexed escrowId, address seller, uint256 amount);
    event DisputeRaised(uint256 indexed escrowId);
    event EscrowFrozen(uint256 indexed escrowId, string reason);
    event EscrowUnfrozen(uint256 indexed escrowId);

    constructor(address initialAdmin, address _paymentToken) {
        _grantRole(DEFAULT_ADMIN_ROLE, initialAdmin);
        _grantRole(ADMIN_ROLE, initialAdmin);
        paymentToken = IERC20(_paymentToken);
    }

    modifier onlyBuyer(uint256 _escrowId) {
        require(msg.sender == escrows[_escrowId].buyer, "Only buyer can call this");
        _;
    }

    modifier onlySeller(uint256 _escrowId) {
        require(msg.sender == escrows[_escrowId].seller, "Only seller can call this");
        _;
    }

    modifier inState(uint256 _escrowId, State _state) {
        require(escrows[_escrowId].state == _state, "Invalid state");
        _;
    }

    modifier notFrozen(uint256 _escrowId) {
        require(!escrows[_escrowId].isFrozen, "Escrow is frozen by security sentinel");
        _;
    }

    function createEscrow(
        address _nftContract,
        uint256 _tokenId,
        address _buyer,
        uint256 _price
    ) external whenNotPaused returns (uint256) {
        IERC721 nft = IERC721(_nftContract);
        require(nft.ownerOf(_tokenId) == msg.sender, "Seller must own the vehicle");

        uint256 escrowId = nextEscrowId++;
        escrows[escrowId] = Escrow({
            escrowId: escrowId,
            buyer: _buyer,
            seller: msg.sender,
            nftContract: _nftContract,
            tokenId: _tokenId,
            price: _price,
            state: State.AWAITING_DEPOSIT,
            isFunded: false,
            isFrozen: false
        });

        emit EscrowCreated(escrowId, _buyer, msg.sender, _tokenId, _price);
        return escrowId;
    }

    /**
     * @dev Deposit funds into escrow.
     */
    function deposit(uint256 _escrowId) external whenNotPaused inState(_escrowId, State.AWAITING_DEPOSIT) notFrozen(_escrowId) {
        Escrow storage escrow = escrows[_escrowId];
        
        if (!hasRole(FUNDER_ROLE, msg.sender)) {
            if (escrow.buyer != address(0)) {
                require(msg.sender == escrow.buyer, "Only buyer or funder can deposit");
            } else {
                escrow.buyer = msg.sender;
            }
        }

        require(paymentToken.transferFrom(msg.sender, address(this), escrow.price), "Payment failed");

        escrow.isFunded = true;
        escrow.state = State.AWAITING_DELIVERY;
        
        emit Deposited(_escrowId, escrow.price);
    }

    function confirmDelivery(uint256 _escrowId) 
        external 
        whenNotPaused
        onlyBuyer(_escrowId) 
        inState(_escrowId, State.AWAITING_DELIVERY) 
        notFrozen(_escrowId) 
    {
        Escrow storage escrow = escrows[_escrowId];
        
        escrow.state = State.COMPLETE;
        
        require(paymentToken.transfer(escrow.seller, escrow.price), "Token transfer failed");

        IERC721(escrow.nftContract).transferFrom(escrow.seller, escrow.buyer, escrow.tokenId);

        emit DeliveryConfirmed(_escrowId);
        emit FundsReleased(_escrowId, escrow.seller, escrow.price);
    }

    /**
     * @dev Security function to freeze an escrow.
     */
    function freezeEscrow(uint256 _escrowId, string calldata _reason) external onlyRole(ADMIN_ROLE) {
        escrows[_escrowId].isFrozen = true;
        emit EscrowFrozen(_escrowId, _reason);
    }

    /**
     * @dev Admin function to unfreeze an escrow.
     */
    function unfreezeEscrow(uint256 _escrowId) external onlyRole(ADMIN_ROLE) {
        escrows[_escrowId].isFrozen = false;
        emit EscrowUnfrozen(_escrowId);
    }

    /**
     * @dev Global Circuit Breaker: Pause all escrow operations.
     */
    function pause() external onlyRole(ADMIN_ROLE) {
        _pause();
    }

    function unpause() external onlyRole(ADMIN_ROLE) {
        _unpause();
    }

    function raiseDispute(uint256 _escrowId) external whenNotPaused inState(_escrowId, State.AWAITING_DELIVERY) notFrozen(_escrowId) {
        require(msg.sender == escrows[_escrowId].buyer || msg.sender == escrows[_escrowId].seller, "Only participants can dispute");
        escrows[_escrowId].state = State.DISPUTE;
        emit DisputeRaised(_escrowId);
    }

    function resolveDispute(uint256 _escrowId, bool refundBuyer) 
        external 
        whenNotPaused
        onlyRole(ADMIN_ROLE) 
        inState(_escrowId, State.DISPUTE) 
        notFrozen(_escrowId) 
    {
        Escrow storage escrow = escrows[_escrowId];
        
        if (refundBuyer) {
            escrow.state = State.REFUNDED;
            require(paymentToken.transfer(escrow.buyer, escrow.price), "Refund transfer failed");
        } else {
            escrow.state = State.COMPLETE;
            require(paymentToken.transfer(escrow.seller, escrow.price), "Seller transfer failed");
            IERC721(escrow.nftContract).transferFrom(escrow.seller, escrow.buyer, escrow.tokenId);
        }
    }
}
