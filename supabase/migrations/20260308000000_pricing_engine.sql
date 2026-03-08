-- Migration: 20260308000000_pricing_engine
-- Description: 데이터 품질과 마켓 수요를 결합한 가치 산정 로직과 테스트 캠페인을 삽입합니다.

-- 1. 마켓 수요 테이블 생성 (캠페인)
CREATE TABLE IF NOT EXISTS public.market_campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  buyer_name TEXT NOT NULL,
  target_description TEXT NOT NULL,
  multiplier NUMERIC DEFAULT 1.0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Mock Data: 마켓 캠페인 초기값 삽입
INSERT INTO public.market_campaigns (buyer_name, target_description, multiplier)
VALUES 
  ('AIG 안심화재', '안전 운전 데이터 90점 이상 유저', 1.5),
  ('EV Battery Research Lab', '전기차 겨울철 전비 데이터 수집 (영하 5도 이하)', 2.0)
ON CONFLICT DO NOTHING;

-- 2. 가치 산정 함수 생성 (Pricing Engine)
-- 파라미터 :
-- p_is_hardware_verified (STM32G4 등 하드웨어 서명 여부)
-- p_data_count (누적 수집된 패킷 개수)
CREATE OR REPLACE FUNCTION public.calculate_data_asset_value(
    p_is_hardware_verified BOOLEAN,
    p_data_count NUMERIC
)
RETURNS NUMERIC AS $$
DECLARE
    v_quality_score NUMERIC;
    v_demand_multiplier NUMERIC;
    v_final_value NUMERIC;
BEGIN
    -- [변수 1] 품질 점수: 무결성 검증을 마친 데이터에 폭발적 가중치
    IF p_is_hardware_verified THEN
        v_quality_score := 1.5;
    ELSE
        v_quality_score := 0.8;
    END IF;

    -- [변수 2] 시장 수요: 현재 활성화된 최대 멀티플라이어 참조 (실제 서비스에서는 유저 차량 타입과 매칭해야 함)
    SELECT COALESCE(MAX(multiplier), 1.0) INTO v_demand_multiplier
    FROM public.market_campaigns
    WHERE is_active = true;

    -- [최종 산출] 기본 단가(패킷당 1원) * 품질 * 수요가중치
    v_final_value := p_data_count * v_quality_score * v_demand_multiplier;

    RETURN v_final_value;
END;
$$ LANGUAGE plpgsql;
