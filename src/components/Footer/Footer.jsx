import logo from '../../assets/logo.svg'
import { LINKS, CONTACTS, ADDRESS } from '../../content/links.js'
import './Footer.css'

const ext = { target: '_blank', rel: 'noopener noreferrer' }

// Layout follows the footer in the earlier Figma hero design; links are the live ones.
const SOCIALS = [
  {
    label: 'Instagram',
    href: LINKS.instagram,
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="17.5" cy="6.5" r="1.3" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: 'WhatsApp',
    href: LINKS.whatsapp,
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
        <path
          d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.6-1.2A9 9 0 1 0 12 3Z"
          fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"
        />
        <path
          d="M9 8.5c0 3.5 3 6.5 6.5 6.5l1-1.5-2-1-1 1c-1-.5-2-1.5-2.5-2.5l1-1-1-2Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
]

export default function Footer() {
  return (
    <footer id="contact" className="footer">
      <div className="footer__inner container">
        <ul className="footer__socials">
          {SOCIALS.map(({ label, href, icon }) => (
            <li key={label}>
              <a className="footer__social" href={href} {...ext}>
                {icon}
                <span>{label}</span>
              </a>
            </li>
          ))}
        </ul>

        <img className="footer__logo" src={logo} width="726" height="162" alt="Nitrutsav 2026 — NIT Rourkela" />

        <div className="footer__contact">
          <h2 className="footer__heading">Contact us</h2>
          <ul className="footer__people">
            {CONTACTS.map(({ name, role, phone }) => (
              <li key={name} className="footer__person">
                <span className="footer__person-name">{name}</span>
                <span className="footer__person-role">{role}</span>
                <a href={`tel:${phone.replace(/\s/g, '')}`}>{phone}</a>
              </li>
            ))}
          </ul>
          <address className="footer__address">{ADDRESS}</address>
        </div>

        <div className="footer__bottom">
          <ul className="footer__legal">
            {LINKS.legal.map(({ label, href }) => (
              <li key={label}><a href={href} {...ext}>{label}</a></li>
            ))}
          </ul>
          <p className="footer__credit">
            Crafted with <span className="footer__heart" aria-label="love">♥</span> by{' '}
            <a href={LINKS.dsc} {...ext}>DSC NIT Rourkela</a>
          </p>
        </div>
      </div>
    </footer>
  )
}
