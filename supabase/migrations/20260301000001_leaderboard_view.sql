-- 리더보드용 reward_logs 더미 테이블 (존재하지 않을 경우를 대비)
CREATE TABLE IF NOT EXISTS public.reward_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users NOT NULL,
    amount NUMERIC NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Materialized View 생성
CREATE MATERIALIZED VIEW IF NOT EXISTS public.v_leaderboard AS
SELECT 
  p.id as user_id, 
  p.full_name as nickname, 
  p.avatar_url, 
  COALESCE(SUM(r.amount), 0) as total_ozc,
  RANK() OVER (ORDER BY COALESCE(SUM(r.amount), 0) DESC) as rank
FROM public.profiles p
LEFT JOIN public.reward_logs r ON p.id = r.user_id
GROUP BY p.id, p.full_name, p.avatar_url;

-- REFRESH MATERIALIZED VIEW 를 매시간 실행하기 위한 pg_cron 확장 활성화 및 스케줄 등록 (Supabase SQL Editor 권한 필요)
-- select cron.schedule('refresh_v_leaderboard', '0 * * * *', 'REFRESH MATERIALIZED VIEW public.v_leaderboard');
