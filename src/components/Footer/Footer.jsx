import { useEffect, useRef } from 'react'
import { LINKS } from '../../content/links.js'
import mandala from '../../assets/footer/mandala.webp'
import arch from '../../assets/footer/arch.webp'
import collage from '../../assets/footer/collage.webp'
import cornerFloral from '../../assets/footer/corner-floral.webp'
import cornerTeal from '../../assets/footer/corner-teal.webp'
import hand from '../../assets/footer/hand.webp'
import lotusDivider from '../../assets/footer/lotus-divider.webp'
import logoGold from '../../assets/footer/logo-gold.svg'
import instagram from '../../assets/footer/instagram.svg'
import whatsapp from '../../assets/footer/whatsapp.svg'
import './Footer.css'

// Built from the 2026 footer frame (2766 × 2233) in the NU 2k25 Figma file.
// Every layer is positioned in frame units via --u and moves on scroll (see useParallax).

const ext = { target: '_blank', rel: 'noopener noreferrer' }

const COLUMNS = [
  {
    heading: 'Explore',
    links: [
      { label: 'Home', href: '#' },
      { label: 'About', href: '#about' },
      { label: 'Events', href: '#events' },
      { label: 'FAQs', href: '#faqs' },
    ],
  },
  {
    heading: 'Get involved',
    links: [
      { label: 'Register', href: LINKS.events, ...ext },
      { label: 'Sponsor', href: '#sponsors' },
      { label: 'Collaborate', href: LINKS.instagram, ...ext },
      { label: 'Contact', href: LINKS.team, ...ext },
    ],
  },
  {
    heading: 'Information',
    links: LINKS.legal.map(({ label, href }) => ({ label, href, ...ext })),
  },
]

const SOCIALS = [
  { label: 'Instagram', href: LINKS.instagram, icon: instagram },
  { label: 'WhatsApp', href: LINKS.whatsapp, icon: whatsapp },
]

// Sets --p (0 → 1, eased) as the footer scrolls into view, and --mx/--my
// (-1 → 1) from the pointer, for the layered parallax in Footer.css.
function useParallax(ref) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.style.setProperty('--p', 1)
      return
    }

    let frame = 0
    const update = () => {
      frame = 0
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight
      const raw = Math.min(1, Math.max(0, (vh - rect.top) / Math.min(rect.height, vh * 0.9)))
      const eased = 1 - Math.pow(1 - raw, 3)
      el.style.setProperty('--p', eased.toFixed(4))
      el.style.setProperty('--scroll', ((vh - rect.top) / vh).toFixed(4))
    }
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update) }

    const onPointer = (e) => {
      if (e.pointerType !== 'mouse') return
      const rect = el.getBoundingClientRect()
      el.style.setProperty('--mx', (((e.clientX - rect.left) / rect.width) * 2 - 1).toFixed(3))
      el.style.setProperty('--my', (((e.clientY - rect.top) / rect.height) * 2 - 1).toFixed(3))
    }
    const onLeave = () => { el.style.setProperty('--mx', 0); el.style.setProperty('--my', 0) }

    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    el.addEventListener('pointermove', onPointer)
    el.addEventListener('pointerleave', onLeave)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      el.removeEventListener('pointermove', onPointer)
      el.removeEventListener('pointerleave', onLeave)
    }
  }, [ref])
}

function Columns({ className }) {
  return (
    <nav className={className} aria-label="Footer">
      {COLUMNS.slice(0, 2).map(({ heading, links }) => (
        <div key={heading} className="footer__column">
          <h2 className="footer__heading">{heading}</h2>
          <ul>
            {links.map(({ label, ...a }) => <li key={label}><a {...a}>{label}</a></li>)}
          </ul>
        </div>
      ))}
      <div className="footer__column footer__column--connect">
        <h2 className="footer__heading">Connect</h2>
        <ul className="footer__socials">
          {SOCIALS.map(({ label, href, icon }) => (
            <li key={label}>
              <a href={href} {...ext} aria-label={label}>
                <img src={icon} alt="" width="59" height="59" />
              </a>
            </li>
          ))}
        </ul>
      </div>
      {COLUMNS.slice(2).map(({ heading, links }) => (
        <div key={heading} className="footer__column">
          <h2 className="footer__heading">{heading}</h2>
          <ul>
            {links.map(({ label, ...a }) => <li key={label}><a {...a}>{label}</a></li>)}
          </ul>
        </div>
      ))}
    </nav>
  )
}

export default function Footer() {
  const ref = useRef(null)
  useParallax(ref)

  return (
    <footer id="contact" className="footer" ref={ref}>
      <div className="footer__stage">
        <img className="footer__layer footer__mandala" src={mandala} alt="" />
        <img className="footer__layer footer__corner footer__corner--floral" src={cornerFloral} alt="" />
        <img className="footer__layer footer__corner footer__corner--teal" src={cornerTeal} alt="" />
        <img className="footer__layer footer__hand footer__hand--left" src={hand} alt="" />
        <img className="footer__layer footer__hand footer__hand--right" src={hand} alt="" />
        <img className="footer__layer footer__logo" src={logoGold} alt="Nitrutsav 2026 — NIT Rourkela" />
        <img className="footer__layer footer__arch" src={arch} alt="" />

        <p className="footer__tagline">A celebration of culture, creativity and campus spirit.</p>
        <Columns className="footer__columns" />
        <img className="footer__layer footer__lotus" src={lotusDivider} alt="" />
        <p className="footer__credit">Crafted With Love By DSC NIT Rourkela</p>

        <img className="footer__layer footer__collage" src={collage} alt="" />
      </div>

      {/* Below 1200px the columns leave the artwork and stack here. */}
      <div className="footer__stack">
        <p className="footer__tagline footer__tagline--stack">A celebration of culture, creativity and campus spirit.</p>
        <Columns className="footer__columns footer__columns--stack" />
        <p className="footer__credit footer__credit--stack">Crafted With Love By DSC NIT Rourkela</p>
      </div>
    </footer>
  )
}
