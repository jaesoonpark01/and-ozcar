-- 01. Drive Sessions (Management Layer)
CREATE TABLE IF NOT EXISTS drive_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    car_id UUID NOT NULL REFERENCES vehicles(id) ON DELETE CASCADE,
    started_at TIMESTAMPTZ DEFAULT NOW(),
    ended_at TIMESTAMPTZ,
    total_distance_km NUMERIC(10, 2) DEFAULT 0,
    avg_safety_score FLOAT DEFAULT 1.0,
    is_assetized BOOLEAN DEFAULT FALSE,
    data_asset_grade TEXT CHECK (data_asset_grade IN ('DIAMOND', 'GOLD', 'SILVER', 'NONE')) DEFAULT 'NONE'
);

-- 02. OZP Token Wallets
CREATE TABLE IF NOT EXISTS ozp_wallets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL UNIQUE REFERENCES profiles(id) ON DELETE CASCADE,
    balance NUMERIC(20, 8) DEFAULT 0,
    staked_amount NUMERIC(20, 8) DEFAULT 0,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 03. Data Marketplace Campaigns
CREATE TABLE IF NOT EXISTS market_campaigns (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    buyer_name TEXT NOT NULL,
    reward_per_km NUMERIC(20, 8) NOT NULL,
    required_grade TEXT CHECK (required_grade IN ('DIAMOND', 'GOLD', 'SILVER')),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 04. Enhanced SUA Evidence Log
CREATE TABLE IF NOT EXISTS sua_evidence_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID NOT NULL REFERENCES drive_sessions(id) ON DELETE CASCADE,
    triggered_at TIMESTAMPTZ DEFAULT NOW(),
    rpm_value INT NOT NULL,
    speed_value INT NOT NULL,
    aps_value INT NOT NULL, -- Accelerator Pedal
    bps_value INT NOT NULL, -- Brake Pedal
    evidence_package_hash TEXT, -- Verification hash for court
    status TEXT DEFAULT 'PENDING_REVIEW'
);

-- Initial Marketplace Bounties
INSERT INTO market_campaigns (title, buyer_name, reward_per_km, required_grade)
VALUES 
('Safe Driving Study', 'Samsung Fire & Marine', 0.05, 'GOLD'),
('EV Efficiency Research', 'Hyundai Motors', 0.08, 'DIAMOND'),
('Urban Traffic Analysis', 'Seoul City', 0.02, 'SILVER');
