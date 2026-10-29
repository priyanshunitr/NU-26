import { useEffect } from 'react'

// Adds `is-visible` to every [data-reveal] element the first time it scrolls into view.
// The entrance styles themselves live in motion.css.
export default function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]')
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-visible'))
      return
    }

    // Safety net: if the observer never reports (some crawlers, frozen renderers),
    // show everything rather than leave content invisible.
    let heard = false
    const fallback = setTimeout(() => {
      if (!heard && document.visibilityState === 'visible') els.forEach((el) => el.classList.add('is-visible'))
    }, 2500)

    const io = new IntersectionObserver(
      (entries) => {
        heard = true
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add('is-visible')
          io.unobserve(entry.target)
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => {
      clearTimeout(fallback)
      io.disconnect()
    }
  }, [])
}
