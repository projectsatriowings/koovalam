import RetreatMedia from '../RetreatMedia.jsx'
import Reveal from '../Reveal.jsx'
import styles from './Culture.module.css'

const ART_TILE_CLASS = {
  bharatanatyam: styles.tileBharatanatyam,
  mohiniyattam: styles.tileMohiniyattam,
  flute: styles.tileFlute,
}

/**
 * Two-tier editorial showcase for Kerala Cultural Experiences:
 * 1) Daylight Scenic Village Tour strip on warm ivory
 * 2) Deep-forest twilight pavilion stage featuring Bharatanatyam, Mohiniyattam & Flute
 */
export default function CulturalExperiences({ category }) {
  const villageItem = category.items.find((i) => i.id === 'village-tour') || category.items[0]
  const eveningItem = category.items.find((i) => i.id === 'cultural-evenings') || category.items[1]
  const performances = eveningItem?.gallery || []

  return (
    <div className="experience-category-group">
      <div className="category-group-header">
        <span className="category-group-tag">{category.categoryTag}</span>
        <h3 className="category-group-title">{category.categoryName}</h3>
        <p className="category-group-desc">{category.categoryDesc}</p>
      </div>

      <Reveal>
        <div className={styles.cultureStack}>
          {/* Tier 01: Daylight Rural Kerala Village Walk Strip */}
          {villageItem && (
            <article className={styles.villageStrip}>
              <div className={styles.villageMediaFrame}>
                <RetreatMedia
                  imageName={villageItem.image}
                  altFallback={villageItem.title}
                  hasWebp={Boolean(villageItem.hasWebp)}
                />
                <div className={styles.mediaScrim} aria-hidden="true" />
                <span className={styles.mediaIndexBadge} aria-hidden="true">
                  01
                </span>
                <span className={styles.mediaTagPill}>
                  {villageItem.pillLabel || villageItem.tag}
                </span>
              </div>

              <div className={styles.villageProse}>
                <span className={styles.kicker}>
                  {villageItem.kicker || villageItem.tag}
                </span>
                <h4 className={styles.villageTitle}>{villageItem.title}</h4>
                <p className={styles.villageSummary}>{villageItem.summary}</p>

                {Array.isArray(villageItem.meta) && villageItem.meta.length > 0 && (
                  <dl className={styles.metaGrid}>
                    {villageItem.meta.map((entry) => (
                      <div key={entry.label} className={styles.metaItem}>
                        <dt className={styles.metaLabel}>{entry.label}</dt>
                        <dd className={styles.metaValue}>{entry.value}</dd>
                      </div>
                    ))}
                  </dl>
                )}
              </div>
            </article>
          )}

          {/* Tier 02: Twilight Pavilion Stage for Classical Performing Arts */}
          {eveningItem && (
            <article className={styles.eveningStage}>
              <div className={styles.stageHeader}>
                <div>
                  <span className={styles.stageKicker}>
                    02 · {eveningItem.kicker || eveningItem.tag}
                  </span>
                  <h4 className={styles.stageTitle}>{eveningItem.title}</h4>
                </div>

                <div className={styles.stageLeadCol}>
                  <p className={styles.stageLead}>{eveningItem.summary}</p>
                  <span className={styles.stageStatusPill}>
                    <span className={styles.stageStatusDot} aria-hidden="true" />
                    <span>Proposed · Subject to artist confirmation</span>
                  </span>
                </div>
              </div>

              <div className={styles.stageGrid}>
                {performances.map((art, idx) => (
                  <figure
                    key={art.slot}
                    className={`${styles.artTile} ${ART_TILE_CLASS[art.slot] || ''}`}
                  >
                    <RetreatMedia
                      imageName={art.image}
                      altFallback={art.title}
                      hasWebp={Boolean(art.hasWebp)}
                    />
                    <div className={styles.tileScrim} aria-hidden="true" />
                    <span className={styles.artBadgeNum} aria-hidden="true">
                      0{idx + 1}
                    </span>
                    <figcaption className={styles.artOverlay}>
                      <span className={styles.artKicker}>{art.kicker}</span>
                      <h5 className={styles.artTitle}>{art.title}</h5>
                      <p className={styles.artCaption}>{art.caption}</p>
                    </figcaption>
                  </figure>
                ))}
              </div>

              <div className={styles.stageFootnote}>
                <svg
                  className={styles.stageFootnoteIcon}
                  width="17"
                  height="17"
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
                <p className={styles.stageFootnoteText}>
                  <strong>Cultural evenings &amp; participation:</strong> All evening
                  recitals are relaxed and 100% voluntary. Bharatanatyam, Mohiniyattam,
                  and traditional flute performances are subject to performer
                  availability and final organiser confirmation prior to booking.
                </p>
              </div>
            </article>
          )}
        </div>
      </Reveal>
    </div>
  )
}
