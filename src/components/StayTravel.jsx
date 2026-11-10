import { useState, useEffect } from 'react'
import { stayFoodTravel } from '../data/retreat.js'
import { resortGallery } from '../data/resortGallery.js'
import { LeafMark } from './Logo.jsx'

export default function StayTravel() {
  const { stay, food, travel } = stayFoodTravel
  const [activePhotoIndex, setActivePhotoIndex] = useState(null)

  // Keyboard navigation & body scroll-lock when Lightbox is open
  useEffect(() => {
    if (activePhotoIndex === null) return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActivePhotoIndex(null)
      } else if (e.key === 'ArrowRight') {
        setActivePhotoIndex((prev) => (prev + 1) % resortGallery.length)
      } else if (e.key === 'ArrowLeft') {
        setActivePhotoIndex((prev) => (prev - 1 + resortGallery.length) % resortGallery.length)
      }
    }

    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = prevOverflow
    }
  }, [activePhotoIndex])

  const openLightbox = (index) => {
    setActivePhotoIndex(index)
  }

  const closeLightbox = () => {
    setActivePhotoIndex(null)
  }

  const nextPhoto = (e) => {
    e.stopPropagation()
    setActivePhotoIndex((prev) => (prev + 1) % resortGallery.length)
  }

  const prevPhoto = (e) => {
    e.stopPropagation()
    setActivePhotoIndex((prev) => (prev - 1 + resortGallery.length) % resortGallery.length)
  }

  // Active item in lightbox
  const activeItem = activePhotoIndex !== null ? resortGallery[activePhotoIndex] : null

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
            {/* 1. Primary Wide Hero Image: Resort Entrance */}
            <div
              className="gallery-item-featured"
              onClick={() => openLightbox(0)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && openLightbox(0)}
              aria-label={`View photo: ${resortGallery[0].title}`}
            >
              <img
                src={resortGallery[0].src}
                alt={resortGallery[0].alt}
                loading="lazy"
                decoding="async"
                className="gallery-img"
              />
              <div className="gallery-item-overlay">
                <span className="gallery-pill">{resortGallery[0].category}</span>
                <div className="gallery-item-meta">
                  <h3 className="gallery-item-title">{resortGallery[0].title}</h3>
                  <span className="gallery-view-hint">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <circle cx="11" cy="11" r="8" />
                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                      <line x1="11" y1="8" x2="11" y2="14" />
                      <line x1="8" y1="11" x2="14" y2="11" />
                    </svg>
                    <span>View Photo (1 / {resortGallery.length})</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Supporting Stack: Open-air pavilion & Dining hall */}
            <div className="gallery-supporting-col">
              {/* 2. Open-Air Pavilion */}
              <div
                className="gallery-item-sub"
                onClick={() => openLightbox(1)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && openLightbox(1)}
                aria-label={`View photo: ${resortGallery[1].title}`}
              >
                <img
                  src={resortGallery[1].src}
                  alt={resortGallery[1].alt}
                  loading="lazy"
                  decoding="async"
                  className="gallery-img"
                />
                <div className="gallery-item-overlay">
                  <span className="gallery-pill">{resortGallery[1].category}</span>
                  <div className="gallery-item-meta">
                    <h4 className="gallery-item-subtitle">{resortGallery[1].title}</h4>
                    <span className="gallery-view-hint">View Photo (2 / {resortGallery.length})</span>
                  </div>
                </div>
              </div>

              {/* 3. Forest-View Dining Space */}
              <div
                className="gallery-item-sub"
                onClick={() => openLightbox(2)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && openLightbox(2)}
                aria-label={`View photo: ${resortGallery[2].title}`}
              >
                <img
                  src={resortGallery[2].src}
                  alt={resortGallery[2].alt}
                  loading="lazy"
                  decoding="async"
                  className="gallery-img"
                />
                <div className="gallery-item-overlay">
                  <span className="gallery-pill">{resortGallery[2].category}</span>
                  <div className="gallery-item-meta">
                    <h4 className="gallery-item-subtitle">{resortGallery[2].title}</h4>
                    <span className="gallery-view-hint">View Photo (3 / {resortGallery.length})</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Secondary Row: 3 Communal Space Photographs */}
          <div className="gallery-secondary-row">
            {/* 4. Indoor Lounge */}
            <div
              className="gallery-item-thumb"
              onClick={() => openLightbox(3)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && openLightbox(3)}
              aria-label={`View photo: ${resortGallery[3].title}`}
            >
              <img
                src={resortGallery[3].src}
                alt={resortGallery[3].alt}
                loading="lazy"
                decoding="async"
                className="gallery-img"
              />
              <div className="gallery-item-overlay">
                <span className="gallery-pill">{resortGallery[3].category}</span>
                <div className="gallery-item-meta">
                  <h4 className="gallery-item-subtitle">{resortGallery[3].title}</h4>
                  <span className="gallery-view-hint">View Photo (4 / {resortGallery.length})</span>
                </div>
              </div>
            </div>

            {/* 5. Common Sabha Gathering Space */}
            <div
              className="gallery-item-thumb"
              onClick={() => openLightbox(5)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && openLightbox(5)}
              aria-label={`View photo: ${resortGallery[5].title}`}
            >
              <img
                src={resortGallery[5].src}
                alt={resortGallery[5].alt}
                loading="lazy"
                decoding="async"
                className="gallery-img"
              />
              <div className="gallery-item-overlay">
                <span className="gallery-pill">{resortGallery[5].category}</span>
                <div className="gallery-item-meta">
                  <h4 className="gallery-item-subtitle">{resortGallery[5].title}</h4>
                  <span className="gallery-view-hint">View Photo (6 / {resortGallery.length})</span>
                </div>
              </div>
            </div>

            {/* 6. Window-Side Seating */}
            <div
              className="gallery-item-thumb"
              onClick={() => openLightbox(4)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && openLightbox(4)}
              aria-label={`View photo: ${resortGallery[4].title}`}
            >
              <img
                src={resortGallery[4].src}
                alt={resortGallery[4].alt}
                loading="lazy"
                decoding="async"
                className="gallery-img"
              />
              <div className="gallery-item-overlay">
                <span className="gallery-pill">{resortGallery[4].category}</span>
                <div className="gallery-item-meta">
                  <h4 className="gallery-item-subtitle">{resortGallery[4].title}</h4>
                  <span className="gallery-view-hint">View Photo (5 / {resortGallery.length})</span>
                </div>
              </div>
            </div>
          </div>

          {/* Gallery Action & Attribution Strip */}
          <div className="gallery-action-bar">
            <div className="gallery-badge-info">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--antique-brass)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                <circle cx="12" cy="13" r="4" />
              </svg>
              <span>Actual client-supplied photographs of retreat property, shared spaces and grounds in Kerala.</span>
            </div>
            <button
              type="button"
              className="btn btn-travel-secondary btn-sm"
              onClick={() => openLightbox(0)}
              aria-label="Open full resort photo gallery"
            >
              <span>Explore All {resortGallery.length} Property Photos</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
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
              <p className="card-desc">
                Accommodation is arranged on a twin-sharing basis (two guests per room) in Kerala, India. Shared lounges and open pavilions offer relaxing community spaces, with room allocation confirmed by the organiser.
              </p>
              <ul className="card-specs-list">
                <li>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--antique-brass)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                  <span>Two guests sharing per room</span>
                </li>
                <li>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--antique-brass)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                  <span>Located in Kerala, India</span>
                </li>
                <li>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--antique-brass)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                  <span>Specific room allocation confirmed by organiser</span>
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
              <p className="card-desc">
                Wholesome vegetarian meals prepared as part of the planned retreat experience, served in the scenic forest-view dining room.
              </p>
              <ul className="card-specs-list">
                <li>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--antique-brass)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                  <span>Vegetarian retreat experience</span>
                </li>
                <li>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--antique-brass)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                  <span>Scenic forest-view dining setting</span>
                </li>
                <li>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--antique-brass)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                  <span>Final meal schedule confirmed by organiser</span>
                </li>
              </ul>
            </div>
          </article>

          {/* Card 3: Pickup & Transport */}
          <article className="stay-travel-card">
            <div className="card-media">
              <img
                src="images/safe-care.jpg"
                alt="Kerala travel and arrival coordination"
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
                  <span>Requested pickup point: Kuttipuram Railway Station</span>
                </li>
                <li>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--antique-brass)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                  <span>Arrival coordination to be confirmed</span>
                </li>
                <li>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--antique-brass)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                  <span>Transport inclusion pending confirmation</span>
                </li>
              </ul>
            </div>
          </article>
        </div>
      </div>

      {/* ── Accessible Luxury Boutique Lightbox Modal ── */}
      {activeItem && (
        <div
          className="resort-lightbox-backdrop"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label={`Property photograph: ${activeItem.title}`}
        >
          <div className="lightbox-dialog" onClick={(e) => e.stopPropagation()}>
            {/* Top Bar */}
            <div className="lightbox-top-bar">
              <div className="lightbox-title-wrap">
                <span className="lightbox-category-tag">{activeItem.category}</span>
                <span className="lightbox-counter">
                  Photo {activePhotoIndex + 1} of {resortGallery.length}
                </span>
              </div>
              <button
                type="button"
                className="lightbox-close-btn"
                onClick={closeLightbox}
                aria-label="Close Lightbox (Escape)"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Center Stage: Image & Chevrons */}
            <div className="lightbox-stage">
              <button
                type="button"
                className="lightbox-nav-btn btn-prev"
                onClick={prevPhoto}
                aria-label="Previous Photo (Left Arrow)"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>

              <div className="lightbox-img-frame">
                <img
                  src={activeItem.src}
                  alt={activeItem.alt}
                  className="lightbox-img"
                />
              </div>

              <button
                type="button"
                className="lightbox-nav-btn btn-next"
                onClick={nextPhoto}
                aria-label="Next Photo (Right Arrow)"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>

            {/* Bottom Caption Bar */}
            <div className="lightbox-caption-bar">
              <h3 className="lightbox-caption-title">{activeItem.title}</h3>
              <p className="lightbox-caption-desc">{activeItem.caption}</p>
              <div className="lightbox-thumbnails-strip">
                {resortGallery.map((thumb, idx) => (
                  <button
                    key={thumb.id}
                    type="button"
                    className={`lightbox-thumb-btn ${idx === activePhotoIndex ? 'is-active' : ''}`}
                    onClick={() => setActivePhotoIndex(idx)}
                    aria-label={`Jump to photo ${idx + 1}: ${thumb.title}`}
                  >
                    <img src={thumb.src} alt="" aria-hidden="true" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
