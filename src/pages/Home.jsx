import React from 'react'
import Landing from '../components/Home/landing/Landing'
import Navbar from '../components/header/Navbar'
import About from '../components/Home/about/About'

function Home() {
  return (
    <div>
      <Landing />
      <Navbar />
      <About /> 
    </div>
  )
}

export default Home