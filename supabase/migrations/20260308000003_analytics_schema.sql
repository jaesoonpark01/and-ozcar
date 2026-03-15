-- 0. 더미 telemetry 테이블 생성
CREATE TABLE IF NOT EXISTS public.telemetry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    vin TEXT,
    car_id UUID,
    speed FLOAT,
    regen_kwh FLOAT,
    hvac_kwh FLOAT,
    temp_max FLOAT,
    soc FLOAT,
    odometer FLOAT,
    current_power FLOAT,
    soh FLOAT,
    is_charging BOOLEAN,
    current FLOAT,
    battery_temp_max FLOAT,
    recorded_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 1. 통합 주행 분석 테이블 (비식별/가명화 데이터 축적용)
CREATE TABLE analytics_driving_sessions (
    -- [기본 정보]
    session_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    pseudo_vehicle_id TEXT NOT NULL, -- 해시화된 차량 식별자(VIN 대체)
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    -- [차원 1: 환경(Environment)]
    env_type TEXT,              -- Urban, Highway, Mountainous 등 추정치
    outside_temp_avg FLOAT,     -- 외부 온도
    
    -- [차원 2: 효율(Efficiency)]
    distance_km FLOAT,          -- 총 주행 거리
    avg_efficiency_km_kwh FLOAT,-- 평균 전비
    regen_recovered_kwh FLOAT,  -- 회생제동 회수 전력
    aux_power_consumed_kwh FLOAT, -- 공조/전장 소비 전력
    efficiency_score INT,       -- 1-100 정규화된 등급

    -- [차원 3: 행태(Behavior)]
    aggressiveness_score INT,   -- 운전 공격성 지수 (급가속 빈도기반)
    rapid_accel_count INT,
    avg_speed_kmh FLOAT,

    -- [차원 4: 배터리 스트레스(Health)]
    soc_delta INT,              -- 주행 중 소모된 SOC(%)
    battery_temp_max FLOAT,     -- 최고 온도 모니터링
    battery_stress_index FLOAT, -- 0-1 사이의 스트레스 산출값

    -- [추가 메타: 위치 범주화]
    region_code TEXT            -- 예: '11000'(서울 등 광역 단위 범주화 좌표)
);

-- 성능 최적화를 위한 인덱스 생성
CREATE INDEX idx_analytics_pseudo_id ON analytics_driving_sessions(pseudo_vehicle_id);
CREATE INDEX idx_analytics_created ON analytics_driving_sessions(created_at);

-- 2. 가명 식별자(Pseudo-ID) 생성 암호화 함수
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE OR REPLACE FUNCTION generate_pseudo_id(vin_raw TEXT)
RETURNS TEXT AS $$
BEGIN
    -- 환경변수 대신 예제용 솔트 사용
    RETURN encode(digest(vin_raw || '_ozcar_salt_2026', 'sha256'), 'hex');
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- 3. Telemetry 테이블 INSERT 감지 및 익명화 이관 (Trigger) 로직
-- ※ telemetry 스키마 형식이 주행 단위 로그(Mocking)라고 가정하고 간이 트리거 작성
CREATE OR REPLACE FUNCTION trg_anonymize_telemetry()
RETURNS TRIGGER AS $$
BEGIN
    -- Telemetry(원본 데이터)에서 가명화 처리하여 Analytics 세션으로 이관
    INSERT INTO analytics_driving_sessions (
        pseudo_vehicle_id,
        env_type,
        distance_km,
        avg_efficiency_km_kwh,
        regen_recovered_kwh,
        aux_power_consumed_kwh,
        aggressiveness_score,
        rapid_accel_count,
        avg_speed_kmh,
        soc_delta,
        battery_temp_max,
        battery_stress_index
    )
    VALUES (
        generate_pseudo_id(NEW.vin), -- 식별 정보는 단방향 해시 암호화
        
        -- 임의의 룰 베이스 추정치 산출 (Mocking)
        CASE 
            WHEN NEW.speed > 80 THEN 'Highway'
            ELSE 'Urban'
        END,
        
        -- 기타 필드 매핑 (telemetry 스키마 필드 존재 가정)
        NEW.speed / 10.0, -- Distance 
        6.5,              -- mock efficiency  
        NEW.regen_kwh,
        NEW.hvac_kwh,
        CASE WHEN NEW.temp_max > 35 THEN (NEW.temp_max * 2) ELSE 10 END, -- aggressiveness mock
        1, -- 급가속 기본값
        NEW.speed,
        NEW.soc, -- delta
        NEW.temp_max,
        NEW.temp_max / 50.0 -- stress (mock ratio)
    );

    RETURN NEW;
EXCEPTION 
    WHEN OTHERS THEN
        -- 에러 발생 시 원본 이벤트를 막지 않고 패스
        RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 4. 트리거 생성
DROP TRIGGER IF EXISTS on_telemetry_insert ON telemetry;
CREATE TRIGGER on_telemetry_insert
AFTER INSERT ON telemetry
FOR EACH ROW
EXECUTE FUNCTION trg_anonymize_telemetry();
