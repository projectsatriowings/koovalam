import { useState } from 'react'
import { images } from '../../data/images.js'
import { LeafMark } from '../Logo.jsx'
import Reveal from '../Reveal.jsx'
import styles from './Temples.module.css'

const SLOT_CLASS = {
  ikkare: styles.tileIkkare,
  walkway: styles.tileWalkway,
  akkare: styles.tileAkkare,
  valley: styles.tileValley,
  courtyard: styles.tileCourtyard,
  sanctum: styles.tileSanctum,
}

/**
 * Renders a sanctuary photograph with conditional WebP source and fallback.
 */
function TempleMedia({ imageName, altFallback, hasWebp = false }) {
  const [failed, setFailed] = useState(false)
  const meta = images[imageName] || {
    alt: altFallback,
    aspect: '3 / 2',
    w: 1536,
    h: 1024,
  }

  if (failed) {
    return (
      <div
        className="slot"
        style={{ width: '100%', height: '100%', aspectRatio: meta.aspect }}
        role="img"
        aria-label={meta.alt || altFallback}
      >
        <div className="slot-fallback">
          <LeafMark color="var(--antique-gold)" size={48} />
        </div>
      </div>
    )
  }

  return (
    <picture>
      {hasWebp && (
        <source srcSet={`images/${imageName}.webp`} type="image/webp" />
      )}
      <img
        src={`images/${imageName}.jpg`}
        alt={meta.alt}
        width={meta.w}
        height={meta.h}
        loading="lazy"
        decoding="async"
        onError={() => setFailed(true)}
      />
    </picture>
  )
}

/**
 * Asymmetric 3-photo editorial triptych supporting portrait-left and landscape-top layouts.
 */
function TempleTriptych({ gallery, spreadIndex, layout = 'portrait-left' }) {
  const gridClass =
    layout === 'landscape-top' ? styles.triptychLandscapeTop : styles.triptych

  return (
    <div className={gridClass}>
      {gallery.map((photo) => {
        const slotClass = SLOT_CLASS[photo.slot] || ''
        const isTopRightTile =
          photo.slot === 'ikkare' || photo.slot === 'valley'

        return (
          <div
            key={photo.image}
            className={`${styles.triptychTile} ${slotClass}`}
          >
            <TempleMedia
              imageName={photo.image}
              altFallback={photo.label}
              hasWebp={photo.hasWebp}
            />
            <div className={styles.tileScrim} aria-hidden="true" />
            {isTopRightTile && (
              <span className={styles.mediaIndexBadge} aria-hidden="true">
                0{spreadIndex + 1}
              </span>
            )}
            <span className={styles.tileLabel}>{photo.label}</span>
          </div>
        )
      })}
    </div>
  )
}

/**
 * Editorial diptych showcasing Kerala sacred temple heritage sites.
 * Alternating image/prose spreads on desktop (>= 960px), stacking photo-first on mobile.
 */
export default function SacredTemples({ category }) {
  return (
    <div className="experience-category-group">
      <div className="category-group-header">
        <span className="category-group-tag">{category.categoryTag}</span>
        <h3 className="category-group-title">{category.categoryName}</h3>
        <p className="category-group-desc">{category.categoryDesc}</p>
      </div>

      <Reveal>
        <div className={styles.templesList}>
          {category.items.map((item, idx) => {
            const isReversed = idx % 2 === 1
            const metaItems = item.meta || []
            const hasGallery =
              Array.isArray(item.gallery) && item.gallery.length > 0

            return (
              <article
                key={item.id}
                className={
                  isReversed
                    ? `${styles.templeSpread} ${styles.templeSpreadReversed}`
                    : styles.templeSpread
                }
              >
                <div className={styles.mediaCol}>
                  {hasGallery ? (
                    <TempleTriptych
                      gallery={item.gallery}
                      spreadIndex={idx}
                      layout={item.galleryLayout}
                    />
                  ) : (
                    <div className={styles.mediaFrame}>
                      <TempleMedia
                        imageName={item.image}
                        altFallback={item.title}
                        hasWebp={item.hasWebp}
                      />
                      <div className={styles.mediaScrim} aria-hidden="true" />
                      <span className={styles.mediaIndexBadge} aria-hidden="true">
                        0{idx + 1}
                      </span>
                      <span className={styles.mediaLocationPill}>
                        {item.pillLabel || item.tag}
                      </span>
                    </div>
                  )}
                </div>

                <div className={styles.contentCol}>
                  <span className={styles.kicker}>
                    {item.kicker || item.tag}
                  </span>
                  <h4 className={styles.templeTitle}>{item.title}</h4>
                  <p className={styles.templeSummary}>{item.summary}</p>

                  {metaItems.length > 0 && (
                    <dl className={styles.metaGrid}>
                      {metaItems.map((entry) => (
                        <div key={entry.label} className={styles.metaItem}>
                          <dt className={styles.metaLabel}>{entry.label}</dt>
                          <dd className={styles.metaValue}>{entry.value}</dd>
                        </div>
                      ))}
                    </dl>
                  )}
                </div>
              </article>
            )
          })}
        </div>

        <div className={styles.etiquetteBar}>
          <svg
            className={styles.etiquetteIcon}
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
          <p className={styles.etiquetteText}>
            <strong>Visitor notes &amp; imagery:</strong> Photographs feature
            Kottiyoor Temple and Tirunelli Temple alongside representative
            Kerala stone sanctuary imagery. All visits are proposed and
            scheduled respectfully in keeping with temple dress codes, local
            customs, seasonal calendars, and organiser confirmation.
          </p>
        </div>
      </Reveal>
    </div>
  )
}
