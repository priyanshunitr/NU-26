import leftCollage from '../../assets/sponsors/painted/left-collage.webp'
import rightCollage from '../../assets/sponsors/painted/right-collage.webp'
import plaque from '../../assets/sponsors/painted/sponsor-plaque.webp'
import ribbon from '../../assets/sponsors/painted/tier-ribbon.webp'
import './Sponsors.css'

// Figma: eZRrupmfELMP2DGwMiOJPB, Frame 1 / 88:7784 (1308 × 1305).
const TIERS = [
  { id: 'platinum', title: 'Platinum sponsor', sponsors: [
    { name: 'Gaylords Group', size: 53 },
  ] },
  { id: 'gold', title: 'Gold sponsor', sponsors: [
    { name: 'HPCL', size: 34 },
    { name: 'OHPC Ltd', size: 34 },
    { name: 'Hotel Neelam', size: 33 },
    { name: 'OCAC', size: 43, detail: 'Odisha Computer Application Centre' },
  ] },
  { id: 'partners', title: 'Our partners', sponsors: [
    { name: 'SBI', size: 32, detail: 'Transaction partner' },
    { name: 'GAIL', size: 32, detail: 'Energy partner' },
    { name: 'Rourkela Shines', size: 20, detail: 'Media partner' },
    { name: 'EaseMyTrip', size: 24, detail: 'Travel partner' },
    { name: 'Odisha Shines', size: 22, detail: 'Media partner' },
  ] },
]

// Position transparent artwork by its painted bounds, retaining the complete PNGs.
const ART = {
  plaque: { src: plaque, width: 1983, height: 793, bounds: [8, 135, 1976, 657] },
  ribbon: { src: ribbon, width: 1983, height: 793, bounds: [46, 305, 1938, 479] },
}

function PaintedArt({ kind }) {
  const { src, width, height, bounds: [left, top, right, bottom] } = ART[kind]
  return <img className="sponsors__art" src={src} alt="" aria-hidden="true" loading="lazy" decoding="async" draggable={false}
    style={{ left: (-left / (right - left) * 100) + '%', top: (-top / (bottom - top) * 100) + '%',
      width: (width / (right - left) * 100) + '%', height: (height / (bottom - top) * 100) + '%' }} />
}

function SponsorCard({ name, detail, size }) {
  return (
    <li className={'sponsors__card' + (detail ? ' sponsors__card--detail' : '') + (name === 'OCAC' ? ' sponsors__card--ocac' : '')}
      style={{ '--name-size': size }}>
      <PaintedArt kind="plaque" />
      <div className="sponsors__card-copy">
        <span className="sponsors__name">{name}</span>
        {detail && <span className="sponsors__detail">{detail}</span>}
      </div>
    </li>
  )
}

export default function Sponsors() {
  return (
    <section id="sponsors" className="sponsors" aria-labelledby="sponsors-title">
      <div className="sponsors__stage">
        <div className="sponsors__scenery" aria-hidden="true">
          <img className="sponsors__edge sponsors__edge--left" src={leftCollage} alt="" loading="lazy" decoding="async" />
          <img className="sponsors__edge sponsors__edge--right" src={rightCollage} alt="" loading="lazy" decoding="async" />
          <img className="sponsors__edge sponsors__edge--left-front" src={rightCollage} alt="" loading="lazy" decoding="async" />
          <img className="sponsors__edge sponsors__edge--right-front" src={leftCollage} alt="" loading="lazy" decoding="async" />
        </div>
        <header className="sponsors__heading">
          <h2 id="sponsors-title" className="sponsors__title">Sponsors</h2>
        </header>

        {TIERS.map(({ id, title, sponsors }) => (
          <div key={id} className={'sponsors__tier sponsors__tier--' + id}>
            <h3 className="sponsors__tier-title"><PaintedArt kind="ribbon" /><span>{title}</span></h3>
            <ul className="sponsors__cards">{sponsors.map(sponsor => <SponsorCard key={sponsor.name} {...sponsor} />)}</ul>
          </div>
        ))}
      </div>
    </section>
  )
}
