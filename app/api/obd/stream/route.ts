import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Setup Supabase (Using Service Role for ingestion to bypass RLS if needed, or Auth)
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
    try {
        const { vehicle_id, technician_id, sensor_data, dtc_codes } = await req.json();

        // AI Sentinel Logic: Immediate anomaly detection
        const is_critical = dtc_codes && dtc_codes.length > 0 || sensor_data.coolant_temp > 110 || sensor_data.voltage < 11.5;

        // Insert into real-time table
        const { data, error } = await supabase
            .from('vehicle_realtime_logs')
            .insert({
                vehicle_id,
                technician_id,
                rpm: sensor_data.rpm,
                voltage: sensor_data.voltage,
                soh: sensor_data.SOH,
                coolant_temp: sensor_data.coolant_temp,
                dtc_codes: dtc_codes || [],
                is_critical: is_critical,
                recorded_at: new Date().toISOString()
            })
            .select();

        if (error) throw error;

        // Trigger alert if critical
        if (is_critical) {
            console.log(`[SDV ALERT] Critical issue on vehicle ${vehicle_id}: ${dtc_codes?.join(', ')}`);
            // In a real app, send FCM notification here
        }

        return NextResponse.json({ success: true, log_id: data?.[0]?.id });

    } catch (error: any) {
        console.error('OBD Data Ingestion Error:', error.message);
        return NextResponse.json({ error: 'Data processing failed' }, { status: 500 });
    }
}

// GET handler for simple connectivity check and usage info
export async function GET() {
    return NextResponse.json({
        name: "Ozcar OBD-II Stream Ingestion API",
        status: "Online",
        method_required: "POST",
        usage: {
            endpoint: "/api/obd/stream",
            payload: {
                vehicle_id: "VIN_STRING",
                technician_id: "UUID",
                sensor_data: {
                    rpm: "number",
                    voltage: "number",
                    SOH: "number",
                    coolant_temp: "number"
                },
                dtc_codes: ["string[]"]
            }
        }
    });
}
