import { spiritualDimensions } from '../../data/brandProfile.js'
import { LeafMark } from '../Logo.jsx'
import Reveal from '../Reveal.jsx'
import styles from './BrandSections.module.css'

/**
 * Minimal architectural redesign for Three Dimensions of Well-Being (Body · Mind · Soul).
 * Asymmetric editorial intro on the left + hairline-divided monograph rows on the right.
 */
export default function BrandPhilosophy() {
  return (
    <section
      id="philosophy"
      className={styles.philosophySection}
      aria-label="Three Dimensions of Well-Being: Body, Mind and Soul"
    >
      <div className="wrap">
        <Reveal>
          <div className={styles.philosophyGrid}>
            {/* Left Column: Concise Philosophy Anchor */}
            <div className={styles.introColumn}>
              <div className={styles.eyebrow}>
                <LeafMark color="var(--antique-brass)" size={13} />
                <span>{spiritualDimensions.eyebrow}</span>
              </div>

              <h2 className={styles.heading}>
                {spiritualDimensions.headingPrefix}{' '}
                <span className="serif-italic">{spiritualDimensions.headingAccent}</span>
              </h2>

              <p className={styles.intro}>{spiritualDimensions.intro}</p>

              <div className={styles.trifoliateSeal} aria-hidden="true">
                <LeafMark color="var(--deep-forest)" stemColor="var(--antique-brass)" size={42} />
                <span className={styles.sealCaption}>
                  Sacred Trifoliate Leaf · Whole-Person Balance
                </span>
              </div>
            </div>

            {/* Right Column: Clean Hairline-Divided Triad Rows */}
            <div className={styles.dimensionsList}>
              {spiritualDimensions.items.map((dim) => (
                <article key={dim.name} className={styles.dimensionRow}>
                  <span className={styles.dimensionNum} aria-hidden="true">
                    {dim.num}
                  </span>

                  <div className={styles.dimensionHead}>
                    <h3 className={styles.dimensionName}>{dim.name}</h3>
                    <p className={styles.dimensionTagline}>{dim.tagline}</p>
                  </div>

                  <p className={styles.dimensionDetail}>{dim.detail}</p>
                </article>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
