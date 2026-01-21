import React from 'react'
import { motion } from 'framer-motion'
import SeeMoreButton from '../../SeeMoreButton'

function handleClick() {
  window.location.href = 'https://www.linkedin.com/in/chris-rahardian-4b0a1b1b2/';
}

function Landing(){
  return (
    <div className="overflow-hidden">
      <img
        className="inset-0 w-full h-fit p-5 hidden sm:block"
        src="/landing/chrisBg_pc.svg"
        alt="Landing Page Background"
      />

      <img
        className="inset-0 w-full h-fit sm:hidden"
        src="/landing/chrisBg_mobile.svg"
        alt="Landing Page Background"
      />

      <div className='absolute inset-0 z-20 sm:pt-170 pt-176 text-white sm:pl-300 sm:pr-15 pr-7 pl-50 text-right text-[9px] sm:text-[16px]'>
        <h1>
          /Software Engineer /Frontend Developer /Backend Developer
        </h1>
      </div>
      <div className='absolute inset-0 z-10 flex items-center justify-center sm:pt-140'>
        <motion.img 
          src="/landing/main.svg" 
          alt="me" 
          className="rounded-full w-100 h-100 object-cover shadow-2xl"
          initial={{ opacity: 0, scale: 0.8, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            duration: 1.2,
            ease: "easeOut"
          }}
        />
      </div>

      <div className='absolute inset-0 z-20 sm:pt-150 pt-180 text-white sm:pl-15 pl-7 sm:pr-300 pr-50 text-[9px] sm:text-[16px]'>
        <h1>
          What makes my work unique is the harmony between strong technical skills and creative problem solving. I love building products that are not just functional, but also intuitive and visually engaging
        </h1>
      </div>

      <div className='absolute inset-0 z-20 sm:pt-190 pt-195 text-white sm:pl-15  sm:pr-300 text-right text-[9px] sm:text-[16px] place-items-center sm:place-items-start'>
        <div className='flex gap-2 py-4'>
          <button><img src="/landing/GIT.svg" alt="" /></button>
          <button><img src="/landing/IN.svg" alt="" /></button>
          <button><img src="/landing/DC.svg" alt="" /></button>
        </div>
        <SeeMoreButton onClick={handleClick}>See My Resume</SeeMoreButton>
      </div>
      
    </div>
  )
}

export default Landing