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
              A boutique Kerala retreat experience blending mindful movement, classical yoga, quiet village discovery and reflective space in nature.
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
            <h4 className="footer-col-title">Retreat Navigation</h4>
            <ul className="footer-links-list">
              <li><a href="#top">Home</a></li>
              <li><a href="#experience">The Experience</a></li>
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
                <strong>Dates &amp; Duration:</strong> To be confirmed
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
              <a href="#enquiry" className="btn btn-travel-secondary btn-sm">
                Enquiry Information
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
