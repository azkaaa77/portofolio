'use client'

import { useEffect, useRef, useState } from 'react'

export function useScrollProgress(containerRef) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    function handleScroll() {
      if (!containerRef?.current) return

      const el = containerRef.current
      const rect = el.getBoundingClientRect()
      const totalScrollable = el.scrollHeight - window.innerHeight
      const scrolled = -rect.top

      const p = Math.max(0, Math.min(1, scrolled / totalScrollable))
      setProgress(p)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [containerRef])

  return progress
}

export function useInView(options = {}) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (options.once) observer.disconnect()
        } else if (!options.once) {
          setInView(false)
        }
      },
      { threshold: options.threshold ?? 0.1, rootMargin: options.rootMargin ?? '0px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [options.once, options.threshold, options.rootMargin])

  return [ref, inView]
}

export function useCountUp(target, duration = 2000, trigger = false) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!trigger) return

    let startTime = null
    let rafId = null

    function step(timestamp) {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 4)
      setCount(Math.floor(eased * target))

      if (progress < 1) {
        rafId = requestAnimationFrame(step)
      } else {
        setCount(target)
      }
    }

    rafId = requestAnimationFrame(step)
    return () => {
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [target, duration, trigger])

  return count
}
