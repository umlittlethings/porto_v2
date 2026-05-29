import { useEffect, useState } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { sandboxData } from '../data/sandboxData'
import ElectricBackground from '../components/sandbox/ElectricBackground'

function SandboxPage() {
  const navigate = useNavigate()

  const [autoIndex, setAutoIndex] = useState(0)
  const [hoverIndex, setHoverIndex] = useState(null)
  const [showLoader, setShowLoader] = useState(true)
  const [blackholeClicked, setBlackholeClicked] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false)
    }, 2500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (hoverIndex !== null) return
    const id = setInterval(() => {
      setAutoIndex((i) => (i + 1) % sandboxData.length)
    }, 3500)
    return () => clearInterval(id)
  }, [hoverIndex])

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#0a0a0f] flex flex-col">
      {/* Full-screen Loader */}
      <AnimatePresence>
        {showLoader && (
          <motion.div
            key="sandbox-loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0a0a0f]"
          >
            {/* Loader Grid Background */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(57, 255, 20, 0.4) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(57, 255, 20, 0.4) 1px, transparent 1px)
                `,
                backgroundSize: '50px 50px',
                backgroundPosition: 'center center'
              }}
            />
            {/* Vignette effect so text stays readable */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_transparent_10%,_rgba(10,10,15,0.95)_100%)]" />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
              className="relative z-10 uppercase tracking-[0.4em] text-sm md:text-base text-[#39FF14] mb-4 font-Jakarta-Medium"
            >
              // welcome user
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
              className="relative z-10 font-Jakarta-Bold font-extrabold leading-none text-[16vw] md:text-[11vw] lg:text-[9rem] text-white
                         drop-shadow-[0_0_30px_rgba(57,255,20,0.3)]"
            >
              [sandbox]
            </motion.h1>
          </motion.div>
        )}
      </AnimatePresence>

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
                onClick={() => item.status !== 'coming_soon' && navigate(item.route)}
                className={`group border border-white/10 bg-white/5 backdrop-blur-sm rounded-2xl p-6 md:p-8 flex flex-col gap-5 relative overflow-hidden transition-all duration-300
                           ${item.status === 'coming_soon'
                             ? 'cursor-not-allowed opacity-90'
                             : 'cursor-pointer hover:border-[#39FF14]/50 hover:bg-[#39FF14]/5 hover:shadow-[0_0_30px_rgba(57,255,20,0.15)]'
                           }`}
              >
                {/* Coming Soon Overlays (Sci-Fi / Cyberpunk Style) */}
                {item.status === 'coming_soon' && item.effect === 'police_line' && (
                  <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
                    {/* Frosted Glass Base */}
                    <div className="absolute inset-0 bg-[#0a0a0f]/80 backdrop-blur-md" />
                    
                    {/* Tape 1: Diagonal Top */}
                    <div className="absolute top-[10%] -left-[10%] w-[120%] h-7 bg-[#FFC107] rotate-[-10deg] shadow-[0_5px_15px_rgba(0,0,0,0.6)] border-y-2 border-black/80 flex items-center overflow-hidden">
                      <div className="absolute inset-0 mix-blend-overlay opacity-60" style={{ backgroundImage: 'repeating-linear-gradient(-45deg, transparent, transparent 15px, #000 15px, #000 30px)' }} />
                      <span className="relative z-10 text-black font-Jakarta-Bold text-[10px] tracking-[0.3em] w-full text-center whitespace-nowrap">RESTRICTED // DO NOT CROSS // RESTRICTED</span>
                    </div>

                    {/* Tape 2: Diagonal Middle */}
                    <div className="absolute top-[40%] -left-[20%] w-[150%] h-7 bg-[#FFC107] rotate-[15deg] shadow-[0_5px_15px_rgba(0,0,0,0.6)] border-y-2 border-black/80 flex items-center overflow-hidden">
                      <div className="absolute inset-0 mix-blend-overlay opacity-60" style={{ backgroundImage: 'repeating-linear-gradient(-45deg, transparent, transparent 15px, #000 15px, #000 30px)' }} />
                      <span className="relative z-10 text-black font-Jakarta-Bold text-[10px] tracking-[0.3em] w-full text-center whitespace-nowrap">CAUTION // AREA CLOSED // CAUTION</span>
                    </div>

                    {/* Tape 3: Steep Diagonal */}
                    <div className="absolute top-[50%] -left-[30%] w-[180%] h-6 bg-[#F59E0B] rotate-[65deg] shadow-[0_5px_15px_rgba(0,0,0,0.6)] border-y-2 border-black/80 flex items-center overflow-hidden opacity-90">
                      <div className="absolute inset-0 mix-blend-overlay opacity-50" style={{ backgroundImage: 'repeating-linear-gradient(-45deg, transparent, transparent 15px, #000 15px, #000 30px)' }} />
                      <span className="relative z-10 text-black font-Jakarta-Bold text-[9px] tracking-[0.3em] w-full text-center whitespace-nowrap">POLICE LINE // DO NOT CROSS // POLICE LINE</span>
                    </div>

                    {/* Tape 4: Horizontal near bottom */}
                    <div className="absolute bottom-[20%] -left-[10%] w-[120%] h-6 bg-[#FFC107] rotate-[-5deg] shadow-[0_5px_15px_rgba(0,0,0,0.6)] border-y-2 border-black/80 flex items-center overflow-hidden">
                      <div className="absolute inset-0 mix-blend-overlay opacity-60" style={{ backgroundImage: 'repeating-linear-gradient(-45deg, transparent, transparent 15px, #000 15px, #000 30px)' }} />
                      <span className="relative z-10 text-black font-Jakarta-Bold text-[9px] tracking-[0.3em] w-full text-center whitespace-nowrap">RESTRICTED // RESTRICTED // RESTRICTED</span>
                    </div>

                    {/* Tape 5: Diagonal Bottom Corner */}
                    <div className="absolute bottom-[-10%] -left-[10%] w-[120%] h-8 bg-[#F59E0B] rotate-[-35deg] shadow-[0_5px_15px_rgba(0,0,0,0.6)] border-y-2 border-black/80 flex items-center overflow-hidden opacity-90">
                      <div className="absolute inset-0 mix-blend-overlay opacity-50" style={{ backgroundImage: 'repeating-linear-gradient(-45deg, transparent, transparent 15px, #000 15px, #000 30px)' }} />
                      <span className="relative z-10 text-black font-Jakarta-Bold text-[10px] tracking-[0.3em] w-full text-center whitespace-nowrap">DANGER // KEEP OUT // DANGER // KEEP OUT</span>
                    </div>
                    
                    {/* Tape 6: Top Right Corner */}
                    <div className="absolute top-[-5%] left-[40%] w-[100%] h-6 bg-[#FFC107] rotate-[45deg] shadow-[0_5px_15px_rgba(0,0,0,0.6)] border-y-2 border-black/80 flex items-center overflow-hidden">
                      <div className="absolute inset-0 mix-blend-overlay opacity-60" style={{ backgroundImage: 'repeating-linear-gradient(-45deg, transparent, transparent 15px, #000 15px, #000 30px)' }} />
                    </div>

                    {/* Center Label */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative z-30 border border-[#FFC107]/50 bg-[#0a0a0f]/90 px-6 py-2 backdrop-blur-md shadow-[0_0_30px_rgba(0,0,0,0.8)] flex items-center gap-3 rounded-sm">
                        <div className="w-2 h-2 rounded-full bg-[#FFC107] animate-pulse shadow-[0_0_10px_#FFC107]" />
                        <span className="font-Jakarta-Bold text-[#FFC107] text-sm tracking-[0.3em]">COMING SOON</span>
                      </div>
                    </div>
                  </div>
                )}

                {item.status === 'coming_soon' && item.effect === 'cage' && (
                  <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none overflow-hidden">
                    {/* Dark Base */}
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
                    
                    {/* Vertical Cage Bars (Metallic) */}
                    <div className="absolute inset-0 z-10" style={{
                      backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 45px, #52525b 45px, #27272a 50px, #09090b 55px)'
                    }} />
                    
                    {/* Edge shadow for depth */}
                    <div className="absolute inset-0 z-10 shadow-[inset_0_0_60px_rgba(0,0,0,0.9)]" />

                    {/* Sleek Label */}
                    <div className="relative z-30 border border-red-500/80 bg-[#0a0a0f]/95 px-8 py-3 shadow-[0_0_30px_rgba(239,68,68,0.4)] flex items-center gap-3 rounded-sm">
                      <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_10px_#ef4444]" />
                      <span className="font-Jakarta-Bold text-red-500 text-sm tracking-[0.3em]">COMING SOON</span>
                    </div>
                  </div>
                )}

                {item.status === 'blackhole' && item.effect === 'blackhole' && (
                  <div 
                    className="absolute inset-0 z-20 flex items-center justify-center bg-[#050508] cursor-pointer overflow-hidden rounded-2xl"
                    onClick={(e) => {
                      e.stopPropagation();
                      setBlackholeClicked(true);
                    }}
                  >
                    {!blackholeClicked ? (
                      // Blackhole spinning effect
                      <div className="relative w-40 h-40 flex items-center justify-center">
                        <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,_transparent_0%,_#A855F7_50%,_transparent_100%)] animate-[spin_3s_linear_infinite] blur-xl opacity-70" />
                        <div className="absolute inset-4 rounded-full bg-black shadow-[inset_0_0_20px_rgba(0,0,0,1)] z-10" />
                        <div className="absolute inset-0 rounded-full border-2 border-purple-500/20 border-dashed animate-[spin_4s_linear_infinite_reverse]" />
                        <div className="absolute inset-2 rounded-full border border-purple-500/10 border-dashed animate-[spin_2s_linear_infinite]" />
                      </div>
                    ) : (
                      // Clicked state: purple coming soon
                      <motion.div 
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="relative z-30 border border-purple-500/80 bg-[#0a0a0f]/95 px-8 py-3 shadow-[0_0_30px_rgba(168,85,247,0.5)] flex items-center gap-3 rounded-sm"
                      >
                        <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse shadow-[0_0_10px_#A855F7]" />
                        <span className="font-Jakarta-Bold text-purple-400 text-sm tracking-[0.3em]">COMING SOON</span>
                      </motion.div>
                    )}
                  </div>
                )}

                <div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-300
                             ${item.status === 'coming_soon' ? 'bg-white/10 text-white/40' : 'bg-[#1929FE] text-white group-hover:bg-[#39FF14] group-hover:text-black'}`}
                >
                  <Icon size={28} />
                </div>

                <div className="flex-1 relative z-10">
                  <h3 className={`font-Jakarta-Bold text-2xl md:text-3xl font-extrabold mb-3 transition-colors
                                 ${item.status === 'coming_soon' ? 'text-white/40' : 'text-white group-hover:text-[#39FF14]'}`}>
                    {item.title}
                  </h3>
                  <p className={`transition-colors font-Jakarta-Medium leading-relaxed
                                ${item.status === 'coming_soon' ? 'text-white/30' : 'text-white/50 group-hover:text-white/70'}`}>
                    {item.desc}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 relative z-10">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`text-xs md:text-sm px-3 py-1 rounded-full border transition-colors
                                 ${item.status === 'coming_soon' ? 'border-white/10 text-white/30' : 'border-white/20 text-white/60 group-hover:border-[#39FF14]/40 group-hover:text-[#39FF14]/80'}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className={`flex items-center gap-2 font-semibold transition-colors relative z-10
                                ${item.status === 'coming_soon' ? 'text-white/20' : 'text-[#1929FE] group-hover:text-[#39FF14]'}`}>
                  {item.status === 'coming_soon' ? 'Locked' : 'Open'} 
                  {item.status !== 'coming_soon' && <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
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
