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

-- 월간 차량 리포트 (통계) 생성 함수
-- OBD2 주행 로그(telemetry 테이블)를 분석하여 주행 거리, 평균 전비, 급속 충전 횟수, 배터리 최고 온도 등을 산출.
create or replace function get_monthly_car_report(p_vin text, p_year int, p_month int)
returns json as $$
declare
  report_data json;
begin
  -- Note: 본 함수는 telemetry 테이블 스키마가 구성되어 있음을 전제로 합니다.
  -- 아직 테이블이 없다면 (Phase 1 가이드 기준) 에러가 발생할 수 있으므로, 
  -- 실제 운영 시에는 telemetry 스키마 확인 후 배포 요망.

  with monthly_stats as (
    select 
      -- 1. 월간 주행 거리 (해당 월의 Odometer 최대값 - 최소값)
      coalesce(max(odometer) - min(odometer), 0) as distance_km,
      -- 2. 평균 전력 소모량 (kW) -> 전비 계산용
      coalesce(avg(current_power), 0) as avg_power_kw,
      -- 3. 배터리 건강 상태 (평균 SOH)
      coalesce(avg(soh), 0) as avg_soh,
      -- 4. 급속 충전 횟수 (전류 50A 이상의 충전 세션)
      -- 정확한 세션 카운팅을 위해서는 윈도우 함수가 필요하나 여기서는 단순 데이터 건수 그룹핑 생략 (예시용 카운트)
      count(*) filter (where is_charging = true and current > 50) as rapid_charge_packets,
      -- 5. 최고 배터리 온도 (배터리 스트레스 지수 판별용)
      coalesce(max(battery_temp_max), 0) as max_temp
    from telemetry
    where vin = p_vin 
      and extract(year from created_at) = p_year
      and extract(month from created_at) = p_month
  )
  select row_to_json(monthly_stats.*) into report_data from monthly_stats;
  
  return report_data;
end;
$$ language plpgsql;
