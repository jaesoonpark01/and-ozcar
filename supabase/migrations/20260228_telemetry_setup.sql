-- 01. Telemetry Data Table with Native Partitioning
CREATE TABLE IF NOT EXISTS raw_telemetry (
    id BIGSERIAL,
    car_id UUID NOT NULL,
    session_id TEXT,
    recorded_at TIMESTAMPTZ NOT NULL,
    pid_data JSONB NOT NULL,
    PRIMARY KEY (id, recorded_at)
) PARTITION BY RANGE (recorded_at);

-- 02. Reward Logs for Assetization
CREATE TABLE IF NOT EXISTS reward_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    car_id UUID NOT NULL,
    amount NUMERIC(20, 8) NOT NULL,
    reason TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 03. Driving Reward RPC Function
CREATE OR REPLACE FUNCTION calculate_driving_reward(
    car_uuid UUID, 
    drive_seconds INT,
    safety_score FLOAT DEFAULT 1.0
) RETURNS VOID AS $$
DECLARE
    v_reward_per_sec NUMERIC := 0.001; -- Basic reward rate
    v_multiplier NUMERIC := 1.0;
BEGIN
    -- AI Insight: High safety score increases rewards
    IF safety_score >= 0.9 THEN
        v_multiplier := 1.2;
    END IF;

    INSERT INTO reward_logs (car_id, amount, reason)
    VALUES (
        car_uuid, 
        (drive_seconds * v_reward_per_sec) * v_multiplier, 
        'Telemetry-verified driving reward'
    );
END;
$$ LANGUAGE plpgsql;

-- 04. Anomaly Alerts Table
CREATE TABLE IF NOT EXISTS anomaly_alerts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    car_id UUID NOT NULL,
    severity TEXT CHECK (severity IN ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL')),
    alert_type TEXT NOT NULL,
    description TEXT,
    data_snapshot JSONB,
    is_resolved BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
