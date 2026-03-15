import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    try {
        const { car_id, session_id, payload, flags } = await req.json()

        // Create Supabase Client
        const supabase = createClient(
            Deno.env.get('SUPABASE_URL') ?? '',
            Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
        )

        // 1. Critical Path: Emergency/DTC/Anti-Tamper Alerts
        const isTampered = flags.tamper_detected || (payload[0]?.p?.volt < 11.5); // Example tamper logic

        if (flags.has_dtc || flags.is_emergency || isTampered) {
            const alertType = isTampered ? 'ANTI_TAMPER_TRIGGERED' : (flags.has_dtc ? 'DTC_DETECTED' : 'EMERGENCY_ANOMALY');
            const severity = (flags.is_emergency || isTampered) ? 'CRITICAL' : 'HIGH';

            await supabase
                .from('anomaly_alerts')
                .insert({
                    car_id,
                    severity,
                    alert_type: alertType,
                    description: isTampered 
                        ? "Hardware tamper detected or critical low voltage. Possible fraud attempt." 
                        : "Edge AI detected critical vehicle state or DTC codes.",
                    data_snapshot: payload[0]?.p
                })

            // Broadcast to Realtime channels
            await supabase.channel(`realtime:${car_id}`)
                .send({
                    type: 'broadcast',
                    event: 'emergency',
                    payload: { 
                        msg: isTampered ? "SECURITY BREACH: Hardware Tamper!" : "Critical Hardware Alert!",
                        type: alertType
                    }
                })
        }

        // 2. Data Assetization: Intelligent Processing (NEW)
        const { fuel_type } = payload[0] || { fuel_type: 'EV' };
        const latestP = payload[payload.length - 1]?.p || {};

        // Insert into mock_smart_telemetry to trigger intelligent asset evaluation
        await supabase
            .from('mock_smart_telemetry')
            .insert({
                pseudo_vehicle_id: car_id,
                fuel_type,
                rpm: latestP.rpm || 0,
                coolant_temp: latestP.temp || 0,
                current_out: latestP.current || 0,
                batt_temp: latestP.batt_temp || 0,
                accel_g: latestP.accel_g || 0
            })

        // Standard Bulk Insert to raw_telemetry
        const telemetryEntries = payload.map((item: any) => ({
            car_id,
            session_id,
            recorded_at: new Date(item.ts).toISOString(),
            pid_data: item.p
        }))

        const { error: dbError } = await supabase
            .from('raw_telemetry')
            .insert(telemetryEntries)

        if (dbError) throw dbError

        // 3. Reward Processing (RPC)
        // Approximate drive duration based on payload count and smoothing interval
        const driveDuration = payload.length * 1;
        await supabase.rpc('calculate_driving_reward', {
            car_uuid: car_id,
            drive_seconds: Math.floor(driveDuration)
        })

        return new Response(JSON.stringify({ message: "Telemetry ingested and processed" }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200,
        })

    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 400,
        })
    }
})
