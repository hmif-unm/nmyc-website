import crypto from 'node:crypto'
import path from 'node:path'
import fs from 'node:fs'
import os from 'node:os'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)

export type GalleryCategory = 'Lomba' | 'Penampilan' | 'Latihan' | 'Kegiatan'

export interface GalleryItem {
  id: number
  title: string
  category: GalleryCategory
  image: string
  imagePosition?: string
  description: string
  fullDescription: string
  createdAt?: string
  updatedAt?: string
}

export function hashKey(rawKey: string): string {
  return crypto.createHash('sha256').update(rawKey.trim()).digest('hex')
}

export const seedItems = [
  {
    title: 'Lomba Peksimida - Solo Pop',
    category: 'Lomba',
    image: 'https://raw.githubusercontent.com/hmif-unm/nmyc-assets/main/lomba/Lomba%20Peksimida%20-%20Solo%20Pop.jpg',
    description: 'Partisipasi kontingen NMYC dalam ajang kompetisi Peksimida tangkai Solo Pop membawakan aransemen vokal terbaik.',
    full_description: 'Partisipasi kontingen Nusa Mandiri Youth Choir (NMYC) dalam ajang bergengsi Peksimida tangkai vokal Solo Pop. Penampilan ini menampilkan teknik vokal prima, penjiwaan mendalam, dan aransemen yang memukau dewan juri serta penonton.',
    created_at: '2024-08-10T10:00:00Z'
  },
  {
    title: 'Lomba Seleksi Daerah',
    category: 'Lomba',
    image: 'https://raw.githubusercontent.com/hmif-unm/nmyc-assets/main/general/Sertijab.jpg',
    description: 'Dokumentasi NMYC pada ajang seleksi daerah, menampilkan performa paduan suara terbaik.',
    full_description: 'Nusa Mandiri Youth Choir mengikuti ajang seleksi paduan suara tingkat daerah dengan penuh dedikasi dan kekompakan tim vokal.',
    created_at: '2024-09-12T10:00:00Z'
  },
  {
    title: 'Lomba di Kota Depok',
    category: 'Lomba',
    image: 'https://raw.githubusercontent.com/hmif-unm/nmyc-assets/main/penampilan/Penampilan%20Vocal%20Grub%20di%20wisuda%20ke%2037.jpg',
    description: 'Penampilan tim vocal group NMYC dalam festival paduan suara di Kota Depok.',
    full_description: 'Kompetisi paduan suara dan vocal group di tingkat Kota Depok yang mempertemukan berbagai kelompok paduan suara mahasiswa terbaik.',
    created_at: '2025-01-15T10:00:00Z'
  },
  {
    title: 'Lomba Tingkat Depok',
    category: 'Lomba',
    image: 'https://raw.githubusercontent.com/hmif-unm/nmyc-assets/main/penampilan/Penampilan%20Solo%20Pria%20di%20Wisuda%20ke%2040.jpg',
    description: 'Penampilan solois pria NMYC dalam ajang perlombaan vokal tingkat daerah di Depok.',
    full_description: 'Solois pria NMYC tampil memukau membawakan lagu perlombaan dengan jangkauan vokal dan teknik vokal prima di hadapan dewan juri.',
    created_at: '2025-02-20T10:00:00Z'
  },
  {
    title: 'Tampil di Serasi 2025',
    category: 'Penampilan',
    image: 'https://raw.githubusercontent.com/hmif-unm/nmyc-assets/main/penampilan/Tampil%20Pada%20saat%20Serasi%202025.jpg',
    description: 'Meriahkan gelaran Seni dan Apresiasi Budaya (Serasi) 2025 dengan penampilan paduan suara yang kompak dan energik.',
    full_description: 'NMYC mempersembahkan serangkaian lagu harmoni nusantara kontemporer dalam acara tahunan Pagelaran Seni dan Budaya (Serasi) 2025.',
    created_at: '2025-05-18T10:00:00Z'
  },
  {
    title: 'Tampil di Serasi 2026',
    category: 'Penampilan',
    image: 'https://raw.githubusercontent.com/hmif-unm/nmyc-assets/main/penampilan/Tampil%20di%20Serasi%202026.jpg',
    description: 'Penampilan spektakuler NMYC pada ajang Serasi 2026 dengan kostum ungu kebanggaan dan formasi lengkap.',
    full_description: 'Penampilan spektakuler NMYC pada gelaran Serasi 2026 dengan kostum ungu identitas kebanggaan organisasi dan formasi vokal yang solid.',
    created_at: '2026-03-01T10:00:00Z'
  },
  {
    title: 'Penampilan di JIF Sebelum Wisuda',
    category: 'Penampilan',
    image: 'https://raw.githubusercontent.com/hmif-unm/nmyc-assets/main/penampilan/Tampil%20di%20JIF%20sebelum%20Wisuda.jpg',
    image_position: '{"x":50,"y":18,"scale":1.2}',
    description: 'Pertunjukan musik vokal di panggung Jakarta Islamic Fair (JIF) menjelang agenda seremoni wisuda kampus.',
    full_description: 'Tim NMYC tampil memukau mengisi panggung Jakarta Islamic Fair (JIF) dengan membawakan lagu-lagu harmoni penuh khidmat.',
    created_at: '2024-10-05T10:00:00Z'
  },
  {
    title: 'Liwetan bersama Seluruh Anggota NMYC',
    category: 'Kegiatan',
    image: 'https://raw.githubusercontent.com/hmif-unm/nmyc-assets/main/general/Liwetan%20bersama%20seluruh%20anggota%20NMYC.jpg',
    description: 'Tradisi santap bersama beralaskan daun pisang untuk mempererat tali persaudaraan dan kekeluargaan seluruh anggota.',
    full_description: 'Kegiatan santap bersama (liwetan) seluruh keluarga besar Nusa Mandiri Youth Choir yang diselenggarakan untuk mempererat rasa kekeluargaan dan keakraban antar-angkatan.',
    created_at: '2025-07-22T10:00:00Z'
  },
  {
    title: 'Penampilan Solo Wanita di Wisuda ke-40',
    category: 'Penampilan',
    image: 'https://raw.githubusercontent.com/hmif-unm/nmyc-assets/main/penampilan/Penampilan%20Solo%20Wanita%20di%20wisuda%20ke%2040.jpg',
    description: 'Penampilan vokal solo wanita memukau para wisudawan dengan teknik vokal soprano yang anggun dan berkarakter.',
    full_description: 'Penampilan solo wanita dari anggota berbakat NMYC pada wisuda ke-40 Universitas Nusa Mandiri dengan penghayatan mendalam.',
    created_at: '2024-11-14T10:00:00Z'
  },
  {
    title: 'Foto Latihan Rutin',
    category: 'Latihan',
    image: 'https://raw.githubusercontent.com/hmif-unm/nmyc-assets/main/latihan/Foto%20Latihan.jpg',
    description: 'Sesi latihan teknik pernapasan, intonasi, dinamika vokal, dan kekompakan paduan suara di bawah bimbingan pelatih.',
    full_description: 'Sesi latihan rutin berkala anggota NMYC meliputi olah vokal, harmonisasi notasi per seksi suara (SATB), dan persiapan repertoar lagu.',
    created_at: '2025-04-10T10:00:00Z'
  },
  {
    title: 'Tampil Pada Saat Event',
    category: 'Penampilan',
    image: 'https://raw.githubusercontent.com/hmif-unm/nmyc-assets/main/penampilan/Tampil%20pada%20saat%20event.jpg',
    description: 'Ajang unjuk kemampuan vokal NMYC dalam berbagai pagelaran event kolaboratif kampus.',
    full_description: 'Dokumentasi NMYC saat mengisi berbagai event resmi kampus maupun eksternal dengan performa paduan suara yang solid.',
    created_at: '2024-06-25T10:00:00Z'
  }
]

export function getD1Config() {
  const accountId =
    process.env.CLOUDFLARE_ACCOUNT_ID || process.env.CF_ACCOUNT_ID
  const databaseId =
    process.env.CLOUDFLARE_DATABASE_ID ||
    process.env.CLOUDFLARE_D1_DATABASE_ID ||
    process.env.CF_DATABASE_ID
  const apiToken =
    process.env.CLOUDFLARE_D1_API_TOKEN ||
    process.env.CLOUDFLARE_API_TOKEN ||
    process.env.CF_D1_API_TOKEN

  return { accountId, databaseId, apiToken }
}

export function isCloudflareD1Configured(): boolean {
  const { accountId, databaseId, apiToken } = getD1Config()
  return Boolean(accountId && databaseId && apiToken)
}

export async function executeD1Query<T = any>(
  sql: string,
  params: any[] = []
): Promise<{ results: T[]; meta: any }> {
  const { accountId, databaseId, apiToken } = getD1Config()

  if (!accountId || !databaseId || !apiToken) {
    throw new Error('Kredensial Cloudflare D1 belum lengkap.')
  }

  const endpoint = `https://api.cloudflare.com/client/v4/accounts/${accountId}/d1/database/${databaseId}/query`

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ sql, params })
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Cloudflare D1 HTTP ${response.status}: ${errorText}`)
  }

  const json: any = await response.json()
  if (!json.success) {
    const errorDetails = json.errors?.map((e: any) => e.message).join(', ') || 'Query failed'
    throw new Error(`Cloudflare D1 Error: ${errorDetails}`)
  }

  const firstResult = json.result?.[0]
  return {
    results: firstResult?.results || [],
    meta: firstResult?.meta || {}
  }
}

// ========================
// ENGINE LOCAL SQLITE FALLBACK
// ========================
let localDbInstance: any = null

function getLocalDb() {
  if (localDbInstance) return localDbInstance

  const { DatabaseSync } = require('node:sqlite')
  const isVercel = process.env.VERCEL === '1'
  const DATA_DIR = isVercel ? os.tmpdir() : path.resolve(process.cwd(), 'backend/data')

  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true })
  }

  const DB_PATH = path.join(DATA_DIR, 'nmyc.db')
  localDbInstance = new DatabaseSync(DB_PATH)
  return localDbInstance
}

function initLocalDatabase() {
  const db = getLocalDb()

  db.exec(`
    CREATE TABLE IF NOT EXISTS admin_keys (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      key_hash TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      created_at TEXT NOT NULL
    );
  `)

  db.exec(`
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
  `)

  // Migrasi kolom jika tabel lama belum memiliki image_position
  try {
    db.exec("ALTER TABLE galleries ADD COLUMN image_position TEXT DEFAULT 'center'")
  } catch {}

  // Update fokus posisi untuk Penampilan di JIF Sebelum Wisuda jika masih default
  try {
    db.prepare("UPDATE galleries SET image_position = '{\"x\":50,\"y\":18,\"scale\":1.2}' WHERE title LIKE '%JIF%' AND (image_position IS NULL OR image_position = 'center' OR image_position = 'center 15%')").run()
  } catch {}

  const keyCount = db.prepare('SELECT COUNT(*) as count FROM admin_keys').get() as { count: number }
  if (keyCount.count === 0) {
    const defaultKey = process.env.ADMIN_KEY || 'nmyc-admin-secret-2026'
    const keyHash = hashKey(defaultKey)
    const insertKey = db.prepare('INSERT INTO admin_keys (key_hash, name, created_at) VALUES (?, ?, ?)')
    insertKey.run(keyHash, 'Admin Utama', new Date().toISOString())
  }

  const galleryCount = db.prepare('SELECT COUNT(*) as count FROM galleries').get() as { count: number }
  if (galleryCount.count === 0) {
    const insertGallery = db.prepare(`
      INSERT INTO galleries (title, category, image, image_position, description, full_description, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `)

    for (const item of seedItems) {
      insertGallery.run(
        item.title,
        item.category,
        item.image,
        (item as any).image_position || 'center',
        item.description,
        item.full_description,
        item.created_at
      )
    }
  }
}

async function initD1Database() {
  await executeD1Query(`
    CREATE TABLE IF NOT EXISTS admin_keys (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      key_hash TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      created_at TEXT NOT NULL
    );
  `)

  await executeD1Query(`
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
  `)

  // Migrasi kolom image_position di D1 jika belum ada
  try {
    await executeD1Query("ALTER TABLE galleries ADD COLUMN image_position TEXT DEFAULT 'center'")
  } catch {}

  // Update fokus posisi untuk Penampilan di JIF Sebelum Wisuda jika masih default
  try {
    await executeD1Query("UPDATE galleries SET image_position = 'center 15%' WHERE title LIKE '%JIF%' AND (image_position IS NULL OR image_position = 'center')")
  } catch {}

  const keyCountRes = await executeD1Query<{ count: number }>('SELECT COUNT(*) as count FROM admin_keys')
  const keyCount = keyCountRes.results[0]?.count || 0
  if (keyCount === 0) {
    const defaultKey = process.env.ADMIN_KEY || 'nmyc-admin-secret-2026'
    const keyHash = hashKey(defaultKey)
    await executeD1Query(
      'INSERT INTO admin_keys (key_hash, name, created_at) VALUES (?, ?, ?)',
      [keyHash, 'Admin Utama', new Date().toISOString()]
    )
  }

  const galleryCountRes = await executeD1Query<{ count: number }>('SELECT COUNT(*) as count FROM galleries')
  const galleryCount = galleryCountRes.results[0]?.count || 0
  if (galleryCount === 0) {
    for (const item of seedItems) {
      await executeD1Query(
        `INSERT INTO galleries (title, category, image, image_position, description, full_description, created_at)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [item.title, item.category, item.image, (item as any).image_position || 'center', item.description, item.full_description, item.created_at]
      )
    }
  }
}

let isDatabaseReady = false
let initPromise: Promise<void> | null = null

export async function ensureDatabase(): Promise<void> {
  if (isDatabaseReady) return
  if (initPromise) return initPromise

  initPromise = (async () => {
    try {
      if (isCloudflareD1Configured()) {
        await initD1Database()
      } else {
        initLocalDatabase()
      }
      isDatabaseReady = true
    } catch (err) {
      console.error('Database init error:', err)
      throw err
    }
  })()

  return initPromise
}

interface DbGalleryRow {
  id: number
  title: string
  category: string
  image: string
  image_position?: string | null
  description: string
  full_description: string
  created_at: string
  updated_at: string | null
}

function mapRowToGalleryItem(row: DbGalleryRow): GalleryItem {
  return {
    id: row.id,
    title: row.title,
    category: row.category as GalleryCategory,
    image: row.image,
    imagePosition: row.image_position || 'center',
    description: row.description,
    fullDescription: row.full_description,
    createdAt: row.created_at,
    updatedAt: row.updated_at || undefined
  }
}

export async function verifyAdminKey(rawKey: string): Promise<boolean> {
  if (!rawKey || typeof rawKey !== 'string') return false
  await ensureDatabase()

  const hashed = hashKey(rawKey)

  if (isCloudflareD1Configured()) {
    const res = await executeD1Query<{ id: number }>('SELECT id FROM admin_keys WHERE key_hash = ?', [hashed])
    return res.results.length > 0
  }

  const db = getLocalDb()
  const stmt = db.prepare('SELECT id, name FROM admin_keys WHERE key_hash = ?')
  const result = stmt.get(hashed)
  return !!result
}

export async function getAllGalleries(category?: string, search?: string): Promise<GalleryItem[]> {
  await ensureDatabase()

  let query = 'SELECT * FROM galleries'
  const params: any[] = []
  const conditions: string[] = []

  if (category && category !== 'Semua') {
    conditions.push('LOWER(category) = LOWER(?)')
    params.push(category)
  }

  if (search && search.trim()) {
    conditions.push('(LOWER(title) LIKE LOWER(?) OR LOWER(description) LIKE LOWER(?))')
    const term = `%${search.trim()}%`
    params.push(term, term)
  }

  if (conditions.length > 0) {
    query += ' WHERE ' + conditions.join(' AND ')
  }

  query += ' ORDER BY id DESC'

  if (isCloudflareD1Configured()) {
    const res = await executeD1Query<DbGalleryRow>(query, params)
    return res.results.map(mapRowToGalleryItem)
  }

  const db = getLocalDb()
  const stmt = db.prepare(query)
  const rows = stmt.all(...params) as unknown as DbGalleryRow[]
  return rows.map(mapRowToGalleryItem)
}

export async function getGalleryById(id: number): Promise<GalleryItem | null> {
  await ensureDatabase()

  if (isCloudflareD1Configured()) {
    const res = await executeD1Query<DbGalleryRow>('SELECT * FROM galleries WHERE id = ?', [id])
    const row = res.results[0]
    return row ? mapRowToGalleryItem(row) : null
  }

  const db = getLocalDb()
  const stmt = db.prepare('SELECT * FROM galleries WHERE id = ?')
  const row = stmt.get(id) as unknown as DbGalleryRow | undefined
  if (!row) return null
  return mapRowToGalleryItem(row)
}

export async function insertGallery(data: {
  title: string
  category: GalleryCategory
  image: string
  imagePosition?: string
  description: string
  fullDescription: string
  createdAt?: string
}): Promise<GalleryItem> {
  await ensureDatabase()
  const createdAt = data.createdAt || new Date().toISOString()
  const imagePosition = data.imagePosition || 'center'

  if (isCloudflareD1Configured()) {
    const res = await executeD1Query(
      `INSERT INTO galleries (title, category, image, image_position, description, full_description, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [data.title, data.category, data.image, imagePosition, data.description, data.fullDescription, createdAt]
    )

    const newId = Number(res.meta?.last_row_id)
    const inserted = await getGalleryById(newId)
    return inserted!
  }

  const db = getLocalDb()
  const stmt = db.prepare(`
    INSERT INTO galleries (title, category, image, image_position, description, full_description, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `)

  const res = stmt.run(
    data.title,
    data.category,
    data.image,
    imagePosition,
    data.description,
    data.fullDescription,
    createdAt
  )

  const newId = Number(res.lastInsertRowid)
  const inserted = await getGalleryById(newId)
  return inserted!
}

export async function updateGalleryInDb(
  id: number,
  data: Partial<{
    title: string
    category: GalleryCategory
    image: string
    imagePosition: string
    description: string
    fullDescription: string
    createdAt?: string
  }>
): Promise<GalleryItem | null> {
  await ensureDatabase()
  const existing = await getGalleryById(id)
  if (!existing) return null

  const updatedTitle = data.title !== undefined ? data.title : existing.title
  const updatedCategory = data.category !== undefined ? data.category : existing.category
  const updatedImage = data.image !== undefined ? data.image : existing.image
  const updatedImagePosition = data.imagePosition !== undefined ? data.imagePosition : (existing.imagePosition || 'center')
  const updatedDesc = data.description !== undefined ? data.description : existing.description
  const updatedFullDesc = data.fullDescription !== undefined ? data.fullDescription : existing.fullDescription
  const updatedCreatedAt = data.createdAt !== undefined ? data.createdAt : existing.createdAt
  const updatedAt = new Date().toISOString()

  if (isCloudflareD1Configured()) {
    await executeD1Query(
      `UPDATE galleries
       SET title = ?, category = ?, image = ?, image_position = ?, description = ?, full_description = ?, created_at = ?, updated_at = ?
       WHERE id = ?`,
      [
        updatedTitle,
        updatedCategory,
        updatedImage,
        updatedImagePosition,
        updatedDesc,
        updatedFullDesc,
        updatedCreatedAt || new Date().toISOString(),
        updatedAt,
        id
      ]
    )

    return getGalleryById(id)
  }

  const db = getLocalDb()
  const stmt = db.prepare(`
    UPDATE galleries
    SET title = ?, category = ?, image = ?, image_position = ?, description = ?, full_description = ?, created_at = ?, updated_at = ?
    WHERE id = ?
  `)

  stmt.run(
    updatedTitle,
    updatedCategory,
    updatedImage,
    updatedImagePosition,
    updatedDesc,
    updatedFullDesc,
    updatedCreatedAt || new Date().toISOString(),
    updatedAt,
    id
  )

  return getGalleryById(id)
}

export async function deleteGalleryFromDb(id: number): Promise<boolean> {
  await ensureDatabase()

  if (isCloudflareD1Configured()) {
    const res = await executeD1Query('DELETE FROM galleries WHERE id = ?', [id])
    return Number(res.meta?.changes || 0) > 0
  }

  const db = getLocalDb()
  const stmt = db.prepare('DELETE FROM galleries WHERE id = ?')
  const res = stmt.run(id)
  return Number(res.changes) > 0
}
