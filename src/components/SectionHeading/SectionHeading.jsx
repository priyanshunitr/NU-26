import './SectionHeading.css'

// Hindi kicker on a tilted sticker, big display title, ornamental rule.
export default function SectionHeading({ kicker, title, tone = 'dark', align = 'center' }) {
  return (
    <header className={`section-heading section-heading--${tone} section-heading--${align}`}>
      <span className="section-heading__kicker" lang="hi">{kicker}</span>
      <h2 className="section-heading__title">{title}</h2>
      <span className="section-heading__rule" aria-hidden="true" />
    </header>
  )
}
