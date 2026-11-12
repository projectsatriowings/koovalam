/**
 * Koovalam Kerala Retreat — Production Email Enquiry Handler
 * Compatible with Vercel Serverless Functions, Netlify Functions, and Node HTTP servers.
 *
 * Supported Email Transports:
 * 1. Gmail SMTP (Recommended): Set GMAIL_APP_PASSWORD and GMAIL_USER (defaults to info.koovalam@gmail.com).
 * 2. Resend API: Set EMAIL_API_KEY (re_...).
 *
 * Environment variables:
 * - CLIENT_ENQUIRY_EMAIL: Recipient email address (defaults to info.koovalam@gmail.com).
 * - GMAIL_USER: Gmail account username (defaults to info.koovalam@gmail.com).
 * - GMAIL_APP_PASSWORD / SMTP_PASS: 16-character Google App Password.
 * - EMAIL_API_KEY: Resend API key (optional alternative).
 */

import nodemailer from 'nodemailer'
import fs from 'fs'
import path from 'path'

function readEnvVar(key, fallback = '') {
  // Read directly from .env on disk so updates are immediate even if dev server process has stale process.env
  try {
    const envPath = path.resolve(process.cwd(), '.env')
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, 'utf8')
      const match = content.match(new RegExp(`^${key}=(.*)$`, 'm'))
      if (match && match[1]) {
        const val = match[1].trim().replace(/^['"]|['"]$/g, '')
        if (val && !val.includes('your_16_digit')) return val
      }
    }
  } catch {}
  return process.env[key] || fallback
}

// Basic in-memory rate limiting map (IP -> array of request timestamps)
const rateLimitMap = new Map()
const RATE_LIMIT_WINDOW_MS = 60 * 1000 // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5

function isRateLimited(ip) {
  if (!ip) return false
  const now = Date.now()
  const timestamps = rateLimitMap.get(ip) || []
  const recent = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS)
  if (recent.length >= MAX_REQUESTS_PER_WINDOW) {
    return true
  }
  recent.push(now)
  rateLimitMap.set(ip, recent)
  return false
}

function escapeHtml(str) {
  if (!str) return ''
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

async function parseJsonBody(req) {
  if (req.body && typeof req.body === 'object') {
    return req.body
  }
  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body)
    } catch {
      return null
    }
  }
  return new Promise((resolve) => {
    let raw = ''
    req.on('data', (chunk) => {
      raw += chunk
    })
    req.on('end', () => {
      try {
        resolve(raw ? JSON.parse(raw) : {})
      } catch {
        resolve(null)
      }
    })
    req.on('error', () => resolve(null))
  })
}

export async function processEnquiry(data, clientIp = '') {
  // 1. Honeypot check — silently trap bots without notifying them
  const honeypot = (data.hp_company || data.website || '').trim()
  if (honeypot) {
    return {
      status: 200,
      body: {
        success: true,
        message: 'Enquiry received. Thank you!',
        trapped: true,
      },
    }
  }

  // 2. Rate limiting check (relaxed for local development testing)
  const isLocalhost = clientIp.includes('127.0.0.1') || clientIp.includes('::1') || clientIp === 'localhost'
  if (clientIp && !isLocalhost && isRateLimited(clientIp)) {
    return {
      status: 429,
      body: {
        success: false,
        error: 'Too many enquiry requests. Please wait a minute before trying again.',
      },
    }
  }

  // 3. Extract and sanitize fields
  const fullName = (data.fullName || '').trim()
  const email = (data.email || '').trim().toLowerCase()
  const phone = (data.phone || '').trim()
  const participants = (data.participants || '1 Person').trim()
  const origin = (data.origin || data.travellingFrom || '').trim()
  const pickup = (data.pickup || '').trim()
  const accommodation = (data.accommodation || '').trim()
  const message = (data.message || data.notes || '').trim()

  // 4. Validate required fields
  const errors = {}

  if (!fullName || fullName.length < 2) {
    errors.fullName = 'Full name is required (at least 2 characters).'
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
  if (!email || !emailRegex.test(email)) {
    errors.email = 'A valid email address is required.'
  }

  const phoneDigits = phone.replace(/\D/g, '')
  if (!phone || phoneDigits.length < 8) {
    errors.phone = 'A valid phone or WhatsApp number is required (at least 8 digits).'
  }

  if (Object.keys(errors).length > 0) {
    return {
      status: 400,
      body: {
        success: false,
        error: 'Please correct the validation errors in your submission.',
        fieldErrors: errors,
      },
    }
  }

  const timestampIso = new Date().toISOString()
  const timestampFormatted = new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'full',
    timeStyle: 'medium',
  })

  // 5. Environment configuration (reads from .env or process.env)
  const recipientEmail =
    readEnvVar('CLIENT_ENQUIRY_EMAIL', 'info.koovalam@gmail.com')

  const gmailUser =
    (readEnvVar('GMAIL_USER') || readEnvVar('SMTP_USER') || recipientEmail).trim()

  const gmailAppPassword = (
    readEnvVar('GMAIL_APP_PASSWORD') ||
    readEnvVar('SMTP_PASS') ||
    ''
  ).replace(/\s+/g, '')

  const emailFrom =
    readEnvVar('EMAIL_FROM') ||
    `"Koovalam Retreats" <${gmailUser}>`

  const apiKey =
    readEnvVar('EMAIL_API_KEY') ||
    readEnvVar('RESEND_API_KEY')

  // 6. Build structured HTML & text content
  const emailSubject = `New Koovalam Retreat Enquiry — ${fullName}`

  const htmlBody = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>${escapeHtml(emailSubject)}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; background-color: #F8F5F0; margin: 0; padding: 24px; color: #2C2C2A; }
    .container { max-width: 620px; margin: 0 auto; background: #FFFFFF; border-radius: 12px; border: 1px solid #E8E2D9; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.04); }
    .header { background: #2F3E2E; padding: 28px 32px; color: #FAF7F2; border-bottom: 3px solid #C49A45; }
    .header h1 { margin: 0 0 6px 0; font-size: 22px; font-weight: 500; letter-spacing: 0.04em; }
    .header p { margin: 0; font-size: 13px; color: #D5DFD4; letter-spacing: 0.02em; }
    .content { padding: 32px; }
    .intro { margin: 0 0 24px 0; font-size: 15px; line-height: 1.6; color: #4A4A46; }
    table.details-table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
    table.details-table td { padding: 12px 14px; border-bottom: 1px solid #F0ECE3; font-size: 14px; vertical-align: top; }
    table.details-table td.label { font-weight: 600; color: #5C5449; width: 38%; background: #FAF8F4; }
    table.details-table td.value { color: #1D1D1B; }
    .message-box { background: #F8F5F0; border-left: 3px solid #C49A45; padding: 16px; border-radius: 4px; font-size: 14px; line-height: 1.6; color: #2C2C2A; margin-bottom: 24px; }
    .footer { background: #FAF8F4; padding: 20px 32px; font-size: 12px; color: #7A7468; border-top: 1px solid #EFEAE0; }
    .badge { display: inline-block; padding: 4px 10px; font-size: 11px; font-weight: 600; border-radius: 20px; background: #E7EFE6; color: #2F3E2E; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>KOOVALAM</h1>
      <p>Spiritual Wellness &amp; Mindfulness Retreat · New Guest Enquiry</p>
    </div>
    <div class="content">
      <p class="intro">
        A new guest enquiry has been submitted through the Koovalam website. Reply directly to this email to contact the guest.
      </p>

      <table class="details-table">
        <tr>
          <td class="label">Guest Full Name</td>
          <td class="value"><strong>${escapeHtml(fullName)}</strong></td>
        </tr>
        <tr>
          <td class="label">Email Address</td>
          <td class="value"><a href="mailto:${escapeHtml(email)}" style="color: #2F3E2E; text-decoration: underline;">${escapeHtml(email)}</a></td>
        </tr>
        <tr>
          <td class="label">WhatsApp / Phone</td>
          <td class="value"><a href="tel:${escapeHtml(phone)}">${escapeHtml(phone)}</a></td>
        </tr>
        <tr>
          <td class="label">Number of Participants</td>
          <td class="value"><span class="badge">${escapeHtml(participants)}</span></td>
        </tr>
        <tr>
          <td class="label">City / Country of Origin</td>
          <td class="value">${escapeHtml(origin || 'Not specified')}</td>
        </tr>
        ${
          pickup
            ? `<tr>
          <td class="label">Pickup Preference</td>
          <td class="value">${escapeHtml(pickup)}</td>
        </tr>`
            : ''
        }
        ${
          accommodation
            ? `<tr>
          <td class="label">Accommodation Preference</td>
          <td class="value">${escapeHtml(accommodation)}</td>
        </tr>`
            : ''
        }
        <tr>
          <td class="label">Submission Timestamp</td>
          <td class="value">${escapeHtml(timestampFormatted)} (IST)<br><small style="color: #888;">${escapeHtml(timestampIso)}</small></td>
        </tr>
      </table>

      ${
        message
          ? `
        <div style="margin-top: 16px;">
          <strong style="display: block; margin-bottom: 8px; font-size: 14px; color: #5C5449;">Guest Message / Questions:</strong>
          <div class="message-box">${escapeHtml(message).replace(/\n/g, '<br>')}</div>
        </div>
      `
          : ''
      }
    </div>
    <div class="footer">
      This notification was automatically dispatched from the Koovalam retreat website enquiry system.
    </div>
  </div>
</body>
</html>
`

  const textBody = [
    `KOOVALAM RETREAT — NEW GUEST ENQUIRY`,
    `=====================================`,
    ``,
    `Full Name: ${fullName}`,
    `Email: ${email}`,
    `WhatsApp / Phone: ${phone}`,
    `Participants: ${participants}`,
    `Origin: ${origin || 'Not specified'}`,
    pickup ? `Pickup Preference: ${pickup}` : null,
    accommodation ? `Accommodation Preference: ${accommodation}` : null,
    `Submission Time: ${timestampFormatted} (IST) / ${timestampIso}`,
    ``,
    message ? `Message / Questions:\n${message}\n` : null,
    `=====================================`,
    `Reply directly to ${email} to contact the visitor.`,
  ]
    .filter(Boolean)
    .join('\n')

  // 7A. Dispatch via Gmail SMTP (Nodemailer) if App Password is provided
  if (gmailAppPassword) {
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: gmailUser,
          pass: gmailAppPassword,
        },
      })

      const mailOptions = {
        from: `"Koovalam Retreats" <${gmailUser}>`,
        to: recipientEmail,
        replyTo: `"${fullName.replace(/"/g, '')}" <${email}>`,
        subject: emailSubject,
        html: htmlBody,
        text: textBody,
      }

      const info = await transporter.sendMail(mailOptions)
      console.log('[Enquiry API] Gmail SMTP message dispatched successfully. ID:', info.messageId)

      return {
        status: 200,
        body: {
          success: true,
          message:
            'Thank you for your enquiry! Your details have been sent successfully. Our team will contact you shortly.',
          id: info.messageId,
        },
      }
    } catch (err) {
      console.error('[Enquiry API] Gmail SMTP dispatch error:', err)
      return {
        status: 502,
        body: {
          success: false,
          error:
            "We couldn't send your enquiry at the moment. Please try again later or contact our team through the available contact details.",
          details: err.message || 'SMTP Authentication or Network Failure',
        },
      }
    }
  }

  // 7B. Dispatch via Transactional Provider (Resend) if API key is provided
  if (apiKey && apiKey.startsWith('re_')) {
    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: emailFrom,
          to: [recipientEmail],
          reply_to: email,
          subject: emailSubject,
          html: htmlBody,
          text: textBody,
        }),
      })

      const resData = await response.json()

      if (!response.ok) {
        console.error('[Enquiry API] Resend dispatch failed:', resData)
        return {
          status: 502,
          body: {
            success: false,
            error:
              "We couldn't send your enquiry at the moment. Please try again later or contact our team through the available contact details.",
            details: resData?.message || 'Email delivery failed.',
          },
        }
      }

      console.log('[Enquiry API] Resend email dispatched successfully. ID:', resData.id)
      return {
        status: 200,
        body: {
          success: true,
          message:
            'Thank you for your enquiry! Your details have been sent successfully. Our team will contact you shortly.',
          id: resData.id,
        },
      }
    } catch (err) {
      console.error('[Enquiry API] Network or fetch error:', err)
      return {
        status: 502,
        body: {
          success: false,
          error:
            "We couldn't send your enquiry at the moment. Please try again later or contact our team through the available contact details.",
        },
      }
    }
  }

  // 8. If no credentials configured:
  // In development/local preview mode: accept mock delivery and log for testing.
  // In production: honestly report 503 so a false success is never displayed.
  const isDev = process.env.NODE_ENV !== 'production'

  if (isDev) {
    console.log('[Enquiry API: Local Dev Mock Dispatch]')
    console.log(`• Destination: ${recipientEmail}`)
    console.log(`• Sender User: ${gmailUser}`)
    console.log(`• Reply-To: ${email}`)
    console.log(`• Subject: ${emailSubject}`)
    console.log(`• Visitor: ${fullName} (${phone})`)
    console.log(`• Participants: ${participants} | Pickup: ${pickup} | Stay: ${accommodation}`)
    if (message) console.log(`• Message: ${message}`)

    return {
      status: 200,
      body: {
        success: true,
        message:
          'Thank you for your enquiry! Your details have been sent successfully. Our team will contact you shortly.',
        mock: true,
        devNotice:
          'Enquiry accepted in local preview mode. Add GMAIL_APP_PASSWORD to .env to deliver real emails via info.koovalam@gmail.com.',
      },
    }
  }

  console.warn('[Enquiry API] Neither GMAIL_APP_PASSWORD nor EMAIL_API_KEY is configured on the production server.')
  return {
    status: 503,
    body: {
      success: false,
      error:
        "We couldn't send your enquiry at the moment. Please try again later or contact our team through the available contact details.",
      code: 'EMAIL_SERVICE_UNCONFIGURED',
    },
  }
}

/**
 * Standard Serverless Function Handler (Vercel, Netlify, Node HTTP)
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    if (res.setHeader) {
      res.setHeader('Allow', ['POST'])
    }
    return res.status(405).json({
      success: false,
      error: 'Method Not Allowed. Use POST.',
    })
  }

  try {
    const data = await parseJsonBody(req)
    if (!data) {
      return res.status(400).json({
        success: false,
        error: 'Invalid JSON payload.',
      })
    }

    const clientIp =
      req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
      req.socket?.remoteAddress ||
      ''

    const result = await processEnquiry(data, clientIp)

    res.status(result.status).json(result.body)
  } catch (error) {
    console.error('[Enquiry API] Unexpected server error:', error)
    res.status(500).json({
      success: false,
      error:
        "We couldn't send your enquiry at the moment. Please try again later or contact our team through the available contact details.",
    })
  }
}
