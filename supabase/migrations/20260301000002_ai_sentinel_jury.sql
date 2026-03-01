-- 1. AI 감지 기록 및 제소(Case) 정보 테이블
CREATE TABLE IF NOT EXISTS public.jury_cases (
    case_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    defendant_id UUID REFERENCES public.profiles(id) NOT NULL,
    frozen_amount NUMERIC NOT NULL,
    incident_time TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    ai_reason TEXT NOT NULL,
    ai_confidence INT NOT NULL,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'appealed', 'voting', 'resolved_innocent', 'resolved_guilty')),
    user_evidence_url TEXT,
    user_comment TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. 투표 테이블 (Commit-Reveal 대신 투명한 온체인 대체를 위해 일단 메타데이터용 구성)
CREATE TABLE IF NOT EXISTS public.jury_votes (
    vote_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    case_id UUID REFERENCES public.jury_cases(case_id) NOT NULL,
    juror_id UUID REFERENCES public.profiles(id) NOT NULL,
    vote_decision TEXT CHECK (vote_decision IN ('innocent', 'guilty', 'inconclusive')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(case_id, juror_id)
);

-- RLS: 피고인은 자신의 케이스를 열람/수정(증거제출) 가능
ALTER TABLE public.jury_cases ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own cases" ON public.jury_cases FOR SELECT USING (auth.uid() = defendant_id);
CREATE POLICY "Users can upload evidence" ON public.jury_cases FOR UPDATE USING (auth.uid() = defendant_id);

-- Storage bucket for evidence (블랙박스)
INSERT INTO storage.buckets (id, name, public) 
VALUES ('evidence_videos', 'evidence_videos', false)
ON CONFLICT (id) DO NOTHING;

-- Storage RLS
CREATE POLICY "Users can upload their evidence" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'evidence_videos' AND auth.uid()::text = owner::text);
