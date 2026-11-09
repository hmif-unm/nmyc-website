-- ==========================================================
-- Schema Database Cloudflare D1 (SQLite)
-- Nusa Mandiri Youth Choir (NMYC)
-- ==========================================================

-- 1. Tabel Kunci Akses Admin
CREATE TABLE IF NOT EXISTS admin_keys (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  key_hash TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  created_at TEXT NOT NULL
);

-- 2. Tabel Galeri Kegiatan
CREATE TABLE IF NOT EXISTS galleries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  image TEXT NOT NULL,
  image_position TEXT DEFAULT 'center',
  description TEXT NOT NULL,
  full_description TEXT NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT
);
