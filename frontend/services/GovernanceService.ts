// services/GovernanceService.ts
import { ethers, Contract } from 'ethers';
import OzcarGovernanceABI from '../src/contracts/abis/OzcarGovernance.json';

const GOVERNANCE_ADDRESS = process.env.NEXT_PUBLIC_GOVERNANCE_ADDRESS || "0x..."; // Update after deployment

export enum JuryTier {
    CITIZEN = 0,
    EXPERT = 1,
    GRAND_JURY = 2
}

export enum CaseType {
    MAINTENANCE_VERIFICATION = 0,
    SELLER_DISPUTE = 1,
    INSURANCE_CLAIM = 2,
    WARRANTY_DISPUTE = 3,
    PRICE_MANIPULATION = 4,
    VEHICLE_CONDITION_DISPUTE = 5,
    OIP = 6 // Ozcar Improvement Proposal
}

export enum CaseStatus {
    PENDING = 0,
    VALIDATED = 1,
    REJECTED = 2,
    DISPUTED = 3
}

export interface Juror {
    wallet: string;
    tier: JuryTier;
    votingPower: number;
    accuracy: number;
    totalVotes: number;
    correctVotes: number;
    ownedVehicles: number;
    stakingAmount: string;
    isActive: boolean;
    isTrial: boolean;
}

export interface Case {
    id: string;
    caseType: CaseType;
    submitter: string;
    ipfsHash: string;
    createdAt: number;
    deadline: number;
    status: CaseStatus;
    finalized: boolean;
}

export interface Vote {
    juror: string;
    tier: JuryTier;
    decision: boolean;
    votingPower: number;
    timestamp: number;
}

export class GovernanceService {
    private contract: Contract;
    private signer: ethers.Signer;

    constructor(signer: ethers.Signer) {
        this.signer = signer;
        this.contract = new ethers.Contract(
            GOVERNANCE_ADDRESS,
            OzcarGovernanceABI.abi,
            signer
        );
    }

    /**
     * Register as a juror
     */
    async registerAsJuror(ownedVehicles: number): Promise<ethers.ContractTransactionResponse> {
        const tx = await this.contract.registerAsJuror(ownedVehicles);
        await tx.wait();
        return tx;
    }

    /**
     * Upgrade juror tier
     */
    async upgradeTier(newTier: JuryTier): Promise<ethers.ContractTransactionResponse> {
        const tx = await this.contract.upgradeTier(newTier);
        await tx.wait();
        return tx;
    }

    /**
     * Submit a new case
     */
    async submitCase(
        caseType: CaseType,
        ipfsHash: string
    ): Promise<{ tx: ethers.ContractTransactionResponse; caseId: string }> {
        const tx = await this.contract.submitCase(caseType, ipfsHash);
        const receipt = await tx.wait();

        // Extract caseId from events
        const event = receipt.logs.find((log: any) =>
            log.fragment?.name === 'CaseSubmitted'
        );
        const caseId = event?.args?.caseId || '';

        return { tx, caseId };
    }

    /**
     * Vote on a case
     */
    async vote(caseId: string, decision: boolean): Promise<ethers.ContractTransactionResponse> {
        const tx = await this.contract.vote(caseId, decision);
        await tx.wait();
        return tx;
    }

    /**
     * Finalize a case
     */
    async finalizeCase(caseId: string): Promise<ethers.ContractTransactionResponse> {
        const tx = await this.contract.finalizeCase(caseId);
        await tx.wait();
        return tx;
    }

    /**
     * Get pending cases
     */
    async getPendingCases(): Promise<string[]> {
        return await this.contract.getPendingCases();
    }

    /**
     * Get case details
     */
    async getCase(caseId: string): Promise<Case> {
        const caseData = await this.contract.cases(caseId);
        return {
            id: caseData.id,
            caseType: caseData.caseType,
            submitter: caseData.submitter,
            ipfsHash: caseData.ipfsHash,
            createdAt: Number(caseData.createdAt),
            deadline: Number(caseData.deadline),
            status: caseData.status,
            finalized: caseData.finalized
        };
    }

    /**
     * Get juror stats with resilient fallback
     */
    async getJurorStats(address: string): Promise<Juror> {
        try {
            const stats = await this.contract.getJurorStats(address);
            return {
                wallet: address,
                tier: stats.tier,
                votingPower: Number(stats.votingPower),
                accuracy: Number(stats.accuracy),
                totalVotes: Number(stats.totalVotes),
                correctVotes: Number(stats.correctVotes),
                ownedVehicles: 0,
                stakingAmount: stats.stakingAmount?.toString() || '0',
                isActive: stats.isActive || false,
                isTrial: stats.isTrial || false
            };
        } catch (error) {
            console.warn('Failed to fetch from contract, returning guest profile:', error);
            // Default guest/trial profile fallback
            return {
                wallet: address,
                tier: JuryTier.CITIZEN,
                votingPower: 1.0,
                accuracy: 0,
                totalVotes: 0,
                correctVotes: 0,
                ownedVehicles: 0,
                stakingAmount: '0',
                isActive: false,
                isTrial: true // Assume trial for UI entry
            };
        }
    }

    /**
     * Get votes for a case
     */
    async getCaseVotes(caseId: string): Promise<Vote[]> {
        const votes = await this.contract.getCaseVotes(caseId);
        return votes.map((vote: any) => ({
            juror: vote.juror,
            tier: vote.tier,
            decision: vote.decision,
            votingPower: Number(vote.votingPower),
            timestamp: Number(vote.timestamp)
        }));
    }

    /**
     * Check if user has voted on a case
     */
    async hasVoted(caseId: string, address: string): Promise<boolean> {
        return await this.contract.hasVoted(caseId, address);
    }

    /**
     * Get juror eligibility for tier upgrade
     */
    canUpgradeToExpert(juror: Juror): boolean {
        return juror.ownedVehicles >= 2 || juror.accuracy >= 85;
    }

    canUpgradeToGrandJury(juror: Juror): boolean {
        return juror.ownedVehicles >= 3 || juror.accuracy >= 95;
    }

    /**
     * Get tier name
     */
    getTierName(tier: JuryTier): string {
        switch (tier) {
            case JuryTier.CITIZEN:
                return "Citizen Jury";
            case JuryTier.EXPERT:
                return "Expert Jury";
            case JuryTier.GRAND_JURY:
                return "Grand Jury";
            default:
                return "Unknown";
        }
    }

    /**
     * Get case type name
     */
    getCaseTypeName(caseType: CaseType): string {
        switch (caseType) {
            case CaseType.MAINTENANCE_VERIFICATION:
                return "정비 기록 검증";
            case CaseType.SELLER_DISPUTE:
                return "판매자-구매자 분쟁";
            case CaseType.INSURANCE_CLAIM:
                return "보험 청구 검증";
            case CaseType.WARRANTY_DISPUTE:
                return "보증 분쟁";
            case CaseType.PRICE_MANIPULATION:
                return "가격 조작 의심";
            case CaseType.VEHICLE_CONDITION_DISPUTE:
                return "차량 상태 분쟁";
            case CaseType.OIP:
                return "Ozcar 개선 제안 (OIP)";
            default:
                return "기타";
        }
    }

    /**
     * Get status badge color
     */
    getStatusColor(status: CaseStatus): string {
        switch (status) {
            case CaseStatus.PENDING:
                return "bg-yellow-500/10 text-yellow-600";
            case CaseStatus.VALIDATED:
                return "bg-green-500/10 text-green-600";
            case CaseStatus.REJECTED:
                return "bg-red-500/10 text-red-600";
            case CaseStatus.DISPUTED:
                return "bg-orange-500/10 text-orange-600";
            default:
                return "bg-gray-500/10 text-gray-600";
        }
    }
}

export default GovernanceService;
