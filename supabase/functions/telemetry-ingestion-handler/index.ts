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

        // 1. Critical Path: Emergency/DTC Alerts
        if (flags.has_dtc || flags.is_emergency) {
            await supabase
                .from('anomaly_alerts')
                .insert({
                    car_id,
                    severity: flags.is_emergency ? 'CRITICAL' : 'HIGH',
                    alert_type: flags.has_dtc ? 'DTC_DETECTED' : 'EMERGENCY_ANOMALY',
                    description: "Edge AI detected critical vehicle state or DTC codes.",
                    data_snapshot: payload[0]?.p
                })

            // Broadcast to Realtime channels
            await supabase.channel(`realtime:${car_id}`)
                .send({
                    type: 'broadcast',
                    event: 'emergency',
                    payload: { msg: "Critical Hardware Alert Detected!" }
                })
        }

        // 2. Data Assetization: Bulk Insert to raw_telemetry
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
