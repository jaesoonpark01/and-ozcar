// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/**
 * @title OzcarReputation
 * @dev Manages reputation scores for technicians and sellers.
 * Score Formula: Score=(D×0.4+P×0.2+J×0.1)×0.7+(T_normalized×0.3)
 */
contract OzcarReputation is Ownable {
    IERC20 public ozcToken;

    struct TechStats {
        uint256 consistencyScore; // D (0-100)
        uint256 participationScore; // P (0-100)
        uint256 juryScore; // J (0-100)
        uint256 tokenStake; // T (Raw amount)
        uint256 totalReputation; // Final Score
        bool isBlacklisted;
    }

    mapping(address => TechStats) public technicians;
    uint256 public constant MAX_STAKE_CAP = 10000 ether; // Reduced for demo consistency

    event ReputationUpdated(address indexed technician, uint256 newScore);
    event Slashed(address indexed technician, uint256 severity);
    event Staked(address indexed technician, uint256 amount);
    event Unstaked(address indexed technician, uint256 amount);

    constructor(address initialOwner, address _token) Ownable(initialOwner) {
        ozcToken = IERC20(_token);
    }
    
    function stake(uint256 _amount) external {
        require(_amount > 0, "Amount must be > 0");
        require(ozcToken.transferFrom(msg.sender, address(this), _amount), "Stake transfer failed");
        
        technicians[msg.sender].tokenStake += _amount;
        calculateReputation(msg.sender);
        emit Staked(msg.sender, _amount);
    }

    function unstake(uint256 _amount) external {
        require(technicians[msg.sender].tokenStake >= _amount, "Insufficient stake");
        technicians[msg.sender].tokenStake -= _amount;
        
        require(ozcToken.transfer(msg.sender, _amount), "Unstake transfer failed");
        calculateReputation(msg.sender);
        emit Unstaked(msg.sender, _amount);
    }

    // Only authorized contracts (like Escrow or Maintenance) or Admin can update stats
    modifier onlyAuthorized() {
        // For MVP, owner is authorized. Add role based logic later.
        require(msg.sender == owner(), "Caller is not authorized");
        _;
    }

    function updateStats(
        address _tech,
        uint256 _d,
        uint256 _p,
        uint256 _j,
        uint256 _t
    ) external onlyAuthorized {
        TechStats storage tech = technicians[_tech];
        if (tech.isBlacklisted) return;

        tech.consistencyScore = _d;
        tech.participationScore = _p;
        tech.juryScore = _j;
        tech.tokenStake = _t;

        calculateReputation(_tech);
    }

    function calculateReputation(address _tech) public {
        TechStats storage tech = technicians[_tech];
        
        // (D*0.4 + P*0.2 + J*0.1) * 0.7
        uint256 performancePart = (tech.consistencyScore * 40 + tech.participationScore * 20 + tech.juryScore * 10) / 100;
        // Apply 0.7 Weight
        uint256 w1 = (performancePart * 70) / 100;

        // T_normalized * 0.3
        // Simple normalization: (Stake / MaxCap) * 100. Cap at 100.
        uint256 t_norm = (tech.tokenStake * 100) / MAX_STAKE_CAP;
        if (t_norm > 100) t_norm = 100;
        
        uint256 w2 = (t_norm * 30) / 100;

        tech.totalReputation = w1 + w2;
        emit ReputationUpdated(_tech, tech.totalReputation);
    }

    function slash(address _tech, uint256 _severity) external onlyAuthorized {
        require(_severity <= 100, "Severity > 100");
        TechStats storage tech = technicians[_tech];
        
        // Slash logic: Reduce reputation by severity %
        tech.totalReputation = (tech.totalReputation * (100 - _severity)) / 100;
        
        if (_severity >= 90) {
            tech.isBlacklisted = true;
        }

        emit Slashed(_tech, _severity);
    }
}
