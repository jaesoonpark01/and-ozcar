import { createClient } from '@supabase/supabase-js';

// 기존 통합앱 서버 환경 변수를 재활용. 필요시 교체
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Smoothing된 Payload 묶음을 Supabase로 배치 처리 전송
 */
export async function flushObdDataToSupabase(carId: string, payloads: any[]) {
    if (!payloads || payloads.length === 0) return { success: false };

    try {
        const insertData = payloads.map(item => ({
            vin: carId,
            raw_data: item,     // { pid: 'SOC', val: 95.5, ts: 1712391295323 }
            created_at: new Date(item.ts).toISOString(),
        }));

        const { error } = await supabase.from('telemetry').insert(insertData);

        if (error) {
            console.error("[Sentinel] Supabase insert error:", error);
            return { success: false, error };
        }
        return { success: true };
    } catch (e) {
        return { success: false, error: e };
    }
}
