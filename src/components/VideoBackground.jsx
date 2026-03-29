import { useEffect, useRef } from 'react'

// How many seconds before the end to start crossfading to the next video
const CROSSFADE_LEAD = 1.5

export default function VideoBackground() {
  const videoARef = useRef(null)
  const videoBRef = useRef(null)
  const activeRef = useRef('a') // which video is currently "on top"

  useEffect(() => {
    const videoA = videoARef.current
    const videoB = videoBRef.current
    if (!videoA || !videoB) return

    // Start both videos; B starts hidden (opacity 0)
    videoA.style.opacity = '1'
    videoB.style.opacity = '0'

    let crossfading = false

    const handleTimeUpdate = () => {
      const active  = activeRef.current === 'a' ? videoA : videoB
      const passive = activeRef.current === 'a' ? videoB : videoA

      if (!active.duration || isNaN(active.duration)) return

      const timeLeft = active.duration - active.currentTime

      if (timeLeft <= CROSSFADE_LEAD && !crossfading) {
        crossfading = true

        // Reset & prime the passive video from the start
        passive.currentTime = 0
        passive.play().catch(() => {})

        // Crossfade
        active.style.opacity  = '0'
        passive.style.opacity = '1'

        // After transition ends, swap roles
        setTimeout(() => {
          // pause the old active (it's now invisible)
          active.pause()
          activeRef.current = activeRef.current === 'a' ? 'b' : 'a'
          crossfading = false
        }, 1300) // slightly longer than CSS transition (1.2s)
      }
    }

    videoA.addEventListener('timeupdate', handleTimeUpdate)
    videoB.addEventListener('timeupdate', handleTimeUpdate)

    return () => {
      videoA.removeEventListener('timeupdate', handleTimeUpdate)
      videoB.removeEventListener('timeupdate', handleTimeUpdate)
    }
  }, [])

  const videoProps = {
    muted: true,
    playsInline: true,
    preload: 'auto',
  }

  return (
    <div className="video-bg-wrap">
      <video ref={videoARef} autoPlay {...videoProps}>
        <source src="/video/product.mp4"  type="video/mp4" />
        <source src="/video/product.webm" type="video/webm" />
      </video>
      <video ref={videoBRef} {...videoProps}>
        <source src="/video/product.mp4"  type="video/mp4" />
        <source src="/video/product.webm" type="video/webm" />
      </video>
      <div className="video-overlay" />
    </div>
  )
}
