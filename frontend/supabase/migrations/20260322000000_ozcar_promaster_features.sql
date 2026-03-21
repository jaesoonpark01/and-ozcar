-- Path: supabase/migrations/20260322000000_ozcar_promaster_features.sql

-- 1. 고속 점검 델타 업데이트를 위한 테이블 생성
CREATE TABLE IF NOT EXISTS public.pro_check_results_delta (
    report_id UUID,
    item_id TEXT, -- e.g., 'engine_oil', 'tire_front_left'
    result_value JSONB,
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (report_id, item_id)
);

-- 2. 고속 델타 업데이트 함수 생성
CREATE OR REPLACE FUNCTION public.upsert_inspection_delta(
    p_report_id UUID,
    p_item_id TEXT,
    p_value JSONB
) RETURNS VOID AS $$
BEGIN
    INSERT INTO public.pro_check_results_delta (report_id, item_id, result_value)
    VALUES (p_report_id, p_item_id, p_value)
    ON CONFLICT (report_id, item_id) 
    DO UPDATE SET result_value = p_value, updated_at = NOW();
END;
$$ LANGUAGE plpgsql;

-- 3. 마스터 시뮬레이션 트레이닝 로그 테이블 생성
CREATE TABLE IF NOT EXISTS public.master_training_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    master_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    scenario_type TEXT,        -- 'EV_Urgent', 'ICE_OldCar' 등
    completion_time INTERVAL,  -- 완수 시간 (목표 20분)
    accuracy_rate FLOAT,       -- 결함 발견 정확도
    weak_points JSONB,         -- 자주 틀리거나 시간이 지체된 카테고리
    is_passed BOOLEAN,         -- 합격 여부 (시간 < 20분 AND 정확도 > 95%)
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. 차량 가산 잔존 가치 계산용 임시 컬럼 추가 (vehicles)
ALTER TABLE public.vehicles 
ADD COLUMN IF NOT EXISTS current_market_value INT DEFAULT 30000000;

-- 5. Live-Care 미래 가치 시뮬레이션 함수 생성
CREATE OR REPLACE FUNCTION public.simulate_future_value(
    p_vehicle_vin TEXT,
    p_action_taken BOOLEAN -- 정비 이행 여부
) RETURNS INT AS $$
DECLARE
    v_current_val INT;
    v_depreciation_rate FLOAT;
BEGIN
    SELECT current_market_value INTO v_current_val FROM public.vehicles WHERE vin = p_vehicle_vin;
    
    IF v_current_val IS NULL THEN
        v_current_val := 30000000;
    END IF;

    -- 정비를 안 하면 감가율 증가, 하면 방어
    IF p_action_taken THEN
        v_depreciation_rate := 0.05; -- 연 5% 감가
    ELSE
        v_depreciation_rate := 0.15; -- 연 15% 감가 (방치 시)
    END IF;

    RETURN (v_current_val * (1 - v_depreciation_rate))::INT;
END;
$$ LANGUAGE plpgsql;

-- 6. 보안 권한 설정
ALTER TABLE public.pro_check_results_delta ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.master_training_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable all for authenticated users" ON public.pro_check_results_delta FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Enable insert for authenticated" ON public.master_training_logs FOR INSERT WITH CHECK (auth.uid() = master_id);
CREATE POLICY "Enable select for own logs" ON public.master_training_logs FOR SELECT USING (auth.uid() = master_id);
