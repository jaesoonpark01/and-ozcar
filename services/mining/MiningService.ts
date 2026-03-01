
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export const BASE_REWARD = 10; // 10 OZC

export type MinerGrade = 'Bronze' | 'Silver' | 'Gold' | 'Master';

export const GRADE_MULTIPLIERS: Record<MinerGrade, number> = {
    Bronze: 1.0,
    Silver: 1.2,
    Gold: 1.5,
    Master: 2.0,
};

export const BONUS_MULTIPLIERS = {
    MEDIA_UPLOAD: 0.2,
    VERIFICATION: 0.1,
    STAKING: 0.3, // > 1000 OZC staked
};

export class MiningService {
    /**
     * Calculate potential reward for an activity
     */
    static async calculateReward(
        technicianId: string,
        activityType: 'MAINTENANCE' | 'INSPECTION',
        hasMedia: boolean,
        isVerified: boolean
    ) {
        // Fetch technician stats
        const { data: tech, error } = await supabase
            .from('technicians')
            .select('grade, staked_amount, reputation_score')
            .eq('id', technicianId)
            .single();

        if (error || !tech) throw new Error('Technician not found');

        let multiplier = GRADE_MULTIPLIERS[tech.grade as MinerGrade] || 1.0;

        // Apply bonuses
        if (hasMedia) multiplier += BONUS_MULTIPLIERS.MEDIA_UPLOAD;
        if (isVerified) multiplier += BONUS_MULTIPLIERS.VERIFICATION;
        if (tech.staked_amount >= 1000) multiplier += BONUS_MULTIPLIERS.STAKING;

        // Calculate Final Token Reward
        const finalReward = BASE_REWARD * multiplier;

        return {
            base: BASE_REWARD,
            multiplier,
            total: parseFloat(finalReward.toFixed(2)),
            breakdown: {
                grade: tech.grade,
                mediaBonus: hasMedia ? BONUS_MULTIPLIERS.MEDIA_UPLOAD : 0,
                verificationBonus: isVerified ? BONUS_MULTIPLIERS.VERIFICATION : 0,
                stakingBonus: tech.staked_amount >= 1000 ? BONUS_MULTIPLIERS.STAKING : 0,
            },
        };
    }

    /**
   * Record mining activity to DB (Off-chain log)
   */
    static async recordMiningActivity(
        technicianId: string,
        vehicleVin: string,
        activityType: string,
        rewardData: { total: number; multiplier: number },
        txHash?: string
    ) {
        const { data, error } = await supabase.from('mining_logs').insert({
            technician_id: technicianId,
            vehicle_vin: vehicleVin,
            activity_type: activityType,
            token_reward: rewardData.total,
            multiplier: rewardData.multiplier,
            tx_hash: txHash,
        });

        if (error) throw error;

        // Increment total mined tokens for technician
        // Note: You might need to create this RPC function if it doesn't exist
        const { error: rpcError } = await supabase.rpc('increment_technician_tokens', {
            tech_id: technicianId,
            amount: rewardData.total
        });

        if (rpcError) {
            console.error("Failed to increment tokens:", rpcError);
            // We don't throw here to avoid failing the log creation, but in prod handle better
        }

        return data;
    }
}
