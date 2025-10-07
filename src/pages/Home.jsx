import React from 'react'
import Landing from '../components/Home/landing/Landing'
import Navbar from '../components/header/Navbar'
import About from '../components/Home/about/About'
import Expertise from '../components/Home/Expertise/Experise'
import Works from '../components/projects/Works'

function Home() {
  return (
    <div>
      <Landing />
      <Navbar />
      <About /> 
      <Expertise />
      <Works />
    </div>
  )
}

export default Home