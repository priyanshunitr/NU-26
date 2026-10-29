import { useRef } from 'react'
import SectionHeading from '../SectionHeading/SectionHeading.jsx'
import { LINKS } from '../../content/links.js'
import posterMasala from '../../assets/posters/poster-08.webp'
import posterDesi from '../../assets/posters/poster-02.webp'
import posterNimbu from '../../assets/posters/poster-10.webp'
import './About.css'

const STATS = [
  { value: '3', label: 'Days' },
  { value: '#1', label: 'Fest in Odisha' },
  { value: '’26', label: 'Edition' },
]

export default function About() {
  const artRef = useRef(null)

  // Poster stack drifts toward the pointer (each layer by a different amount) for depth.
  const onPointerMove = (e) => {
    const art = artRef.current
    if (!art || e.pointerType !== 'mouse') return
    const r = art.getBoundingClientRect()
    const px = ((e.clientX - (r.left + r.width / 2)) / window.innerWidth) * 2
    const py = ((e.clientY - (r.top + r.height / 2)) / window.innerHeight) * 2
    art.style.setProperty('--px', Math.max(-1, Math.min(1, px)).toFixed(3))
    art.style.setProperty('--py', Math.max(-1, Math.min(1, py)).toFixed(3))
  }

  const onPointerLeave = () => {
    artRef.current?.style.setProperty('--px', 0)
    artRef.current?.style.setProperty('--py', 0)
  }

  return (
    <section id="about" className="section about" onPointerMove={onPointerMove} onPointerLeave={onPointerLeave}>
      <div className="container about__grid">
        <div className="about__copy">
          <SectionHeading kicker="हमारे बारे में" title="About" align="left" />
          <p data-reveal="rise">
            NITRUTSAV&rsquo;26 is the annual literary and cultural extravaganza of NIT Rourkela
            and <strong>Odisha&rsquo;s largest cultural fest</strong> &mdash; a celebration of
            creativity, talent and youthful spirit. Bringing together artists, performers and
            innovators from across the nation, the fest promises three days of high-energy events,
            captivating performances and unforgettable experiences.
          </p>
          <p data-reveal="rise" style={{ '--d': 1 }}>
            This year&rsquo;s theme is the <strong>Carnival of Colours</strong>. With a renewed
            vision and a bigger stage, NITRUTSAV&rsquo;26 aims to redefine fest culture and create
            memories that last a lifetime.
          </p>
          <a className="btn about__btn" href={LINKS.brochure} target="_blank" rel="noopener noreferrer" data-reveal="rise" style={{ '--d': 2 }}>
            Download brochure
          </a>

          <ul className="about__stats">
            {STATS.map(({ value, label }, i) => (
              <li key={label} className="about__stat" data-reveal="stamp" style={{ '--d': i + 2 }}>
                <span className="about__stat-value">{value}</span>
                <span className="about__stat-label">{label}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="about__art" aria-hidden="true" ref={artRef}>
          <img className="about__poster about__poster--back" src={posterNimbu} alt="" data-reveal="slap" />
          <img className="about__poster about__poster--mid" src={posterDesi} alt="" data-reveal="slap" style={{ '--d': 1 }} />
          <img className="about__poster about__poster--front" src={posterMasala} alt="" data-reveal="slap" style={{ '--d': 2 }} />
          <span className="about__badge" data-reveal="stamp" style={{ '--d': 4 }}>
            <span lang="hi">देसी</span>
            <span>since forever</span>
          </span>
        </div>
      </div>
    </section>
  )
}
