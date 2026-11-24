import { stayFoodTravel } from '../data/retreat.js'
import { resortGallery } from '../data/resortGallery.js'
import { LeafMark } from './Logo.jsx'

const SUPPORTING_PHOTOS = [resortGallery[1], resortGallery[2]]
const SECONDARY_PHOTOS = [resortGallery[3], resortGallery[5], resortGallery[4]]

/**
 * Renders a static resort gallery tile without interactive zoom/lightbox chrome.
 */
function GalleryTile({ photo, className, featured = false }) {
  const Heading = featured ? 'h3' : 'h4'
  const headingClass = featured ? 'gallery-item-title' : 'gallery-item-subtitle'

  return (
    <div className={className}>
      <img
        src={photo.src}
        alt={photo.alt}
        loading="lazy"
        decoding="async"
        className="gallery-img"
      />
      <div className="gallery-item-overlay">
        <span className="gallery-pill">{photo.category}</span>
        <div className="gallery-item-meta">
          <Heading className={headingClass}>{photo.title}</Heading>
        </div>
      </div>
    </div>
  )
}

export default function StayTravel() {
  const { stay, food, travel } = stayFoodTravel

  return (
    <section className="section-stay-travel" id="stay-travel" aria-label="Stay, Food and Travel">
      <div className="wrap">
        {/* Section Header */}
        <div className="section-head-travel text-center">
          <div className="travel-eyebrow">
            <LeafMark color="var(--antique-brass)" size={13} />
            <span>RETREAT SETTING &amp; ESSENTIALS</span>
          </div>
          <h2 className="travel-heading">
            A Stay Surrounded <br className="hide-mobile" />
            <span className="serif-italic">by Nature</span>
          </h2>
          <p className="travel-lede">
            Discover the setting where your retreat experience unfolds, with welcoming shared spaces and a natural atmosphere.
          </p>
        </div>

        {/* ── Refined Editorial Accommodation Gallery ── */}
        <div className="stay-gallery-wrapper">
          {/* Asymmetrical Top Grid */}
          <div className="gallery-asymmetric-grid">
            <GalleryTile
              photo={resortGallery[0]}
              className="gallery-item-featured"
              featured
            />

            <div className="gallery-supporting-col">
              {SUPPORTING_PHOTOS.map((photo) => (
                <GalleryTile
                  key={photo.id || photo.src}
                  photo={photo}
                  className="gallery-item-sub"
                />
              ))}
            </div>
          </div>

          {/* Secondary Row: 3 Communal Space Photographs */}
          <div className="gallery-secondary-row">
            {SECONDARY_PHOTOS.map((photo) => (
              <GalleryTile
                key={photo.id || photo.src}
                photo={photo}
                className="gallery-item-thumb"
              />
            ))}
          </div>
        </div>

        {/* ── 3 Concise Verified Essentials Pillars ── */}
        <div className="stay-travel-grid">
          {/* Card 1: Accommodation */}
          <article className="stay-travel-card">
            <div className="card-media">
              <img
                src="images/resort/resort-entrance.jpg"
                alt="Retreat accommodation grounds in Kerala"
                className="stay-media-slot"
                loading="lazy"
              />
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
                  <span>Double Occupancy (Twin Sharing) · ₹17,999 / person</span>
                </li>
                <li>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--antique-brass)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                  <span>Single Occupancy (Private Room) · ₹26,999 / person</span>
                </li>
                <li>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--antique-brass)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                  <span>Located in Wayanad, Kerala</span>
                </li>
              </ul>
            </div>
          </article>

          {/* Card 2: Food & Nourishment */}
          <article className="stay-travel-card">
            <div className="card-media">
              <img
                src="images/resort/dining-area.jpg"
                alt="Retreat dining area overlooking forest canopy in Kerala"
                className="stay-media-slot"
                loading="lazy"
              />
              <span className="card-badge">{food.tag}</span>
            </div>
            <div className="card-content">
              <div className="card-category">DINING</div>
              <h3 className="card-title">{food.title}</h3>
              <p className="card-subtitle">{food.subtitle}</p>
              <p className="card-desc">{food.description}</p>
              <ul className="card-specs-list">
                <li>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--antique-brass)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                  <span>Wholesome vegetarian breakfast, lunch &amp; dinner</span>
                </li>
                <li>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--antique-brass)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                  <span>Scenic forest-view dining setting</span>
                </li>
                <li>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--antique-brass)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                  <span>Herbal drinking water &amp; tea throughout</span>
                </li>
              </ul>
            </div>
          </article>

          {/* Card 3: Pickup & Transport */}
          <article className="stay-travel-card">
            <div className="card-media">
              <img
                src="images/pickup-transport.jpg"
                alt="Arrival pickup SUV waiting outside a palm-lined Kerala railway station portico"
                className="stay-media-slot"
                loading="lazy"
              />
              <span className="card-badge">{travel.tag}</span>
            </div>
            <div className="card-content">
              <div className="card-category">TRANSPORT</div>
              <h3 className="card-title">{travel.title}</h3>
              <p className="card-subtitle">{travel.subtitle}</p>
              <p className="card-desc">{travel.description}</p>
              <ul className="card-specs-list">
                <li>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--antique-brass)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                  <span>Suggested rail hub: Kuttipuram Railway Station</span>
                </li>
                <li>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--antique-brass)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                  <span>Calicut (CCJ) Airport road connectivity</span>
                </li>
                <li>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--antique-brass)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                  <span>Arrival coordination confirmed by organiser</span>
                </li>
              </ul>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
