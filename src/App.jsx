import { useEffect } from 'react'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Journey from './components/Journey.jsx'
import {
  TrustStrip,
  TicketStrip,
  Pause,
  BilvaStory,
  Practices,
  Highlights,
  WhoFor,
  Included,
  SafeCare,
  KoovalamWorld,
} from './components/Sections.jsx'
import { DatesCard, Faq, Testimonials } from './components/DatesFaq.jsx'
import StickyCta from './components/StickyCta.jsx'
import Footer from './components/Footer.jsx'

/**
 * KOOVALAM — Master Wellness Retreat Experience
 * Rooted in Nature. Connected to Soul.
 */
export default function App() {
  useEffect(() => {
    if (window.location.hash) {
      const target = document.querySelector(window.location.hash)
      if (target) {
        // Small delay to ensure layout paint before scroll
        requestAnimationFrame(() => {
          target.scrollIntoView()
        })
      }
    }
  }, [])

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to main content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <TicketStrip />
        <TrustStrip />
        <Pause />
        <BilvaStory />
        <Practices />
        <Journey />
        <Highlights />
        <WhoFor />
        <Included />
        <SafeCare />
        <KoovalamWorld />
        <Testimonials />
        <Faq />
        <DatesCard />
      </main>
      <Footer />
      <StickyCta />
    </>
  )
}
