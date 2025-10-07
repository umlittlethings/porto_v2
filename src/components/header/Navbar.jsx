import React from 'react'

function Navbar() {
  return (
    <div>
      <nav className="hidden md:flex gap-40 justify-center text-xl">
        <a href="">About</a>
        <a href="">Services</a>
        <a href="">Works</a>
        <a href="">Contact</a>
      </nav>
    </div>
  )
}

export default Navbar