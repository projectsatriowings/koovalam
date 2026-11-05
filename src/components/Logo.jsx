// Koovalam Official Logo & Bilva Leaf Mark
// Extracted from the official identity brandmark.

export function LeafMark({ color = 'currentColor', stemColor, size = 34, className = '' }) {
  const actualStemColor = stemColor || (color === '#F6F1E4' || color === '#fff' ? '#D4AF37' : '#A8892E')
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      aria-hidden="true"
      style={{ display: 'inline-block', verticalAlign: 'middle' }}
    >
      {/* Outer circle */}
      <circle cx="50" cy="50" r="45" fill="none" stroke={color} strokeWidth="2.8" />
      
      {/* Golden stem */}
      <line x1="50" y1="73" x2="50" y2="88" stroke={actualStemColor} strokeWidth="3.2" strokeLinecap="round" />

      {/* Center Leaf */}
      <path d="M 50 73 C 34 60, 32 28, 50 13 C 68 28, 66 60, 50 73 Z" fill="none" stroke={color} strokeWidth="2.4" strokeLinejoin="round" />
      <path d="M 50 73 L 50 14" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" />
      {/* Center Leaf Veins */}
      <path d="M 50 63 C 44 58, 39 56, 36 55" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M 50 63 C 56 58, 61 56, 64 55" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M 50 51 C 43 46, 37 43, 35 41" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M 50 51 C 57 46, 63 43, 65 41" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M 50 39 C 44 34, 40 31, 38 29" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M 50 39 C 56 34, 60 31, 62 29" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M 50 27 C 46 23, 44 20, 43 18" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M 50 27 C 54 23, 56 20, 57 18" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" />

      {/* Left Leaf */}
      <path d="M 48 73 C 36 52, 16 34, 6 44 C 16 63, 36 78, 48 73 Z" fill="none" stroke={color} strokeWidth="2.4" strokeLinejoin="round" />
      <path d="M 48 73 C 34 62, 18 51, 7 44" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" />
      {/* Left Leaf Veins */}
      <path d="M 37 65 C 32 58, 26 53, 21 50" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M 37 65 C 37 70, 36 74, 34 76" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M 27 57 C 22 51, 17 46, 13 44" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M 27 57 C 28 62, 27 67, 24 70" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M 18 50 C 14 46, 10 43, 8 43" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M 18 50 C 20 54, 20 59, 18 62" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" />

      {/* Right Leaf */}
      <path d="M 52 73 C 64 52, 84 34, 94 44 C 84 63, 64 78, 52 73 Z" fill="none" stroke={color} strokeWidth="2.4" strokeLinejoin="round" />
      <path d="M 52 73 C 66 62, 82 51, 93 44" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" />
      {/* Right Leaf Veins */}
      <path d="M 63 65 C 68 58, 74 53, 79 50" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M 63 65 C 63 70, 64 74, 66 76" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M 73 57 C 78 51, 83 46, 87 44" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M 73 57 C 72 62, 73 67, 76 70" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M 82 50 C 86 46, 90 43, 92 43" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M 82 50 C 80 54, 80 59, 82 62" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

export default function Logo({ light = false, size, className = '', style = {} }) {
  const h = size ?? (light ? 56 : 50)
  const src = light ? '/images/koovalam-logo-light.png' : '/images/koovalam-logo.png'
  return (
    <span
      className={`koovalam-logo-wrap ${light ? 'light' : 'dark'} ${className}`}
      style={{ display: 'inline-flex', alignItems: 'center', lineHeight: 1, ...style }}
    >
      <img
        src={src}
        alt="Koovalam"
        height={h}
        style={{
          height: `${h}px`,
          width: 'auto',
          display: 'block',
          objectFit: 'contain',
        }}
      />
    </span>
  )
}
