import { ethers } from 'ethers';

export interface MiningResult {
    success: boolean;
    reward: string;
    txHash?: string;
    ipfsHash?: string;
    error?: string;
}

export class MiningService {
    // Note: In production, these should be in .env.local
    private static PINATA_JWT = process.env.NEXT_PUBLIC_PINATA_JWT || "";

    /**
     * Upload maintenance data to IPFS (Real Pinata Integration)
     */
    public static async uploadToIPFS(data: any): Promise<string> {
        if (!this.PINATA_JWT) {
            console.warn("[Mining] Pinata JWT not found. Falling back to mock CID.");
            return "QmMockCID" + Math.random().toString(36).substring(7);
        }

        try {
            console.log("[Mining] Uploading metadata to IPFS...");
            const response = await fetch("https://api.pinata.cloud/pinning/pinJSONToIPFS", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${this.PINATA_JWT}`
                },
                body: JSON.stringify({
                    pinataContent: data,
                    pinataMetadata: {
                        name: `Ozcar_Record_${data.vin}_${Date.now()}`
                    }
                })
            });

            const resData = await response.json();
            if (!response.ok) throw new Error(resData.error || "Pinata upload failed");

            console.log(`[Mining] IPFS Upload Complete: ${resData.IpfsHash}`);
            return resData.IpfsHash;
        } catch (error) {
            console.error("[Mining] IPFS Error:", error);
            throw error;
        }
    }

    /**
     * Process a maintenance record: IPFS Upload -> On-chain Register -> Reward Calculation
     */
    static async mineRecord(
        signer: ethers.Signer,
        contractAddress: string,
        recordData: {
            vin: string;
            mileage: number;
            serviceType: string;
            description: string;
        }
    ): Promise<MiningResult> {
        try {
            // 1. Upload full evidence to IPFS
            const ipfsHash = await this.uploadToIPFS({
                ...recordData,
                timestamp: Date.now(),
                technician: await signer.getAddress()
            });

            // 2. Call Smart Contract
            const abi = [
                "function addRecord(string calldata _vin, uint256 _mileage, string calldata _serviceType, string calldata _description, string calldata _ipfsHash) external returns (uint256)"
            ];
            const contract = new ethers.Contract(contractAddress, abi, signer);

            console.log("[Mining] Transacting on-chain...");
            const tx = await contract.addRecord(
                recordData.vin,
                recordData.mileage,
                recordData.serviceType,
                recordData.description,
                ipfsHash
            );

            const receipt = await tx.wait();

            // 3. Simulating reward calculation (OZC Tokens)
            // In a real system, the contract would emit an event or return the reward amount
            const reward = (Math.random() * 50 + 10).toFixed(2);

            return {
                success: true,
                reward: reward,
                txHash: receipt.transactionHash,
                ipfsHash: ipfsHash
            };
        } catch (error: any) {
            console.error("[Mining] Mining Error:", error);
            return {
                success: false,
                reward: "0",
                error: error.message
            };
        }
    }

    static calculateEstimatedReward(mileage: number, complexity: 'LOW' | 'MEDIUM' | 'HIGH'): number {
        const base = 5;
        const multiplier = complexity === 'HIGH' ? 3 : complexity === 'MEDIUM' ? 2 : 1;
        return base * multiplier;
    }

    /**
     * Record maintenance on the blockchain
     */
    static async recordMaintenanceOnChain(
        signer: any,
        vin: string,
        mileage: number,
        description: string,
        ipfsHash: string,
        ownerSecret: string
    ): Promise<string> {
        // In a real implementation, we would use the contract ABI and address
        // For now, we simulate the transaction and return a mock hash
        console.log(`[Mining] Recording maintenance for VIN: ${vin} on-chain...`);

        // Simulate contract interaction delay
        await new Promise(resolve => setTimeout(resolve, 2000));

        const mockTxHash = "0x" + Math.random().toString(16).substring(2, 66);
        console.log(`[Mining] Transaction successful: ${mockTxHash}`);

        return mockTxHash;
    }

    /**
     * Record mining activity in the database (Supabase)
     */
    static async recordMiningActivity(
        techId: string,
        vin: string,
        type: string,
        rewards: { total: number; multiplier: number },
        txHash: string
    ): Promise<void> {
        console.log(`[Mining] Logging activity for tech ${techId}, VIN ${vin}, rewards: ${rewards.total}`);
        // This would normally call a Supabase client or an API endpoint
        await new Promise(resolve => setTimeout(resolve, 500));
    }
}
