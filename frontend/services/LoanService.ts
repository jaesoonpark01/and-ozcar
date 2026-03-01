import { ethers } from 'ethers';
import OzcarAppraisalNFTABI from '../contracts/OzcarAppraisalNFTABI.json';
import OzcarLoanDisbursementABI from '../contracts/OzcarLoanDisbursementABI.json';

const APPRAISAL_NFT_ADDRESS = "0x959922bE3CAee4b8Cd9a407cc3ac1C251C2007B1";
const LOAN_DISBURSEMENT_ADDRESS = "0x9A9f2CCfdE556A7E9Ff0848998Aa4a0CFD8863AE";

export interface AppraisalData {
    vin: string;
    appraisedValue: number;
    trustScore: number;
    timestamp: number;
    modelVersion: string;
}

export class LoanService {
    /**
     * Mint an Appraisal NFT for a vehicle (Lender/AI Sentinel only)
     */
    static async mintAppraisalNFT(
        signer: ethers.Signer,
        recipient: string,
        vin: string,
        valueCents: number,
        trustScore: number,
        reportUri: string,
        modelVersion: string
    ): Promise<string> {
        const contract = new ethers.Contract(
            APPRAISAL_NFT_ADDRESS,
            OzcarAppraisalNFTABI,
            signer
        );

        const tx = await contract.mintAppraisal(
            recipient,
            vin,
            valueCents,
            trustScore,
            reportUri,
            modelVersion
        );

        const receipt = await tx.wait();
        console.log(`[LoanService] Appraisal NFT minted: ${receipt.hash}`);
        return receipt.hash;
    }

    /**
     * Approve a loan for a borrower
     */
    static async approveLoan(
        signer: ethers.Signer,
        borrower: string,
        amountCents: number,
        appraisalTokenId: number
    ): Promise<number> {
        const contract = new ethers.Contract(
            LOAN_DISBURSEMENT_ADDRESS,
            OzcarLoanDisbursementABI,
            signer
        );

        const tx = await contract.approveLoan(borrower, amountCents, appraisalTokenId);
        const receipt = await tx.wait();

        // Extract loanId from events (Simplified for MVP)
        // In real app, we'd parse the event logs correctly
        return 0; // Placeholder for actual loanId
    }

    /**
     * Disburse loan directly to Escrow
     */
    static async disburseLoan(
        signer: ethers.Signer,
        loanId: number,
        escrowId: number
    ): Promise<string> {
        const contract = new ethers.Contract(
            LOAN_DISBURSEMENT_ADDRESS,
            OzcarLoanDisbursementABI,
            signer
        );

        const tx = await contract.disburseToEscrow(loanId, escrowId);
        const receipt = await tx.wait();

        console.log(`[LoanService] Loan disbursed to Escrow ${escrowId}: ${receipt.hash}`);
        return receipt.hash;
    }

    /**
     * Fetch Appraisal data for a token
     */
    static async getAppraisal(provider: ethers.Provider, tokenId: number): Promise<AppraisalData> {
        const contract = new ethers.Contract(
            APPRAISAL_NFT_ADDRESS,
            OzcarAppraisalNFTABI,
            provider
        );

        const data = await contract.getAppraisal(tokenId);
        return {
            vin: data.vin,
            appraisedValue: Number(data.appraisedValue),
            trustScore: Number(data.trustScore),
            timestamp: Number(data.timestamp),
            modelVersion: data.modelVersion
        };
    }
}
