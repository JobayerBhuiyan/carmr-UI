/*
  # Create reports table

  1. New Tables
    - `reports`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `vin` (text) - Vehicle Identification Number
      - `report_data` (jsonb) - Full report data from Auto Data Direct
      - `status` (text) - 'pending', 'completed', 'failed'
      - `entitlement_id` (uuid) - Which entitlement was used
      - `created_at` (timestamptz)
      - `expires_at` (timestamptz) - When cached report expires

  2. Security
    - Enable RLS on `reports` table
    - Users can only read their own reports
*/

CREATE TABLE IF NOT EXISTS reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  vin text NOT NULL,
  license_plate text,
  license_state text,
  report_data jsonb,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed')),
  error_message text,
  entitlement_id uuid REFERENCES entitlements(id),
  source text DEFAULT 'auto_data_direct',
  created_at timestamptz DEFAULT now(),
  expires_at timestamptz DEFAULT (now() + interval '30 days')
);

CREATE INDEX idx_reports_user_id ON reports(user_id);
CREATE INDEX idx_reports_vin ON reports(vin);
CREATE INDEX idx_reports_created_at ON reports(created_at DESC);
CREATE INDEX idx_reports_user_vin ON reports(user_id, vin);

ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own reports"
  ON reports
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own reports"
  ON reports
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Service role can manage reports"
  ON reports
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);
