import { useEffect, useMemo, useRef, useState } from 'react'
import { Info, Pause, Play, RotateCcw, Shuffle } from 'lucide-react'
import SandboxShell from './SandboxShell'
import { ALGORITHMS } from './sortingAlgorithms'

const ACCENT = '#059669'

function randomArray(size) {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 95) + 5)
}

function AlgorithmVisualizer() {
  const [algo, setAlgo] = useState('bubble')
  const [size, setSize] = useState(18)
  const [speed, setSpeed] = useState(60)
  const [baseArray, setBaseArray] = useState(() => randomArray(18))
  const [showTutorial, setShowTutorial] = useState(true)

  const [frames, setFrames] = useState([])
  const [step, setStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const timerRef = useRef(null)

  useEffect(() => {
    const generated = ALGORITHMS[algo].fn(baseArray)
    setFrames(generated)
    setStep(0)
    setIsPlaying(false)
  }, [algo, baseArray])

  useEffect(() => {
    if (!isPlaying) return
    if (step >= frames.length - 1) {
      setIsPlaying(false)
      return
    }
    timerRef.current = setTimeout(() => {
      setStep((s) => Math.min(s + 1, frames.length - 1))
    }, speed)
    return () => clearTimeout(timerRef.current)
  }, [isPlaying, step, frames.length, speed])

  const current = frames[step] || { array: baseArray, comparing: [], swapping: [], sorted: [] }
  const maxVal = useMemo(() => Math.max(...baseArray, 1), [baseArray])

  const handlePlayPause = () => {
    if (step >= frames.length - 1) {
      setStep(0)
      setIsPlaying(true)
    } else {
      setIsPlaying((p) => !p)
    }
  }

  const handleReset = () => { setIsPlaying(false); setStep(0) }
  const handleShuffle = () => { setIsPlaying(false); setBaseArray(randomArray(size)) }
  const handleSizeChange = (val) => { setSize(val); setIsPlaying(false); setBaseArray(randomArray(val)) }

  const barColor = (index) => {
    if (current.sorted?.includes(index)) return ACCENT
    if (current.swapping?.includes(index)) return '#EF4444'
    if (current.comparing?.includes(index)) return '#F59E0B'
    return '#1929FE'
  }

  const progress = frames.length > 1 ? Math.round((step / (frames.length - 1)) * 100) : 0
  const isDone = step >= frames.length - 1 && frames.length > 0

  return (
    <SandboxShell
      title="Algorithm Visualizer"
      subtitle="Watch sorting algorithms work step by step."
      accent={ACCENT}
    >
      {/* Tutorial */}
      {showTutorial && (
        <div className="mb-8 border border-[#059669]/30 bg-[#059669]/5 rounded-xl p-5 relative">
          <button onClick={() => setShowTutorial(false)} className="absolute top-4 right-4 text-white/40 hover:text-white text-sm">✕</button>
          <div className="flex items-start gap-3">
            <Info size={20} className="text-[#059669] flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-Jakarta-Bold font-bold text-white mb-2">How to Use</h3>
              <ol className="text-white/60 text-sm space-y-1 list-decimal list-inside">
                <li>Select a sorting algorithm above (Bubble, Selection, Insertion, Quick, Merge)</li>
                <li>Click <strong className="text-white/80">Play</strong> to start the visualization</li>
                <li>Use <strong className="text-white/80">Shuffle</strong> to randomize a new dataset</li>
                <li>Adjust <strong className="text-white/80">Array size</strong> and <strong className="text-white/80">Speed</strong> as you like</li>
                <li>Watch the colors: <span className="text-[#F59E0B]">yellow</span> = comparing, <span className="text-[#EF4444]">red</span> = swapping, <span className="text-[#059669]">green</span> = sorted</li>
              </ol>
              <p className="text-white/40 text-xs mt-3">Tip: Try comparing Bubble Sort vs Quick Sort with array size 30+</p>
            </div>
          </div>
        </div>
      )}

      {/* Algorithm selector */}
      <div className="flex flex-wrap gap-3 mb-6">
        {Object.entries(ALGORITHMS).map(([key, { label }]) => (
          <button
            key={key}
            onClick={() => setAlgo(key)}
            className={`px-4 py-2 rounded-full border font-semibold text-sm md:text-base transition-all duration-200 ${
              algo === key
                ? 'bg-[#059669] text-white border-[#059669]'
                : 'bg-transparent text-white/60 border-white/20 hover:border-white/50'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Visualization */}
      <div className="border border-white/10 rounded-2xl p-4 md:p-6 bg-[#111118] mb-6">
        <div className="flex items-end justify-center gap-[2px] md:gap-1 h-[260px] md:h-[340px]">
          {current.array.map((val, i) => (
            <div
              key={i}
              className="flex-1 rounded-t-sm transition-all duration-150 ease-out flex items-end justify-center"
              style={{
                height: `${(val / maxVal) * 100}%`,
                backgroundColor: barColor(i),
                maxWidth: '48px',
              }}
            >
              {size <= 20 && (
                <span className="text-[9px] md:text-[11px] text-white font-semibold pb-1 select-none">
                  {val}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mb-6 text-sm">
        {[
          ['#1929FE', 'Unsorted'],
          ['#F59E0B', 'Comparing'],
          ['#EF4444', 'Swapping'],
          [ACCENT, 'Sorted'],
        ].map(([c, label]) => (
          <div key={label} className="flex items-center gap-2">
            <span className="w-4 h-4 rounded" style={{ backgroundColor: c }} />
            <span className="text-white/60 font-medium">{label}</span>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center gap-6">
        <div className="flex items-center gap-3">
          <button
            onClick={handlePlayPause}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#059669] text-white font-semibold hover:opacity-90 transition-opacity"
          >
            {isPlaying ? <Pause size={18} /> : <Play size={18} />}
            {isPlaying ? 'Pause' : isDone ? 'Replay' : 'Play'}
          </button>
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-5 py-3 rounded-full border border-white/20 text-white/70 font-semibold hover:border-white/50 hover:text-white transition-all duration-200"
          >
            <RotateCcw size={18} /> Reset
          </button>
          <button
            onClick={handleShuffle}
            className="flex items-center gap-2 px-5 py-3 rounded-full border border-white/20 text-white/70 font-semibold hover:border-white/50 hover:text-white transition-all duration-200"
          >
            <Shuffle size={18} /> Shuffle
          </button>
        </div>

        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-5">
          <label className="flex flex-col gap-1">
            <span className="text-sm font-semibold text-white/60">Array size: {size}</span>
            <input type="range" min="5" max="40" value={size} onChange={(e) => handleSizeChange(+e.target.value)} className="accent-[#059669]" />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-sm font-semibold text-white/60">Speed</span>
            <input type="range" min="5" max="200" value={205 - speed} onChange={(e) => setSpeed(205 - +e.target.value)} className="accent-[#059669]" />
          </label>
        </div>
      </div>

      {/* Status bar */}
      <div className="mt-6 flex items-center gap-4">
        <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
          <div className="h-full rounded-full transition-all duration-150" style={{ width: `${progress}%`, backgroundColor: ACCENT }} />
        </div>
        <span className="text-sm font-semibold text-white/50 whitespace-nowrap">
          {ALGORITHMS[algo].complexity} · {progress}%
        </span>
      </div>
    </SandboxShell>
  )
}

export default AlgorithmVisualizer
