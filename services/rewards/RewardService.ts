export interface RewardTransaction {
    id: string;
    amount: number;
    reason: string;
    timestamp: string;
    status: 'PENDING' | 'COMPLETED' | 'FAILED';
}

export class RewardService {
    private static REWARD_RATES = {
        OBD3_SYNC: 5,        // 5 OZC for manufacturer data sync
        VERIFIED_MAINTENANCE: 10, // 10 OZC for professional shop record
        COMMUNITY_VOTE: 1    // 1 OZC for valid report participation
    };

    /**
     * Calculate and simulate OZC reward distribution
     */
    static async rewardDataContribution(type: keyof typeof RewardService.REWARD_RATES, vin: string): Promise<RewardTransaction> {
        const amount = this.REWARD_RATES[type];
        console.log(`[Reward] Distributing ${amount} OZC to owner of ${vin} for ${type}...`);

        // In production, this would call the OzcarPool smart contract
        await new Promise(r => setTimeout(r, 1000));

        return {
            id: `RW-${Math.random().toString(36).substring(7).toUpperCase()}`,
            amount,
            reason: type.replace(/_/g, ' '),
            timestamp: new Date().toISOString(),
            status: 'COMPLETED'
        };
    }

    static async getPendingBalance(address: string): Promise<number> {
        // Mocked balance
        return 125.50;
    }
}
