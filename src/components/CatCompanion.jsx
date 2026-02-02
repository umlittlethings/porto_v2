import { useState } from 'react'
import { motion } from 'framer-motion'
import { catReactionWords } from '../data/catReactions'

function CatCompanion() {
  const [isShocked, setIsShocked] = useState(false)
  const [bubbleText, setBubbleText] = useState(null)

  const handleClick = () => {
    setIsShocked(true)
    const word = catReactionWords[Math.floor(Math.random() * catReactionWords.length)]
    setBubbleText(word)
    setTimeout(() => setIsShocked(false), 600)
    setTimeout(() => setBubbleText(null), 1200)
  }

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-40 w-20 h-20 md:w-24 md:h-24 select-none cursor-pointer"
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
      onClick={handleClick}
    >
      {bubbleText && (
        <motion.div
          className="absolute right-full top-1/2 -translate-y-1/2 mr-2 px-3 py-1.5 rounded-2xl bg-white border-2 border-black/20 shadow-lg whitespace-nowrap text-sm md:text-base font-bold text-black/90"
          initial={{ opacity: 0, x: 8, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -4, scale: 0.9 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          style={{ transformOrigin: 'right center' }}
        >
          {bubbleText}

          <span
            className="absolute top-1/2 -translate-y-1/2 -right-2 w-0 h-0 border-l-[10px] border-white border-y-[8px] border-y-transparent"
            style={{ filter: 'drop-shadow(1px 0 0 rgba(0,0,0,0.08))' }}
          />
        </motion.div>
      )}

      {/* Idle bounce / shocked jump */}
      <motion.div
        className="relative w-full h-full"
        animate={
          isShocked
            ? { y: [0, -18, -8, 0], scale: [1, 1.15, 1.05, 1] }
            : { y: [0, -4, 0], scale: 1 }
        }
        transition={{
          duration: isShocked ? 0.6 : 2,
          repeat: isShocked ? 0 : Infinity,
          ease: isShocked ? 'easeOut' : 'easeInOut',
        }}
      >
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-lg"
        >
       
          <motion.path
            d="M 75 55 Q 95 45 90 65 Q 85 75 75 70 Q 80 60 75 55"
            fill="#f3f4f6"
            stroke="#000000"
            strokeWidth="1.5"
            strokeLinecap="round"
            animate={isShocked ? { rotate: 15 } : { rotate: [0, 8, -8, 0] }}
            transition={{
              duration: isShocked ? 0.1 : 1.5,
              repeat: isShocked ? 0 : Infinity,
              ease: 'easeInOut',
            }}
            style={{ transformOrigin: '75px 60px' }}
          />

          {/* Body - white */}
          <motion.ellipse
            cx="55"
            cy="65"
            rx="28"
            ry="22"
            fill="#ffffff"
            stroke="#000000"
            strokeWidth="2"
            animate={!isShocked ? { scaleY: [1, 1.02, 1] } : { scaleY: 1 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{ transformOrigin: '55px 65px' }}
          />

          {/* Belly patch - very light gray */}
          <ellipse cx="55" cy="68" rx="14" ry="10" fill="#000000" />

          {/* Head - white */}
          <motion.circle
            cx="55"
            cy="38"
            r="22"
            fill="#ffffff"
            stroke="#000000"
            strokeWidth="2"
            animate={!isShocked ? { scale: [1, 1.03, 1] } : { scale: 1 }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{ transformOrigin: '55px 38px' }}
          />

          {/* Left ear */}
          <path
            d="M 38 22 L 32 8 L 45 20 Z"
            fill="#ffffff"
            stroke="#000000"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          {/* Right ear */}
          <path
            d="M 72 22 L 78 8 L 65 20 Z"
            fill="#ffffff"
            stroke="#000000"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />

          {/* Left eye - normal blink / shocked = round wide */}
          <motion.ellipse
            cx="47"
            cy="35"
            rx="4"
            ry="5"
            fill="#1f2937"
            animate={
              isShocked
                ? { scale: 1.35 }
                : { scaleY: [1, 0.1, 1], scaleX: 1, y: [0, 2, 0] }
            }
            transition={{
              duration: isShocked ? 0.15 : 3,
              repeat: isShocked ? 0 : Infinity,
              repeatDelay: 2,
              ease: 'easeInOut',
            }}
            style={{ transformOrigin: '47px 35px' }}
          />
          {/* Right eye */}
          <motion.ellipse
            cx="63"
            cy="35"
            rx="4"
            ry="5"
            fill="#1f2937"
            animate={
              isShocked
                ? { scale: 1.35 }
                : { scaleY: [1, 0.1, 1], scaleX: 1, y: [0, 2, 0] }
            }
            transition={{
              duration: isShocked ? 0.15 : 3,
              repeat: isShocked ? 0 : Infinity,
              repeatDelay: 2,
              delay: 0.1,
              ease: 'easeInOut',
            }}
            style={{ transformOrigin: '63px 35px' }}
          />

          {/* Nose */}
          <path
            d="M 55 42 L 52 46 L 58 46 Z"
            fill="#f472b6"
          />

          {/* Whiskers - light gray */}
          <motion.g
            animate={!isShocked ? { x: [0, 1, 0] } : { x: 2 }}
            transition={{ duration: isShocked ? 0.1 : 2, repeat: isShocked ? 0 : Infinity, ease: 'easeInOut' }}
          >
            <line x1="28" y1="38" x2="42" y2="36" stroke="#000000" strokeWidth="0.8" strokeLinecap="round" />
            <line x1="28" y1="42" x2="42" y2="42" stroke="#000000" strokeWidth="0.8" strokeLinecap="round" />
            <line x1="28" y1="46" x2="42" y2="48" stroke="#000000" strokeWidth="0.8" strokeLinecap="round" />
          </motion.g>
          <motion.g
            animate={!isShocked ? { x: [0, -1, 0] } : { x: -2 }}
            transition={{ duration: isShocked ? 0.1 : 2, repeat: isShocked ? 0 : Infinity, ease: 'easeInOut' }}
          >
            <line x1="82" y1="38" x2="68" y2="36" stroke="#000000" strokeWidth="0.8" strokeLinecap="round" />
            <line x1="82" y1="42" x2="68" y2="42" stroke="#000000" strokeWidth="0.8" strokeLinecap="round" />
            <line x1="82" y1="46" x2="68" y2="48" stroke="#000000" strokeWidth="0.8" strokeLinecap="round" />
          </motion.g>
        </svg>
      </motion.div>
    </motion.div>
  )
}

export default CatCompanion
