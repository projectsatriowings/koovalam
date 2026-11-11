import { experienceCategories } from '../data/retreat.js'
import ImageSlot from './ImageSlot.jsx'
import { LeafMark } from './Logo.jsx'
import PracticeShowcase from './practices/PracticeShowcase.jsx'
import SacredTemples from './temples/SacredTemples.jsx'
import { track } from '../lib/analytics.js'

export default function Experience() {
  return (
    <section className="section-experience" id="experience" aria-label="The Retreat Experience">
      <div className="wrap">
        {/* Main Section Header */}
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
            Rooted in authentic Kerala traditions, our retreat combines mindful movement, sacred temple heritage, and classical Indian arts. Every session is voluntary and guided with quiet care.
          </p>
        </div>

        {/* 3 Organised Experience Categories */}
        <div className="experience-categories-container">
          {experienceCategories.map((cat, catIdx) => {
            if (cat.id === 'practices') {
              return <PracticeShowcase key={cat.id} />
            }
            if (cat.id === 'temples') {
              return <SacredTemples key={cat.id} category={cat} />
            }
            return (
              <div key={cat.id} className="experience-category-group">
                <div className="category-group-header">
                  <span className="category-group-tag">{cat.categoryTag}</span>
                  <h3 className="category-group-title">{cat.categoryName}</h3>
                  <p className="category-group-desc">{cat.categoryDesc}</p>
                </div>

                {/* Category Cards Grid */}
                <div
                  className={`experience-cards-grid ${
                    cat.items.length === 2 ? 'grid-2-col' : 'grid-3-col'
                  }`}
                >
                  {cat.items.map((item, itemIdx) => (
                    <article key={item.id} className="experience-card">
                      <div className="experience-card-media">
                        <ImageSlot name={item.image} className="experience-img-slot" />
                        <span className="experience-card-tag">{item.tag}</span>
                        {item.representativeImage && (
                          <span className="representative-badge" title="Representative imagery">
                            Representative Imagery
                          </span>
                        )}
                      </div>
                      <div className="experience-card-body">
                        <div className="experience-card-num" aria-hidden="true">
                          0{catIdx + 1}.{itemIdx + 1}
                        </div>
                        <h4 className="experience-card-title">{item.title}</h4>
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
                  ))}
                </div>
              </div>
            )
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
