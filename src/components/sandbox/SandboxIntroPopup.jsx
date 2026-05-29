import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { useNavigate, useLocation } from 'react-router-dom'

function SandboxIntroPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    // Check if user has already seen the popup
    const hasSeenIntro = localStorage.getItem('hasSeenSandboxIntro')
    // Don't show it if they are already on the sandbox page
    const isSandboxPage = location.pathname.startsWith('/sandbox')
    
    if (!hasSeenIntro && !isSandboxPage) {
      // Small delay before showing up
      const timer = setTimeout(() => setIsOpen(true), 2000)
      return () => clearTimeout(timer)
    }
  }, [location.pathname])

  const handleClose = () => {
    setIsOpen(false)
    localStorage.setItem('hasSeenSandboxIntro', 'true')
  }

  const handleExplore = () => {
    handleClose()
    navigate('/sandbox')
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={handleClose}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative z-10 w-full max-w-md bg-[#0a0a0f] border border-white/10 rounded-2xl p-6 shadow-2xl overflow-hidden"
          >
            {/* Background effects */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#1929FE]/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#39FF14]/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />
            
            <button 
              onClick={handleClose}
              className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors z-20"
            >
              <X size={20} />
            </button>

            <div className="flex flex-col items-center text-center relative z-10">
              {/* Mascot SVG */}
              <div className="w-24 h-24 mb-4">
                <svg viewBox="0 0 100 100" fill="none" className="w-full h-full drop-shadow-[0_0_15px_rgba(57,255,20,0.2)]">
                  {/* Tail */}
                  <path d="M 75 55 Q 95 45 90 65 Q 85 75 75 70 Q 80 60 75 55" fill="#f3f4f6" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" />
                  {/* Body */}
                  <ellipse cx="55" cy="65" rx="28" ry="22" fill="#ffffff" stroke="#000000" strokeWidth="2" />
                  <ellipse cx="55" cy="68" rx="14" ry="10" fill="#000000" />
                  {/* Head */}
                  <circle cx="55" cy="38" r="22" fill="#ffffff" stroke="#000000" strokeWidth="2" />
                  {/* Ears */}
                  <path d="M 38 22 L 32 8 L 45 20 Z" fill="#ffffff" stroke="#000000" strokeWidth="1.5" strokeLinejoin="round" />
                  <path d="M 72 22 L 78 8 L 65 20 Z" fill="#ffffff" stroke="#000000" strokeWidth="1.5" strokeLinejoin="round" />
                  {/* Eyes */}
                  <ellipse cx="47" cy="35" rx="4" ry="5" fill="#1f2937" />
                  <ellipse cx="63" cy="35" rx="4" ry="5" fill="#1f2937" />
                  {/* Nose */}
                  <path d="M 55 42 L 52 46 L 58 46 Z" fill="#f472b6" />
                  {/* Whiskers */}
                  <line x1="28" y1="38" x2="42" y2="36" stroke="#000000" strokeWidth="0.8" strokeLinecap="round" />
                  <line x1="28" y1="42" x2="42" y2="42" stroke="#000000" strokeWidth="0.8" strokeLinecap="round" />
                  <line x1="28" y1="46" x2="42" y2="48" stroke="#000000" strokeWidth="0.8" strokeLinecap="round" />
                  <line x1="82" y1="38" x2="68" y2="36" stroke="#000000" strokeWidth="0.8" strokeLinecap="round" />
                  <line x1="82" y1="42" x2="68" y2="42" stroke="#000000" strokeWidth="0.8" strokeLinecap="round" />
                  <line x1="82" y1="46" x2="68" y2="48" stroke="#000000" strokeWidth="0.8" strokeLinecap="round" />
                  {/* Lab goggles */}
                  <g>
                    <path d="M 30 32 Q 55 26 80 32" fill="none" stroke="#374151" strokeWidth="2.5" strokeLinecap="round" />
                    <ellipse cx="45" cy="34" rx="9" ry="7" fill="#dbeafe" fillOpacity="0.7" stroke="#39FF14" strokeWidth="2" />
                    <ellipse cx="65" cy="34" rx="9" ry="7" fill="#dbeafe" fillOpacity="0.7" stroke="#39FF14" strokeWidth="2" />
                    <path d="M 54 34 L 56 34" stroke="#374151" strokeWidth="2" strokeLinecap="round" />
                    <ellipse cx="42" cy="31" rx="3" ry="2" fill="white" fillOpacity="0.5" />
                    <ellipse cx="62" cy="31" rx="3" ry="2" fill="white" fillOpacity="0.5" />
                  </g>
                </svg>
              </div>

              <h2 className="font-Jakarta-Bold text-2xl text-white mb-3">
                Welcome to <span className="text-[#39FF14]">[sandbox]</span>
              </h2>
              
              <p className="text-white/60 font-Jakarta-Medium text-sm mb-6 leading-relaxed">
                Meow! I've uncovered a hidden laboratory within this portfolio. 
                The Sandbox is a restricted zone where cutting-edge UI modules, experimental animations, 
                and algorithms are tested before deployment. Expect anomalies and unfinished prototypes!
              </p>

              <div className="flex gap-4 w-full">
                <button 
                  onClick={handleClose}
                  className="flex-1 py-3 px-4 rounded-xl border border-white/10 text-white/70 hover:bg-white/5 font-Jakarta-Bold text-sm transition-colors"
                >
                  Maybe Later
                </button>
                <button 
                  onClick={handleExplore}
                  className="flex-1 py-3 px-4 rounded-xl bg-[#1929FE] text-white hover:bg-[#39FF14] hover:text-black font-Jakarta-Bold text-sm transition-colors shadow-[0_0_20px_rgba(25,41,254,0.3)]"
                >
                  Explore Lab
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default SandboxIntroPopup
