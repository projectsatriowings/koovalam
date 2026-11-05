import { useRef, useState } from 'react'

// 3D tilt — UI UX Pro Max #5 3D & Hyperrealism + #46 Dimensional Layering
// + #60 Tactile Digital: pointer-driven rotateX/rotateY with a soft glare,
// springy reset on leave. Disabled on touch / reduced motion.
export default function Tilt({ children, className = '', max = 7 }) {
  const ref = useRef(null)
  const [style, setStyle] = useState({})
  const [glare, setGlare] = useState({})
  const enabled = () =>
    typeof window !== 'undefined' &&
    window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const onMove = (e) => {
    if (!enabled()) return
    const r = ref.current.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    setStyle({ transform: `perspective(900px) rotateY(${(px - 0.5) * max * 2}deg) rotateX(${(0.5 - py) * max * 2}deg) translateY(-4px)` })
    setGlare({ background: `radial-gradient(circle at ${px * 100}% ${py * 100}%, rgba(255,255,255,.35), transparent 55%)`, opacity: 1 })
  }
  const onLeave = () => { setStyle({}); setGlare({ opacity: 0 }) }
  return (
    <div ref={ref} className={`tilt ${className}`} style={style} onMouseMove={onMove} onMouseLeave={onLeave}>
      {children}
      <div className="tilt-glare" style={glare} aria-hidden="true" />
    </div>
  )
}
