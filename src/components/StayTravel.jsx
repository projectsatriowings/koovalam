import { stayFoodTravel } from '../data/retreat.js'
import ImageSlot from './ImageSlot.jsx'
import { LeafMark } from './Logo.jsx'
import { track } from '../lib/analytics.js'

export default function StayTravel() {
  const { stay, food, travel } = stayFoodTravel

  return (
    <section className="section-stay-travel" id="stay-travel" aria-label="Stay, Food and Travel">
      <div className="wrap">
        {/* Section Header */}
        <div className="section-head-travel text-center">
          <div className="travel-eyebrow">
            <LeafMark color="var(--antique-brass)" size={13} />
            <span>PRACTICAL COMFORTS</span>
          </div>
          <h2 className="travel-heading">
            Stay, Nourishment <br className="hide-mobile" />
            <span className="serif-italic">&amp; Easy Travel</span>
          </h2>
          <p className="travel-lede">
            Honest clarity about where you will rest, how you will be nourished, and how to reach the retreat with complete peace of mind.
          </p>
        </div>

        {/* 3 Travel Pillars Grid */}
        <div className="stay-travel-grid">
          {/* Card 1: Accommodation */}
          <article className="stay-travel-card">
            <div className="card-media">
              <ImageSlot name="included-stay" className="stay-media-slot" />
              <span className="card-badge">{stay.tag}</span>
            </div>
            <div className="card-content">
              <div className="card-category">ACCOMMODATION</div>
              <h3 className="card-title">{stay.title}</h3>
              <p className="card-subtitle">{stay.subtitle}</p>
              <p className="card-desc">{stay.description}</p>
              <ul className="card-specs-list">
                <li>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--antique-brass)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                  <span>Two guests sharing per room</span>
                </li>
                <li>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--antique-brass)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                  <span>Quiet sanctuary setting in rural Kerala</span>
                </li>
                <li>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--antique-brass)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                  <span>Property layout shared directly upon enquiry</span>
                </li>
              </ul>
            </div>
          </article>

          {/* Card 2: Food & Nourishment */}
          <article className="stay-travel-card">
            <div className="card-media">
              <ImageSlot name="included-meals" className="stay-media-slot" />
              <span className="card-badge">{food.tag}</span>
            </div>
            <div className="card-content">
              <div className="card-category">NOURISHMENT</div>
              <h3 className="card-title">{food.title}</h3>
              <p className="card-subtitle">{food.subtitle}</p>
              <p className="card-desc">{food.description}</p>
              <ul className="card-specs-list">
                <li>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--antique-brass)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                  <span>100% pure vegetarian cuisine throughout</span>
                </li>
                <li>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--antique-brass)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                  <span>Freshly prepared traditional regional recipes</span>
                </li>
                <li>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--antique-brass)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                  <span>Warm drinking water provided daily</span>
                </li>
              </ul>
            </div>
          </article>

          {/* Card 3: Travel & Pickup */}
          <article className="stay-travel-card">
            <div className="card-media">
              <ImageSlot name="safe-care" className="stay-media-slot" />
              <span className="card-badge">{travel.tag}</span>
            </div>
            <div className="card-content">
              <div className="card-category">LOGISTICS</div>
              <h3 className="card-title">{travel.title}</h3>
              <p className="card-subtitle">{travel.subtitle}</p>
              <p className="card-desc">{travel.description}</p>
              <ul className="card-specs-list">
                <li>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--antique-brass)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                  <span>Kuttipuram Railway Station pickup hub</span>
                </li>
                <li>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--antique-brass)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                  <span>Coordinated group arrival window</span>
                </li>
                <li>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--antique-brass)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                  <span>Full travel packing &amp; route guidance</span>
                </li>
              </ul>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
