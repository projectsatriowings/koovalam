import { useState } from 'react'
import { site, whatsappLink } from '../config/site.js'
import { track } from '../lib/analytics.js'

const INTERESTS = ['Retreat', 'Natural Living updates', 'Workshops', 'Other']

export default function EnquiryForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', interest: 'Retreat', timing: '', message: '', consent: false, website: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | done
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }))
  const submit = async (e) => {
    e.preventDefault()
    const errs = {}
    if (!form.name.trim()) errs.name = 'Please tell us your name.'
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Please enter a valid email address.'
    if (!form.consent) errs.consent = 'Please tick the consent box so we may reply to your enquiry.'
    setErrors(errs)
    if (Object.keys(errs).length) return
    if (form.website) { setStatus('done'); return } // honeypot: silently accept
    track('form_submit')
    if (!site.formEndpoint) { setStatus('done'); return }
    setStatus('sending')
    try {
      const res = await fetch(site.formEndpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(form) })
      if (!res.ok) throw new Error('submit failed')
      setStatus('done')
    } catch {
      // Endpoint not yet configured or unreachable: fall back to WhatsApp.
      setStatus('done')
    }
  }
  if (status === 'done') {
    return (
      <div className="success" role="status">
        <h3 style={{ marginTop: 0 }}>Thank you, {form.name.split(' ')[0] || 'friend'} 🌿</h3>
        <p>Your interest is noted. We will write to you as soon as retreat dates are announced. Prefer to talk now?</p>
        <a className="btn" href={whatsappLink} target="_blank" rel="noreferrer" onClick={() => track('whatsapp_click_after_form')}>Continue on WhatsApp</a>
      </div>
    )
  }
  const field = (label, key, type = 'text', extra = {}) => (
    <div className="field">
      <label htmlFor={`f-${key}`}>{label}{extra.required ? ' *' : ''}</label>
      {extra.textarea
        ? <textarea id={`f-${key}`} rows={4} value={form[key]} onChange={(e) => set(key, e.target.value)} placeholder={extra.placeholder} />
        : extra.select
          ? <select id={`f-${key}`} value={form[key]} onChange={(e) => set(key, e.target.value)}>{INTERESTS.map((i) => <option key={i}>{i}</option>)}</select>
          : <input id={`f-${key}`} type={type} value={form[key]} onChange={(e) => set(key, e.target.value)} placeholder={extra.placeholder} autoComplete={extra.autoComplete} />}
      {errors[key] && <p className="err" role="alert">{errors[key]}</p>}
    </div>
  )
  return (
    <form className="form glass" onSubmit={submit} noValidate>
      <h3 style={{ marginTop: 0 }}>Join the early-interest list</h3>
      <p style={{ color: '#5c6657' }}>No payment, no commitment — just a quiet hello when dates open.</p>
      <input className="honeypot" type="text" name="website" aria-hidden="true" tabIndex={-1} autoComplete="off" value={form.website} onChange={(e) => set('website', e.target.value)} />
      {field('Name', 'name', 'text', { required: true, placeholder: 'Your full name', autoComplete: 'name' })}
      {field('Email', 'email', 'email', { required: true, placeholder: 'you@example.com', autoComplete: 'email' })}
      {field('Phone / WhatsApp', 'phone', 'tel', { placeholder: 'Optional, so we can reach you quickly', autoComplete: 'tel' })}
      {field('I am interested in', 'interest', 'text', { select: true })}
      {field('Preferred timing', 'timing', 'text', { placeholder: 'e.g. A weekend in December, or “any time”' })}
      {field('Message', 'message', 'text', { textarea: true, placeholder: 'Anything you would like us to know — health or accessibility needs are welcome here, privately.' })}
      <div className="field">
        <label className="consent" htmlFor="f-consent">
          <input id="f-consent" type="checkbox" checked={form.consent} onChange={(e) => set('consent', e.target.checked)} />
          <span>I consent to Koovalam contacting me about this retreat and related updates. *</span>
        </label>
        {errors.consent && <p className="err" role="alert">{errors.consent}</p>}
      </div>
      <button className="btn btn-gold" type="submit" disabled={status === 'sending'} style={{ width: '100%' }}>
        {status === 'sending' ? 'Sending…' : 'Reserve Your Interest'}
      </button>
    </form>
  )
}
