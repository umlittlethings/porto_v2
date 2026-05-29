import { useEffect, useState } from 'react'
import { Menu, X, Zap } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

function Navbar() {
  const navigate = useNavigate()
  const [isFooterVisible, setIsFooterVisible] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setIsMobileMenuOpen(false)
    }
  }

  const goToSandbox = () => {
    setIsMobileMenuOpen(false)
    navigate('/sandbox')
  }

  useEffect(() => {
    const footerElement = document.getElementById('footer')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === footerElement) {
            setIsFooterVisible(entry.isIntersecting)
          }
        })
      },
      { threshold: 0.3 }
    )

    if (footerElement) observer.observe(footerElement)

    return () => observer.disconnect()
  }, [])

  return (
    <div className={`sticky top-0 z-50 bg-white/80 backdrop-blur-sm py-4 transition-opacity duration-500 ${isFooterVisible ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      {/* Electric flicker keyframes */}
      <style>{`
        @keyframes electric-flicker {
          0%, 100% { opacity: 1; text-shadow: 0 0 4px #1929FE, 0 0 10px #1929FE; }
          10% { opacity: 0.85; text-shadow: 0 0 2px #1929FE; }
          20% { opacity: 1; text-shadow: 0 0 8px #1929FE, 0 0 20px #7c93ff; }
          30% { opacity: 0.9; text-shadow: 0 0 3px #1929FE; }
          50% { opacity: 1; text-shadow: 0 0 6px #1929FE, 0 0 14px #7c93ff; }
          70% { opacity: 0.88; text-shadow: 0 0 2px #1929FE; }
          80% { opacity: 1; text-shadow: 0 0 10px #1929FE, 0 0 24px #7c93ff, 0 0 40px #1929FE44; }
        }
        .electric-text {
          animation: electric-flicker 2.5s ease-in-out infinite;
        }
      `}</style>

      {/* Desktop Navbar */}
      <nav className="text-[#1929FE] font-bold font-Jakarta-Regular hidden md:flex gap-20 lg:gap-28 justify-center text-xl ">
        <button onClick={() => scrollToSection('about')} className="cursor-pointer hover:opacity-70 transition-opacity">About</button>
        <button onClick={() => scrollToSection('expertise')} className="cursor-pointer hover:opacity-70 transition-opacity">Services</button>
        <button onClick={() => scrollToSection('works')} className="cursor-pointer hover:opacity-70 transition-opacity">Works</button>
        <button onClick={goToSandbox} className="cursor-pointer hover:opacity-70 transition-opacity electric-text inline-flex items-center gap-1">
          [sandbox]
        </button>
        <button onClick={() => scrollToSection('footer')} className="cursor-pointer hover:opacity-70 transition-opacity">Contact</button>
      </nav>

      {/* Mobile Navbar */}
      <div className="md:hidden flex justify-end px-7">
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 hover:opacity-70 transition-opacity"
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <div className={`md:hidden absolute top-full right-0 bg-white/95 backdrop-blur-sm border-b border-black/10 w-full transition-all duration-300 ease-in-out overflow-hidden ${isMobileMenuOpen ? 'opacity-100 max-h-96' : 'opacity-0 max-h-0 pointer-events-none'}`}>
        <nav className="text-[#1929FE] font-bold font-Jakarta-Regular flex flex-col px-7 py-4 gap-4 text-lg">
          <button onClick={() => scrollToSection('about')} className="text-left cursor-pointer hover:opacity-70 transition-opacity py-2">About</button>
          <button onClick={() => scrollToSection('expertise')} className="text-left cursor-pointer hover:opacity-70 transition-opacity py-2">Services</button>
          <button onClick={() => scrollToSection('works')} className="text-left cursor-pointer hover:opacity-70 transition-opacity py-2">Works</button>
          <button onClick={goToSandbox} className="text-left cursor-pointer hover:opacity-70 transition-opacity py-2 electric-text inline-flex items-center gap-1">
            <Zap size={16} className="fill-current" />Sandbox
          </button>
          <button onClick={() => scrollToSection('footer')} className="text-left cursor-pointer hover:opacity-70 transition-opacity py-2">Contact</button>
        </nav>
      </div>
    </div>
  )
}

export default Navbar