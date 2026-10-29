import { useEffect, useRef } from 'react'
import collage from '../../assets/collage.jpg'
import poster01 from '../../assets/posters/poster-01.webp'
import poster02 from '../../assets/posters/poster-02.webp'
import poster03 from '../../assets/posters/poster-03.webp'
import poster04 from '../../assets/posters/poster-04.webp'
import poster05 from '../../assets/posters/poster-05.webp'
import poster06 from '../../assets/posters/poster-06.webp'
import poster07 from '../../assets/posters/poster-07.webp'
import poster08 from '../../assets/posters/poster-08.webp'
import poster09 from '../../assets/posters/poster-09.webp'
import poster10 from '../../assets/posters/poster-10.webp'

// Poster sizes match their frames in the Figma file (all 150 wide).
const POSTERS = [
  { src: poster01, h: 188 },
  { src: poster02, h: 212 },
  { src: poster03, h: 188 },
  { src: poster04, h: 212 },
  { src: poster05, h: 212 },
  { src: poster06, h: 184 },
  { src: poster07, h: 188 },
  { src: poster08, h: 214 },
  { src: poster09, h: 188 },
  { src: poster10, h: 194 },
]

const FRAME_W = 1308
const FRAME_H = 651
const COLLAGE_H = 736 // rotated collage height; it starts above the frame
const COLLAGE_TOP = -85
const SPAWN_DISTANCE = 70 // design px the pointer must travel between posters
const LIFETIME_MS = 1000
const BEIGE = [247, 243, 231] // empty paper colour of the collage
const BEIGE_TOLERANCE = 12

// Renders the collage the same way the hero does (rotated -90°) so we can tell
// whether a point in the 1308 × 651 frame is empty beige paper.
function loadBeigeMap() {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = FRAME_W
      canvas.height = FRAME_H
      const ctx = canvas.getContext('2d', { willReadFrequently: true })
      ctx.translate(FRAME_W / 2, COLLAGE_TOP + COLLAGE_H / 2)
      ctx.rotate(-Math.PI / 2)
      ctx.drawImage(img, -COLLAGE_H / 2, -FRAME_W / 2, COLLAGE_H, FRAME_W)
      resolve(ctx.getImageData(0, 0, FRAME_W, FRAME_H).data)
    }
    img.src = collage
  })
}

function isBeige(data, x, y) {
  const i = (Math.floor(y) * FRAME_W + Math.floor(x)) * 4
  return BEIGE.every((c, k) => Math.abs(data[i + k] - c) <= BEIGE_TOLERANCE)
}

export default function PosterTrail() {
  const layerRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const layer = layerRef.current
    const stage = layer.parentElement
    let beige = null
    let last = null
    let next = 0
    let cancelled = false

    POSTERS.forEach(({ src }) => { new Image().src = src })
    loadBeigeMap().then((data) => { if (!cancelled) beige = data })

    const onMove = (e) => {
      if (!beige) return
      const rect = stage.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * FRAME_W
      const y = ((e.clientY - rect.top) / rect.height) * FRAME_H
      if (x < 0 || y < 0 || x >= FRAME_W || y >= FRAME_H || !isBeige(beige, x, y)) return
      if (last && Math.hypot(x - last.x, y - last.y) < SPAWN_DISTANCE) return
      last = { x, y }

      const { src, h } = POSTERS[next]
      next = (next + 1) % POSTERS.length

      const el = document.createElement('img')
      el.className = 'poster-trail__item'
      el.src = src
      el.alt = ''
      el.style.setProperty('--x', x)
      el.style.setProperty('--y', y)
      el.style.setProperty('--h', h)
      el.style.setProperty('--tilt', `${(Math.random() * 16 - 8).toFixed(1)}deg`)
      el.style.setProperty('--life', `${LIFETIME_MS}ms`)
      el.addEventListener('animationend', () => el.remove())
      layer.appendChild(el)
    }

    const onLeave = () => { last = null }

    stage.addEventListener('pointermove', onMove)
    stage.addEventListener('pointerleave', onLeave)
    return () => {
      cancelled = true
      stage.removeEventListener('pointermove', onMove)
      stage.removeEventListener('pointerleave', onLeave)
      layer.replaceChildren()
    }
  }, [])

  return <div ref={layerRef} className="poster-trail" aria-hidden="true" />
}
