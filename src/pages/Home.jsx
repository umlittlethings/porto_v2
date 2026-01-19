import React from 'react'
import Landing from '../components/Home/landing/Landing'
import Navbar from '../components/header/Navbar'
import About from '../components/Home/about/About'
import Expertise from '../components/Home/Expertise/Experise'
import Works from '../components/projects/Works'
import Before from '../components/Before'
import Footer from '../components/footer/Footer'

function Home() {
  return (
    <div>
      <Landing />
      <Navbar />
      <div id="about">
        <About />
      </div>
      <div id="expertise">
        <Expertise />
      </div>
      <div id="works">
        <Works />
      </div>
      <Before />
      <div id="footer">
        <Footer />
      </div>
    </div>
  )
}

export default Home