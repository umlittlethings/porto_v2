import React from 'react'

function Footer(){
  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className='bg-black overflow-hidden'>
        <div>
            <ul className='text-white flex p-5 justify-self-end font-Jakarta-Medium text-xl'>
                <li className='px-20 cursor-pointer hover:opacity-70 transition-opacity' onClick={() => scrollToSection('about')}>
                    About
                </li>
                <li className='px-20 cursor-pointer hover:opacity-70 transition-opacity' onClick={() => scrollToSection('expertise')}>
                    Services
                </li>
                <li className='px-20 cursor-pointer hover:opacity-70 transition-opacity' onClick={() => scrollToSection('works')}>
                    Works
                </li>
                <li className='px-20 cursor-pointer hover:opacity-70 transition-opacity' onClick={() => scrollToSection('footer')}>
                    Contact
                </li>
            </ul>
        </div>
        <div className='place-self-center pt-50 pb-30'>
            <div className='flex gap-8 py-4 place-self-center'>
                <button><img src="/footer/GITHUB.svg" alt="" /></button>
                <button><img src="/footer/IN.svg" alt="" /></button>
                <button><img src="/footer/IG.svg" alt="" /></button>
                <button><img src="/footer/DC.svg" alt="" /></button>
            </div>
            <div>
                <h1 className='text-2xl text-white text-center'>chrispradayana@gmail.com</h1>
            </div>
        </div>
        <img className='place-self-center scale-104' src="/footer/Intersect.svg" alt="footer_logo" />
       
       
    </div>
  )
}

export default Footer