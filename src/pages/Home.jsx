import React from 'react'
import Landing from '../components/Home/landing/Landing'
import Navbar from '../components/header/Navbar'
import About from '../components/Home/about/About'
import Expertise from '../components/Home/Expertise/Experise'
import Works from '../components/projects/Works'
import Before from '../components/Before'

function Home() {
  return (
    <div>
      <Landing />
      <Navbar />
      <About /> 
      <Expertise />
      <Works />
      <Before />
    </div>
  )
}

export default Home