import { useEffect, useState, useRef, useCallback } from 'react'
import Logo from './Logo.jsx'
import { track } from '../lib/analytics.js'

export default function Header() {
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  const menuBtnRef = useRef(null)
  const drawerRef = useRef(null)
  const closeBtnRef = useRef(null)
  const prevOpenRef = useRef(open)

  // Navigation items with numbers for editorial mobile layout
  const links = [
    { href: '#pause', id: 'pause', label: 'The Sanctuary', number: '01' },
    { href: '#koovalam', id: 'koovalam', label: 'Sacred Origin', number: '02' },
    { href: '#retreat', id: 'retreat', label: 'Practices', number: '03' },
    { href: '#journey', id: 'journey', label: '4-Day Journey', number: '04' },
    { href: '#included', id: 'included', label: 'Inclusions', number: '05' },
    { href: '#faq', id: 'faq', label: 'FAQ', number: '06' },
  ]

  // Track header solid state on scroll
  useEffect(() => {
    const onScroll = () => {
      setSolid(window.scrollY > 40)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Active section scroll spy using IntersectionObserver
  useEffect(() => {
    const sectionIds = ['pause', 'koovalam', 'retreat', 'journey', 'included', 'faq']
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean)

    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-20% 0px -55% 0px',
        threshold: 0,
      }
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  // Lock body scroll and prevent background interaction when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
      document.body.dataset.navOpen = 'true'
    } else {
      document.body.style.overflow = ''
      delete document.body.dataset.navOpen
    }
    return () => {
      document.body.style.overflow = ''
      delete document.body.dataset.navOpen
    }
  }, [open])

  // Focus trap and keyboard handling inside mobile drawer
  useEffect(() => {
    if (!open) return

    // Focus close button when drawer opens
    const focusTimer = setTimeout(() => {
      closeBtnRef.current?.focus()
    }, 60)

    const handleKeyDown = (e) => {
      // Escape key closes drawer
      if (e.key === 'Escape') {
        e.preventDefault()
        setOpen(false)
        return
      }

      // Tab key focus trap
      if (e.key === 'Tab') {
        if (!drawerRef.current) return
        const focusable = drawerRef.current.querySelectorAll(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
        if (focusable.length === 0) return

        const first = focusable[0]
        const last = focusable[focusable.length - 1]

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault()
            last.focus()
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault()
            first.focus()
          }
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      clearTimeout(focusTimer)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [open])

  // Restore focus to menu button trigger when drawer closes
  useEffect(() => {
    if (prevOpenRef.current && !open) {
      menuBtnRef.current?.focus()
    }
    prevOpenRef.current = open
  }, [open])

  // Auto-close drawer if window is resized past 960px breakpoint
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 960 && open) {
        setOpen(false)
      }
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [open])

  const closeDrawer = useCallback(() => {
    setOpen(false)
  }, [])

  const isLight = !solid && !open

  return (
    <header className={`header ${solid ? 'header-solid' : 'header-transparent'} ${open ? 'nav-open' : ''}`}>
      {/* Backdrop overlay for mobile drawer */}
      <div
        className={`nav-backdrop ${open ? 'visible' : ''}`}
        onClick={closeDrawer}
        aria-hidden="true"
      />

      <div className="wrap">
        <a
          href="#top"
          aria-label="Koovalam — Return to top"
          className="header-logo-link"
          onClick={() => {
            if (open) closeDrawer()
          }}
        >
          <Logo light={isLight} size={42} />
        </a>

        {/* Primary Navigation / Mobile Drawer */}
        <nav
          ref={drawerRef}
          id="mobile-navigation-drawer"
          className={`header-nav ${open ? 'open' : ''}`}
          aria-label="Primary Navigation"
          role={open ? 'dialog' : undefined}
          aria-modal={open ? 'true' : undefined}
          aria-hidden={!open && typeof window !== 'undefined' && window.innerWidth <= 960 ? true : undefined}
        >
          <div className="mobile-nav-header">
            <div className="mobile-nav-brand">
              <span className="mobile-nav-tag">Kerala · Spiritual Retreat</span>
              <span className="mobile-nav-subtag">Pause · Breathe · Reconnect</span>
            </div>
            <button
              ref={closeBtnRef}
              type="button"
              className="menu-close-btn"
              aria-label="Close navigation menu"
              onClick={closeDrawer}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          <div className="header-nav-list" role="list">
            {links.map(({ href, id, label, number }) => {
              const isActive = activeSection === id
              return (
                <a
                  key={href}
                  href={href}
                  className={`nav-link ${isActive ? 'nav-link-active' : ''}`}
                  aria-current={isActive ? 'true' : undefined}
                  onClick={closeDrawer}
                >
                  <span className="nav-link-num" aria-hidden="true">{number}</span>
                  <span className="nav-link-text">{label}</span>
                </a>
              )
            })}
          </div>

          <div className="mobile-nav-footer">
            <a
              className="btn btn-gold btn-mobile-enquire"
              href="#enquiry"
              onClick={() => {
                closeDrawer()
                track('cta_enquire_mobile_menu')
              }}
            >
              Reserve Your Interest
            </a>
            <div className="mobile-nav-brand-footer">
              <p className="mobile-nav-note">Rooted in Nature. Connected to Soul.</p>
              <span className="mobile-nav-location">Kerala, India</span>
            </div>
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
            ref={menuBtnRef}
            type="button"
            className="menu-btn"
            aria-expanded={open}
            aria-controls="mobile-navigation-drawer"
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
