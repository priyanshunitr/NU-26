import SectionHeading from '../SectionHeading/SectionHeading.jsx'
import { LINKS } from '../../content/links.js'
import useSectionParallax from '../../lib/useSectionParallax.js'
import eventsPaper from '../../assets/section-art/events-paper.webp'
import './Events.css'

// Events published on nitrutsav.in so far. Each gets its own truck-art colourway.
const EVENTS = [
  {
    hindi: 'ललकार', title: 'Lalkaar', tag: 'Street play',
    blurb: 'A nukkad natak competition where teams take short street plays to the crowd to put real-life issues and social messages front and centre.',
    href: LINKS.events, cta: 'View details',
    bg: 'var(--maroon)', fg: 'var(--cream)', accent: 'var(--marigold)',
  },
  {
    hindi: 'मंच', title: 'Spotlight', tag: 'Monoact · by RITVIC',
    blurb: 'One performer, one stage, one round. Drama, satire or soulful storytelling — bring your story, own the stage and let the act speak.',
    href: LINKS.events, cta: 'View details',
    bg: 'var(--indigo)', fg: 'var(--cream)', accent: 'var(--saffron)',
  },
  {
    hindi: 'ताल', title: 'Breakbeats', tag: 'Street dance battle',
    blurb: '1 vs 1 Open Style and 3 vs 3 All Style. Hip-hop, popping, locking, waacking, breaking, krumping, lite-feet and afro — the streets are calling.',
    href: LINKS.events, cta: 'View details',
    bg: 'var(--rani)', fg: 'var(--cream)', accent: 'var(--marigold)',
  },
  {
    hindi: 'नृत्य', title: 'Footloose', tag: 'Flagship dance · by Synergy',
    blurb: 'NITR’s flagship dance event, where rhythm meets rebellion. Solos, duets and full crews — every style gets its space to shine.',
    href: LINKS.events, cta: 'View details',
    bg: 'var(--peacock)', fg: 'var(--cream)', accent: 'var(--marigold)',
  },
  {
    hindi: 'संसद', title: 'MUN', tag: 'Model United Nations',
    blurb: 'Debate, negotiate and draft resolutions with delegates from across the country. Registrations are open now.',
    href: LINKS.mun, cta: 'Register',
    bg: 'var(--marigold)', fg: 'var(--ink)', accent: 'var(--maroon)',
  },
  {
    hindi: 'और भी', title: 'More soon', tag: 'Stay tuned',
    blurb: 'More events are being announced. Follow us on Instagram or join the WhatsApp channel so you don’t miss a drop.',
    href: LINKS.instagram, cta: 'Follow us',
    bg: 'var(--ink-soft)', fg: 'var(--marigold)', accent: 'var(--rani)',
  },
]

// 3D tilt toward the pointer, like holding a poster up to the light.
function tilt(e) {
  if (e.pointerType !== 'mouse' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const card = e.currentTarget
  const r = card.getBoundingClientRect()
  const x = (e.clientX - r.left) / r.width - 0.5
  const y = (e.clientY - r.top) / r.height - 0.5
  card.style.setProperty('--ry', `${(x * 5).toFixed(2)}deg`)
  card.style.setProperty('--rx', `${(-y * 5).toFixed(2)}deg`)
}

function untilt(e) {
  e.currentTarget.style.setProperty('--ry', '0deg')
  e.currentTarget.style.setProperty('--rx', '0deg')
}

export default function Events() {
  const sectionRef = useSectionParallax()
  return (
    <section id="events" className="section events" ref={sectionRef}>
      <div className="events__art" aria-hidden="true">
        <img src={eventsPaper} alt="" loading="lazy" decoding="async" />
      </div>
      <div className="container">
        <SectionHeading kicker="कार्यक्रम" title="Events" />
        <p className="events__intro" data-reveal="rise">
          Three days of high-energy events and captivating performances. Here&rsquo;s what&rsquo;s
          been announced so far &mdash; full rules and registration are on each event page.
        </p>

        <ul className="events__grid">
          {EVENTS.map(({ hindi, title, tag, blurb, href, cta, bg, fg, accent }, i) => (
            <li
              key={title}
              className="event-card"
              data-reveal="poster"
              style={{ '--card-bg': bg, '--card-fg': fg, '--card-accent': accent, '--d': i % 3 }}
              onPointerMove={tilt}
              onPointerLeave={untilt}
            >
              <span className="event-card__hindi" lang="hi" aria-hidden="true">{hindi}</span>
              <h3 className="event-card__title">{title}</h3>
              <span className="event-card__tag">{tag}</span>
              <p className="event-card__blurb">{blurb}</p>
              <a className="event-card__link" href={href} target="_blank" rel="noopener noreferrer">
                {cta} <span aria-hidden="true">→</span>
                <span className="sr-only"> for {title} (opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
