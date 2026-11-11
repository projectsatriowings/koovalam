import styles from './Practices.module.css'

function padTwo(num) {
  return String(num).padStart(2, '0')
}

/**
 * Sticky editorial image stage on desktop (>= 960px).
 * Stacks all practice visuals in a fixed-ratio frame and cross-fades opacity
 * cleanly with no layout shift.
 */
export default function PracticeStage({ items, activeIndex }) {
  const activeItem = items[activeIndex] || items[0]
  const totalLabel = padTwo(items.length)
  const progressPercent = ((activeIndex + 1) / items.length) * 100

  return (
    <div className={styles.stageColumn}>
      <div className={styles.stageFrame}>
        {items.map((item, idx) => {
          const isCurrent = idx === activeIndex
          return (
            <div
              key={item.id}
              className={`${styles.stageSlide} ${
                isCurrent ? styles.stageSlideActive : ''
              }`}
              aria-hidden={!isCurrent}
            >
              <picture>
                <source srcSet={`images/${item.image}.webp`} type="image/webp" />
                <img
                  src={`images/${item.image}.jpg`}
                  alt={item.alt}
                  width={1024}
                  height={1024}
                  decoding="async"
                  loading={idx === 0 ? 'eager' : 'lazy'}
                />
              </picture>
            </div>
          )
        })}

        <div className={styles.stageScrim} aria-hidden="true" />

        <div className={styles.stageIndexBadge} aria-hidden="true">
          {activeItem.number} / {totalLabel}
        </div>

        <span className={styles.stageLabelPill}>{activeItem.label}</span>

        <div className={styles.stageProgressTrack} aria-hidden="true">
          <div
            className={styles.stageProgressBar}
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>
    </div>
  )
}

