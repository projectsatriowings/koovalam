import { useState } from 'react'
import { images } from '../data/images.js'
import { LeafMark } from './Logo.jsx'

/**
 * Shared responsive <picture> media element with conditional WebP source
 * and calm botanical fallback if an asset fails to load.
 */
export default function RetreatMedia({ imageName, altFallback, hasWebp = false }) {
  const [failed, setFailed] = useState(false)
  const meta = images[imageName] || {
    alt: altFallback,
    aspect: '3 / 2',
    w: 1264,
    h: 848,
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

