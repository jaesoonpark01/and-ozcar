import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        const { vin, brand, records, mileage } = data;

        if (!vin || !records) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        console.log(`[OBD-III API] Processing sync for ${brand} - VIN: ${vin}`);

        // Sync individual records to vehicle_history_cache
        const syncPromises = records.map((record: any, index: number) => {
            return supabase
                .from('vehicle_history_cache')
                .upsert({
                    vin: vin,
                    record_id: `MFR-${brand}-${index}`, // Unique record ID for manufacturer data
                    technician: brand, // Mark as manufacturer-verified
                    mileage: record.odometer,
                    service_type: 'Scheduled Maintenance',
                    description: record.description,
                    timestamp: new Date(record.date).toISOString()
                });
        });

        const results = await Promise.all(syncPromises);
        const errors = results.filter(r => r.error);

        if (errors.length > 0) {
            console.error("[OBD-III API] Some records failed to sync:", errors);
            return NextResponse.json({ success: false, errors }, { status: 500 });
        }

        return NextResponse.json({ success: true, count: records.length });
    } catch (error: any) {
        console.error("[OBD-III API] Critical Failure:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
