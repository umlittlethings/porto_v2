import React from 'react'
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

      <div className='absolute inset-0 z-20 sm:pt-170 pt-130 text-white sm:pl-300 sm:pr-15 pr-7 pl-50 text-right text-[9px] sm:text-[16px]'>
        <h1>
          I write code like poetry and debug like a detective — all to craft digital stuff that just feels right.
        </h1>
      </div>

      <div className='absolute inset-0 z-20 sm:pt-150 pt-130 text-white sm:pl-15 pl-7 sm:pr-300 pr-50 text-[9px] sm:text-[16px]'>
        <h1>
          What makes my work unique is the harmony between strong technical skills and creative problem solving. I love building products that are not just functional, but also intuitive and visually engaging
        </h1>
      </div>

      <div className='absolute inset-0 z-20 sm:pt-190 pt-155 text-white sm:pl-15  sm:pr-300 text-right text-[9px] sm:text-[16px] place-items-center sm:place-items-start'>
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