// ==========================================================
// Cloudflare D1 (SQLite) REST API Client
// Memungkinkan koneksi langsung ke Cloudflare D1 dari Vercel
// Serverless Functions tanpa native binary / file system lokal
// ==========================================================

export interface D1QueryMeta {
  duration?: number
  changes?: number
  last_row_id?: number
  changed_db?: boolean
  size_after?: number
  rows_read?: number
  rows_written?: number
}

export interface D1QueryResult<T = any> {
  results: T[]
  success: boolean
  meta?: D1QueryMeta
}

export interface D1ApiResponse<T = any> {
  result: D1QueryResult<T>[]
  success: boolean
  errors: Array<{ code: number; message: string }>
  messages: string[]
}

export function getD1Config() {
  const accountId =
    process.env.CLOUDFLARE_ACCOUNT_ID ||
    process.env.CF_ACCOUNT_ID

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
): Promise<D1QueryResult<T>> {
  const { accountId, databaseId, apiToken } = getD1Config()

  if (!accountId || !databaseId || !apiToken) {
    throw new Error(
      'Kredensial Cloudflare D1 belum lengkap. Pastikan CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_DATABASE_ID, dan CLOUDFLARE_D1_API_TOKEN telah disetel.'
    )
  }

  const endpoint = `https://api.cloudflare.com/client/v4/accounts/${accountId}/d1/database/${databaseId}/query`

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ sql, params })
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Cloudflare D1 HTTP ${response.status}: ${errorText}`)
  }

  const json = (await response.json()) as D1ApiResponse<T>

  if (!json.success) {
    const errorDetails = json.errors?.map((e) => e.message).join(', ') || 'Query failed'
    throw new Error(`Cloudflare D1 Error: ${errorDetails}`)
  }

  const firstResult = json.result?.[0]
  return (
    firstResult || {
      results: [],
      success: true,
      meta: {}
    }
  )
}
