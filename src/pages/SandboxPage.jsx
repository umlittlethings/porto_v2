import { useEffect, useState } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { sandboxData } from '../data/sandboxData'
import ElectricBackground from '../components/sandbox/ElectricBackground'

function SandboxPage() {
  const navigate = useNavigate()

  const [autoIndex, setAutoIndex] = useState(0)
  const [hoverIndex, setHoverIndex] = useState(null)

  useEffect(() => {
    if (hoverIndex !== null) return
    const id = setInterval(() => {
      setAutoIndex((i) => (i + 1) % sandboxData.length)
    }, 3500)
    return () => clearInterval(id)
  }, [hoverIndex])

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#0a0a0f] flex flex-col">
      {/* Electric animated background */}
      <ElectricBackground color="#1929FE" secondaryColor="#39FF14" density={1} />

      {/* Subtle grid overlay for sci-fi lab feel */}
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

      {/* Vignette edges */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_transparent_50%,_rgba(0,0,0,0.6)_100%)]" />

      {/* Top Navbar */}
      <nav className="relative z-20 flex items-center justify-between px-6 md:px-16 py-6">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-white/60 hover:text-white transition-colors font-Jakarta-Medium"
        >
          <ArrowLeft size={20} /> Home
        </button>

        <div className="hidden md:flex items-center gap-10 text-sm font-bold font-Jakarta-Regular text-white/60">
          {sandboxData.map((item) => (
            <button
              key={item.id}
              onClick={() => navigate(item.route)}
              className="hover:text-[#39FF14] transition-colors"
            >
              {item.title}
            </button>
          ))}
        </div>

        <span className="font-Jakarta-Bold font-extrabold tracking-widest text-sm text-white/30">
          LAB://SANDBOX
        </span>
      </nav>

      {/* Center — Title */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-8 md:pt-14">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="uppercase tracking-[0.4em] text-xs md:text-sm text-[#39FF14] mb-4 font-Jakarta-Medium"
        >
          // welcome: _user
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="font-Jakarta-Bold font-extrabold leading-none text-[16vw] md:text-[11vw] lg:text-[9rem] text-white
                     drop-shadow-[0_0_30px_rgba(57,255,20,0.3)]"
        >
          [sandbox]
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
          className="mt-4 text-white/40 text-sm md:text-base font-Jakarta-Medium tracking-wider"
        >
          EXPERIMENT · BUILD · VISUALIZE
        </motion.p>
      </div>

      {/* Cards */}
      <div className="relative z-10 flex-1 flex flex-col justify-center px-7 md:px-20 lg:px-30 py-12 md:py-16">
        <motion.h2
          className="font-Jakarta-Bold text-2xl md:text-4xl font-extrabold mb-8 text-center"
          animate={{ color: hoverIndex !== null ? '#39FF14' : '#ffffff' }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
        >
          Pick your experiment
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {sandboxData.map((item, index) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
                onMouseEnter={() => setHoverIndex(index)}
                onMouseLeave={() => setHoverIndex(null)}
                onClick={() => navigate(item.route)}
                className="group cursor-pointer border border-white/10 bg-white/5 backdrop-blur-sm rounded-2xl p-6 md:p-8 flex flex-col gap-5
                           hover:border-[#39FF14]/50 hover:bg-[#39FF14]/5 hover:shadow-[0_0_30px_rgba(57,255,20,0.15)] transition-all duration-300"
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center text-white flex-shrink-0
                             bg-[#1929FE] group-hover:bg-[#39FF14] group-hover:text-black transition-colors duration-300"
                >
                  <Icon size={28} />
                </div>

                <div className="flex-1">
                  <h3 className="font-Jakarta-Bold text-2xl md:text-3xl font-extrabold mb-3 text-white group-hover:text-[#39FF14] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-white/50 group-hover:text-white/70 transition-colors font-Jakarta-Medium leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs md:text-sm px-3 py-1 rounded-full border border-white/20 text-white/60 group-hover:border-[#39FF14]/40 group-hover:text-[#39FF14]/80 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2 font-semibold text-[#1929FE] group-hover:text-[#39FF14] transition-colors">
                  Open <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default SandboxPage
