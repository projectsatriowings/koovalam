import http from 'node:http'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { processEnquiry } from './api/enquire.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 1. Load environment variables from .env if present
try {
  const envPath = path.resolve(__dirname, '.env')
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8')
    for (const line of envContent.split(/\r?\n/)) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith('#')) continue
      const eqIdx = trimmed.indexOf('=')
      if (eqIdx !== -1) {
        const key = trimmed.slice(0, eqIdx).trim()
        let val = trimmed.slice(eqIdx + 1).trim()
        val = val.replace(/^['"]|['"]$/g, '')
        if (key && !(key in process.env)) {
          process.env[key] = val
        }
      }
    }
  }
} catch (err) {
  console.warn('[Server] Could not load .env file:', err.message)
}

const PORT = parseInt(process.env.PORT, 10) || 3000
const DIST_DIR = path.resolve(__dirname, 'dist')

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
}

function parseJsonBody(req, limitBytes = 1024 * 1024) {
  return new Promise((resolve, reject) => {
    let size = 0
    let raw = ''
    req.on('data', (chunk) => {
      size += chunk.length
      if (size > limitBytes) {
        reject(new Error('Payload Too Large'))
        req.destroy()
        return
      }
      raw += chunk
    })
    req.on('end', () => {
      if (!raw) return resolve({})
      try {
        resolve(JSON.parse(raw))
      } catch {
        reject(new Error('Invalid JSON'))
      }
    })
    req.on('error', reject)
  })
}

const server = http.createServer(async (req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`)
  const pathname = parsedUrl.pathname

  // Security headers for all responses (CSP, HSTS, Sniff, Frame, Referrer)
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.setHeader('X-Frame-Options', 'SAMEORIGIN')
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin')
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload')
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: https: blob:; connect-src 'self'; frame-src 'self' https://www.google.com https://maps.google.com; object-src 'none'; base-uri 'self';"
  )

  // API 1: Health check
  if (pathname === '/api/health') {
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ status: 'ok', service: 'koovalam-server', timestamp: new Date().toISOString() }))
    return
  }

  // API 2: Enquiry submission
  if (pathname === '/api/enquire') {
    if (req.method !== 'POST') {
      res.statusCode = 405
      res.setHeader('Content-Type', 'application/json')
      res.setHeader('Allow', 'POST')
      res.end(JSON.stringify({ success: false, error: 'Method Not Allowed. Use POST.' }))
      return
    }

    try {
      const data = await parseJsonBody(req)
      const clientIp =
        req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
        req.socket?.remoteAddress ||
        '127.0.0.1'

      const result = await processEnquiry(data, clientIp)
      res.statusCode = result.status
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify(result.body))
    } catch (err) {
      const is413 = err.message === 'Payload Too Large'
      const is400 = err.message === 'Invalid JSON'
      res.statusCode = is413 ? 413 : is400 ? 400 : 500
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({ success: false, error: err.message }))
    }
    return
  }

  // Static files handling (from dist/)
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.statusCode = 405
    res.end('Method Not Allowed')
    return
  }

  // Safe file path resolution within DIST_DIR
  let safePath = path.normalize(pathname).replace(/^(\.\.[/\\])+/, '')
  let filePath = path.join(DIST_DIR, safePath)

  // Check if requested path points to an existing file
  let stat = null
  try {
    if (fs.existsSync(filePath)) {
      stat = fs.statSync(filePath)
      if (stat.isDirectory()) {
        filePath = path.join(filePath, 'index.html')
        stat = fs.existsSync(filePath) ? fs.statSync(filePath) : null
      }
    }
  } catch {}

  // SPA fallback: if file does not exist, serve index.html
  if (!stat) {
    filePath = path.join(DIST_DIR, 'index.html')
    try {
      stat = fs.existsSync(filePath) ? fs.statSync(filePath) : null
    } catch {}
  }

  if (!stat) {
    res.statusCode = 404
    res.setHeader('Content-Type', 'text/plain')
    res.end('404 Not Found. Please run `npm run build` to generate the dist/ directory.')
    return
  }

  const ext = path.extname(filePath).toLowerCase()
  const contentType = MIME_TYPES[ext] || 'application/octet-stream'

  // Caching policy: long cache for hashed assets, revalidate for HTML
  if (pathname.startsWith('/assets/')) {
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable')
  } else {
    res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate')
  }

  res.statusCode = 200
  res.setHeader('Content-Type', contentType)
  res.setHeader('Content-Length', stat.size)

  if (req.method === 'HEAD') {
    res.end()
    return
  }

  const stream = fs.createReadStream(filePath)
  stream.pipe(res)
  stream.on('error', (err) => {
    console.error('[Server] Stream error:', err)
    if (!res.headersSent) {
      res.statusCode = 500
      res.end('Internal Server Error')
    }
  })
})

server.listen(PORT, '0.0.0.0', () => {
  console.log(`[Koovalam Server] Running on http://0.0.0.0:${PORT} (Domain: koovalam.com)`)
})
