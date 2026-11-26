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
                alt="Retreat accommodation grounds at Oxyfarm Resorts, Wayanad"
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
              <div className="card-specs-box">
                <div className="card-specs-heading">Inclusions &amp; Room Options</div>
                <ul className="card-specs-list">
                  <li>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--antique-brass)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12" /></svg>
                    <span>Double Occupancy (Twin Sharing) · ₹17,999 / person</span>
                  </li>
                  <li>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--antique-brass)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12" /></svg>
                    <span>Single Occupancy (Private Room) · ₹26,999 / person</span>
                  </li>
                  <li>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--antique-brass)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12" /></svg>
                    <span>Eco-cottages with en-suite bath &amp; 24/7 hot water</span>
                  </li>
                  <li>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--antique-brass)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12" /></svg>
                    <span>Serene forest silence for deep restorative sleep</span>
                  </li>
                </ul>
              </div>
            </div>
          </article>

          {/* Card 2: Food & Nourishment */}
          <article className="stay-travel-card">
            <div className="card-media">
              <img
                src="images/resort/dining-area.jpg"
                alt="Retreat dining area overlooking forest canopy at Oxyfarm Resorts, Wayanad"
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
              <div className="card-specs-box">
                <div className="card-specs-heading">Culinary &amp; Meal Inclusions</div>
                <ul className="card-specs-list">
                  <li>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--antique-brass)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12" /></svg>
                    <span>Wholesome vegetarian breakfast, lunch &amp; dinner</span>
                  </li>
                  <li>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--antique-brass)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12" /></svg>
                    <span>Freshly cooked Sattvic recipes with local ingredients</span>
                  </li>
                  <li>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--antique-brass)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12" /></svg>
                    <span>Scenic open forest-view dining pavilion</span>
                  </li>
                  <li>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--antique-brass)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12" /></svg>
                    <span>Herbal drinking water &amp; Ayurvedic tea throughout</span>
                  </li>
                </ul>
              </div>
            </div>
          </article>

          {/* Card 3: Pickup & Transport */}
          <article className="stay-travel-card">
            <div className="card-media">
              <img
                src="images/pickup-transport.jpg"
                alt="Arrival pickup transport in Kerala"
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
              <div className="card-specs-box">
                <div className="card-specs-heading">Transit Hubs &amp; Access</div>
                <ul className="card-specs-list">
                  <li>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--antique-brass)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12" /></svg>
                    <span><strong>Nearest Airport:</strong> Kannur Int'l Airport (CNN) · ~35 km</span>
                  </li>
                  <li>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--antique-brass)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12" /></svg>
                    <span><strong>Nearest Train:</strong> Thalassery Railway Station</span>
                  </li>
                  <li>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--antique-brass)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12" /></svg>
                    <span><strong>Nearest Bus Stop:</strong> Mananthavady Bus Stop</span>
                  </li>
                  <li>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--antique-brass)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12" /></svg>
                    <span><strong>Pick-up:</strong> Arranged upon request (not in package)</span>
                  </li>
                </ul>
              </div>
            </div>
          </article>
        </div>

        {/* ── Redesigned Editorial Sanctuary Destination & Map Showcase ── */}
        <div className="sanctuary-stage-card" id="resort-location">
          {/* Header Row: Title */}
          <div className="sanctuary-stage-header">
            <div className="sanctuary-title-col">
              <div className="sanctuary-eyebrow">
                <span className="sanctuary-pulse-dot" aria-hidden="true" />
                <span>CONFIRMED RETREAT SANCTUARY · WAYANAD, KERALA</span>
              </div>
              <h3 className="sanctuary-title">Oxyfarm Resorts</h3>
              <p className="sanctuary-subtitle">
                Mylattumala · Alattil P.O. · Thalapuzha via Mananthavady
              </p>
            </div>
          </div>

          {/* Main 2-Column Balanced Stage Grid */}
          <div className="sanctuary-stage-body">
            {/* Left Column: Sanctuary Narrative & 4 Landmark Tiles */}
            <div className="sanctuary-details-col">
              <p className="sanctuary-narrative">
                Nestled on the mist-kissed hillside slopes of Mylattumala in Wayanad, Oxyfarm Resorts offers an unhurried sanctuary where organic coffee and spice plantations meet the protected canopy of the Periya Reserved Forest. Crisp mountain air, natural springs, and open forest pavilions create the ideal setting for mindful pause, gentle yoga, and deep restorative sleep.
              </p>

              {/* Verified Address Strip */}
              <div className="sanctuary-address-card">
                <div className="sanctuary-address-icon" aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div className="sanctuary-address-text">
                  <span className="address-kicker">VERIFIED RESORT ADDRESS</span>
                  <address>
                    Oxyfarm Resorts, Mylattumala, Alattil P.O., Thalapuzha via, Mananthavady, Wayanad, Kerala — 670644
                  </address>
                </div>
              </div>

              {/* 4 Feature Badges in a 2x2 Grid */}
              <div className="sanctuary-features-grid">
                <div className="sanctuary-feature-item">
                  <div className="feature-icon-badge">✈️</div>
                  <div>
                    <h4 className="feature-title">Nearest Airport</h4>
                    <p className="feature-desc">Kannur International Airport (CNN) · ~35 km</p>
                  </div>
                </div>

                <div className="sanctuary-feature-item">
                  <div className="feature-icon-badge">🚆</div>
                  <div>
                    <h4 className="feature-title">Nearest Train Station</h4>
                    <p className="feature-desc">Thalassery Railway Station · Railhead</p>
                  </div>
                </div>

                <div className="sanctuary-feature-item">
                  <div className="feature-icon-badge">🚌</div>
                  <div>
                    <h4 className="feature-title">Nearest Bus Stop</h4>
                    <p className="feature-desc">Mananthavady Bus Stop · Local access</p>
                  </div>
                </div>

                <div className="sanctuary-feature-item">
                  <div className="feature-icon-badge">🚗</div>
                  <div>
                    <h4 className="feature-title">Pick-up on Request</h4>
                    <p className="feature-desc">Not in package · Arranged upon request</p>
                  </div>
                </div>
              </div>

              {/* Nearby Landmarks Strip */}
              <div className="sanctuary-nearby-strip">
                <span className="nearby-strip-label">NEARBY LANDMARKS</span>
                <p className="nearby-strip-text">
                  Gurukula Botanical Sanctuary 2 km · Periya 3 km · Komachi Park 8 km · Muneeswaran Kunnu 15 km
                </p>
              </div>
            </div>

            {/* Right Column: Clean Interactive Map Stage */}
            <div className="sanctuary-media-col">
              <div className="media-stage-header">
                <div className="media-header-pill">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
                    <line x1="9" y1="3" x2="9" y2="18" />
                    <line x1="15" y1="6" x2="15" y2="21" />
                  </svg>
                  <span>Interactive Location Map</span>
                </div>

                <span className="media-stage-badge">
                  <span className="pulse-dot-green" aria-hidden="true" />
                  <span>Wayanad · Elev. ~750m</span>
                </span>
              </div>

              <div className="media-stage-viewport">
                <iframe
                  title="Oxyfarm Resorts Wayanad Location Map"
                  src={stay.googleMapsEmbedUrl || "https://maps.google.com/maps?q=Oxyfarm+Resorts,+Mylattumala,+Wayanad&t=&z=14&ie=UTF8&iwloc=&output=embed"}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="sanctuary-map-iframe"
                />
              </div>

              <div className="media-stage-footer">
                <span className="media-coords-note">
                  📍 Mylattumala · Alattil P.O. · Wayanad 670644
                </span>
                <a
                  href="https://maps.app.goo.gl/pqxBp6FtidViJ6RSA?g_st=ac"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="stage-directions-btn"
                >
                  <span>Get Directions</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
