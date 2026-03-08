-- 1. 현대/기아 전용 고장 코드 (DTC) 매핑 마스터 테이블
create table if not exists dtc_master (
  code text primary key,
  unit text not null,
  description text not null,
  level text not null check (level in ('Critical', 'High', 'Medium', 'Low')),
  action_guide text not null
);

-- 초기 모의 데이터 삽입
insert into dtc_master (code, unit, description, level, action_guide) values
  ('P1B70', 'BMS', '고전압 배터리 저전압 감지', 'Critical', '즉시 안전한 곳에 정차 후 견인 필요'),
  ('P1B77', 'BMS', '고전압 컨택터 고착 (메인 릴레이)', 'Critical', '시동 불능 가능성, 서비스 센터 즉시 방문'),
  ('P1D12', 'VMCU', '모터 인버터 전압 이상', 'High', '급가속 자제 및 점검 필요'),
  ('B1601', 'Aircon', '냉각수 펌프 신호 이상', 'Medium', '배터리 냉각 효율 저하 우려, 예약 방문'),
  ('P1C27', 'OBC', '완속 충전 통신 오류', 'Low', '충전기 교체 테스트 권장')
on conflict (code) do nothing;

-- 2. 스마트 충전소 테이블 (PostGIS 확장이 필요하지만, 예제 환경을 위해 일반 Float 좌표계로 대체 가능)
-- (실제 운영 환경에서는 create extension if not exists postgis; 사용 필요)
create table if not exists charging_stations (
  id bigint generated always as identity primary key,
  name text not null,
  latitude float not null,
  longitude float not null,
  is_ultra_fast boolean default false
);

-- 매장 모의 데이터
insert into charging_stations (name, latitude, longitude, is_ultra_fast) values
  ('현대 EV 스테이션 강동', 37.5332, 127.1353, true),
  ('E-pit 판교 테크노밸리', 37.4011, 127.1086, true),
  ('블루핸즈 성수점', 37.5443, 127.0571, false)
on conflict do nothing;

-- 3. 반경 내 초급속 충전소 검색 함수 (간단한 Haversine 거리 계산 방식 적용)
create or replace function get_nearby_chargers(
  user_lat float, 
  user_long float, 
  max_distance_km float default 5.0
)
returns table (
  id bigint,
  name text,
  latitude float,
  longitude float,
  is_ultra_fast boolean,
  distance_km float
) as $$
begin
  return query
  select 
    cs.id, 
    cs.name, 
    cs.latitude, 
    cs.longitude, 
    cs.is_ultra_fast,
    ( 6371.0 * acos( cos( radians(user_lat) ) * cos( radians( cs.latitude ) ) 
      * cos( radians( cs.longitude ) - radians(user_long) ) 
      + sin( radians(user_lat) ) * sin( radians( cs.latitude ) ) ) ) as distance_km
  from charging_stations cs
  where cs.is_ultra_fast = true
  and ( 6371.0 * acos( cos( radians(user_lat) ) * cos( radians( cs.latitude ) ) 
      * cos( radians( cs.longitude ) - radians(user_long) ) 
      + sin( radians(user_lat) ) * sin( radians( cs.latitude ) ) ) ) <= max_distance_km
  order by distance_km asc;
end;
$$ language plpgsql;
