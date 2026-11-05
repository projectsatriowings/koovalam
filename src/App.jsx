import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Journey from './components/Journey.jsx'
import { TrustStrip, TicketStrip, Pause, BilvaStory, Practices, Highlights, WhoFor, Included, SafeCare, KoovalamWorld, FinalCtaAside } from './components/Sections.jsx'
import { DatesCard, Faq, Testimonials } from './components/DatesFaq.jsx'
import EnquiryForm from './components/EnquiryForm.jsx'
import StickyCta from './components/StickyCta.jsx'
import Footer from './components/Footer.jsx'

// THE KOOVALAM ROUTE — the page is framed as a tourist planner / journey
// route: hero route line → trip-ticket strip → scroll-filling route map in
// the Journey section → Bilva story → enquiry. Sections follow the
// super-prompt order exactly.
export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
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
        <section id="enquiry" className="final">
          <div className="wrap">
          <div className="final-banner"><img src="images/final-cta-bg.jpg" alt="Sunrise light through tall trees in a green Kerala forest" width="1600" height="1066" loading="lazy" decoding="async" /></div>
          <div className="form-grid">
            <FinalCtaAside />
            <EnquiryForm />
          </div></div>
        </section>
      </main>
      <Footer />
      <StickyCta />
    </>
  )
}
