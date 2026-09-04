import React from 'react'
import { motion } from 'framer-motion'
import AnimatedLogoRow from './AnimatedLogoRow'

function About() {
  return (
    <div>
      {/* Title Image Scroll Reveal */}
      <motion.img
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className='scale-50 sm:scale-100 pt-5 sm:pt-20 px-12 sm:px-30'
        src="/about/about tulisan.svg"
        alt="about"
      />

      {/* Bio Paragraph & Main Logos Scroll Reveal */}
      <div className='flex flex-col sm:flex-row gap-10 sm:gap-0'>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          className='font-Jakarta-Medium px-7 sm:px-30 pt-2 sm:pt-10 text-base sm:text-xl font-medium flex-1 text-justify'
        >
          Hi, I’m Chris, a fresh graduate in Computer Science from Universitas Brawijaya. I love building thoughtful digital products for web and mobile, where clean design meets solid code. Blending creativity, logic, and a passion for learning, I aim to turn ideas into tech that people enjoy using.
        </motion.p>

        <AnimatedLogoRow delayStart={0}>
          <div className='flex gap-0 sm:gap-0'>
            <img className='w-19.5 sm:w-74.5' src="about/VS.svg" alt="vscode_logo" />
            <img className='w-19.5 sm:w-74.5' src="about/FIG.svg" alt="figma_logo" />
          </div>
        </AnimatedLogoRow>
      </div>

      {/* Tech Stack Logo Rows Scroll Reveal */}
      <AnimatedLogoRow delayStart={0}>
        <div className='flex w-full justify-between items-center gap-0 sm:gap-0'>
          <img className='w-19.5 sm:w-full' src="about/REACT.svg" alt="react_logo" />
          <img className='w-19.5 sm:w-full' src="about/JS.svg" alt="javascript_logo" />
          <img className='w-19.5 sm:w-full' src="about/HTML.svg" alt="html_logo" />
          <img className='w-19.5 sm:w-full' src="about/CSS.svg" alt="css_logo" />
          <img className='w-19.5 sm:w-full' src="about/PY.svg" alt="python_logo" />
        </div>
      </AnimatedLogoRow>

      <AnimatedLogoRow delayStart={0.3}>
        <div className='flex w-full justify-between items-center gap-0 sm:gap-0'>
          <img className='w-19.5 sm:w-full' src="about/KTL.svg" alt="kotlin_logo" />
          <img className='w-19.5 sm:w-full' src="about/JAVA.svg" alt="java_logo" />
          <img className='w-19.5 sm:w-full' src="about/PHP.svg" alt="php_logo" />
          <img className='w-19.5 sm:w-full' src="about/NOD.svg" alt="node_logo" />
          <img className='w-19.5 sm:w-full' src="about/EX.svg" alt="express_logo" />
        </div>
      </AnimatedLogoRow>
    </div>
  )
}

export default About