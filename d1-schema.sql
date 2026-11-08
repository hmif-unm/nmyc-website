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
  description TEXT NOT NULL,
  full_description TEXT NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT
);

-- ==========================================================
-- Seed Data Awal Galeri (Sumber Resmi GitHub NMYC)
-- ==========================================================
INSERT OR IGNORE INTO galleries (id, title, category, image, description, full_description, created_at)
VALUES
(
  1,
  'Lomba Peksimida - Solo Pop',
  'Lomba',
  'https://raw.githubusercontent.com/hmif-unm/nmyc-assets/main/lomba/Lomba%20Peksimida%20-%20Solo%20Pop.jpg',
  'Partisipasi kontingen NMYC dalam ajang kompetisi Peksimida tangkai Solo Pop membawakan aransemen vokal terbaik.',
  'Partisipasi kontingen Nusa Mandiri Youth Choir (NMYC) dalam ajang bergengsi Peksimida tangkai vokal Solo Pop. Penampilan ini menampilkan teknik vokal prima, penjiwaan mendalam, dan aransemen yang memukau dewan juri serta penonton.',
  '2024-08-10T10:00:00Z'
),
(
  2,
  'Lomba Seleksi Daerah',
  'Lomba',
  'https://raw.githubusercontent.com/hmif-unm/nmyc-assets/main/general/Sertijab.jpg',
  'Dokumentasi NMYC pada ajang seleksi daerah, menampilkan performa paduan suara terbaik.',
  'Nusa Mandiri Youth Choir mengikuti ajang seleksi paduan suara tingkat daerah dengan penuh dedikasi dan kekompakan tim vokal.',
  '2024-09-12T10:00:00Z'
),
(
  3,
  'Lomba di Kota Depok',
  'Lomba',
  'https://raw.githubusercontent.com/hmif-unm/nmyc-assets/main/penampilan/Penampilan%20Vocal%20Grub%20di%20wisuda%20ke%2037.jpg',
  'Penampilan tim vocal group NMYC dalam festival paduan suara di Kota Depok.',
  'Kompetisi paduan suara dan vocal group di tingkat Kota Depok yang mempertemukan berbagai kelompok paduan suara mahasiswa terbaik.',
  '2025-01-15T10:00:00Z'
),
(
  4,
  'Lomba Tingkat Depok',
  'Lomba',
  'https://raw.githubusercontent.com/hmif-unm/nmyc-assets/main/penampilan/Penampilan%20Solo%20Pria%20di%20Wisuda%20ke%2040.jpg',
  'Penampilan solois pria NMYC dalam ajang perlombaan vokal tingkat daerah di Depok.',
  'Solois pria NMYC tampil memukau membawakan lagu perlombaan dengan jangkauan vokal dan teknik vokal prima di hadapan dewan juri.',
  '2025-02-20T10:00:00Z'
),
(
  5,
  'Tampil di Serasi 2025',
  'Penampilan',
  'https://raw.githubusercontent.com/hmif-unm/nmyc-assets/main/penampilan/Tampil%20Pada%20saat%20Serasi%202025.jpg',
  'Meriahkan gelaran Seni dan Apresiasi Budaya (Serasi) 2025 dengan penampilan paduan suara yang kompak dan energik.',
  'NMYC mempersembahkan serangkaian lagu harmoni nusantara kontemporer dalam acara tahunan Pagelaran Seni dan Budaya (Serasi) 2025.',
  '2025-05-18T10:00:00Z'
),
(
  6,
  'Tampil di Serasi 2026',
  'Penampilan',
  'https://raw.githubusercontent.com/hmif-unm/nmyc-assets/main/penampilan/Tampil%20di%20Serasi%202026.jpg',
  'Penampilan spektakuler NMYC pada ajang Serasi 2026 dengan kostum ungu kebanggaan dan formasi lengkap.',
  'Penampilan spektakuler NMYC pada gelaran Serasi 2026 dengan kostum ungu identitas kebanggaan organisasi dan formasi vokal yang solid.',
  '2026-03-01T10:00:00Z'
),
(
  7,
  'Penampilan di JIF Sebelum Wisuda',
  'Penampilan',
  'https://raw.githubusercontent.com/hmif-unm/nmyc-assets/main/penampilan/Tampil%20di%20JIF%20sebelum%20Wisuda.jpg',
  'Pertunjukan musik vokal di panggung Jakarta Islamic Fair (JIF) menjelang agenda seremoni wisuda kampus.',
  'Tim NMYC tampil memukau mengisi panggung Jakarta Islamic Fair (JIF) dengan membawakan lagu-lagu harmoni penuh khidmat.',
  '2024-10-05T10:00:00Z'
),
(
  8,
  'Liwetan bersama Seluruh Anggota NMYC',
  'Kegiatan',
  'https://raw.githubusercontent.com/hmif-unm/nmyc-assets/main/general/Liwetan%20bersama%20seluruh%20anggota%20NMYC.jpg',
  'Tradisi santap bersama beralaskan daun pisang untuk mempererat tali persaudaraan dan kekeluargaan seluruh anggota.',
  'Kegiatan santap bersama (liwetan) seluruh keluarga besar Nusa Mandiri Youth Choir yang diselenggarakan untuk mempererat rasa kekeluargaan dan keakraban antar-angkatan.',
  '2025-07-22T10:00:00Z'
),
(
  9,
  'Penampilan Solo Wanita di Wisuda ke-40',
  'Penampilan',
  'https://raw.githubusercontent.com/hmif-unm/nmyc-assets/main/penampilan/Penampilan%20Solo%20Wanita%20di%20wisuda%20ke%2040.jpg',
  'Penampilan vokal solo wanita memukau para wisudawan dengan teknik vokal soprano yang anggun dan berkarakter.',
  'Penampilan solo wanita dari anggota berbakat NMYC pada wisuda ke-40 Universitas Nusa Mandiri dengan penghayatan mendalam.',
  '2024-11-14T10:00:00Z'
),
(
  10,
  'Foto Latihan Rutin',
  'Latihan',
  'https://raw.githubusercontent.com/hmif-unm/nmyc-assets/main/latihan/Foto%20Latihan.jpg',
  'Sesi latihan teknik pernapasan, intonasi, dinamika vokal, dan kekompakan paduan suara di bawah bimbingan pelatih.',
  'Sesi latihan rutin berkala anggota NMYC meliputi olah vokal, harmonisasi notasi per seksi suara (SATB), dan persiapan repertoar lagu.',
  '2025-04-10T10:00:00Z'
),
(
  11,
  'Tampil Pada Saat Event',
  'Penampilan',
  'https://raw.githubusercontent.com/hmif-unm/nmyc-assets/main/penampilan/Tampil%20pada%20saat%20event.jpg',
  'Ajang unjuk kemampuan vokal NMYC dalam berbagai pagelaran event kolaboratif kampus.',
  'Dokumentasi NMYC saat mengisi berbagai event resmi kampus maupun eksternal dengan performa paduan suara yang solid.',
  '2024-06-25T10:00:00Z'
);
