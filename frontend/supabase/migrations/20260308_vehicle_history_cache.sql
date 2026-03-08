-- Vehicle History Cache Table (referenced by VehicleService.ts)
-- Path: supabase/migrations/20260308_vehicle_history_cache.sql
-- Purpose: Cache blockchain vehicle history to reduce latency & RPC calls

CREATE TABLE IF NOT EXISTS public.vehicle_history_cache (
  vin TEXT PRIMARY KEY REFERENCES public.vehicles(vin) ON DELETE CASCADE,
  history_json JSONB NOT NULL DEFAULT '[]',
  last_synced TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- RLS: Public read (history is public data), no write from client
ALTER TABLE public.vehicle_history_cache ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Vehicle history cache is publicly readable"
  ON public.vehicle_history_cache FOR SELECT USING (true);

-- Only service role can write cache (via server-side API routes)
-- No INSERT/UPDATE policy = only service key can write

-- Index for fast VIN lookup
CREATE INDEX IF NOT EXISTS idx_vehicle_history_cache_vin 
  ON public.vehicle_history_cache(vin);

-- Index for finding stale caches (for background refresh jobs)
CREATE INDEX IF NOT EXISTS idx_vehicle_history_cache_synced 
  ON public.vehicle_history_cache(last_synced);
