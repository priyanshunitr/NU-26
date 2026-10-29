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
  return (
    <section id="about" className="section about">
      <div className="container about__grid">
        <div className="about__copy">
          <SectionHeading kicker="हमारे बारे में" title="About" align="left" />
          <p>
            NITRUTSAV&rsquo;26 is the annual literary and cultural extravaganza of NIT Rourkela
            and <strong>Odisha&rsquo;s largest cultural fest</strong> &mdash; a celebration of
            creativity, talent and youthful spirit. Bringing together artists, performers and
            innovators from across the nation, the fest promises three days of high-energy events,
            captivating performances and unforgettable experiences.
          </p>
          <p>
            This year&rsquo;s theme is the <strong>Carnival of Colours</strong>. With a renewed
            vision and a bigger stage, NITRUTSAV&rsquo;26 aims to redefine fest culture and create
            memories that last a lifetime.
          </p>
          <a className="btn about__btn" href={LINKS.brochure} target="_blank" rel="noopener noreferrer">
            Download brochure
          </a>

          <ul className="about__stats">
            {STATS.map(({ value, label }) => (
              <li key={label} className="about__stat">
                <span className="about__stat-value">{value}</span>
                <span className="about__stat-label">{label}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="about__art" aria-hidden="true">
          <img className="about__poster about__poster--back" src={posterNimbu} alt="" />
          <img className="about__poster about__poster--mid" src={posterDesi} alt="" />
          <img className="about__poster about__poster--front" src={posterMasala} alt="" />
          <span className="about__badge">
            <span lang="hi">देसी</span>
            <span>since forever</span>
          </span>
        </div>
      </div>
    </section>
  )
}
