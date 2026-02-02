import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const BlurText = ({
  text = '',
  delay = 200,
  className = '',
  animateBy = 'words',
  direction = 'top',
  stepDuration = 0.35
}) => {
  const elements = animateBy === 'words' ? text.split(' ') : text.split('');

  const defaultFrom = direction === 'top' 
    ? { filter: 'blur(10px)', opacity: 0, y: -50 } 
    : { filter: 'blur(10px)', opacity: 0, y: 50 };

  const defaultTo = [
    {
      filter: 'blur(5px)',
      opacity: 0.5,
      y: direction === 'top' ? 5 : -5
    },
    { filter: 'blur(0px)', opacity: 1, y: 0 }
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
    <p className={`blur-text ${className} flex flex-wrap justify-center`}>
      {elements.map((segment, index) => (
        <motion.span
          className="inline-block will-change-[transform,filter,opacity]"
          key={index}
          initial={defaultFrom}
          animate={animateKeyframes}
          transition={{
            duration: totalDuration,
            times,
            delay: (index * delay) / 1000
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
  
  const loadingTexts = ['/CREATE', '/IMAGINE', '/DELETE', '/READ'];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % loadingTexts.length);
    }, 800); // Lebih cepat dari 1800ms

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => {
        onLoadingComplete();
      }, 800);
    }, 3000); // Total loading lebih cepat dari 5000ms

    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center"
      initial={{ backgroundColor: '#1929FE' }}
      animate={isExiting ? { backgroundColor: '#ffffff' } : { backgroundColor: '#1929FE' }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
    >
      {/* Text Container */}
      <motion.div
        animate={isExiting ? { opacity: 0, scale: 0.9, y: -30 } : { opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <div className="h-28 md:h-36 flex items-center justify-center">
          {loadingTexts.map((text, index) => (
            <motion.div
              key={text}
              initial={{ opacity: 0, y: 20 }}
              animate={currentIndex === index ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="absolute"
            >
              <BlurText
                text={text}
                delay={80}
                animateBy="words"
                direction="top"
                className="text-6xl md:text-8xl font-bold text-white"
                stepDuration={0.15}
              />
            </motion.div>
          ))}
        </div>

        {/* Loading Indicator */}
        <motion.div
          className="mt-12 flex gap-2 justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-3 h-3 rounded-full bg-white"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.15
              }}
            />
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default LoadingScreen;