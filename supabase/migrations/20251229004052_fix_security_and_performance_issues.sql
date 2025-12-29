/*
  # Fix security and performance issues

  1. Add Missing Indexes
    - Add index for reports.entitlement_id foreign key
    - Add index for transactions.entitlement_id foreign key

  2. Optimize RLS Policies
    - Replace auth.uid() with (select auth.uid()) for better performance
    - Apply to all affected policies

  3. Remove Duplicate Indexes
    - Drop duplicate indexes on rate_limit_events table

  4. Fix Function Search Path
    - Set stable search path for handle_new_user function
*/

CREATE INDEX IF NOT EXISTS idx_reports_entitlement_id ON reports(entitlement_id);
CREATE INDEX IF NOT EXISTS idx_transactions_entitlement_id ON transactions(entitlement_id);

DROP POLICY IF EXISTS "Users can read own profile" ON profiles;
CREATE POLICY "Users can read own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING ((select auth.uid()) = id);

DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING ((select auth.uid()) = id)
  WITH CHECK ((select auth.uid()) = id);

DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
CREATE POLICY "Users can insert own profile"
  ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK ((select auth.uid()) = id);

DROP POLICY IF EXISTS "Users can read own entitlements" ON entitlements;
CREATE POLICY "Users can read own entitlements"
  ON entitlements
  FOR SELECT
  TO authenticated
  USING ((select auth.uid()) = user_id);

DROP POLICY IF EXISTS "Users can read own reports" ON reports;
CREATE POLICY "Users can read own reports"
  ON reports
  FOR SELECT
  TO authenticated
  USING ((select auth.uid()) = user_id);

DROP POLICY IF EXISTS "Users can insert own reports" ON reports;
CREATE POLICY "Users can insert own reports"
  ON reports
  FOR INSERT
  TO authenticated
  WITH CHECK ((select auth.uid()) = user_id);

DROP POLICY IF EXISTS "Users can read own transactions" ON transactions;
CREATE POLICY "Users can read own transactions"
  ON transactions
  FOR SELECT
  TO authenticated
  USING ((select auth.uid()) = user_id);

DROP INDEX IF EXISTS idx_rate_limit_ip;
DROP INDEX IF EXISTS idx_rate_limit_created;

CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', '')
  );
  RETURN NEW;
END;
$$;