-- ============================================================
-- Kids City Website — callback_requests table setup
-- Run this SQL once in your Supabase SQL editor
-- ============================================================

CREATE TABLE IF NOT EXISTS callback_requests (
  id           bigserial PRIMARY KEY,
  phone        text      NOT NULL,
  product_name text      NOT NULL,
  source       text      NOT NULL DEFAULT 'product_detail_popup',
  created_at   timestamptz NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE callback_requests ENABLE ROW LEVEL SECURITY;

-- Allow public inserts (anonymous users submitting their number)
CREATE POLICY "allow_anon_insert" ON callback_requests
  FOR INSERT WITH CHECK (true);

-- Allow public select (required since the admin sheet page reads via anon key)
CREATE POLICY "allow_anon_select" ON callback_requests
  FOR SELECT USING (true);

-- Allow public deletes (required since the admin sheet page deletes logs via anon key)
CREATE POLICY "allow_anon_delete" ON callback_requests
  FOR DELETE USING (true);
