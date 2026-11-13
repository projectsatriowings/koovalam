import { experienceCategories } from '../data/retreat.js'
import { LeafMark } from './Logo.jsx'
import CulturalExperiences from './culture/CulturalExperiences.jsx'
import PracticeShowcase from './practices/PracticeShowcase.jsx'
import SacredTemples from './temples/SacredTemples.jsx'
import { track } from '../lib/analytics.js'
import { scrollToEnquiry } from '../lib/scroll.js'

export default function Experience() {
  return (
    <section className="section-experience" id="experience" aria-label="The Retreat Experience">
      <div className="wrap">
        {/* Main Section Header */}
        <div className="section-head-travel text-center">
          <div className="travel-eyebrow">
            <LeafMark color="var(--antique-brass)" size={13} />
            <span>KOOVALAM SPIRITUAL WELLNESS · THE RETREAT</span>
          </div>
          <h2 className="travel-heading">
            A Journey Within. <br className="hide-mobile" />
            <span className="serif-italic">Nature, Wellness &amp; Spirituality.</span>
          </h2>
          <p className="travel-lede">
            Rooted in the traditional wisdom of Kerala, this retreat brings together gentle yoga, pranayama, meditation, Yoga Nidra, sacred temple visits, the mindful Nila River boat safari, and calm nature immersion — every session voluntary and guided with care.
          </p>
        </div>

        {/* 3 Organised Experience Categories */}
        <div className="experience-categories-container">
          {experienceCategories.map((cat) => {
            if (cat.id === 'practices') {
              return <PracticeShowcase key={cat.id} />
            }
            if (cat.id === 'temples') {
              return <SacredTemples key={cat.id} category={cat} />
            }
            if (cat.id === 'culture') {
              return <CulturalExperiences key={cat.id} category={cat} />
            }
            return null
          })}
        </div>

        {/* Mid-Page Secondary Conversion Callout */}
        <div className="experience-conversion-bar">
          <div className="conversion-bar-content">
            <h4 className="conversion-bar-title">
              Have questions about the practices, temple visits, or cultural evenings?
            </h4>
            <p className="conversion-bar-sub">
              All sessions are adaptable for beginners and gentle on the body. We are happy to answer any questions.
            </p>
          </div>
          <a
            className="btn btn-travel-accent"
            href="#enquiry"
            onClick={(e) => {
              track('cta_enquire_after_experience')
              scrollToEnquiry(e)
            }}
          >
            <span>Ask Us About the Experience</span>
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
