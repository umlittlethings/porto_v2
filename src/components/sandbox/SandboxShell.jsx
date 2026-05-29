import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

function SandboxShell({ title, subtitle, accent = '#1929FE', children }) {
  const navigate = useNavigate()

  return (
    <section className="relative min-h-screen bg-[#0a0a0f] text-white overflow-hidden">
      {/* Grid background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_transparent_50%,_rgba(0,0,0,0.5)_100%)]" />

      {/* Content */}
      <div className="relative z-10 px-5 md:px-20 lg:px-30 py-8 md:py-16">
        <button
          onClick={() => navigate('/sandbox')}
          className="flex items-center gap-2 mb-6 md:mb-10 text-white/60 hover:text-white transition-colors font-Jakarta-Medium"
        >
          <ArrowLeft size={20} /> Back to Sandbox
        </button>

        <div className="mb-8 md:mb-12">
          <h1
            className="font-Jakarta-Bold text-3xl md:text-5xl lg:text-6xl font-extrabold"
            style={{ color: accent }}
          >
            {title}
          </h1>
          {subtitle && (
            <p className="mt-3 text-base md:text-lg text-white/50 font-Jakarta-Medium max-w-2xl">
              {subtitle}
            </p>
          )}
        </div>

        {children}
      </div>
    </section>
  )
}

export default SandboxShell
