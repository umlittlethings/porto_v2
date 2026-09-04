import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function WelcomeScreen({ onContinue }) {
  const [mousePos, setMousePos] = useState({ x: -200, y: -200 });
  const [isHovered, setIsHovered] = useState(false);
  const [isAnimationReady, setIsAnimationReady] = useState(false);
  const [transitionPhase, setTransitionPhase] = useState('idle'); // 'idle' | 'covering' | 'revealing'
  const containerRef = useRef(null);

  // Lock scroll on mount, restore on unmount
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // Unlock user input ONLY after all entrance animations complete (~2.2s)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimationReady(true);
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

  // Trigger blue curtain transition on PRESS ANY KEY or CLICK ANYWHERE
  const handleTrigger = () => {
    if (!isAnimationReady || transitionPhase !== 'idle') return;
    setTransitionPhase('covering');
  };

  useEffect(() => {
    const handleKeyDown = () => {
      handleTrigger();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isAnimationReady, transitionPhase]);

  // Track mouse position for the magnifying glass cursor
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      if (!isHovered) setIsHovered(true);
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isHovered]);

  const topMarqueeText = Array(6).fill("WELCOME TO MY PORTFOLIO /// SOFTWARE ENGINEER /// FRONTEND DEVELOPER /// BACKEND DEVELOPER /// CHRIS PRADAYANA /// ").join("");
  const bottomMarqueeText = Array(6).fill("/// PRESS ANY KEY OR CLICK ANYWHERE TO ENTER /// CREATIVE PROBLEM SOLVING /// INTUITIVE DESIGN /// CLEAN CODE /// ").join("");

  return (
    <>
      {/* ELECTRIC BLUE OVERLAY CURTAIN TRANSITION */}
      <AnimatePresence>
        {transitionPhase !== 'idle' && (
          <motion.div
            key="blue-curtain"
            initial={{ x: '-100%' }}
            animate={transitionPhase === 'covering' ? { x: '0%' } : { x: '100%' }}
            transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
            onAnimationComplete={() => {
              if (transitionPhase === 'covering') {
                setTransitionPhase('revealing');
                onContinue();
              }
            }}
            className="fixed inset-0 z-[100] bg-[#1929FE] pointer-events-none"
          />
        )}
      </AnimatePresence>

      <motion.div
        ref={containerRef}
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        onClick={handleTrigger}
        className={`fixed inset-0 z-50 flex flex-col justify-between overflow-hidden bg-white text-black select-none w-screen h-screen touch-none ${
          isAnimationReady ? 'cursor-pointer' : 'cursor-default'
        }`}
      >
        {/* Subtle Electric Blue Geometric Accents */}
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full border-2 border-dashed border-[#1929FE]/20 pointer-events-none animate-[spin_40s_linear_infinite]" />
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full border-2 border-dashed border-[#1929FE]/15 pointer-events-none animate-[spin_60s_linear_infinite_reverse]" />

        {/* 3. TOP RUNNING MARQUEE LABEL (ENTERING 3rd TOGETHER WITH BOTTOM MARQUEE AT DELAY 1.55s) */}
        <motion.div
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.65, delay: 1.55, ease: "easeOut" }}
          className="relative z-30 w-full bg-[#1929FE] text-white py-2.5 font-mono text-xs sm:text-sm font-black uppercase border-b-3 border-black tracking-widest overflow-hidden whitespace-nowrap shadow-md"
        >
          <motion.div
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
            className="inline-block whitespace-nowrap"
          >
            <span>{topMarqueeText}</span>
          </motion.div>
        </motion.div>

        {/* MAIN CONTENT CONTAINER */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 py-4 my-auto text-center flex flex-col items-center justify-center w-full">
          
          {/* 1. TITLE COMPONENT (ENTERING 1st AT DELAY 0.1s & 0.3s) */}
          <div className="w-full flex flex-col items-center justify-center leading-[0.88] tracking-tighter font-black uppercase overflow-hidden">
            {/* Line 1: Slide In From Left */}
            <motion.span
              initial={{ x: -160, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-[13vw] sm:text-[11vw] md:text-[10vw] text-black inline-block"
            >
              WELCOME TO
            </motion.span>

            {/* Line 2: Slide In From Right */}
            <motion.span
              initial={{ x: 160, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.75, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="text-[14vw] sm:text-[12vw] md:text-[11vw] text-[#1929FE] inline-block"
            >
              MY PORTFOLIO
            </motion.span>
          </div>

          {/* 2. SUBTITLE PLAIN TEXT PROMPT (ENTERING 2nd AT DELAY 0.95s) */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.95, ease: "easeOut" }}
            className="mt-12 sm:mt-16 text-xs sm:text-sm md:text-base font-mono uppercase tracking-[0.25em] text-slate-500 font-bold text-center"
          >
            PRESS ANY KEY OR CLICK ANYWHERE TO CONTINUE
          </motion.p>
        </div>

        {/* 3. BOTTOM RUNNING MARQUEE LABEL (ENTERING 3rd TOGETHER WITH TOP MARQUEE AT DELAY 1.55s) */}
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.65, delay: 1.55, ease: "easeOut" }}
          className="relative z-30 w-full bg-black text-white py-2.5 font-mono text-xs sm:text-sm font-black uppercase border-t-3 border-[#1929FE] tracking-widest overflow-hidden whitespace-nowrap shadow-inner"
        >
          <motion.div
            animate={{ x: ['-50%', '0%'] }}
            transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
            className="inline-block whitespace-nowrap text-[#1929FE]"
          >
            <span className="text-white">{bottomMarqueeText}</span>
          </motion.div>
        </motion.div>

        {/* MAGNIFYING GLASS BUBBLE CURSOR (Active when hovering) */}
        {isHovered && (
          <div
            style={{
              transform: `translate3d(${mousePos.x - 75}px, ${mousePos.y - 75}px, 0)`,
              pointerEvents: 'none',
              willChange: 'transform',
            }}
            className="fixed top-0 left-0 z-50 w-38 h-38 rounded-full
              bg-white/20
              backdrop-blur-[5px] backdrop-brightness-110 backdrop-contrast-150 backdrop-saturate-200
              border-3 border-[#1929FE]
              shadow-[inset_0_4px_14px_rgba(25,41,254,0.4),0_12px_30px_rgba(25,41,254,0.25)]
              transition-transform duration-75 ease-out flex items-center justify-center group"
          >
            {/* Glass Specular Glare */}
            <div className="absolute top-[8%] left-[12%] w-[45%] h-[25%] rounded-full bg-gradient-to-r from-white/90 via-white/50 to-transparent blur-[1px] transform -rotate-35" />
            
            {/* Secondary Glare */}
            <div className="absolute bottom-[12%] right-[15%] w-[30%] h-[15%] rounded-full bg-[#1929FE]/30 blur-[2px]" />

            {/* Magnifying Glass Handle Stem */}
            <div className="absolute -bottom-7 -right-7 w-4 h-12 rounded-full bg-gradient-to-b from-[#1929FE] via-slate-800 to-black shadow-lg transform rotate-45 border-2 border-black" />

            {/* Center Glass Reflection Ring */}
            <div className="w-full h-full rounded-full border border-[#1929FE]/30" />
          </div>
        )}
      </motion.div>
    </>
  );
}
