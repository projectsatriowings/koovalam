/**
 * Authentic official Instagram and Facebook brand vector icons.
 * Styled with official brand colors, gradients, and crisp vector geometry.
 *
 * Uses direct CSS gradients and high-contrast vector paths to guarantee
 * 100% reliable rendering across all browsers, CSP policies, and screen sizes.
 */
import React from 'react'

export function InstagramIcon({ size = 36, className = '', rounded = true }) {
  const iconSize = Math.round(size * 0.6)

  return (
    <span
      className={`brand-social-icon brand-social-instagram ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: rounded ? '50%' : '24%',
        background: '#d6249f',
        backgroundImage:
          'radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285aeb 90%)',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.25)',
        flexShrink: 0,
        overflow: 'hidden',
        verticalAlign: 'middle',
      }}
      aria-hidden="true"
    >
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: 'block' }}
      >
        {/* Outer squircle camera outline */}
        <rect
          x="3"
          y="3"
          width="18"
          height="18"
          rx="5"
          stroke="#ffffff"
          strokeWidth="2.1"
        />
        {/* Central camera lens */}
        <circle
          cx="12"
          cy="12"
          r="4.2"
          stroke="#ffffff"
          strokeWidth="2.1"
        />
        {/* Flash dot */}
        <circle
          cx="16.8"
          cy="7.2"
          r="1.15"
          fill="#ffffff"
        />
      </svg>
    </span>
  )
}

export function FacebookIcon({ size = 36, className = '', rounded = true }) {
  const iconSize = Math.round(size * 0.62)

  return (
    <span
      className={`brand-social-icon brand-social-facebook ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: rounded ? '50%' : '24%',
        background: '#1877F2',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.25)',
        flexShrink: 0,
        overflow: 'hidden',
        verticalAlign: 'middle',
      }}
      aria-hidden="true"
    >
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 24 24"
        fill="#ffffff"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: 'block' }}
      >
        <path d="M15.12 12.4l.43-2.81h-2.7v-1.82c0-.77.38-1.52 1.58-1.52h1.23V3.86s-1.11-.19-2.18-.19c-2.22 0-3.68 1.35-3.68 3.79v2.13H7.3v2.81h2.48V19.2c.5.08 1.01.12 1.53.12s1.03-.04 1.53-.12v-6.8h2.28z" />
      </svg>
    </span>
  )
}
