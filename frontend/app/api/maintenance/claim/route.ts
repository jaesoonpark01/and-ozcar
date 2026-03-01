// app/api/maintenance/claim/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

/**
 * Ozcar Smart Claim API
 * Automatically handles the settlement between the platform and the technician
 * for users under the "ozcar Care" warranty subscription.
 */
export async function POST(req: NextRequest) {
    try {
        const { repair_id, vehicle_id, cost, warranty_type } = await req.json();

        // 1. Check User Subscription Status
        const { data: subscription } = await supabase
            .from('subscriptions')
            .select('*')
            .eq('vehicle_id', vehicle_id)
            .eq('status', 'ACTIVE')
            .single();

        if (!subscription) {
            return NextResponse.json({
                error: 'NO_ACTIVE_SUBSCRIPTION',
                message: 'No active warranty subscription found for this vehicle.'
            }, { status: 403 });
        }

        // 2. AI Smart Claim Logic (Automatic Approval)
        // In a real app, this would use AI Vision (AVV) results to confirm the repair was valid
        const isApprovedByAI = true;

        if (isApprovedByAI) {
            // 3. Automated Settlement
            // Platform pays the technician (Mock transaction)
            console.log(`[SmartClaim] Transferring ${cost} OZC from Platform to Technician...`);

            // 4. Record the claim
            const { error: claimError } = await supabase
                .from('maintenance_claims')
                .insert({
                    repair_id,
                    vehicle_id,
                    amount: cost,
                    status: 'SETTLED',
                    settled_at: new Date().toISOString()
                });

            if (claimError) throw claimError;

            return NextResponse.json({
                success: true,
                message: 'Settlement completed automatically. User pays 0 OZC.',
                settlement_id: `CLAIM-${Date.now()}`
            });
        }

        return NextResponse.json({ error: 'AI_APPROVAL_FAILED' }, { status: 400 });

    } catch (error: any) {
        console.error('Smart Claim Error:', error.message);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
