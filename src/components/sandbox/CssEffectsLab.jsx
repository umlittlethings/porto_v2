import { useMemo, useState } from 'react'
import { Check, Copy, Info } from 'lucide-react'
import SandboxShell from './SandboxShell'

const TABS = ['gradient', 'shadow', 'transform', 'animation']

const ANIMATIONS = {
  pulse: `@keyframes lab-pulse {\n  0%, 100% { transform: scale(1); }\n  50% { transform: scale(1.15); }\n}`,
  spin: `@keyframes lab-spin {\n  from { transform: rotate(0deg); }\n  to { transform: rotate(360deg); }\n}`,
  bounce: `@keyframes lab-bounce {\n  0%, 100% { transform: translateY(0); }\n  50% { transform: translateY(-30px); }\n}`,
  shake: `@keyframes lab-shake {\n  0%, 100% { transform: translateX(0); }\n  25% { transform: translateX(-10px); }\n  75% { transform: translateX(10px); }\n}`,
}

function Field({ label, children }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-sm font-semibold text-white/60">{label}</span>
      {children}
    </label>
  )
}

function CssEffectsLab() {
  const [tab, setTab] = useState('gradient')
  const [copied, setCopied] = useState(false)
  const [showTutorial, setShowTutorial] = useState(true)

  // Gradient
  const [angle, setAngle] = useState(135)
  const [color1, setColor1] = useState('#1929FE')
  const [color2, setColor2] = useState('#39FF14')

  // Shadow
  const [shX, setShX] = useState(0)
  const [shY, setShY] = useState(20)
  const [shBlur, setShBlur] = useState(40)
  const [shSpread, setShSpread] = useState(-10)
  const [shColor, setShColor] = useState('#39FF14')
  const [shOpacity, setShOpacity] = useState(40)

  // Transform
  const [rotate, setRotate] = useState(15)
  const [scale, setScale] = useState(1)
  const [skew, setSkew] = useState(0)
  const [tRadius, setTRadius] = useState(20)

  // Animation
  const [anim, setAnim] = useState('pulse')
  const [duration, setDuration] = useState(1.5)

  const hexToRgba = (hex, opacity) => {
    const v = hex.replace('#', '')
    const r = parseInt(v.substring(0, 2), 16)
    const g = parseInt(v.substring(2, 4), 16)
    const b = parseInt(v.substring(4, 6), 16)
    return `rgba(${r}, ${g}, ${b}, ${opacity / 100})`
  }

  const { previewStyle, code } = useMemo(() => {
    if (tab === 'gradient') {
      const bg = `linear-gradient(${angle}deg, ${color1}, ${color2})`
      return { previewStyle: { background: bg, borderRadius: '20px' }, code: `.element {\n  background: linear-gradient(${angle}deg, ${color1}, ${color2});\n}` }
    }
    if (tab === 'shadow') {
      const rgba = hexToRgba(shColor, shOpacity)
      const box = `${shX}px ${shY}px ${shBlur}px ${shSpread}px ${rgba}`
      return { previewStyle: { background: '#1a1a2e', borderRadius: '20px', boxShadow: box }, code: `.element {\n  box-shadow: ${box};\n}` }
    }
    if (tab === 'transform') {
      const tf = `rotate(${rotate}deg) scale(${scale}) skew(${skew}deg)`
      return { previewStyle: { background: 'linear-gradient(135deg, #1929FE, #39FF14)', borderRadius: `${tRadius}px`, transform: tf }, code: `.element {\n  border-radius: ${tRadius}px;\n  transform: ${tf};\n}` }
    }
    return {
      previewStyle: { background: 'linear-gradient(135deg, #1929FE, #39FF14)', borderRadius: '20px', animation: `lab-${anim} ${duration}s ease-in-out infinite` },
      code: `${ANIMATIONS[anim]}\n\n.element {\n  animation: lab-${anim} ${duration}s ease-in-out infinite;\n}`,
    }
  }, [tab, angle, color1, color2, shX, shY, shBlur, shSpread, shColor, shOpacity, rotate, scale, skew, tRadius, anim, duration])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch { setCopied(false) }
  }

  return (
    <SandboxShell
      title="CSS Effects Lab"
      subtitle="Experiment with gradients, shadows, transforms, and animations with a real-time preview."
      accent="#7C3AED"
    >
      <style>{Object.values(ANIMATIONS).join('\n')}</style>

      {/* Tutorial */}
      {showTutorial && (
        <div className="mb-8 border border-[#7C3AED]/30 bg-[#7C3AED]/5 rounded-xl p-5 relative">
          <button onClick={() => setShowTutorial(false)} className="absolute top-4 right-4 text-white/40 hover:text-white text-sm">✕</button>
          <div className="flex items-start gap-3">
            <Info size={20} className="text-[#7C3AED] flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-Jakarta-Bold font-bold text-white mb-2">How to Use</h3>
              <ol className="text-white/60 text-sm space-y-1 list-decimal list-inside">
                <li>Pick an effect tab: <strong className="text-white/80">Gradient</strong>, <strong className="text-white/80">Shadow</strong>, <strong className="text-white/80">Transform</strong>, or <strong className="text-white/80">Animation</strong></li>
                <li>Tweak the parameters on the left — the result updates instantly in the preview</li>
                <li>Combine different effects for design inspiration</li>
                <li>Click <strong className="text-white/80">Copy</strong> to grab the generated CSS</li>
                <li>Paste it into your project stylesheet</li>
              </ol>
            </div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex flex-wrap gap-3 mb-8">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-5 py-2 rounded-full border font-semibold capitalize transition-all duration-200 ${
              tab === t
                ? 'bg-[#7C3AED] text-white border-[#7C3AED]'
                : 'bg-transparent text-white/60 border-white/20 hover:border-white/50'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {tab === 'gradient' && (
            <>
              <Field label={`Angle: ${angle}deg`}>
                <input type="range" min="0" max="360" value={angle} onChange={(e) => setAngle(+e.target.value)} className="accent-[#7C3AED]" />
              </Field>
              <div />
              <Field label="Color 1">
                <input type="color" value={color1} onChange={(e) => setColor1(e.target.value)} className="h-10 w-full rounded-xl border border-white/15 cursor-pointer bg-transparent" />
              </Field>
              <Field label="Color 2">
                <input type="color" value={color2} onChange={(e) => setColor2(e.target.value)} className="h-10 w-full rounded-xl border border-white/15 cursor-pointer bg-transparent" />
              </Field>
            </>
          )}
          {tab === 'shadow' && (
            <>
              <Field label={`Offset X: ${shX}px`}><input type="range" min="-50" max="50" value={shX} onChange={(e) => setShX(+e.target.value)} className="accent-[#7C3AED]" /></Field>
              <Field label={`Offset Y: ${shY}px`}><input type="range" min="-50" max="50" value={shY} onChange={(e) => setShY(+e.target.value)} className="accent-[#7C3AED]" /></Field>
              <Field label={`Blur: ${shBlur}px`}><input type="range" min="0" max="100" value={shBlur} onChange={(e) => setShBlur(+e.target.value)} className="accent-[#7C3AED]" /></Field>
              <Field label={`Spread: ${shSpread}px`}><input type="range" min="-30" max="30" value={shSpread} onChange={(e) => setShSpread(+e.target.value)} className="accent-[#7C3AED]" /></Field>
              <Field label="Shadow color"><input type="color" value={shColor} onChange={(e) => setShColor(e.target.value)} className="h-10 w-full rounded-xl border border-white/15 cursor-pointer bg-transparent" /></Field>
              <Field label={`Opacity: ${shOpacity}%`}><input type="range" min="0" max="100" value={shOpacity} onChange={(e) => setShOpacity(+e.target.value)} className="accent-[#7C3AED]" /></Field>
            </>
          )}
          {tab === 'transform' && (
            <>
              <Field label={`Rotate: ${rotate}deg`}><input type="range" min="-180" max="180" value={rotate} onChange={(e) => setRotate(+e.target.value)} className="accent-[#7C3AED]" /></Field>
              <Field label={`Scale: ${scale}`}><input type="range" min="0.5" max="2" step="0.05" value={scale} onChange={(e) => setScale(+e.target.value)} className="accent-[#7C3AED]" /></Field>
              <Field label={`Skew: ${skew}deg`}><input type="range" min="-45" max="45" value={skew} onChange={(e) => setSkew(+e.target.value)} className="accent-[#7C3AED]" /></Field>
              <Field label={`Radius: ${tRadius}px`}><input type="range" min="0" max="100" value={tRadius} onChange={(e) => setTRadius(+e.target.value)} className="accent-[#7C3AED]" /></Field>
            </>
          )}
          {tab === 'animation' && (
            <>
              <Field label="Animation">
                <select value={anim} onChange={(e) => setAnim(e.target.value)} className="bg-white/5 border border-white/15 rounded-xl px-3 py-2 outline-none focus:border-[#7C3AED] text-white capitalize">
                  {Object.keys(ANIMATIONS).map((a) => (<option key={a} value={a}>{a}</option>))}
                </select>
              </Field>
              <Field label={`Duration: ${duration}s`}><input type="range" min="0.3" max="4" step="0.1" value={duration} onChange={(e) => setDuration(+e.target.value)} className="accent-[#7C3AED]" /></Field>
            </>
          )}
        </div>

        {/* Preview + Code */}
        <div className="flex flex-col gap-6">
          <div>
            <p className="text-sm font-semibold text-white/40 mb-3 tracking-wider">PREVIEW</p>
            <div className="border border-white/10 rounded-2xl min-h-[240px] flex items-center justify-center p-8 bg-[#111118]">
              <div style={{ width: 140, height: 140, ...previewStyle }} />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-semibold text-white/40 tracking-wider">CSS</p>
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-full border border-white/20 text-white/70 hover:border-[#39FF14] hover:text-[#39FF14] transition-all duration-200"
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <pre className="bg-[#111118] border border-white/10 text-[#e6edf3] rounded-2xl p-5 overflow-auto text-sm leading-relaxed max-h-[320px]">
              <code>{code}</code>
            </pre>
          </div>
        </div>
      </div>
    </SandboxShell>
  )
}

export default CssEffectsLab
