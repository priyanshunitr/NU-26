import SectionHeading from '../SectionHeading/SectionHeading.jsx'
import './Sponsors.css'

// Nitrutsav 2026 sponsors, as listed on nitrutsav.in/sponsors.
const TIERS = [
  { tier: 'Major Sponsor', names: ['Gaylords Group'] },
  { tier: 'Platinum Sponsor', names: ['HPCL', 'Hotel Neelam', 'Odisha Computer Application Centre'] },
  { tier: 'Gold Sponsor', names: ['OHPC Ltd'] },
  { tier: 'Transaction Partner', names: ['SBI'] },
  { tier: 'Energy Partner', names: ['GAIL (India) Limited'] },
  { tier: 'Travel Partner', names: ['EaseMyTrip'] },
  { tier: 'Media Partner', names: ['Odisha Shines', 'Rourkela Shines'] },
]

const SLOTS = TIERS.flatMap(({ tier, names }) => names.map((name) => ({ tier, name })))

export default function Sponsors({ contactHref = '#contact' }) {
  return (
    <section id="sponsors" className="section sponsors">
      <div className="container">
        <SectionHeading kicker="साझेदार" title="Sponsors" tone="light" />
        <p className="sponsors__intro" data-reveal="rise">
          The partners who make the Carnival of Colours possible. Thank you for backing
          Nitrutsav 2026.
        </p>

        <ul className="sponsors__grid">
          {SLOTS.map(({ tier, name }, i) => (
            <li
              key={name}
              className={`sponsor-slot${tier === 'Major Sponsor' ? ' sponsor-slot--major' : ''}`}
              data-reveal="swing"
              style={{ '--d': i % 4 }}
            >
              <span className="sponsor-slot__role">{tier}</span>
              <span className="sponsor-slot__name">{name}</span>
            </li>
          ))}
        </ul>

        <div className="sponsors__cta" data-reveal="rise">
          <a className="btn sponsors__btn" href={contactHref}>Partner with us</a>
        </div>
      </div>
    </section>
  )
}
