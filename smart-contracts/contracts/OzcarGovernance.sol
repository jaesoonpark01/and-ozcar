// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import "./OzcarReputation.sol";

/**
 * @title OzcarGovernance
 * @dev Community-driven governance with 3-tier jury system
 * @notice 70% car owners, 30% technicians participation model
 */
contract OzcarGovernance is Ownable {
    IERC20 public ozcToken;
    OzcarReputation public reputation;
    
    // Enums
    enum JuryTier { CITIZEN, EXPERT, GRAND_JURY }
    enum CaseType { 
        MAINTENANCE_VERIFICATION,
        SELLER_DISPUTE,
        INSURANCE_CLAIM,
        WARRANTY_DISPUTE,
        PRICE_MANIPULATION,
        VEHICLE_CONDITION_DISPUTE,
        OIP // Ozcar Improvement Proposal
    }
    enum CaseStatus { PENDING, VALIDATED, REJECTED, DISPUTED }
    
    // Structs
    struct Juror {
        address wallet;
        JuryTier tier;
        uint256 votingPower;
        uint256 accuracy;           // 0-100
        uint256 totalVotes;
        uint256 correctVotes;
        uint256 ownedVehicles;      // NFT count
        uint256 stakingAmount;
        bool isActive;
        bool isTrial;               // true if registered without staking
        uint256 joinedAt;
    }
    
    struct Case {
        bytes32 id;
        CaseType caseType;
        address submitter;
        string ipfsHash;            // Evidence on IPFS
        uint256 createdAt;
        uint256 deadline;
        CaseStatus status;
        bool finalized;
        uint256 anomalyScore;       // AI Anomaly Score (0-1000)
    }
    
    struct Vote {
        address juror;
        JuryTier tier;
        bool decision;              // true = Valid, false = Invalid
        uint256 votingPower;
        uint256 timestamp;
    }
    
    // State variables
    mapping(address => Juror) public jurors;
    mapping(bytes32 => Case) public cases;
    mapping(bytes32 => Vote[]) public caseVotes;
    mapping(bytes32 => mapping(address => bool)) public hasVoted;
    
    address[] public activeJurors;
    bytes32[] public activeCases;
    
    // Constants (Set to 0 for development)
    uint256 public constant CITIZEN_MIN_STAKE = 0;
    uint256 public constant EXPERT_MIN_STAKE = 0;
    uint256 public constant GRAND_JURY_MIN_STAKE = 0;
    
    uint256 public constant CITIZEN_VOTING_POWER = 1;
    uint256 public constant EXPERT_VOTING_POWER = 3;
    uint256 public constant GRAND_JURY_VOTING_POWER = 5;
    
    uint256 public constant CASE_DURATION = 24 hours;
    uint256 public constant REWARD_POOL_PER_CASE = 1000 ether; // 1000 OZC per case
    
    uint256 public constant ANOMALY_THRESHOLD = 700; // 0.7
    
    // Target ratios (in percentage)
    uint256 public constant TARGET_CITIZEN_RATIO = 70;
    uint256 public constant TARGET_EXPERT_RATIO = 20;
    uint256 public constant TARGET_GRAND_JURY_RATIO = 10;
    
    // Events
    event JurorRegistered(address indexed juror, JuryTier tier);
    event JurorUpgraded(address indexed juror, JuryTier oldTier, JuryTier newTier);
    event CaseSubmitted(bytes32 indexed caseId, CaseType caseType, address indexed submitter);
    event Voted(bytes32 indexed caseId, address indexed juror, bool decision);
    event CaseFinalized(bytes32 indexed caseId, bool finalDecision, uint256 validVotes, uint256 invalidVotes);
    event RewardDistributed(address indexed juror, uint256 amount);
    event AccuracyUpdated(address indexed juror, uint256 newAccuracy);
    event AnomalyDetected(bytes32 indexed caseId, uint256 score);
    
    constructor(address initialOwner, address _ozcToken, address _reputation) Ownable(initialOwner) {
        ozcToken = IERC20(_ozcToken);
        reputation = OzcarReputation(_reputation);
    }
    
    /**
     * @dev Register as a juror (Citizen tier by default)
     * @param _ownedVehicles Number of vehicles owned (NFT count)
     */
    function registerAsJuror(uint256 _ownedVehicles) external {
        require(!jurors[msg.sender].isActive, "Already registered");
        require(_ownedVehicles >= 1, "Must own at least 1 vehicle");
        
        uint256 stakeRequired = CITIZEN_MIN_STAKE;
        bool trial = false;

        // Web2.5 Onboarding: If user owns a vehicle but doesn't have enough tokens, 
        // allow "Trial Member" registration with 0 stake.
        if (ozcToken.balanceOf(msg.sender) < stakeRequired) {
            stakeRequired = 0;
            trial = true;
        }

        if (stakeRequired > 0) {
            require(
                ozcToken.transferFrom(msg.sender, address(this), stakeRequired),
                "Stake transfer failed"
            );
        }
        
        jurors[msg.sender] = Juror({
            wallet: msg.sender,
            tier: JuryTier.CITIZEN,
            votingPower: trial ? 1 : CITIZEN_VOTING_POWER, // Could reduce power for trial
            accuracy: 0,
            totalVotes: 0,
            correctVotes: 0,
            ownedVehicles: _ownedVehicles,
            stakingAmount: stakeRequired,
            isActive: true,
            isTrial: trial,
            joinedAt: block.timestamp
        });
        
        activeJurors.push(msg.sender);
        
        emit JurorRegistered(msg.sender, JuryTier.CITIZEN);
    }

    /**
     * @dev Get dynamic voting power based on reputation
     */
    function getWeightedVotingPower(address _juror) public view returns (uint256) {
        if (!jurors[_juror].isActive) return 0;
        
        (,,,, uint256 score,) = reputation.technicians(_juror);
        uint256 basePower = jurors[_juror].votingPower;
        
        // Weighting: Reputation score (0-100) acts as a multiplier (0.5x to 1.5x)
        uint256 weight = 50 + score; // 50 to 150
        return (basePower * weight) / 100;
    }
    
    /**
     * @dev Upgrade juror tier by staking more tokens
     */
    function upgradeTier(JuryTier _newTier) external {
        Juror storage juror = jurors[msg.sender];
        require(juror.isActive, "Not a juror");
        require(_newTier > juror.tier, "Can only upgrade");
        
        uint256 additionalStake = 0;
        uint256 newVotingPower = 0;
        
        if (_newTier == JuryTier.EXPERT) {
            require(juror.ownedVehicles >= 2 || juror.accuracy >= 85, "Not eligible for Expert");
            additionalStake = EXPERT_MIN_STAKE - juror.stakingAmount;
            newVotingPower = EXPERT_VOTING_POWER;
        } else if (_newTier == JuryTier.GRAND_JURY) {
            require(juror.ownedVehicles >= 3 || juror.accuracy >= 95, "Not eligible for Grand Jury");
            additionalStake = GRAND_JURY_MIN_STAKE - juror.stakingAmount;
            newVotingPower = GRAND_JURY_VOTING_POWER;
        }
        
        if (additionalStake > 0) {
            require(
                ozcToken.transferFrom(msg.sender, address(this), additionalStake),
                "Additional stake transfer failed"
            );
            juror.stakingAmount += additionalStake;
        }
        
        JuryTier oldTier = juror.tier;
        juror.tier = _newTier;
        juror.votingPower = newVotingPower;
        
        emit JurorUpgraded(msg.sender, oldTier, _newTier);
    }
    
    /**
     * @dev Submit a new case for jury review
     * @param _caseType Type of case
     * @param _ipfsHash IPFS hash containing evidence and details
     */
    function submitCase(
        CaseType _caseType,
        string memory _ipfsHash
    ) external returns (bytes32) {
        bytes32 caseId = keccak256(abi.encodePacked(
            msg.sender,
            block.timestamp,
            _ipfsHash
        ));
        
        cases[caseId] = Case({
            id: caseId,
            caseType: _caseType,
            submitter: msg.sender,
            ipfsHash: _ipfsHash,
            createdAt: block.timestamp,
            deadline: block.timestamp + CASE_DURATION,
            status: CaseStatus.PENDING,
            finalized: false,
            anomalyScore: 0
        });
        
        activeCases.push(caseId);
        
        emit CaseSubmitted(caseId, _caseType, msg.sender);
        return caseId;
    }
    
    /**
     * @dev Vote on a case
     * @param _caseId Case ID to vote on
     * @param _decision true = Valid, false = Invalid/Spam
     */
    function vote(bytes32 _caseId, bool _decision) external {
        require(jurors[msg.sender].isActive, "Not an active juror");
        require(!hasVoted[_caseId][msg.sender], "Already voted");
        require(cases[_caseId].status == CaseStatus.PENDING, "Case not pending");
        require(block.timestamp < cases[_caseId].deadline, "Voting ended");
        
        Juror memory juror = jurors[msg.sender];
        uint256 weightedPower = getWeightedVotingPower(msg.sender);
        
        caseVotes[_caseId].push(Vote({
            juror: msg.sender,
            tier: juror.tier,
            decision: _decision,
            votingPower: weightedPower,
            timestamp: block.timestamp
        }));
        
        hasVoted[_caseId][msg.sender] = true;
        jurors[msg.sender].totalVotes++;
        
        emit Voted(_caseId, msg.sender, _decision);
    }
    
    /**
     * @dev Finalize a case and distribute rewards
     * @param _caseId Case ID to finalize
     * @param _anomalyScore AI Anomaly Score (0-1000)
     */
    function finalizeCase(bytes32 _caseId, uint256 _anomalyScore) external onlyOwner {
        Case storage caseData = cases[_caseId];
        require(!caseData.finalized, "Already finalized");
        require(block.timestamp >= caseData.deadline, "Voting period not ended");
        
        caseData.anomalyScore = _anomalyScore;
        
        if (_anomalyScore >= ANOMALY_THRESHOLD) {
            caseData.status = CaseStatus.REJECTED;
            caseData.finalized = true;
            emit AnomalyDetected(_caseId, _anomalyScore);
            return;
        }

        Vote[] memory votes = caseVotes[_caseId];
        require(votes.length > 0, "No votes");
        
        // Calculate weighted votes
        uint256 validVotes = 0;
        uint256 invalidVotes = 0;
        
        for (uint i = 0; i < votes.length; i++) {
            if (votes[i].decision) {
                validVotes += votes[i].votingPower;
            } else {
                invalidVotes += votes[i].votingPower;
            }
        }
        
        // Determine final decision
        bool finalDecision = validVotes > invalidVotes;
        caseData.status = finalDecision ? CaseStatus.VALIDATED : CaseStatus.REJECTED;
        caseData.finalized = true;
        
        // Distribute rewards to correct voters
        _distributeRewards(_caseId, finalDecision, votes);
        
        emit CaseFinalized(_caseId, finalDecision, validVotes, invalidVotes);
    }
    
    /**
     * @dev Internal function to distribute rewards
     */
    function _distributeRewards(
        bytes32 _caseId,
        bool _correctDecision,
        Vote[] memory _votes
    ) internal {
        uint256 correctVotersTotalPower = 0;
        
        // Sum voting power of correct voters for proportional distribution
        for (uint i = 0; i < _votes.length; i++) {
            if (_votes[i].decision == _correctDecision) {
                correctVotersTotalPower += _votes[i].votingPower;
            }
        }
        
        if (correctVotersTotalPower == 0) return;
        
        // Distribute rewards and update accuracy
        for (uint i = 0; i < _votes.length; i++) {
            address jurorAddress = _votes[i].juror;
            
            if (_votes[i].decision == _correctDecision) {
                // Proportional reward based on voting power
                uint256 reward = (REWARD_POOL_PER_CASE * _votes[i].votingPower) / correctVotersTotalPower;
                ozcToken.transfer(jurorAddress, reward);
                jurors[jurorAddress].correctVotes++;
                
                emit RewardDistributed(jurorAddress, reward);
            }
            
            // Update accuracy
            _updateAccuracy(jurorAddress);
        }
    }
    
    /**
     * @dev Update juror accuracy
     */
    function _updateAccuracy(address _juror) internal {
        Juror storage juror = jurors[_juror];
        
        if (juror.totalVotes > 0) {
            juror.accuracy = (juror.correctVotes * 100) / juror.totalVotes;
            emit AccuracyUpdated(_juror, juror.accuracy);
        }
    }
    
    /**
     * @dev Get pending cases
     */
    function getPendingCases() external view returns (bytes32[] memory) {
        uint256 pendingCount = 0;
        
        // Count pending cases
        for (uint i = 0; i < activeCases.length; i++) {
            if (cases[activeCases[i]].status == CaseStatus.PENDING) {
                pendingCount++;
            }
        }
        
        // Create result array
        bytes32[] memory pendingCases = new bytes32[](pendingCount);
        uint256 index = 0;
        
        for (uint i = 0; i < activeCases.length; i++) {
            if (cases[activeCases[i]].status == CaseStatus.PENDING) {
                pendingCases[index] = activeCases[i];
                index++;
            }
        }
        
        return pendingCases;
    }
    
    /**
     * @dev Get juror statistics
     */
    function getJurorStats(address _juror) external view returns (
        JuryTier tier,
        uint256 votingPower,
        uint256 accuracy,
        uint256 totalVotes,
        uint256 correctVotes,
        bool isTrial
    ) {
        Juror memory juror = jurors[_juror];
        return (
            juror.tier,
            getWeightedVotingPower(_juror),
            juror.accuracy,
            juror.totalVotes,
            juror.correctVotes,
            juror.isTrial
        );
    }
    
    /**
     * @dev Get votes for a case
     */
    function getCaseVotes(bytes32 _caseId) external view returns (Vote[] memory) {
        return caseVotes[_caseId];
    }
    
    /**
     * @dev Emergency withdraw (only owner)
     */
    function emergencyWithdraw(uint256 _amount) external onlyOwner {
        ozcToken.transfer(owner(), _amount);
    }
}
