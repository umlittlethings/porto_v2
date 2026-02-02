import React, { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'

function Navbar() {
  const [isFooterVisible, setIsFooterVisible] = useState(false)
  const [isLandingVisible, setIsLandingVisible] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setIsMobileMenuOpen(false)
    }
  }

  useEffect(() => {
    const footerElement = document.getElementById('footer')
    const landingElement = document.querySelector('section:first-child') || document.querySelector('img[src*="landing"]')?.closest('div')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === footerElement) {
            setIsFooterVisible(entry.isIntersecting)
          }
          if (entry.target === landingElement) {
            setIsLandingVisible(entry.isIntersecting)
          }
        })
      },
      { threshold: 0.3 }
    )

    if (footerElement) observer.observe(footerElement)
    if (landingElement) observer.observe(landingElement)

    return () => observer.disconnect()
  }, [])

  return (
    <div className={`sticky top-0 z-50 bg-white/80 backdrop-blur-sm py-4 transition-opacity duration-500 ${isFooterVisible ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      {/* Desktop Navbar */}
      <nav className="text-[#1929FE] font-bold font-Jakarta-Regular hidden md:flex gap-40 justify-center text-xl ">
        <button onClick={() => scrollToSection('about')} className="cursor-pointer hover:opacity-70 transition-opacity">About</button>
        <button onClick={() => scrollToSection('expertise')} className="cursor-pointer hover:opacity-70 transition-opacity">Services</button>
        <button onClick={() => scrollToSection('works')} className="cursor-pointer hover:opacity-70 transition-opacity">Works</button>
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
          <button onClick={() => scrollToSection('footer')} className="text-left cursor-pointer hover:opacity-70 transition-opacity py-2">Contact</button>
        </nav>
      </div>
    </div>
  )
}

export default Navbar