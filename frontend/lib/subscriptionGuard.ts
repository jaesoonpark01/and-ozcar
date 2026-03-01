import { createClient } from '@supabase/supabase-js';

export type SubscriptionTier = 'free' | 'blue' | 'gold';

export interface UserSubscriptionContext {
    status: 'inactive' | 'active' | 'past_due' | 'canceled';
    tier: SubscriptionTier;
    pointsMultiplier: number;
}

/**
 * Validates if the current user has the required subscription tier.
 */
export async function checkSubscriptionAccess(requiredTier: SubscriptionTier): Promise<boolean> {
    try {
        const supabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        );
        const { data: { session } } = await supabase.auth.getSession();

        if (!session?.user) return false;

        const { data: profile, error } = await supabase
            .from('profiles')
            .select('subscription_status, subscription_tier')
            .eq('id', session.user.id)
            .single();

        if (error || !profile) return false;

        // Free tier is always allowed if required is free
        if (requiredTier === 'free') return true;

        // Premium tiers require active status
        if (profile.subscription_status !== 'premium' && profile.subscription_status !== 'active') {
            return false;
        }

        // Tier hierarchy: gold > blue > free
        if (requiredTier === 'gold') {
            return profile.subscription_tier === 'gold';
        }

        if (requiredTier === 'blue') {
            return profile.subscription_tier === 'blue' || profile.subscription_tier === 'gold';
        }

        return false;
    } catch (error) {
        console.error("Subscription Auth Guard Error:", error);
        return false;
    }
}

/**
 * Applies the 'Loyalty Multiplier' for points.
 * 2개월 이상 구독 유지 시 (혹은 특정 조건 만족 시) 포인트 2~3배 부스팅 로직.
 */
export function calculateBoostedPoints(basePoints: number, tier: SubscriptionTier, monthsSubscribed: number): number {
    if (tier === 'free') return basePoints;

    let multiplier = 1.0;

    // ozcar Blue: 기본 1.5배, 2개월 이상 유지 시 2배, 6개월 이상 3배
    if (tier === 'blue') {
        if (monthsSubscribed >= 6) multiplier = 3.0;
        else if (monthsSubscribed >= 2) multiplier = 2.0;
        else multiplier = 1.5;
    }

    // ozcar Gold: 기본 2배, 2개월 이상 유지 시 3배
    if (tier === 'gold') {
        if (monthsSubscribed >= 2) multiplier = 3.0;
        else multiplier = 2.0;
    }

    return Math.floor(basePoints * multiplier);
}
