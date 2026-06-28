-- ============================================================
-- Kids City Website — site_images table setup
-- Run this SQL once in your Supabase SQL editor
-- ============================================================
-- This table stores per-key image overrides for home page sections.
-- The frontend falls back to the static /public/images/ files
-- if no row exists for a given key.

CREATE TABLE IF NOT EXISTS site_images (
  id          bigserial PRIMARY KEY,
  key         text      NOT NULL UNIQUE,   -- e.g. "hero_center", "category_festival"
  image_data  text      NOT NULL,          -- base64 data-URL string
  updated_at  timestamptz NOT NULL DEFAULT now()
);

-- Enable Row Level Security (but allow all reads and writes from the browser
-- since the app uses the publishable/anon key)
ALTER TABLE site_images ENABLE ROW LEVEL SECURITY;

-- Allow all SELECT (public read — home page components fetch images)
CREATE POLICY "allow_public_select" ON site_images
  FOR SELECT USING (true);

-- Allow all INSERT, UPDATE, DELETE (admin panel uses the same anon key)
-- In production you'd restrict this with a service key or auth check
CREATE POLICY "allow_all_write" ON site_images
  FOR ALL USING (true) WITH CHECK (true);

-- Optional: grant explicit privileges (usually not needed with RLS policies)
-- GRANT ALL ON site_images TO anon;
-- GRANT USAGE, SELECT ON SEQUENCE site_images_id_seq TO anon;
