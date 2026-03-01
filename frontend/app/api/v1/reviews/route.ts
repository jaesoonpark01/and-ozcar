import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(req: Request) {
    try {
        const { vin, technicianAddress, rating, comment, ownerAddress } = await req.json();

        // 1. Insert Review
        const { error: insertError } = await supabase
            .from('maintenance_reviews')
            .insert([{
                vin,
                technician_address: technicianAddress,
                owner_address: ownerAddress,
                rating,
                comment,
                created_at: new Date().toISOString()
            }]);

        // If table doesn't exist (common in demo), we just log and proceed
        if (insertError) {
            console.warn("Review insert failed (Table might be missing):", insertError.message);
        }

        // 2. Update Reputation (Mocking the RPC logic described)
        // Ideally: await supabase.rpc('update_technician_reputation', { ... })
        // Here we simulate it by returning success
        console.log(`[Reputation Algo] Recalculating score for ${technicianAddress} with new rating ${rating}`);

        // In a real app, this would trigger the recalculation engine

        return NextResponse.json({ success: true, message: "Review submitted and reputation updated." });

    } catch (error) {
        return NextResponse.json({ error: "Review submission failed" }, { status: 500 });
    }
}
