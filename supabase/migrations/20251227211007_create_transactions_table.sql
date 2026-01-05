/*
  # Create transactions table for idempotency

  1. New Tables
    - `transactions`
      - `id` (uuid, primary key)
      - `stripe_event_id` (text, unique) - For idempotency
      - `stripe_payment_intent_id` (text)
      - `user_id` (uuid, references profiles)
      - `amount` (integer) - Amount in cents
      - `currency` (text)
      - `status` (text) - 'pending', 'completed', 'failed', 'refunded'
      - `plan_name` (text)
      - `entitlement_id` (uuid) - Created entitlement
      - `metadata` (jsonb)
      - `processed_at` (timestamptz)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on `transactions` table
    - Users can read their own transactions
    - Service role handles all writes
*/

CREATE TABLE IF NOT EXISTS transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  stripe_event_id text UNIQUE NOT NULL,
  stripe_payment_intent_id text,
  stripe_checkout_session_id text,
  user_id uuid REFERENCES profiles(id) ON DELETE SET NULL,
  amount integer NOT NULL,
  currency text DEFAULT 'usd',
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
  plan_name text,
  entitlement_id uuid REFERENCES entitlements(id),
  metadata jsonb DEFAULT '{}',
  processed_at timestamptz,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX idx_transactions_stripe_event_id ON transactions(stripe_event_id);
CREATE INDEX idx_transactions_user_id ON transactions(user_id);
CREATE INDEX idx_transactions_status ON transactions(status);
CREATE INDEX idx_transactions_payment_intent ON transactions(stripe_payment_intent_id);

ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own transactions"
  ON transactions
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Service role can manage transactions"
  ON transactions
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);
