import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

serve(async (req) => {
  try {
    const payload = await req.json()
    // payload represents the inserted row in diagnostic_alerts
    const { record } = payload

    if (!record || !record.vehicle_id || !record.alert_code) {
      return new Response("Invalid payload", { status: 400 })
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')
    const supabaseKey = Deno.env.get('SUPABASE_NON_ANONYMOUS_SERVICE_ROLE_KEY') || Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
    
    if (!supabaseUrl || !supabaseKey) {
      return new Response("Missing Supabase credentials", { status: 500 })
    }

    const supabase = createClient(supabaseUrl, supabaseKey)
    
    // 차량 소유자 정보 조회
    const { data: vehicleData, error: vehicleError } = await supabase
      .from('vehicles')
      .select('owner_id, car_name')
      .eq('id', record.vehicle_id)
      .single()

    if (vehicleError || !vehicleData) {
      console.error("Vehicle fetch error:", vehicleError)
      return new Response("Vehicle not found", { status: 404 })
    }

    // 소유자 푸시 알림 토큰 등 정보 조회 (optional based on your FCM strategy)
    // 실제 운영 시에는 FCM API 나 Kakao AlimTalk API를 여기에 연동합니다.
    const message = `[ozcar 경고] ${vehicleData.car_name} 차량에 이상이 감지되었습니다! (코드: ${record.alert_code}). 설명: ${record.message}`
    
    console.log("Push Notification Simulation:")
    console.log(`To User ID: ${vehicleData.owner_id}`)
    console.log(`Message: ${message}`)

    // TODO: Send FCM or SMS Request here 
    // e.g., await fetch('https://fcm.googleapis.com/fcm/send', { ... })

    return new Response(
      JSON.stringify({ success: true, message: "Alert processed successfully" }),
      { headers: { "Content-Type": "application/json" } }
    )

  } catch (error) {
    console.error("Error processing diagnostic alert:", error)
    return new Response(JSON.stringify({ error: error.message }), { status: 500 })
  }
})
