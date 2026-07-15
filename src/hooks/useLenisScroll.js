'use client'

import { useEffect, useRef } from 'react'

export function useLenisScroll() {
  const lenisRef = useRef(null)

  useEffect(() => {
    let lenis = null
    let rafId = null

    async function init() {
      const { default: Lenis } = await import('lenis')

      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.5,
      })

      lenisRef.current = lenis

      function raf(time) {
        lenis.raf(time)
        rafId = requestAnimationFrame(raf)
      }

      rafId = requestAnimationFrame(raf)
    }

    init()

    return () => {
      if (rafId) cancelAnimationFrame(rafId)
      if (lenis) lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  return lenisRef
}
