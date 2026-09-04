import React, { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import WelcomeScreen from '../components/welcome/WelcomeScreen'
import Landing from '../components/Home/landing/Landing'
import Navbar from '../components/header/Navbar'
import About from '../components/Home/about/About'
import Expertise from '../components/Home/Expertise/Experise'
import Works from '../components/projects/Works'
import Before from '../components/Before'
import Footer from '../components/footer/Footer'

const SESSION_WELCOME_KEY = 'porto_welcome_done';

const PRELOAD_IMAGES = [
  '/landing/chrisBg_pc.svg',
  '/landing/chrisBg_mobile.svg',
  '/landing/main.svg',
  '/landing/GIT.svg',
  '/landing/IN.svg',
  '/landing/DC.svg',
];

function Home() {
  const [showWelcome, setShowWelcome] = useState(() => {
    return !sessionStorage.getItem(SESSION_WELCOME_KEY);
  });

  // Preload all critical landing page images in the background on initial mount
  useEffect(() => {
    PRELOAD_IMAGES.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  const handleWelcomeComplete = () => {
    sessionStorage.setItem(SESSION_WELCOME_KEY, 'true');
    setShowWelcome(false);
  };

  return (
    <div>
      {/* 1. Welcome Screen Overlay (Full screen fixed z-50) */}
      <AnimatePresence>
        {showWelcome && (
          <WelcomeScreen key="welcome-screen" onContinue={handleWelcomeComplete} />
        )}
      </AnimatePresence>

      {/* 2. Main Home Page (Mounted in DOM behind WelcomeScreen for instant zero-flicker reveal) */}
      <div key="home-main-content">
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
    </div>
  )
}

export default Home