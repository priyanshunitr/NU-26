import { useEffect, useRef, useState } from 'react'
import fBlock from '../../assets/faq-collage/f-block.webp'
import fOrnate from '../../assets/faq-collage/f-ornate.webp'
import aBlock from '../../assets/faq-collage/a-block.webp'
import aOrnate from '../../assets/faq-collage/a-ornate.webp'
import qOrnate from '../../assets/faq-collage/q-ornate.webp'
import qBlock from '../../assets/faq-collage/q-block.webp'
import sOrnate from '../../assets/faq-collage/s-ornate.webp'
import sBlock from '../../assets/faq-collage/s-block.webp'

const LETTERS = [
  { letter: 'F', images: [fBlock, fOrnate], interval: 3900, tilt: '-7deg' },
  { letter: 'A', images: [aBlock, aOrnate], interval: 5700, tilt: '5deg' },
  { letter: 'Q', images: [qOrnate, qBlock], interval: 4600, tilt: '-4deg' },
  { letter: 'S', images: [sOrnate, sBlock], interval: 6800, tilt: '7deg' },
]

export default function CollageHeading() {
  const headerRef = useRef(null)
  const [faces, setFaces] = useState([0, 0, 0, 0])
  const [paused, setPaused] = useState(false)
  const [inView, setInView] = useState(false)
  const [pageVisible, setPageVisible] = useState(true)
  const [reducedMotion, setReducedMotion] = useState(true)

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updateMotion = () => setReducedMotion(preference.matches)
    const updateVisibility = () => setPageVisible(document.visibilityState === 'visible')
    updateMotion()
    updateVisibility()
    preference.addEventListener('change', updateMotion)
    document.addEventListener('visibilitychange', updateVisibility)
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.2 })
    observer.observe(headerRef.current)
    return () => {
      preference.removeEventListener('change', updateMotion)
      document.removeEventListener('visibilitychange', updateVisibility)
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    if (paused || reducedMotion || !inView || !pageVisible) return
    // Separate clocks keep the swaps irregular, like replacing paper cutouts by hand.
    const timers = LETTERS.map(({ interval }, index) => window.setInterval(() => {
      setFaces((current) => current.map((face, i) => i === index ? 1 - face : face))
    }, interval))
    return () => timers.forEach(window.clearInterval)
  }, [paused, reducedMotion, inView, pageVisible])

  return (
    <header ref={headerRef} className="faqs__header" data-reveal="faq-heading">
      <p className="faqs__kicker" lang="hi">सवाल जवाब</p>
      <h2 id="faq-title" className="faqs__title">
        <span className="sr-only">FAQs</span>
        <span className="faqs__letters" aria-hidden="true">
          {LETTERS.map(({ letter, images, tilt }, index) => (
            <span className="faq-letter" key={letter} style={{ '--tilt': tilt, '--letter-index': index }}>
              <span className="faq-letter__faces" data-face={faces[index]}>
                {images.map((src, face) => (
                  <img key={src} className="faq-letter__image" data-variant={face} src={src}
                    alt="" width="320" height="320" loading="lazy" decoding="async" draggable="false" />
                ))}
              </span>
            </span>
          ))}
        </span>
      </h2>
      <p className="faqs__intro">A little clarity before the chaos.</p>
      <button className="faqs__motion" type="button" aria-pressed={paused}
        onClick={() => setPaused((value) => !value)} hidden={reducedMotion}>
        {paused ? 'Resume letter animation' : 'Pause letter animation'}
      </button>
    </header>
  )
}
