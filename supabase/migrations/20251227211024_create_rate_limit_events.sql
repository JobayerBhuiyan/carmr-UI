/*
  # Create rate limit events table for tracking API usage

  1. New Tables
    - `rate_limit_events`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles, nullable for anonymous)
      - `ip_address` (text)
      - `endpoint` (text)
      - `blocked` (boolean)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS
    - Only service role can manage
*/

CREATE TABLE IF NOT EXISTS rate_limit_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE SET NULL,
  ip_address text,
  endpoint text NOT NULL,
  blocked boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX idx_rate_limit_ip ON rate_limit_events(ip_address);
CREATE INDEX idx_rate_limit_created ON rate_limit_events(created_at DESC);

ALTER TABLE rate_limit_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role manages rate limits"
  ON rate_limit_events
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);