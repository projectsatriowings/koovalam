import Logo from './Logo.jsx'
import {
  site,
  whatsappLink,
  isEmailConfigured,
  isWhatsAppConfigured,
} from '../config/site.js'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const verifiedSocials = (site.socials || []).filter(
    (s) => s.href && s.href !== '#' && !s.href.startsWith('#')
  )

  return (
    <footer className="travel-footer" role="contentinfo">
      <div className="wrap">
        <div className="footer-main-grid">
          {/* Brand Column */}
          <div className="footer-brand-col">
            <Logo light size={44} />
            <p className="footer-tagline">{site.tagline}</p>
            <p className="footer-brand-desc">
              Inspired by the sacred Bilva tree and rooted in the traditional wisdom of Kerala, Koovalam connects natural living, spiritual wellness retreats, and holistic experiences.
            </p>
            <div className="footer-location-badge">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--antique-brass)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span>Kerala, India</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="footer-nav-col">
            <h4 className="footer-col-title">Explore Koovalam</h4>
            <ul className="footer-links-list">
              <li><a href="#top">Home</a></li>
              <li><a href="#philosophy">Body, Mind &amp; Soul</a></li>
              <li><a href="#experience">Spiritual Wellness Retreat</a></li>
              <li><a href="#itinerary">Proposed Flow</a></li>
              <li><a href="#stay-travel">Stay &amp; Transport</a></li>
              <li><a href="#price">Retreat Investment</a></li>
              <li><a href="#enquiry">Enquire &amp; Register</a></li>
            </ul>
          </div>

          {/* Key Facts / Highlights */}
          <div className="footer-facts-col">
            <h4 className="footer-col-title">Retreat Information</h4>
            <ul className="footer-facts-list">
              <li>
                <strong>Location:</strong> Kerala, India
              </li>
              <li>
                <strong>Dates &amp; Duration:</strong> Dec 17–20 (4 Days / 3 Nights)
              </li>
              <li>
                <strong>Accommodation:</strong> Twin-Sharing (2 guests/room)
              </li>
              <li>
                <strong>Dining:</strong> Vegetarian meals planned
              </li>
              <li>
                <strong>Requested Pickup:</strong> Kuttipuram Station
              </li>
              <li>
                <strong>Provisional Price:</strong> ₹9,999 / person
              </li>
            </ul>
          </div>

          {/* Contact / Enquiry Help */}
          <div className="footer-contact-col">
            <h4 className="footer-col-title">Enquiry Support</h4>
            <p className="footer-contact-note">
              Have questions regarding retreat suitability, group enquiries or health considerations?
            </p>
            <div className="footer-contact-actions">
              <a href="#enquiry" className="btn btn-travel-ghost btn-sm footer-enquiry-btn">
                <span>Enquiry Information</span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
              {isWhatsAppConfigured && whatsappLink && (
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  className="footer-wa-link"
                >
                  WhatsApp Organiser
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="footer-divider-line" aria-hidden="true" />

        <div className="footer-bottom-row">
          <p className="footer-health-disclaimer">
            Retreat practices support personal mindfulness, gentle movement, and holistic well-being. They are non-clinical and do not replace individual medical advice or care.
          </p>
          <div className="footer-copyright">
            © {currentYear} {site.brand}. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}
