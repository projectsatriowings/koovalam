import Logo from './Logo.jsx'
import { site, whatsappLink } from '../config/site.js'

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot-grid">
          <div><Logo light /><p style={{ marginTop: 16, maxWidth: 320 }}>{site.tagline}</p></div>
          <div>
            <p><strong>Contact</strong></p>
            <p><a href={`mailto:${site.email}`}>{site.email}</a><br /><a href={whatsappLink} target="_blank" rel="noreferrer">WhatsApp</a></p>
          </div>
          <div>
            <p><strong>Follow</strong></p>
            <p>{site.socials.map((s) => <span key={s.label}><a href={s.href}>{s.label}</a><br /></span>)}</p>
          </div>
        </div>
        <p className="disclaimer">Our programs support general well-being and are not a substitute for medical or psychological care.</p>
        <p style={{ fontSize: '.9rem', color: '#8fa086' }}>© {new Date().getFullYear()} {site.wordmark}. All rights reserved. Schedule shown is a sample and may adapt to venue, season, temple timings and river conditions.</p>
      </div>
    </footer>
  )
}
