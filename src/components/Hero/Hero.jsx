import { useId } from 'react'
import collage from '../../assets/collage.jpg'
import logo from '../../assets/logo.svg'
import registerPaper from '../../assets/register-paper.png'
import PosterTrail from './PosterTrail.jsx'
import './Hero.css'

const NAV_LINKS = [
  { label: 'Home', href: '#' },
  { label: 'About', href: '#about' },
  { label: 'Events', href: '#events' },
  { label: 'FAQs', href: '#faqs' },
  { label: 'Sponsors', href: '#sponsors' },
]

// Hover state of the Figma "REGISTER NOW" component: a 1px inside stroke whose
// cream colour fades out across the last ~20% of the word. CSS text-stroke can't
// do gradients or inside alignment, so it's drawn in SVG (260 × 44 design box).
function RegisterOutline() {
  const id = useId().replace(/[^a-zA-Z0-9]/g, '')
  const text = (props) => (
    <text x="0" y="34" fontSize="36" letterSpacing="0.72" {...props}>
      REGISTER NOW
    </text>
  )

  return (
    <svg className="hero__register-outline" viewBox="0 0 260 44" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-stroke`} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0.803" stopColor="#f7f3e7" />
          <stop offset="1" stopColor="#f7f3e7" stopOpacity="0.18" />
        </linearGradient>
        <clipPath id={`${id}-clip`}>{text()}</clipPath>
      </defs>
      {text({
        fill: 'rgba(0, 0, 0, 0.2)',
        stroke: `url(#${id}-stroke)`,
        strokeWidth: 2,
        clipPath: `url(#${id}-clip)`,
      })}
    </svg>
  )
}

export default function Hero({ activeLink = 'Home', registerHref = '#register' }) {
  return (
    <header className="hero">
      <div className="hero__stage">
        <img className="hero__collage" src={collage} alt="" />
        <PosterTrail />

        <nav aria-label="Primary">
          <ul className="hero__nav">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={label}>
                <a href={href} aria-current={label === activeLink ? 'page' : undefined}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <h1 className="hero__title">
          <img src={logo} width="726" height="162" alt="" />
          <span className="sr-only">Nitrutsav 2026 — NIT Rourkela</span>
        </h1>

        <a className="hero__register" href={registerHref}>
          <img src={registerPaper} alt="" />
          <span className="hero__register-label">REGISTER NOW</span>
          <RegisterOutline />
        </a>
      </div>
    </header>
  )
}
