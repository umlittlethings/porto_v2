import React from 'react'
import { motion } from 'framer-motion'

function Footer(){
  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className='bg-black overflow-hidden'>
      {/* Navigation Links Scroll Reveal */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <ul className='text-white flex flex-wrap gap-2 sm:gap-0 p-3 sm:p-5 justify-center sm:justify-self-end font-Jakarta-Medium text-sm sm:text-xl'>
          <li className='px-3 sm:px-20 cursor-pointer hover:opacity-70 transition-opacity' onClick={() => scrollToSection('about')}>
            About
          </li>
          <li className='px-3 sm:px-20 cursor-pointer hover:opacity-70 transition-opacity' onClick={() => scrollToSection('expertise')}>
            Services
          </li>
          <li className='px-3 sm:px-20 cursor-pointer hover:opacity-70 transition-opacity' onClick={() => scrollToSection('works')}>
            Works
          </li>
          <li className='px-3 sm:px-20 cursor-pointer hover:opacity-70 transition-opacity' onClick={() => scrollToSection('footer')}>
            Contact
          </li>
        </ul>
      </motion.div>

      {/* Social Buttons & Contact Email Scroll Reveal */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
        className='place-self-center pt-20 sm:pt-50 pb-16 sm:pb-30'
      >
        <div className='flex gap-4 sm:gap-8 py-4 place-self-center'>
          <button>
            <a 
              href="https://github.com/umlittlethings" 
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex h-12 w-12 items-center justify-center rounded-full
              transition-all duration-300
              hover:-translate-y-1 hover:rotate-6 hover:bg-black"
            >
              <span
                className="absolute inset-0 rounded-full bg-white/10 blur-md opacity-0
                          transition-opacity duration-300 group-hover:opacity-100"
              />
              <img src="/footer/GITHUB.svg" alt="" className='w-6 h-6 sm:w-auto sm:h-auto' />
            </a>
          </button>

          <button>
            <a 
              href="https://www.linkedin.com/in/chrispradayana/" 
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex h-12 w-12 items-center justify-center rounded-full
              transition-all duration-300
              hover:-translate-y-1 hover:rotate-6 hover:bg-black"
            >
              <span
                className="absolute inset-0 rounded-full bg-white/10 blur-md opacity-0
                          transition-opacity duration-300 group-hover:opacity-100"
              />
              <img src="/footer/IN.svg" alt="" className='w-6 h-6 sm:w-auto sm:h-auto' />
            </a>
          </button>

          <button>
            <a 
              href="https://www.instagram.com/wchrispradayana/" 
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex h-12 w-12 items-center justify-center rounded-full
              transition-all duration-300
              hover:-translate-y-1 hover:rotate-6 hover:bg-black"
            >
              <span
                className="absolute inset-0 rounded-full bg-white/10 blur-md opacity-0
                          transition-opacity duration-300 group-hover:opacity-100"
              />
              <img src="/footer/IG.svg" alt="" className='w-6 h-6 sm:w-auto sm:h-auto' />
            </a>
          </button>

          <button>
            <a 
              href="https://discord.com/users/604938815030689794" 
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex h-12 w-12 items-center justify-center rounded-full
              transition-all duration-300
              hover:-translate-y-1 hover:rotate-6 hover:bg-black"
            >
              <span
                className="absolute inset-0 rounded-full bg-white/10 blur-md opacity-0
                          transition-opacity duration-300 group-hover:opacity-100"
              />
              <img src="/footer/DC.svg" alt="" className='w-6 h-6 sm:w-auto sm:h-auto' />
            </a>
          </button>
        </div>

        <div>
          <h1 className='text-lg sm:text-2xl text-white text-center break-words px-4 font-mono tracking-wider'>
            chrispradayana@gmail.com
          </h1>
        </div>
      </motion.div>

      {/* Footer Graphic Accent Scroll Reveal */}
      <motion.img
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className='place-self-center scale-100 sm:scale-104 w-full sm:w-auto'
        src="/footer/Intersect.svg"
        alt="footer_logo"
      />
    </div>
  )
}

export default Footer