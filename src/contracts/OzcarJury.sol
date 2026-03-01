// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title OzcarJury
 * @dev Ozcar AI Sentinel 적발 거건에 대해 DAO 배심원들의 판결을 집행하는 컨트랙트
 */
contract OzcarJury is Ownable {
    IERC20 public ozcarToken;

    enum Verdict { PENDING, INNOCENT, GUILTY, INCONCLUSIVE }

    struct Case {
        uint256 caseId;
        address defendant;
        uint256 frozenAmount;
        uint256 voteDeadline;
        uint256 innocentVotes;
        uint256 guiltyVotes;
        Verdict finalVerdict;
        bool isResolved;
    }

    mapping(uint256 => Case) public cases;
    mapping(uint256 => mapping(address => bool)) public hasVoted;

    uint256 public caseCounter;
    uint256 public constant VOTE_DURATION = 48 hours;
    uint256 public juryRewardAmount = 50 * 10**18; // 50 OZC
    address public treasury;

    event CaseCreated(uint256 indexed caseId, address indexed defendant, uint256 amount);
    event Voted(uint256 indexed caseId, address indexed juror, Verdict vote);
    event CaseResolved(uint256 indexed caseId, Verdict verdict, uint256 slashedAmount);

    constructor(address _token, address _treasury) Ownable(msg.sender) {
        ozcarToken = IERC20(_token);
        treasury = _treasury;
    }

    /**
     * @dev AI Sentinel이 부정행위 감지 시 OZC를 에스크로하고 케이스 생성 (관리자/Oracle 호출용)
     */
    function createCase(address _defendant, uint256 _amount) external onlyOwner {
        require(ozcarToken.transferFrom(_defendant, address(this), _amount), "Transfer failed");

        caseCounter++;
        cases[caseCounter] = Case({
            caseId: caseCounter,
            defendant: _defendant,
            frozenAmount: _amount,
            voteDeadline: block.timestamp + VOTE_DURATION,
            innocentVotes: 0,
            guiltyVotes: 0,
            finalVerdict: Verdict.PENDING,
            isResolved: false
        });

        emit CaseCreated(caseCounter, _defendant, _amount);
    }

    /**
     * @dev 다이아몬드 파운더가 투표
     */
    function vote(uint256 _caseId, Verdict _verdict) external {
        require(_verdict == Verdict.INNOCENT || _verdict == Verdict.GUILTY, "Invalid verdict");
        require(block.timestamp < cases[_caseId].voteDeadline, "Voting ended");
        require(!hasVoted[_caseId][msg.sender], "Already voted");
        // Token requirement checks (e.g. Diamond NFT) would go here

        hasVoted[_caseId][msg.sender] = true;

        if (_verdict == Verdict.INNOCENT) {
            cases[_caseId].innocentVotes++;
        } else {
            cases[_caseId].guiltyVotes++;
        }

        // Jury receives instant reward (simplified for example)
        ozcarToken.transfer(msg.sender, juryRewardAmount);

        emit Voted(_caseId, msg.sender, _verdict);
    }

    /**
     * @dev 투표 마감 후 판결 확정 및 자산 집행
     */
    function resolveCase(uint256 _caseId) external {
        Case storage c = cases[_caseId];
        require(!c.isResolved, "Already resolved");
        require(block.timestamp >= c.voteDeadline, "Voting still active");

        c.isResolved = true;

        if (c.innocentVotes > c.guiltyVotes) {
            c.finalVerdict = Verdict.INNOCENT;
            // Refund the defendant
            require(ozcarToken.transfer(c.defendant, c.frozenAmount), "Refund failed");
            
            // False positive compensation (bonus 5%)
            uint256 bonus = (c.frozenAmount * 5) / 100;
            ozcarToken.transferFrom(treasury, c.defendant, bonus);

            emit CaseResolved(_caseId, Verdict.INNOCENT, 0);

        } else if (c.guiltyVotes > c.innocentVotes) {
            c.finalVerdict = Verdict.GUILTY;
            // Slashing: send frozen amount to treasury (burn equivalent)
            require(ozcarToken.transfer(treasury, c.frozenAmount), "Slashing failed");
            
            emit CaseResolved(_caseId, Verdict.GUILTY, c.frozenAmount);

        } else {
            c.finalVerdict = Verdict.INCONCLUSIVE;
            // Refund without bonus, require re-eval
            require(ozcarToken.transfer(c.defendant, c.frozenAmount), "Refund failed");
            
            emit CaseResolved(_caseId, Verdict.INCONCLUSIVE, 0);
        }
    }
}
