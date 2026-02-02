import { motion } from 'framer-motion';
import { useEffect, useRef, useState, useMemo } from 'react';

const buildKeyframes = (from, steps) => {
  const keys = new Set([...Object.keys(from), ...steps.flatMap(s => Object.keys(s))]);
  const keyframes = {};
  keys.forEach(k => {
    keyframes[k] = [from[k], ...steps.map(s => s[k])];
  });
  return keyframes;
};

const BlurText = ({
  text = '',
  delay = 200,
  className = '',
  animateBy = 'words',
  direction = 'top',
  threshold = 0.1,
  rootMargin = '0px',
  animationFrom,
  animationTo,
  easing = t => t,
  onAnimationComplete,
  stepDuration = 0.35,
  shouldAnimate = true
}) => {
  const elements = animateBy === 'words' ? text.split(' ') : text.split('');
  const [inView, setInView] = useState(shouldAnimate ? true : false);
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current || shouldAnimate === false) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(ref.current);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold, rootMargin, shouldAnimate]);

  // Animasi masuk yang lebih keren dengan efek 3D dan bounce
  const defaultFrom = useMemo(
    () => direction === 'top'
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
        },
    [direction]
  );

  // Step animasi yang lebih smooth dan dinamis
  const defaultTo = useMemo(
    () => [
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
    ],
    [direction]
  );

  const fromSnapshot = animationFrom ?? defaultFrom;
  const toSnapshots = animationTo ?? defaultTo;
  const stepCount = toSnapshots.length + 1;
  const totalDuration = stepDuration * (stepCount - 1);
  const times = Array.from({ length: stepCount }, (_, i) =>
    stepCount === 1 ? 0 : i / (stepCount - 1)
  );

  return (
    <p
      ref={ref}
      className={`blur-text ${className} flex flex-wrap justify-center`}
      style={{ perspective: '1000px' }}
    >
      {elements.map((segment, index) => {
        const animateKeyframes = buildKeyframes(fromSnapshot, toSnapshots);
        const spanTransition = {
          duration: totalDuration,
          times,
          delay: (index * delay) / 1000,
          ease: easing || [0.34, 1.56, 0.64, 1] // Bounce easing
        };

        return (
          <motion.span
            className="inline-block will-change-[transform,filter,opacity]"
            style={{ transformStyle: 'preserve-3d' }}
            key={index}
            initial={fromSnapshot}
            animate={inView ? animateKeyframes : fromSnapshot}
            transition={spanTransition}
            onAnimationComplete={
              index === elements.length - 1 ? onAnimationComplete : undefined
            }
          >
            {segment === ' ' ? '\u00A0' : segment}
            {animateBy === 'words' && index < elements.length - 1 && '\u00A0'}
          </motion.span>
        );
      })}
    </p>
  );
};

export default BlurText;