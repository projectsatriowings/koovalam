import { useEffect } from 'react'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import BrandPhilosophy from './components/brand/BrandPhilosophy.jsx'
import Experience from './components/Experience.jsx'
import Itinerary from './components/Itinerary.jsx'
import StayTravel from './components/StayTravel.jsx'
import PriceParticipation from './components/PriceParticipation.jsx'
import EnquirySection from './components/EnquirySection.jsx'
import Footer from './components/Footer.jsx'
import StickyCta from './components/StickyCta.jsx'
import FloatingWhatsApp from './components/FloatingWhatsApp.jsx'

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
        {/* Section 01: Hero / Brand & Retreat Introduction */}
        <Hero />

        {/* Section 02: Three Dimensions of Well-Being (Body, Mind & Soul) */}
        <BrandPhilosophy />

        {/* Section 03: Koovalam Spiritual Wellness — Retreat Experience */}
        <Experience />

        {/* Section 04: The Retreat Journey (Day-by-Day Itinerary) */}
        <Itinerary />

        {/* Section 05: Stay, Food & Travel */}
        <StayTravel />

        {/* Section 06: Price & Participation (₹9,999, Health Notice, 4 FAQs) */}
        <PriceParticipation />

        {/* Section 07: Enquiry & Registration (Primary Conversion Engine) */}
        <EnquirySection />
      </main>
      <Footer />
      <StickyCta />
      <FloatingWhatsApp />
    </>
  )
}
