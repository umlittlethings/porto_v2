import React, { useEffect, useState } from 'react'

function Navbar() {
  const [isFooterVisible, setIsFooterVisible] = useState(false)

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  useEffect(() => {
    const footerElement = document.getElementById('footer')
    if (!footerElement) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFooterVisible(entry.isIntersecting)
      },
      { threshold: 0.3 }
    )

    observer.observe(footerElement)
    return () => observer.disconnect()
  }, [])

  return (
    <div className={`sticky top-0 z-50 bg-white/80 backdrop-blur-sm py-4 transition-opacity duration-500 ${isFooterVisible ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      <nav className="hidden md:flex gap-40 justify-center text-xl">
        <button onClick={() => scrollToSection('about')} className="cursor-pointer hover:opacity-70 transition-opacity">About</button>
        <button onClick={() => scrollToSection('expertise')} className="cursor-pointer hover:opacity-70 transition-opacity">Services</button>
        <button onClick={() => scrollToSection('works')} className="cursor-pointer hover:opacity-70 transition-opacity">Works</button>
        <button onClick={() => scrollToSection('footer')} className="cursor-pointer hover:opacity-70 transition-opacity">Contact</button>
      </nav>
    </div>
  )
}

export default Navbar