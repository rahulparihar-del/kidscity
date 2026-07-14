-- ============================================================
-- Kids City Website — customer_inquiries table setup
-- Run this SQL once in your Supabase SQL editor
-- ============================================================
-- This table stores customer cart inquiries and direct orders.

CREATE TABLE IF NOT EXISTS customer_inquiries (
  id           bigserial PRIMARY KEY,
  inquiry_id   text      NOT NULL,
  name         text      NOT NULL,
  phone        text      NOT NULL,
  items        jsonb     NOT NULL, -- Array of items: [{id, name, price, size, img, category}]
  total_price  text      NOT NULL,
  created_at   timestamptz NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE customer_inquiries ENABLE ROW LEVEL SECURITY;

-- Allow public inserts (anonymous checkout/inquiry submission)
CREATE POLICY "allow_anon_insert" ON customer_inquiries
  FOR INSERT WITH CHECK (true);

-- Allow public select (required since the admin console reads it)
CREATE POLICY "allow_anon_select" ON customer_inquiries
  FOR SELECT USING (true);

-- Allow public deletes (required since the admin console deletes entries)
CREATE POLICY "allow_anon_delete" ON customer_inquiries
  FOR DELETE USING (true);
