import React from 'react'
import { motion } from 'framer-motion'
import SeeMoreButton from '../../SeeMoreButton'

function handleClick() {
  window.open('https://drive.google.com/drive/folders/19AB-TrQcEmUfR17XklPiVE1W-yhT2PWz?usp=drive_link', '_blank', 'noopener,noreferrer');
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

      <div className='absolute inset-0 z-20 sm:pt-170 pt-156 text-white sm:pl-300 sm:pr-15 pr-7 pl-50 text-right text-[9px] sm:text-[16px]'>
        <h1>
          /Software Engineer /Frontend Developer /Backend Developer
        </h1>
      </div>
      <div className='absolute inset-0 z-10 flex items-center justify-center sm:pt-140'>
        <motion.img 
          src="/landing/main.svg" 
          alt="me" 
          className="rounded-full w-80 h-80 sm:w-100 sm:h-100 object-cover shadow-2xl"
          initial={{ opacity: 0, scale: 0.8, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            duration: 1.2,
            ease: "easeOut"
          }}
        />
      </div>

      <div className='absolute inset-0 z-20 sm:pt-150 pt-155 text-white sm:pl-15 pl-7 sm:pr-300 pr-50 text-[9px] sm:text-[16px]'>
        <h1>
          What makes my work unique is the harmony between strong technical skills and creative problem solving. I love building products that are not just functional, but also intuitive and visually engaging
        </h1>
      </div>

      <div className='absolute inset-0 z-20 sm:pt-190 pt-175 text-white sm:pl-15 sm:pr-300 text-center sm:text-right text-[9px] sm:text-[16px] flex flex-col items-center sm:items-start'>
        <div className='flex gap-2 py-4 justify-center'>
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
              <img src="/landing/GIT.svg" alt="GitHub" />
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
                <img src="/landing/IN.svg" alt="LinkedIn" />
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
                <img src="/landing/DC.svg" alt="Discord" />
            </a>
          </button>
        </div>
        <div className='mt-2'>
          <SeeMoreButton onClick={handleClick}>See My Resume</SeeMoreButton>
        </div>
      </div>
      
    </div>
  )
}

export default Landing