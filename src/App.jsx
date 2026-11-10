import { useEffect } from 'react'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Experience from './components/Experience.jsx'
import Itinerary from './components/Itinerary.jsx'
import StayTravel from './components/StayTravel.jsx'
import PriceParticipation from './components/PriceParticipation.jsx'
import EnquirySection from './components/EnquirySection.jsx'
import Footer from './components/Footer.jsx'
import StickyCta from './components/StickyCta.jsx'

/**
 * KOOVALAM — Master Boutique Kerala Retreat Experience
 * Conversion-Focused Travel Redesign
 */
export default function App() {
  useEffect(() => {
    if (window.location.hash) {
      const target = document.querySelector(window.location.hash)
      if (target) {
        requestAnimationFrame(() => {
          target.scrollIntoView({ behavior: 'smooth' })
        })
      }
    }
  }, [])

  return (
    <>
      <a className="skip-link" href="#top">
        Skip to main content
      </a>
      <Header />
      <main id="main">
        {/* Section 01: Hero / Retreat Introduction */}
        <Hero />

        {/* Section 02: The Experience (7 Client-Specified Activities) */}
        <Experience />

        {/* Section 03: The Retreat Journey (Day-by-Day Itinerary) */}
        <Itinerary />

        {/* Section 04: Stay, Food & Travel */}
        <StayTravel />

        {/* Section 05: Price & Participation (₹9,999, Health Notice, 4 FAQs) */}
        <PriceParticipation />

        {/* Section 06: Enquiry & Registration (Primary Conversion Engine) */}
        <EnquirySection />
      </main>
      <Footer />
      <StickyCta />
    </>
  )
}
