/*
  # Create entitlements table

  1. New Tables
    - `entitlements`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `type` (text) - 'credits', 'pass', 'subscription'
      - `credits_remaining` (integer) - for credit packs
      - `expires_at` (timestamptz) - for passes/subscriptions
      - `stripe_subscription_id` (text) - for recurring subscriptions
      - `stripe_customer_id` (text) - Stripe customer reference
      - `plan_name` (text) - 'single', '5-pack', '20-pack', '3-day-pass', 'monthly'
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `entitlements` table
    - Users can only read their own entitlements
*/

CREATE TABLE IF NOT EXISTS entitlements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  type text NOT NULL CHECK (type IN ('credits', 'pass', 'subscription')),
  credits_remaining integer DEFAULT 0,
  expires_at timestamptz,
  stripe_subscription_id text,
  stripe_customer_id text,
  plan_name text NOT NULL,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX idx_entitlements_user_id ON entitlements(user_id);
CREATE INDEX idx_entitlements_stripe_subscription_id ON entitlements(stripe_subscription_id);
CREATE INDEX idx_entitlements_active ON entitlements(user_id, is_active) WHERE is_active = true;

ALTER TABLE entitlements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own entitlements"
  ON entitlements
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Service role can manage entitlements"
  ON entitlements
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);