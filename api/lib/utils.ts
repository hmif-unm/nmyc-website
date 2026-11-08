export function setCorsHeaders(res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
}

export function sendJson(res: any, statusCode: number, data: any) {
  setCorsHeaders(res)
  if (typeof res.status === 'function' && typeof res.json === 'function') {
    return res.status(statusCode).json(data)
  }
  res.statusCode = statusCode
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(data))
}

export async function parseBody(req: any): Promise<any> {
  if (req.body && typeof req.body === 'object') {
    return req.body
  }
  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body)
    } catch {
      return {}
    }
  }

  return new Promise((resolve) => {
    let body = ''
    req.on('data', (chunk: any) => {
      body += chunk.toString()
    })
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {})
      } catch {
        resolve({})
      }
    })
    req.on('error', () => {
      resolve({})
    })
  })
}

export function normalizeGitHubUrl(url?: string): string {
  if (!url || typeof url !== 'string') return ''
  const cleanUrl = url.trim()

  const githubBlobRegex = /^https?:\/\/github\.com\/([^/]+)\/([^/]+)\/blob\/([^/]+)\/(.+)$/i
  const matchBlob = cleanUrl.match(githubBlobRegex)
  if (matchBlob) {
    return `https://raw.githubusercontent.com/${matchBlob[1]}/${matchBlob[2]}/${matchBlob[3]}/${matchBlob[4]}`
  }

  const githubRawRegex = /^https?:\/\/github\.com\/([^/]+)\/([^/]+)\/raw\/([^/]+)\/(.+)$/i
  const matchRaw = cleanUrl.match(githubRawRegex)
  if (matchRaw) {
    return `https://raw.githubusercontent.com/${matchRaw[1]}/${matchRaw[2]}/${matchRaw[3]}/${matchRaw[4]}`
  }

  if (!cleanUrl.startsWith('http://') && !cleanUrl.startsWith('https://') && !cleanUrl.startsWith('/')) {
    return `https://raw.githubusercontent.com/hmif-unm/nmyc-assets/main/${cleanUrl}`
  }

  return cleanUrl
}
