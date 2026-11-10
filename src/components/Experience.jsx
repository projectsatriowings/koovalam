import { activities } from '../data/retreat.js'
import ImageSlot from './ImageSlot.jsx'
import { LeafMark } from './Logo.jsx'
import { track } from '../lib/analytics.js'

export default function Experience() {
  return (
    <section className="section-experience" id="experience" aria-label="The Retreat Experience">
      <div className="wrap">
        {/* Section Header */}
        <div className="section-head-travel text-center">
          <div className="travel-eyebrow">
            <LeafMark color="var(--antique-brass)" size={13} />
            <span>THE KOOVALAM EXPERIENCE</span>
          </div>
          <h2 className="travel-heading">
            More Than a Getaway. <br className="hide-mobile" />
            <span className="serif-italic">An Experience to Reconnect.</span>
          </h2>
          <p className="travel-lede">
            Seven grounding practices and mindful excursions rooted in authentic Kerala traditions. Every session is voluntary, accessible to beginners, and guided with quiet care.
          </p>
        </div>

        {/* 7 Activities Editorial Showcase */}
        <div className="experience-editorial-grid">
          {activities.map((item, index) => {
            const isFeatured = index === 0 || index === 5 // Yoga and Village Tour featured
            return (
              <article
                key={item.id}
                className={`experience-card ${isFeatured ? 'experience-card-featured' : ''}`}
              >
                <div className="experience-card-media">
                  <ImageSlot name={item.image} className="experience-img-slot" />
                  <span className="experience-card-tag">{item.tag}</span>
                </div>
                <div className="experience-card-body">
                  <div className="experience-card-num" aria-hidden="true">
                    0{index + 1}
                  </div>
                  <h3 className="experience-card-title">{item.title}</h3>
                  <p className="experience-card-summary">{item.summary}</p>
                  <div className="experience-card-highlight">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="var(--antique-brass)"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>{item.highlight}</span>
                  </div>
                </div>
              </article>
            )
          })}
        </div>

        {/* Mid-Page Secondary Conversion Callout */}
        <div className="experience-conversion-bar">
          <div className="conversion-bar-content">
            <h4 className="conversion-bar-title">
              Curious whether these practices are right for you?
            </h4>
            <p className="conversion-bar-sub">
              All sessions are adaptable for beginners and gentle on the body. We are happy to answer any questions.
            </p>
          </div>
          <a
            className="btn btn-travel-accent"
            href="#enquiry"
            onClick={() => track('cta_enquire_after_experience')}
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

