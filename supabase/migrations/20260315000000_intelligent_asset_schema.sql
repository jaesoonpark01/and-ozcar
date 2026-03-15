-- [1] 유종별 가치 감점/가산 정책 테이블 (Admin Policy)
CREATE TABLE IF NOT EXISTS asset_value_policy (
    fuel_type TEXT PRIMARY KEY,    -- 'EV', 'GASOLINE', 'DIESEL'
    rapid_accel_penalty INT,       -- 1회 발생 시 감가액(KRW)
    overheat_penalty INT,          -- 과열(스트레스) 발생 시 분당 감가액
    maint_bonus INT,               -- 최적의 정비/주행 시 부여하는 'oz-Point' 가산 점수
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 초기 정책 데이터 세팅
INSERT INTO asset_value_policy (fuel_type, rapid_accel_penalty, overheat_penalty, maint_bonus)
VALUES 
('EV', -500, -2000, 50),             -- EV는 과열(배터리) 스트레스에 더 취약
('GASOLINE', -300, -1000, 30),
('DIESEL', -400, -1500, 40)
ON CONFLICT (fuel_type) DO NOTHING;

-- [2] 지능형 가공 로그 테이블 (Vehicle Intelligence Logs)
-- 수집된 Raw 데이터가 사용자 친화적 문장 및 자산 데이터로 결합된 히스토리입니다.
CREATE TABLE IF NOT EXISTS vehicle_intelligence_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    pseudo_vehicle_id TEXT NOT NULL REFERENCES vehicles(pseudo_id), -- 비식별화된 차량 ID
    fuel_type TEXT NOT NULL,
    
    stress_level FLOAT,              -- 알고리즘이 산출한 이번 주행의 물리적 부하량 (0~100)
    status_label TEXT,               -- 앱 UI에 노출될 짧은 태그 ('안락한 주행', '역동적 주행', '가혹한 주행')
    monetary_impact_amt INT,         -- 이 주행(혹은 이벤트)이 초래한 자산 가치 변동액 (e.g. -500)
    user_coaching_msg TEXT,          -- 사용자 푸시 알림용 코칭 메시지
    
    log_timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. 실시간 가치 산정 및 코칭 로직 (Trigger Function)
CREATE OR REPLACE FUNCTION fn_process_smart_telemetry()
RETURNS TRIGGER AS $$
DECLARE
    v_policy RECORD;
    v_stress_score FLOAT := 0;
    v_status TEXT := '정상';
    v_impact_amt INT := 0;
    v_coaching_msg TEXT := '';
BEGIN
    -- 1. 해당 차량의 유종 정책(Policy) 로드
    SELECT * INTO v_policy FROM asset_value_policy WHERE fuel_type = NEW.fuel_type;
    IF NOT FOUND THEN
        -- 등록되지 않은 유종이면 기본 처리 없이 종료
        RETURN NEW;
    END IF;

    -- 2. 유종별 데이터 지능형 결합 연산 (Intelligence Derived)
    IF NEW.fuel_type IN ('GASOLINE', 'DIESEL') THEN
        -- 내연기관: [가속/RPM] + [가혹한 미션/엔진 온도] 연계
        -- (임의의 식) 엔진 회전수(RPM)가 한계치에 가깝고 온도가 높을수록 스트레스 급증
        v_stress_score := (NEW.rpm / 7000.0) * (NEW.coolant_temp / 100.0) * 100;
        
    ELSIF NEW.fuel_type = 'EV' THEN
        -- 전기차: [급방전 Current] + [배터리 고온] 연계
        -- (임의의 식) 출력이 강하고 배터리가 뜨거울수록 배터리 화성/노화 가속
        v_stress_score := (NEW.current_out / 400.0) * (NEW.batt_temp / 45.0) * 100;
    END IF;

    -- 3. 상태(Status) 판별 및 금융적 감가, 코칭 메시지 체인
    IF v_stress_score < 30 THEN 
        v_status := '안락한 주행';
        v_coaching_msg := '차량에 무리 없는 부드러운 주행입니다. 경제 운전 포인트가 적립됩니다!';
        v_impact_amt := v_policy.maint_bonus; -- 굿 패턴일 때 보너스
        
    ELSIF v_stress_score < 70 THEN 
        v_status := '역동적 주행';
        v_coaching_msg := '조금은 스포티한 주행! 가끔의 역동성은 괜찮지만 타이어/연료 소모가 늘어납니다.';
        v_impact_amt := 0; -- 중립
        
    ELSE 
        v_status := '가혹한 주행';
        -- G-Sensor나 RPM이 높게 튄 경우 급가속 페널티 적용
        IF NEW.accel_g > 0.4 THEN
             v_impact_amt := v_policy.rapid_accel_penalty;
             v_coaching_msg := concat('방금 전 무리한 가속으로 아드레날린은 +100%, 자산의 가치는 ', v_impact_amt, '원 하락했습니다! 📉');
        ELSE
             v_impact_amt := v_policy.overheat_penalty;
             v_coaching_msg := '고부하 주행이 지속되어 파워트레인 피로도가 누적됩니다. 쿨링이 필요해요! 🥵';
        END IF;
    END IF;

    -- 4. 지능형 로그(vehicle_intelligence_logs)에 변환된 인사이트 Insert
    INSERT INTO vehicle_intelligence_logs (
        pseudo_vehicle_id, fuel_type, stress_level, status_label, monetary_impact_amt, user_coaching_msg
    ) VALUES (
        NEW.pseudo_vehicle_id, NEW.fuel_type, v_stress_score, v_status, v_impact_amt, v_coaching_msg
    );

    -- 5. 원장 테이블 (car_asset_index)에 최종 자산(oz_index_total) 업데이트 반영
    UPDATE car_asset_index 
    SET 
        oz_index_total = GREATEST(0, LEAST(100, oz_index_total + (v_impact_amt::FLOAT / 10000.0))), 
        market_value_adj = market_value_adj + v_impact_amt,
        updated_at = NOW()
    WHERE pseudo_vehicle_id = NEW.pseudo_vehicle_id;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 3. 트리거 세팅 (Trigger Deployment)
DROP TRIGGER IF EXISTS trg_intel_telemetry_insert ON raw_telemetry;
CREATE TRIGGER trg_intel_telemetry_insert
AFTER INSERT ON raw_telemetry
FOR EACH ROW
EXECUTE FUNCTION fn_process_smart_telemetry();
