
import { ethers } from 'ethers';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase Client
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Contract Addresses (Localhost / Amoy)
const REWARD_CALCULATOR_ADDRESS = process.env.NEXT_PUBLIC_REWARD_CALCULATOR_ADDRESS || "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";
const ESCROW_ADDRESS = process.env.NEXT_PUBLIC_ESCROW_ADDRESS || "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9";

// Minimal ABIs
const REWARD_ABI = [
    "event RewardDistributed(address indexed technician, uint256 amount, string activityType)"
];

const ESCROW_ABI = [
    "event TradeCreated(uint256 indexed tradeId, address indexed seller, address indexed buyer, uint256 amount)",
    "event FundsLocked(uint256 indexed tradeId, uint256 amount)",
    "event InspectionVerified(uint256 indexed tradeId, string ipfsHash)",
    "event TradeCompleted(uint256 indexed tradeId)",
    "event TradeRefunded(uint256 indexed tradeId)"
];

export class IndexerService {
    private provider: ethers.JsonRpcProvider;
    private rewardContract: ethers.Contract;
    private escrowContract: ethers.Contract;
    private isListening: boolean = false;

    constructor() {
        const rpcUrl = process.env.POLYGON_RPC_URL || "http://127.0.0.1:8545";
        this.provider = new ethers.JsonRpcProvider(rpcUrl);

        this.rewardContract = new ethers.Contract(REWARD_CALCULATOR_ADDRESS, REWARD_ABI, this.provider);
        this.escrowContract = new ethers.Contract(ESCROW_ADDRESS, ESCROW_ABI, this.provider);
    }

    public startListening() {
        if (this.isListening) return;
        console.log("Starting Blockchain Indexer...");

        // 1. Listen for Rewards
        this.rewardContract.on("RewardDistributed", async (technician, amount, activityType, event) => {
            console.log(`[Event] Reward Distributed: ${technician} - ${ethers.formatEther(amount)} OZC`);

            const { error } = await supabase.from('mining_logs').insert({
                technician_id: technician, // Note: In prod, map address to UUID
                activity_type: activityType,
                token_reward: parseFloat(ethers.formatEther(amount)),
                tx_hash: event.log.transactionHash,
                multiplier: 1.0 // Placeholder
            });

            if (error) console.error("Failed to log reward:", error);
        });

        // 2. Listen for Trade Creation
        this.escrowContract.on("TradeCreated", async (tradeId, seller, buyer, amount, event) => {
            console.log(`[Event] Trade Created: #${tradeId}`);
            // Update Trade Status in DB
            await this.updateTradeStatus(tradeId.toString(), 'CREATED', event.log.transactionHash);
        });

        // 3. Listen for Funds Locked
        this.escrowContract.on("FundsLocked", async (tradeId, amount, event) => {
            console.log(`[Event] Funds Locked: #${tradeId}`);
            await this.updateTradeStatus(tradeId.toString(), 'LOCKED', event.log.transactionHash);
        });

        // 4. Listen for Inspection Verified
        this.escrowContract.on("InspectionVerified", async (tradeId, ipfsHash, event) => {
            console.log(`[Event] Inspection Verified: #${tradeId}`);
            await this.updateTradeStatus(tradeId.toString(), 'INSPECTION_PASSED', event.log.transactionHash);
        });

        // 5. Listen for Completion
        this.escrowContract.on("TradeCompleted", async (tradeId, event) => {
            console.log(`[Event] Trade Completed: #${tradeId}`);
            await this.updateTradeStatus(tradeId.toString(), 'COMPLETED', event.log.transactionHash);
        });

        this.isListening = true;
    }

    private async updateTradeStatus(tradeId: string, status: string, txHash: string) {
        const { error } = await supabase
            .from('trades') // Assuming 'trades' table exists
            .update({ status: status, tx_hash: txHash, updated_at: new Date() })
            .eq('onchain_id', tradeId);

        if (error) console.error(`Failed to update trade #${tradeId}:`, error);
    }
}

// Singleton Instance
export const indexerService = new IndexerService();
