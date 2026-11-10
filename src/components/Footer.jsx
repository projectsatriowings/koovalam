import Logo from './Logo.jsx'
import {
  site,
  whatsappLink,
  isEmailConfigured,
  isWhatsAppConfigured,
} from '../config/site.js'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  // Only display verified social channels with real external URLs
  const verifiedSocials = (site.socials || []).filter(
    (s) => s.href && s.href !== '#' && !s.href.startsWith('#')
  )

  return (
    <footer className="editorial-footer" role="contentinfo">
      <div className="wrap">
        <div className="footer-top-grid">
          <div className="footer-brand-col">
            <Logo light size={50} />
            <p className="footer-tagline">{site.tagline}</p>
            <p className="footer-retreat-desc">
              A gentle 4-day spiritual wellness and mindfulness sanctuary in Kerala, India. Rooted in traditional wisdom, restorative movement, and unhurried natural living.
            </p>
            <div className="footer-pillars-strip">
              <span>BODY</span>
              <span className="dot" aria-hidden="true">·</span>
              <span>MIND</span>
              <span className="dot" aria-hidden="true">·</span>
              <span>SOUL</span>
            </div>
          </div>

          <div className="footer-nav-col">
            <h4 className="footer-col-title">Navigation</h4>
            <ul className="footer-links">
              <li><a href="#pause">The Sanctuary</a></li>
              <li><a href="#koovalam">Sacred Origin</a></li>
              <li><a href="#retreat">Mindful Practices</a></li>
              <li><a href="#journey">4-Day Journey</a></li>
              <li><a href="#highlights">Kerala Experiences</a></li>
              <li><a href="#included">Inclusions</a></li>
              <li><a href="#faq">Frequently Asked Questions</a></li>
              <li><a href="#dates">Dates &amp; Reservations</a></li>
            </ul>
          </div>

          <div className="footer-contact-col">
            <h4 className="footer-col-title">Direct Inquiries</h4>
            <p className="footer-contact-item">
              <span className="contact-label">Email:</span>
              {isEmailConfigured ? (
                <a href={`mailto:${site.email}`} className="contact-link">
                  {site.email}
                </a>
              ) : (
                <span className="contact-prep-text">Announcing upon launch</span>
              )}
            </p>
            <p className="footer-contact-item">
              <span className="contact-label">WhatsApp:</span>
              {isWhatsAppConfigured && whatsappLink ? (
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  className="contact-link"
                >
                  Direct WhatsApp Channel
                </a>
              ) : (
                <span className="contact-prep-text">Announcing upon launch</span>
              )}
            </p>
            {verifiedSocials.length > 0 ? (
              <div className="footer-socials">
                {verifiedSocials.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="footer-social-link">
                    {s.label}
                  </a>
                ))}
              </div>
            ) : (
              <p className="footer-socials-note">
                Community channels announcing upon retreat launch.
              </p>
            )}
          </div>
        </div>

        <div className="footer-divider" aria-hidden="true" />

        <div className="footer-bottom">
          <p className="footer-disclaimer">
            Our programs and retreat experiences support holistic well-being, mindfulness, and personal growth. They are not intended as a substitute for professional clinical medical or psychological treatment.
          </p>
          <div className="footer-legal">
            <p className="copyright">
              © {currentYear} {site.wordmark}. All rights reserved. Kerala, India.
            </p>
            <p className="footnote">
              Sample itinerary shown; activities honor local customs, seasonal conditions, and safety protocols.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
