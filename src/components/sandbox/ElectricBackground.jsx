import { useEffect, useRef } from 'react'

/**
 * Anime-style electric background — heavy impact version.
 *
 * - THICK multi-layered strokes (outer glow + color + white core)
 * - Impact frames: brief full-screen flash when bolt spawns
 * - Slower lifecycle — bolts linger longer
 * - Dense branching, tight zigzags
 * - Spark bursts at joints
 */
function ElectricBackground({ color = '#1929FE', secondaryColor = '#39FF14', density = 1 }) {
  const canvasRef = useRef(null)
  const rafRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    let width = 0
    let height = 0
    let dpr = Math.min(window.devicePixelRatio || 1, 2)

    const resize = () => {
      width = canvas.clientWidth
      height = canvas.clientHeight
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    const colors = [color, secondaryColor]

    // --- Bolt path generation ---
    function generateBoltPath(x1, y1, x2, y2, minSteps) {
      const points = [{ x: x1, y: y1 }]
      const dx = x2 - x1
      const dy = y2 - y1
      const len = Math.sqrt(dx * dx + dy * dy)
      const steps = Math.max(minSteps, Math.floor(len / 25))

      for (let i = 1; i < steps; i++) {
        const t = i / steps
        const baseX = x1 + dx * t
        const baseY = y1 + dy * t
        const perpX = -dy / len
        const perpY = dx / len
        // Aggressive offset for tight zigzag — scaled for mobile
        const offset = (Math.random() - 0.5) * len * 0.22 * scaleFactor
        points.push({
          x: baseX + perpX * offset,
          y: baseY + perpY * offset,
        })
      }
      points.push({ x: x2, y: y2 })
      return points
    }

    function generateBranches(points, boltLen) {
      const branches = []
      const branchCount = 3 + Math.floor(Math.random() * 5)
      for (let b = 0; b < branchCount; b++) {
        const idx = 1 + Math.floor(Math.random() * (points.length - 2))
        const origin = points[idx]
        const branchLen = boltLen * (0.12 + Math.random() * 0.22) * scaleFactor
        const angle = Math.random() * Math.PI * 2
        const endX = origin.x + Math.cos(angle) * branchLen
        const endY = origin.y + Math.sin(angle) * branchLen
        const branchPoints = generateBoltPath(origin.x, origin.y, endX, endY, 3 + Math.floor(Math.random() * 3))
        branches.push(branchPoints)
      }
      return branches
    }

    // --- Active bolts ---
    const activeBolts = []

    // --- Impact flash ---
    // Scale factor for mobile — reduce thickness and jitter
    const isMobile = width < 768
    const scaleFactor = isMobile ? 0.25 : 1

    let flashAlpha = 0

    function spawnBolt() {
      const startX = Math.random() * width
      const startY = Math.random() * height * 0.15
      const endX = startX + (Math.random() - 0.5) * width * 0.5
      const endY = startY + height * (0.6 + Math.random() * 0.35)

      const dx = endX - startX
      const dy = endY - startY
      const boltLen = Math.sqrt(dx * dx + dy * dy)

      const boltColor = colors[Math.floor(Math.random() * colors.length)]

      activeBolts.push({
        startX, startY, endX, endY,
        boltLen,
        color: boltColor,
        framesLeft: 25 + Math.floor(Math.random() * 25),
        totalFrames: 0,
        thickness: (8 + Math.random() * 7) * scaleFactor,
        points: [],
        branches: [],
      })

      // Impact frame flash — toned down
      flashAlpha = 0.10 + Math.random() * 0.08
    }

    // --- Spark particles ---
    const sparks = []

    function emitSparks(x, y, sparkColor, count) {
      const n = count || (4 + Math.floor(Math.random() * 6))
      for (let i = 0; i < n; i++) {
        const angle = Math.random() * Math.PI * 2
        const speed = 1.5 + Math.random() * 3.5
        sparks.push({
          x, y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
          size: 3 + Math.random() * 4,
          color: sparkColor,
        })
      }
    }

    // --- Draw bolt with 3 layers ---
    function drawBoltPath(points, thickness, boltColor) {
      if (points.length < 2) return

      ctx.lineCap = 'square'
      ctx.lineJoin = 'miter'

      // Layer 1: Wide outer glow (colored, semi-transparent)
      ctx.beginPath()
      ctx.moveTo(points[0].x, points[0].y)
      for (let i = 1; i < points.length; i++) ctx.lineTo(points[i].x, points[i].y)
      ctx.lineWidth = thickness * 3
      ctx.strokeStyle = boltColor + '44' // ~27% opacity via hex
      ctx.stroke()

      // Layer 2: Solid color stroke
      ctx.beginPath()
      ctx.moveTo(points[0].x, points[0].y)
      for (let i = 1; i < points.length; i++) ctx.lineTo(points[i].x, points[i].y)
      ctx.lineWidth = thickness
      ctx.strokeStyle = boltColor
      ctx.stroke()

      // Layer 3: Bright white core
      ctx.beginPath()
      ctx.moveTo(points[0].x, points[0].y)
      for (let i = 1; i < points.length; i++) ctx.lineTo(points[i].x, points[i].y)
      ctx.lineWidth = thickness * 0.4
      ctx.strokeStyle = '#ffffff'
      ctx.stroke()
    }

    // --- Timing ---
    let lastSpawn = 0
    const spawnInterval = 1400 / density // slower spawning
    let frameCount = 0

    const render = (time) => {
      ctx.clearRect(0, 0, width, height)
      frameCount++

      // --- Impact flash overlay ---
      if (flashAlpha > 0) {
        ctx.fillStyle = `rgba(255, 255, 255, ${flashAlpha})`
        ctx.fillRect(0, 0, width, height)
        flashAlpha -= 0.04 // fade out over ~6 frames
        if (flashAlpha < 0) flashAlpha = 0
      }

      // Spawn new bolts (slower)
      if (time - lastSpawn > spawnInterval + Math.random() * 400) {
        spawnBolt()
        lastSpawn = time
      }

      // Update + draw bolts
      for (let i = activeBolts.length - 1; i >= 0; i--) {
        const bolt = activeBolts[i]
        bolt.totalFrames++

        // Regenerate shape every 3-4 frames (slower jitter)
        if (frameCount % 3 === 0 || bolt.points.length === 0) {
          bolt.points = generateBoltPath(bolt.startX, bolt.startY, bolt.endX, bolt.endY, 10)
          bolt.branches = generateBranches(bolt.points, bolt.boltLen)

          // Sparks at random joints
          if (Math.random() > 0.6) {
            const joint = bolt.points[Math.floor(Math.random() * bolt.points.length)]
            emitSparks(joint.x, joint.y, bolt.color, 3)
          }
        }

        // Anime flicker — but less frequent (only ~10% skip)
        const visible = Math.random() > 0.08

        if (visible) {
          // Main bolt
          drawBoltPath(bolt.points, bolt.thickness, bolt.color)

          // Branches
          bolt.branches.forEach((br) => {
            drawBoltPath(br, bolt.thickness * 0.5, bolt.color)
          })

          // Diamond sparks at joints
          ctx.fillStyle = '#ffffff'
          for (let j = 0; j < bolt.points.length; j += 2) {
            const p = bolt.points[j]
            const s = bolt.thickness * 0.6
            ctx.beginPath()
            ctx.moveTo(p.x, p.y - s)
            ctx.lineTo(p.x + s, p.y)
            ctx.lineTo(p.x, p.y + s)
            ctx.lineTo(p.x - s, p.y)
            ctx.closePath()
            ctx.fill()
          }
        }

        bolt.framesLeft--
        if (bolt.framesLeft <= 0) {
          // Big spark burst on disappear
          const tip = bolt.points[bolt.points.length - 1]
          if (tip) emitSparks(tip.x, tip.y, bolt.color, 8)
          const mid = bolt.points[Math.floor(bolt.points.length / 2)]
          if (mid) emitSparks(mid.x, mid.y, bolt.color, 6)
          activeBolts.splice(i, 1)
        }
      }

      // Update + draw sparks
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i]
        s.x += s.vx
        s.y += s.vy
        s.vy += 0.12
        s.life -= 0.025 // slower decay

        if (s.life <= 0) {
          sparks.splice(i, 1)
          continue
        }

        const size = s.size * s.life
        ctx.fillStyle = s.color
        ctx.fillRect(s.x - size / 2, s.y - size / 2, size, size)
      }

      rafRef.current = requestAnimationFrame(render)
    }

    rafRef.current = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [color, secondaryColor, density])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
    />
  )
}

export default ElectricBackground
