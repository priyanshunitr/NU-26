import artwork from '../../assets/hero/artwork.json'
import registerPlaque from '../../assets/hero/register-ivory-plaque.png'
import { LINKS } from '../../content/links.js'
import PosterTrail from './PosterTrail.jsx'
import './Hero.css'

const images = import.meta.glob('../../assets/hero/*.webp', {
  eager: true, import: 'default', query: '?url',
})

const NAV_LINKS = [
  { label: 'Home', href: '#home', center: 404, size: 30.19, scale: 0.718 },
  { label: 'About', href: '#about', center: 516.5, size: 28.33, scale: 0.809 },
  { label: 'Events', href: '#events', center: 630, size: 30.17, scale: 0.737 },
  { label: 'FAQs', href: '#faqs', center: 735.5, size: 21.93, scale: 1.054 },
  { label: 'Sponsors', href: '#sponsors', center: 863.5, size: 22.39, scale: 1.01 },
]

function placementStyle(asset) {
  const style = { '--rotation': asset.rotation + 'deg' }
  for (const [mode, geometry] of Object.entries({ d: asset.desktop, m: asset.mobile })) {
    for (const [key, value] of Object.entries(geometry)) {
      style['--' + mode + '-' + key] = value + '%'
    }
  }
  return style
}

function CollageAsset({ asset }) {
  const isLogo = asset.id === 23
  const Element = isLogo ? 'h1' : 'div'
  return (
    <Element
      className={'hero__asset hero__asset--' + asset.id + (isLogo ? ' hero__title' : '')}
      style={placementStyle(asset)}
      aria-hidden={isLogo ? undefined : true}
      data-artwork={asset.name}
    >
      <img
        src={images['../../assets/hero/' + asset.file]}
        width={asset.width}
        height={asset.height}
        alt=""
        draggable={false}
        fetchPriority={isLogo || asset.id === 0 ? 'high' : 'auto'}
      />
      {isLogo && <span className="sr-only">Nitrutsav 2026 â€” NIT Rourkela</span>}
    </Element>
  )
}

export default function Hero({ activeLink = 'Home' }) {
  return (
    <header className="hero" id="home">
      <div className="hero__stage">
        {artwork.map((asset) => <CollageAsset key={asset.id} asset={asset} />)}

        {/* Preserve the original poster sequence, mask, pointer logic and timing. */}
        <PosterTrail />

        <nav className="hero__navigation" aria-label="Primary">
          <ul className="hero__nav">
            {NAV_LINKS.map(({ label, href, center, size, scale }) => (
              <li key={label} style={{ '--center': center / 1308 * 100 + '%', '--label-size': size, '--label-scale': scale }}>
                <a href={href} aria-current={label === activeLink ? 'page' : undefined}>
                  <span>{label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a className="hero__register" href={LINKS.events}>
          <span className="hero__register-art" aria-hidden="true">
            <img src={registerPlaque} alt="" draggable={false} />
          </span>
          <span className="hero__register-label">Register Now</span>
        </a>
      </div>
    </header>
  )
}
