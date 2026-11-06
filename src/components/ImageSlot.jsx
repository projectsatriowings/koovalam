import { useState } from 'react'
import { images } from '../data/images.js'
import { LeafMark } from './Logo.jsx'

// <picture> with .webp source + .png fallback. If the file is missing or
// fails to load, renders a soft forest-green/cream gradient block — never a
// broken-image icon — so the page looks finished before images are generated.
export default function ImageSlot({ name, eager = false, className = '' }) {
  const meta = images[name] || { alt: name, aspect: '3 / 2', w: 1200, h: 800 }
  const [failed, setFailed] = useState(false)
  if (failed) {
    return (
      <div className={`slot ${className}`} style={{ aspectRatio: meta.aspect }} role="img" aria-label={meta.alt || name}>
        <div className="slot-fallback"><LeafMark color="var(--antique-gold)" size={48} /></div>
      </div>
    )
  }
  return (
    <div className={`slot ${className}`} style={{ aspectRatio: meta.aspect }}>
      <picture>
        <source srcSet={`images/${name}.webp`} type="image/webp" />
        <img
          src={`images/${name}.jpg`}
          alt={meta.alt}
          width={meta.w}
          height={meta.h}
          decoding="async"
          loading={eager ? 'eager' : 'lazy'}
          onError={() => setFailed(true)}
        />
      </picture>
    </div>
  )
}
