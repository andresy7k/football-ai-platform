-- Create analyses table for storing AI-generated predictions

CREATE TABLE IF NOT EXISTS analyses (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  match_id        UUID NOT NULL,
  confidence      INT NOT NULL CHECK (confidence >= 0 AND confidence <= 100),
  predicted_winner TEXT,
  recommended_bet  TEXT,
  risk_score       INT NOT NULL DEFAULT 50 CHECK (risk_score >= 0 AND risk_score <= 100),
  quick_analysis   TEXT NOT NULL,
  deep_analysis    JSONB,
  odds_snapshot    JSONB,
  model_version    TEXT,
  generated_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(match_id)
);

-- Index for quick match lookup
CREATE INDEX IF NOT EXISTS idx_analyses_match ON analyses(match_id);
CREATE INDEX IF NOT EXISTS idx_analyses_generated ON analyses(generated_at DESC);

-- Row Level Security
ALTER TABLE analyses ENABLE ROW LEVEL SECURITY;

-- Authenticated users can read all analyses
CREATE POLICY "analyses_select_auth" ON analyses
  FOR SELECT USING (auth.role() = 'authenticated');

-- Service role can insert/update (cron pipeline)
CREATE POLICY "analyses_insert_service" ON analyses
  FOR INSERT WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "analyses_update_service" ON analyses
  FOR UPDATE USING (auth.role() = 'service_role');
