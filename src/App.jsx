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
  FinalCtaAside,
} from './components/Sections.jsx'
import { DatesCard, Faq, Testimonials } from './components/DatesFaq.jsx'
import EnquiryForm from './components/EnquiryForm.jsx'
import StickyCta from './components/StickyCta.jsx'
import Footer from './components/Footer.jsx'

/**
 * KOOVALAM — Master Wellness Retreat Experience
 * Rooted in Nature. Connected to Soul.
 */
export default function App() {
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
        <DatesCard />
        <Faq />

        <section id="enquiry" className="sec-enquiry" aria-label="Retreat reservation and enquiry">
          <div className="wrap">
            <div className="enquiry-editorial-banner">
              <picture>
                <source srcSet="images/final-cta-bg.webp" type="image/webp" />
                <img
                  src="images/final-cta-bg.jpg"
                  alt="Sunrise light filtering through tall Kerala canopy trees"
                  width="1600"
                  height="1066"
                  loading="lazy"
                  decoding="async"
                />
              </picture>
              <div className="banner-overlay-text">
                <span className="banner-kicker">Rooted in Nature. Connected to Soul.</span>
                <p className="banner-quote">“In the stillness of Kerala, find your rhythm again.”</p>
              </div>
            </div>

            <div className="enquiry-grid-layout">
              <FinalCtaAside />
              <EnquiryForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <StickyCta />
    </>
  )
}
