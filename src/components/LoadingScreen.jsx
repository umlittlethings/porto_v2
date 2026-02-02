import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

// Import BlurText component
const BlurText = ({ text = '', delay = 200, className = '', animateBy = 'words', direction = 'top', stepDuration = 0.35 }) => {
  const elements = animateBy === 'words' ? text.split(' ') : text.split('');
  
  const defaultFrom = direction === 'top'
    ? {
        filter: 'blur(15px)',
        opacity: 0,
        y: -80,
        scale: 0.5,
        rotateX: -45
      }
    : {
        filter: 'blur(15px)',
        opacity: 0,
        y: 80,
        scale: 0.5,
        rotateX: 45
      };

  const defaultTo = [
    {
      filter: 'blur(10px)',
      opacity: 0.3,
      y: direction === 'top' ? -30 : 30,
      scale: 0.7,
      rotateX: direction === 'top' ? -20 : 20
    },
    {
      filter: 'blur(5px)',
      opacity: 0.6,
      y: direction === 'top' ? 10 : -10,
      scale: 1.1,
      rotateX: 0
    },
    {
      filter: 'blur(2px)',
      opacity: 0.9,
      y: direction === 'top' ? -3 : 3,
      scale: 0.98,
      rotateX: 0
    },
    {
      filter: 'blur(0px)',
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0
    }
  ];

  const buildKeyframes = (from, steps) => {
    const keys = new Set([...Object.keys(from), ...steps.flatMap(s => Object.keys(s))]);
    const keyframes = {};
    keys.forEach(k => {
      keyframes[k] = [from[k], ...steps.map(s => s[k])];
    });
    return keyframes;
  };

  const animateKeyframes = buildKeyframes(defaultFrom, defaultTo);
  const stepCount = defaultTo.length + 1;
  const totalDuration = stepDuration * (stepCount - 1);
  const times = Array.from({ length: stepCount }, (_, i) => (stepCount === 1 ? 0 : i / (stepCount - 1)));

  return (
    <p className={`blur-text ${className} flex flex-wrap justify-center`} style={{ perspective: '1000px' }}>
      {elements.map((segment, index) => (
        <motion.span
          className="inline-block will-change-[transform,filter,opacity]"
          style={{ transformStyle: 'preserve-3d' }}
          key={index}
          initial={defaultFrom}
          animate={animateKeyframes}
          transition={{
            duration: totalDuration,
            times,
            delay: (index * delay) / 1000,
            ease: [0.34, 1.56, 0.64, 1]
          }}
        >
          {segment === ' ' ? '\u00A0' : segment}
          {animateBy === 'words' && index < elements.length - 1 && '\u00A0'}
        </motion.span>
      ))}
    </p>
  );
};

function LoadingScreen({ onLoadingComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  const loadingTexts = ['/CREATE', '/UPDATE', '/IMAGINE', '/REFACTOR', '/REARANGE', '/DELETE'];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % loadingTexts.length);
    }, 800);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => {
        onLoadingComplete();
      }, 800);
    }, 3000);

    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      initial={{ backgroundColor: '#1929FE' }}
      animate={
        isExiting
          ? { backgroundColor: '#ffffff' }
          : { backgroundColor: '#1929FE' }
      }
      transition={{ duration: 0.8, ease: 'easeInOut' }}
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 0.1
            }}
            animate={{
              y: [null, -100],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      {/* Text container */}
      <motion.div
        animate={
          isExiting
            ? {
                opacity: 0,
                scale: 0.8,
                y: -50,
                rotateX: 20,
                filter: 'blur(10px)'
              }
            : {
                opacity: 1,
                scale: 1,
                y: 0,
                rotateX: 0,
                filter: 'blur(0px)'
              }
        }
        transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
        className="text-center relative z-10 w-full h-full flex items-center justify-center px-4"
        style={{ perspective: '1000px' }}
      >
        {loadingTexts.map((text, index) => (
          <motion.div
            key={text}
            initial={{ opacity: 0, y: 30, scale: 0.9, rotateX: 45 }}
            animate={
              currentIndex === index
                ? {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    rotateX: 0,
                    filter: 'blur(0px)'
                  }
                : {
                    opacity: 0,
                    y: -30,
                    scale: 0.9,
                    rotateX: -45,
                    filter: 'blur(5px)'
                  }
            }
            exit={{
              opacity: 0,
              y: -30,
              scale: 0.9,
              rotateX: -45
            }}
            transition={{
              duration: 0.5,
              ease: [0.34, 1.56, 0.64, 1]
            }}
            className="absolute"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <BlurText
              text={text}
              delay={60}
              animateBy="words"
              direction="top"
              className="text-[20vw] sm:text-[18vw] md:text-[16vw] lg:text-[14vw] font-bold text-white leading-none whitespace-nowrap"
              stepDuration={0.12}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Progress bar - separate from text container */}
      <motion.div
        className="absolute bottom-8 sm:bottom-12 left-1/2 transform -translate-x-1/2 w-64 sm:w-80 md:w-96 h-1 bg-white/20 rounded-full overflow-hidden z-20"
        initial={{ opacity: 0, scaleX: 0 }}
        animate={isExiting ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <motion.div
          className="h-full bg-white rounded-full"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 3, ease: 'easeInOut' }}
        />
      </motion.div>
    </motion.div>
  );
}

export default LoadingScreen;