import { useEffect, useRef } from 'react'

// A small scroll-linked shift for the artwork only. Content always scrolls normally.
export default function useSectionParallax() {
  const ref = useRef(null)

  useEffect(() => {
    const section = ref.current
    const motion = window.matchMedia('(min-width: 761px) and (prefers-reduced-motion: no-preference)')
    let frame = 0
    let visible = false

    const paint = () => {
      frame = 0
      if (!visible || !motion.matches) return
      const rect = section.getBoundingClientRect()
      const progress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / (window.innerHeight + rect.height)))
      section.style.setProperty('--art-shift', `${((progress - 0.5) * 64).toFixed(1)}px`)
    }
    const schedule = () => {
      if (!frame && visible && motion.matches) frame = requestAnimationFrame(paint)
    }
    const onPreferenceChange = () => {
      section.style.removeProperty('--art-shift')
      schedule()
    }
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      schedule()
    }, { rootMargin: '80px' })

    observer.observe(section)
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    motion.addEventListener('change', onPreferenceChange)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      motion.removeEventListener('change', onPreferenceChange)
      section.style.removeProperty('--art-shift')
    }
  }, [])

  return ref
}
