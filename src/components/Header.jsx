import { useEffect, useState } from 'react'
import Logo from './Logo.jsx'
import { track } from '../lib/analytics.js'

export default function Header() {
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setSolid(window.scrollY > 40)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const links = [
    { href: '#pause', label: 'The Sanctuary' },
    { href: '#koovalam', label: 'Sacred Origin' },
    { href: '#retreat', label: 'Practices' },
    { href: '#journey', label: '4-Day Journey' },
    { href: '#included', label: 'Inclusions' },
    { href: '#faq', label: 'FAQ' },
  ]

  const isLight = !solid && !open

  return (
    <header className={`header ${solid ? 'header-solid' : 'header-transparent'} ${open ? 'nav-open' : ''}`}>
      <div className="wrap">
        <a href="#top" aria-label="Koovalam — Return to top" className="header-logo-link">
          <Logo light={isLight} size={42} />
        </a>

        <nav className={`header-nav ${open ? 'open' : ''}`} aria-label="Primary Navigation">
          <div className="mobile-nav-header">
            <span className="mobile-nav-tag">Kerala · Spiritual Retreat</span>
            <button
              className="menu-close-btn"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
            >
              ✕
            </button>
          </div>
          <div className="header-nav-list">
            {links.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className="nav-link"
                onClick={() => setOpen(false)}
              >
                {label}
              </a>
            ))}
          </div>
          <div className="mobile-nav-footer">
            <a
              className="btn btn-gold btn-mobile-enquire"
              href="#enquiry"
              onClick={() => {
                setOpen(false)
                track('cta_enquire_mobile_menu')
              }}
            >
              Reserve Your Interest
            </a>
            <p className="mobile-nav-note">Rooted in Nature. Connected to Soul.</p>
          </div>
        </nav>

        <div className="header-actions">
          <a
            className={`btn ${isLight ? 'btn-outline' : 'btn-gold'} header-cta`}
            href="#enquiry"
            onClick={() => track('cta_enquire_header')}
          >
            Reserve Interest
          </a>
          <button
            className="menu-btn"
            aria-expanded={open}
            aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
            onClick={() => setOpen(!open)}
          >
            <span className="menu-btn-bar" />
            <span className="menu-btn-bar" />
          </button>
        </div>
      </div>
    </header>
  )
}
