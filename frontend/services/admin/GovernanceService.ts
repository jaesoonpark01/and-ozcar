
import { ethers } from 'ethers';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const REPUTATION_ADDRESS = process.env.NEXT_PUBLIC_REPUTATION_ADDRESS || "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0f9"; // From recent deployment
const REPUTATION_ABI = [
    "function slash(address _tech, uint256 _severity) external",
    "function updateStats(address _tech, uint256 _d, uint256 _p, uint256 _j, uint256 _t) external"
];

export class GovernanceService {
    private contract: ethers.Contract;
    private signer: ethers.Wallet;

    constructor() {
        const provider = new ethers.JsonRpcProvider(process.env.POLYGON_RPC_URL || "http://127.0.0.1:8545");
        // Admin Wallet (must be owner of Reputation Contract)
        this.signer = new ethers.Wallet(process.env.ADMIN_PRIVATE_KEY!, provider);
        this.contract = new ethers.Contract(REPUTATION_ADDRESS, REPUTATION_ABI, this.signer);
    }

    /**
     * Slash a technician's reputation and potentially ban them.
     * @param technicianAddress Wallet address of the technician
     * @param severity Severity of the violation (0-100). >=90 results in ban.
     * @param reason Reason for slashing (stored off-chain)
     * @param adminId ID of the admin executing the action
     */
    async slashTechnician(technicianAddress: string, severity: number, reason: string, adminId: string) {
        try {
            console.log(`Executing slash on ${technicianAddress} with severity ${severity}...`);

            // 1. Execute On-Chain Slash
            const tx = await this.contract.slash(technicianAddress, severity);
            await tx.wait();
            console.log(`Slash Transaction Confirmed: ${tx.hash}`);

            // 2. Log to Database
            const { error } = await supabase.from('governance_logs').insert({
                technician_address: technicianAddress,
                action: 'SLASH',
                severity: severity,
                reason: reason,
                admin_id: adminId,
                tx_hash: tx.hash,
                created_at: new Date().toISOString()
            });

            if (error) throw new Error(`DB Log Failed: ${error.message}`);

            // 3. Resolve related alerts if any
            await supabase
                .from('security_alerts')
                .update({ status: 'RESOLVED', resolution_noteSource: `Slashed by Admin: ${reason}` })
                .eq('technician_address', technicianAddress)
                .eq('status', 'OPEN');

            return { success: true, txHash: tx.hash };

        } catch (error: unknown) {
            console.error("Slash execution failed:", error);
            const message = error instanceof Error ? error.message : 'Unknown error';
            throw new Error(`Governance Action Failed: ${message}`);
        }
    }

    /**
     * Ban a technician immediately (Severity 100)
     */
    async banTechnician(technicianAddress: string, reason: string, adminId: string) {
        return this.slashTechnician(technicianAddress, 100, reason, adminId);
    }
}

export const governanceService = new GovernanceService();
