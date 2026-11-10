import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

function enquiryApiPlugin() {
  return {
    name: 'enquiry-api-plugin',
    configureServer(server) {
      server.middlewares.use('/api/enquire', async (req, res) => {
        // Refresh environment variables from .env on every request
        const currentEnv = loadEnv('development', process.cwd(), '')
        Object.assign(process.env, currentEnv)

        if (req.method !== 'POST') {
          res.statusCode = 405
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ success: false, error: 'Method Not Allowed' }))
          return
        }
        try {
          const { processEnquiry } = await import('./api/enquire.js')
          let raw = ''
          req.on('data', (chunk) => {
            raw += chunk
          })
          req.on('end', async () => {
            let data = {}
            try {
              data = raw ? JSON.parse(raw) : {}
            } catch {
              res.statusCode = 400
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ success: false, error: 'Invalid JSON payload' }))
              return
            }
            const clientIp = req.socket?.remoteAddress || '127.0.0.1'
            const result = await processEnquiry(data, clientIp)
            res.statusCode = result.status
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify(result.body))
          })
        } catch (err) {
          console.error('[Vite Enquiry Middleware Error]', err)
          res.statusCode = 500
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ success: false, error: err.message }))
        }
      })
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  Object.assign(process.env, env)

  return {
    plugins: [react(), enquiryApiPlugin()],
    base: './',
  }
})
