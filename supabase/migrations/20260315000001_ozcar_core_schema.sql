-- 1. profiles 테이블 확장
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS total_score INT DEFAULT 0;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS ambassador_status TEXT DEFAULT 'none';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS nickname TEXT UNIQUE;

-- 2. vehicles 테이블 생성
CREATE TABLE IF NOT EXISTS public.vehicles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  owner_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  car_name TEXT NOT NULL,
  fuel_type TEXT NOT NULL,
  mac_address TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. trip_logs 테이블 생성
CREATE TABLE IF NOT EXISTS public.trip_logs (
  trip_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  vehicle_id UUID REFERENCES public.vehicles(id) ON DELETE CASCADE,
  start_time TIMESTAMPTZ,
  end_time TIMESTAMPTZ,
  distance_km NUMERIC,
  avg_efficiency NUMERIC,
  eco_score INT CHECK (eco_score BETWEEN 0 AND 100),
  saved_money_krw INT,
  hard_accel_count INT DEFAULT 0,
  hard_brake_count INT DEFAULT 0
);

-- 4. diagnostic_alerts 테이블 생성
CREATE TABLE IF NOT EXISTS public.diagnostic_alerts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  vehicle_id UUID REFERENCES public.vehicles(id) ON DELETE CASCADE,
  alert_type TEXT NOT NULL,
  alert_code TEXT,
  message TEXT,
  is_resolved BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. RLS Policies
ALTER TABLE public.vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trip_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.diagnostic_alerts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own vehicles" ON public.vehicles FOR SELECT USING (auth.uid() = owner_id);
CREATE POLICY "Users can insert own vehicles" ON public.vehicles FOR INSERT WITH CHECK (auth.uid() = owner_id);
CREATE POLICY "Users can update own vehicles" ON public.vehicles FOR UPDATE USING (auth.uid() = owner_id);
CREATE POLICY "Users can delete own vehicles" ON public.vehicles FOR DELETE USING (auth.uid() = owner_id);

CREATE POLICY "Users can view own trip logs" ON public.trip_logs FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.vehicles WHERE id = trip_logs.vehicle_id AND owner_id = auth.uid())
);
CREATE POLICY "Users can insert own trip logs" ON public.trip_logs FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.vehicles WHERE id = vehicle_id AND owner_id = auth.uid())
);

CREATE POLICY "Users can view own diagnostic alerts" ON public.diagnostic_alerts FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.vehicles WHERE id = diagnostic_alerts.vehicle_id AND owner_id = auth.uid())
);
CREATE POLICY "Users can insert own diagnostic alerts" ON public.diagnostic_alerts FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.vehicles WHERE id = vehicle_id AND owner_id = auth.uid())
);

-- 6. 주간 랭킹 Materialized View 생성
CREATE MATERIALIZED VIEW IF NOT EXISTS public.weekly_top_drivers AS
  SELECT 
    p.nickname, 
    p.avatar_url,
    AVG(t.eco_score) as avg_score, 
    SUM(t.distance_km) as total_dist
  FROM public.trip_logs t
  JOIN public.vehicles v ON t.vehicle_id = v.id
  JOIN public.profiles p ON v.owner_id = p.id
  WHERE t.start_time > (NOW() - INTERVAL '7 days')
  GROUP BY p.nickname, p.avatar_url
  HAVING SUM(t.distance_km) > 50;

-- Materialized View 갱신 함수
CREATE OR REPLACE FUNCTION public.refresh_weekly_top_drivers()
RETURNS void AS $$
BEGIN
  REFRESH MATERIALIZED VIEW public.weekly_top_drivers;
END;
$$ LANGUAGE plpgsql;
