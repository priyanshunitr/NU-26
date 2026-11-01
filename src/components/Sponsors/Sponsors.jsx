import collage from '../../assets/collage.jpg'
import flowerSm from '../../assets/sponsors/flower-a.svg'
import flowerLg from '../../assets/sponsors/flower-b.svg'
import flowerMd from '../../assets/sponsors/flower-c.svg'
import medallion from '../../assets/sponsors/label-medallion.svg'
import './Sponsors.css'

// Built from the "Sponsors NU'26" frame in Figma: a cream partnership
// broadside inside a teal frame, with block-print borders and collage margins.
// Sponsors and tiers are as listed on nitrutsav.in/sponsors.

const TITLE = { name: 'Gaylords Group', role: 'Major sponsor' }

const TIERS = [
  {
    heading: 'Platinum sponsors', tone: 'teal',
    stamps: [
      { name: 'HPCL', role: 'Platinum sponsor' },
      { name: 'Hotel Neelam', role: 'Platinum sponsor' },
      { name: 'Odisha Computer Application Centre', role: 'Platinum sponsor' },
    ],
  },
  {
    heading: 'Gold sponsor', tone: 'red',
    stamps: [{ name: 'OHPC Ltd', role: 'Gold sponsor' }],
  },
  {
    heading: 'Partners', tone: 'teal',
    stamps: [
      { name: 'SBI', role: 'Transaction partner' },
      { name: 'GAIL (India) Limited', role: 'Energy partner' },
      { name: 'EaseMyTrip', role: 'Travel partner' },
      { name: 'Odisha Shines', role: 'Media partner' },
      { name: 'Rourkela Shines', role: 'Media partner' },
    ],
  },
]

function BlockPrintBorder() {
  return (
    <div className="sponsors__border" aria-hidden="true">
      {Array.from({ length: 36 }, (_, i) => <span key={i}>✦</span>)}
    </div>
  )
}

function CollageMargin({ side }) {
  return (
    <div className={`sponsors__margin sponsors__margin--${side}`} aria-hidden="true">
      <div className="sponsors__edging">
        {Array.from({ length: 4 }, (_, i) => <img key={i} src={flowerSm} alt="" width="54" height="54" />)}
      </div>
      <div className="sponsors__ephemera">
        <img src={collage} alt="" />
      </div>
    </div>
  )
}

export default function Sponsors({ contactHref = '#contact' }) {
  return (
    <section id="sponsors" className="sponsors">
      <CollageMargin side="left" />
      <CollageMargin side="right" />

      <BlockPrintBorder />

      <div className="broadside">
        <header className="masthead" data-reveal="rise">
          <img className="masthead__flower" src={flowerLg} alt="" width="94" height="94" />
          <div className="masthead__heading">
            <h2 className="masthead__title">Sponsors</h2>
            <p className="masthead__tagline">Great celebrations are made together.</p>
          </div>
          <img className="masthead__flower" src={flowerLg} alt="" width="94" height="94" />
        </header>

        <p className="broadside__copy" data-reveal="rise">
          A place for brands that champion creativity, culture and the spirit of campus.
          <br />
          Meet the partners behind the Carnival of Colours 2026.
        </p>

        <h3 className="tier-heading tier-heading--title" data-reveal="rise">
          <span>Title sponsor</span>
        </h3>

        <div className="title-label" data-reveal="stamp">
          <div className="title-label__decoration">
            <img src={flowerMd} alt="" width="68" height="68" />
            <span>Carnival of</span>
          </div>
          <div className="title-label__slot">
            <img className="title-label__medallion" src={medallion} alt="" width="596" height="200" />
            <span className="title-label__kicker">{TITLE.role}</span>
            <span className="title-label__name">{TITLE.name}</span>
            <span className="title-label__note">Nitrutsav 2026 · NIT Rourkela</span>
          </div>
          <div className="title-label__decoration">
            <img src={flowerMd} alt="" width="68" height="68" />
            <span>Colours 2026</span>
          </div>
        </div>

        {TIERS.map(({ heading, tone, stamps }) => (
          <div key={heading} className="tier">
            <h3 className={`tier-heading tier-heading--${tone}`} data-reveal="rise">
              <span>{heading}</span>
            </h3>
            <ul className="stamps">
              {stamps.map(({ name, role }, i) => (
                <li key={name} className={`stamp stamp--${tone}`} data-reveal="stamp" style={{ '--d': i % 3 }}>
                  <div className="stamp__contents">
                    <span className="stamp__kicker">{role}</span>
                    <span className={`stamp__name${name.length > 16 ? ' stamp__name--long' : ''}`}>{name}</span>
                    <span className="stamp__ornament" aria-hidden="true">✦</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="invitation" data-reveal="rise">
          <div className="invitation__copy">
            <h3 className="invitation__title">Add your name to the celebration.</h3>
            <p>
              Help bring student creativity to life at NIT Rourkela.
              <br />
              Reach the organising team below to partner with us.
            </p>
          </div>
          <a className="invitation__cta" href={contactHref}>Become a partner</a>
        </div>
      </div>

      <BlockPrintBorder />
    </section>
  )
}
