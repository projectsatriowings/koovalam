import { useEffect, useState } from 'react'
import Logo from './Logo.jsx'
import { track } from '../lib/analytics.js'

export default function Header() {
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  const links = [['#retreat', 'The Retreat'], ['#journey', 'Your Journey'], ['#faq', 'FAQ']]
  return (
    <header className="header header-solid">
      <div className="wrap">
        <a href="#top" aria-label="Koovalam home"><Logo light={false} /></a>
        <nav className={open ? 'open' : ''} aria-label="Primary">
          {links.map(([href, label]) => (
            <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>
          ))}
        </nav>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <a className="btn btn-gold" href="#enquiry" onClick={() => track('cta_enquire_header')}>Enquire</a>
          <button className="menu-btn" aria-expanded={open} aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen(!open)}>{open ? '✕' : '☰'}</button>
        </div>
      </div>
    </header>
  )
}
