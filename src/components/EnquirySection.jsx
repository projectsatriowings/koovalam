import { LeafMark } from './Logo.jsx'
import Reveal from './Reveal.jsx'
import EnquiryCard from './form/EnquiryCard.jsx'
import styles from './form/EnquiryForm.module.css'

export default function EnquirySection() {
  return (
    <section
      className={styles.sectionEnquiry}
      id="enquiry-section"
      aria-label="Retreat Enquiry and Registration"
    >
      <div className="wrap">
        {/* Section Intro Heading Above Card */}
        <div className={styles.sectionIntro}>
          <div className="travel-eyebrow">
            <LeafMark color="var(--antique-brass)" size={13} />
            <span>CONNECT WITH US</span>
          </div>
          <h2 className="travel-heading">
            Retreat Enquiry <span className="serif-italic">&amp; Registration</span>
          </h2>
          <p className={styles.tightLede}>
            Ask us about the Dec 17–20 retreat, proposed temple visits, or suitability. We reply personally with room availability and no pressure.
          </p>
        </div>

        {/* Split Card Wrapped in Subtle Entrance Reveal */}
        <Reveal>
          <EnquiryCard idPrefix="inline" />
        </Reveal>
      </div>
    </section>
  )
}
