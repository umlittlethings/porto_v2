import { useMemo, useState } from 'react'
import { Check, Copy, Info } from 'lucide-react'
import SandboxShell from './SandboxShell'

const FONT_WEIGHTS = [
  { label: 'Normal', value: '400' },
  { label: 'Medium', value: '500' },
  { label: 'Semibold', value: '600' },
  { label: 'Bold', value: '700' },
]

function Field({ label, children }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-sm font-semibold text-white/60">{label}</span>
      {children}
    </label>
  )
}

function UIComponentBuilder() {
  const [component, setComponent] = useState('button')
  const [copied, setCopied] = useState(false)
  const [showTutorial, setShowTutorial] = useState(true)

  // Shared style state
  const [text, setText] = useState('Click me')
  const [bg, setBg] = useState('#1929FE')
  const [color, setColor] = useState('#ffffff')
  const [radius, setRadius] = useState(12)
  const [paddingX, setPaddingX] = useState(24)
  const [paddingY, setPaddingY] = useState(12)
  const [fontSize, setFontSize] = useState(16)
  const [fontWeight, setFontWeight] = useState('600')
  const [borderWidth, setBorderWidth] = useState(0)
  const [borderColor, setBorderColor] = useState('#39FF14')
  const [shadow, setShadow] = useState(20)

  // Card-only state
  const [cardTitle, setCardTitle] = useState('Card Title')
  const [cardBody, setCardBody] = useState('A short description goes right here to show the card content.')

  const previewStyle = useMemo(() => {
    const base = {
      backgroundColor: bg,
      color,
      borderRadius: `${radius}px`,
      borderWidth: `${borderWidth}px`,
      borderStyle: borderWidth > 0 ? 'solid' : 'none',
      borderColor,
      boxShadow: shadow > 0 ? `0 ${Math.round(shadow / 2)}px ${shadow}px rgba(0,0,0,0.4)` : 'none',
    }
    if (component === 'button') {
      return { ...base, padding: `${paddingY}px ${paddingX}px`, fontSize: `${fontSize}px`, fontWeight, cursor: 'pointer' }
    }
    return { ...base, padding: `${paddingX}px`, maxWidth: '360px' }
  }, [component, bg, color, radius, borderWidth, borderColor, shadow, paddingX, paddingY, fontSize, fontWeight])

  const generatedCode = useMemo(() => {
    const shadowCss = shadow > 0 ? `\n  box-shadow: 0 ${Math.round(shadow / 2)}px ${shadow}px rgba(0,0,0,0.4);` : ''
    const borderCss = borderWidth > 0 ? `\n  border: ${borderWidth}px solid ${borderColor};` : ''

    if (component === 'button') {
      return `<button class="my-button">${text}</button>\n\n<style>\n.my-button {\n  background-color: ${bg};\n  color: ${color};\n  padding: ${paddingY}px ${paddingX}px;\n  font-size: ${fontSize}px;\n  font-weight: ${fontWeight};\n  border-radius: ${radius}px;${borderCss}${shadowCss}\n  cursor: pointer;\n}\n</style>`
    }

    return `<div class="my-card">\n  <h3 class="my-card__title">${cardTitle}</h3>\n  <p class="my-card__body">${cardBody}</p>\n</div>\n\n<style>\n.my-card {\n  background-color: ${bg};\n  color: ${color};\n  padding: ${paddingX}px;\n  border-radius: ${radius}px;\n  max-width: 360px;${borderCss}${shadowCss}\n}\n.my-card__title {\n  font-size: ${fontSize + 6}px;\n  font-weight: ${fontWeight};\n  margin: 0 0 8px;\n}\n.my-card__body {\n  font-size: ${fontSize}px;\n  opacity: 0.85;\n  margin: 0;\n}\n</style>`
  }, [component, text, bg, color, paddingX, paddingY, fontSize, fontWeight, radius, borderWidth, borderColor, shadow, cardTitle, cardBody])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch { setCopied(false) }
  }

  return (
    <SandboxShell
      title="UI Component Builder"
      subtitle="Design components visually, see a real-time preview, then copy the generated HTML + CSS."
      accent="#1929FE"
    >
      {/* Tutorial */}
      {showTutorial && (
        <div className="mb-8 border border-[#1929FE]/30 bg-[#1929FE]/5 rounded-xl p-5 relative">
          <button onClick={() => setShowTutorial(false)} className="absolute top-4 right-4 text-white/40 hover:text-white text-sm">✕</button>
          <div className="flex items-start gap-3">
            <Info size={20} className="text-[#1929FE] flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-Jakarta-Bold font-bold text-white mb-2">How to Use</h3>
              <ol className="text-white/60 text-sm space-y-1 list-decimal list-inside">
                <li>Choose a component type: <strong className="text-white/80">Button</strong> or <strong className="text-white/80">Card</strong></li>
                <li>Adjust visual properties in the left panel (color, radius, padding, etc.)</li>
                <li>See the result instantly in the <strong className="text-white/80">PREVIEW</strong> panel</li>
                <li>Click <strong className="text-white/80">Copy</strong> to copy the generated HTML + CSS code</li>
                <li>Paste it into your project and customize as needed</li>
              </ol>
            </div>
          </div>
        </div>
      )}

      {/* Component switch */}
      <div className="flex gap-3 mb-8">
        {['button', 'card'].map((c) => (
          <button
            key={c}
            onClick={() => setComponent(c)}
            className={`px-5 py-2 rounded-full border font-semibold capitalize transition-all duration-200 ${
              component === c
                ? 'bg-[#1929FE] text-white border-[#1929FE]'
                : 'bg-transparent text-white/60 border-white/20 hover:border-white/50'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {component === 'button' ? (
            <Field label="Button text">
              <input type="text" value={text} onChange={(e) => setText(e.target.value)} className="bg-white/5 border border-white/15 rounded-xl px-3 py-2 outline-none focus:border-[#1929FE] text-white" />
            </Field>
          ) : (
            <>
              <Field label="Card title">
                <input type="text" value={cardTitle} onChange={(e) => setCardTitle(e.target.value)} className="bg-white/5 border border-white/15 rounded-xl px-3 py-2 outline-none focus:border-[#1929FE] text-white" />
              </Field>
              <Field label="Card body">
                <input type="text" value={cardBody} onChange={(e) => setCardBody(e.target.value)} className="bg-white/5 border border-white/15 rounded-xl px-3 py-2 outline-none focus:border-[#1929FE] text-white" />
              </Field>
            </>
          )}

          <Field label="Background">
            <input type="color" value={bg} onChange={(e) => setBg(e.target.value)} className="h-10 w-full rounded-xl border border-white/15 cursor-pointer bg-transparent" />
          </Field>
          <Field label="Text color">
            <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="h-10 w-full rounded-xl border border-white/15 cursor-pointer bg-transparent" />
          </Field>

          <Field label={`Radius: ${radius}px`}>
            <input type="range" min="0" max="50" value={radius} onChange={(e) => setRadius(+e.target.value)} className="accent-[#1929FE]" />
          </Field>
          <Field label={`Shadow: ${shadow}px`}>
            <input type="range" min="0" max="60" value={shadow} onChange={(e) => setShadow(+e.target.value)} className="accent-[#1929FE]" />
          </Field>

          <Field label={component === 'button' ? `Padding X: ${paddingX}px` : `Padding: ${paddingX}px`}>
            <input type="range" min="0" max="60" value={paddingX} onChange={(e) => setPaddingX(+e.target.value)} className="accent-[#1929FE]" />
          </Field>
          {component === 'button' && (
            <Field label={`Padding Y: ${paddingY}px`}>
              <input type="range" min="0" max="40" value={paddingY} onChange={(e) => setPaddingY(+e.target.value)} className="accent-[#1929FE]" />
            </Field>
          )}

          <Field label={`Font size: ${fontSize}px`}>
            <input type="range" min="10" max="40" value={fontSize} onChange={(e) => setFontSize(+e.target.value)} className="accent-[#1929FE]" />
          </Field>
          <Field label="Font weight">
            <select value={fontWeight} onChange={(e) => setFontWeight(e.target.value)} className="bg-white/5 border border-white/15 rounded-xl px-3 py-2 outline-none focus:border-[#1929FE] text-white">
              {FONT_WEIGHTS.map((w) => (<option key={w.value} value={w.value}>{w.label}</option>))}
            </select>
          </Field>

          <Field label={`Border width: ${borderWidth}px`}>
            <input type="range" min="0" max="8" value={borderWidth} onChange={(e) => setBorderWidth(+e.target.value)} className="accent-[#1929FE]" />
          </Field>
          <Field label="Border color">
            <input type="color" value={borderColor} onChange={(e) => setBorderColor(e.target.value)} className="h-10 w-full rounded-xl border border-white/15 cursor-pointer bg-transparent" />
          </Field>
        </div>

        {/* Preview + Code */}
        <div className="flex flex-col gap-6">
          <div>
            <p className="text-sm font-semibold text-white/40 mb-3 tracking-wider">PREVIEW</p>
            <div className="border border-white/10 rounded-2xl min-h-[220px] flex items-center justify-center p-8 bg-[#111118]">
              {component === 'button' ? (
                <button style={previewStyle}>{text}</button>
              ) : (
                <div style={previewStyle}>
                  <h3 style={{ fontSize: `${fontSize + 6}px`, fontWeight, margin: '0 0 8px' }}>{cardTitle}</h3>
                  <p style={{ fontSize: `${fontSize}px`, opacity: 0.85, margin: 0 }}>{cardBody}</p>
                </div>
              )}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-semibold text-white/40 tracking-wider">CODE</p>
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-full border border-white/20 text-white/70 hover:border-[#39FF14] hover:text-[#39FF14] transition-all duration-200"
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <pre className="bg-[#111118] border border-white/10 text-[#e6edf3] rounded-2xl p-5 overflow-auto text-sm leading-relaxed max-h-[320px]">
              <code>{generatedCode}</code>
            </pre>
          </div>
        </div>
      </div>
    </SandboxShell>
  )
}

export default UIComponentBuilder
