import React, { useState, useEffect, useRef } from 'react'
import { ArrowRight, Search, X, ArrowLeft } from 'lucide-react'
import { motion } from 'framer-motion'
import { worksData } from '../data/worksData'
import { useNavigate } from 'react-router-dom'

function WorksPage() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [displayedCount, setDisplayedCount] = useState(4)
  const [visibleItems, setVisibleItems] = useState(new Set())
  const itemsPerPage = 4
  const itemRefs = useRef({})

  // Simulate loading dengan useEffect
  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800)
    return () => clearTimeout(timer)
  }, [])

  // Intersection Observer untuk lazy rendering
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleItems((prev) => new Set([...prev, entry.target.dataset.id]))
          }
        })
      },
      { threshold: 0.1 }
    )

    Object.values(itemRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [displayedCount])

  const handleLearnMore = (projectLink) => {
    navigate(projectLink)
  }

  // Filter projects berdasarkan search query
  const filteredProjects = worksData.filter((proj) =>
    proj.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    proj.desc.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Get displayed projects
  const displayedProjects = filteredProjects.slice(0, displayedCount)

  const handleLoadMore = () => {
    setDisplayedCount((prev) => Math.min(prev + itemsPerPage, filteredProjects.length))
  }

  const handleClearSearch = () => {
    setSearchQuery('')
    setDisplayedCount(4)
  }

  // Skeleton Loader Component
  const SkeletonLoader = () => (
    <div className="flex flex-col divide-y divide-black/10">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="flex flex-col md:flex-row md:items-center md:justify-between py-6 md:py-10 gap-4 md:gap-8 animate-pulse">
          <div className="flex items-start gap-3 md:gap-8">
            <div className="w-8 h-8 bg-black/10 rounded flex-shrink-0"></div>
            <div className="flex-1">
              <div className="h-8 bg-black/10 rounded w-3/4 mb-2"></div>
              <div className="h-6 bg-black/10 rounded w-1/2"></div>
            </div>
          </div>
          <div className="flex flex-row justify-between md:flex-col items-center md:items-end gap-3 md:gap-4 w-full md:w-auto">
            <div className="h-6 bg-black/10 rounded w-24"></div>
            <div className="h-10 bg-black/10 rounded-full w-28"></div>
          </div>
        </div>
      ))}
    </div>
  )

  return (
    <section className="min-h-screen px-7 md:px-30 py-10 md:py-24">
      {/* Back Button */}
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-2 mb-8 md:mb-12 text-black hover:opacity-70 transition-opacity"
      >
        <ArrowLeft size={20} /> Back to Home
      </button>

      {/* Header */}
      <div className="mb-12 md:mb-20">
        <img
          className="place-self-center mb-8 md:mb-12 w-[180px] md:w-[480px]"
          src="works/works.svg"
          alt="works"
        />
      </div>

      {/* Search Bar */}
      <div className="mb-12 md:mb-16">
        <div className="flex items-center gap-3 border-2 border-black rounded-full px-5 py-3 w-full">
          <Search size={20} className="text-black/60 flex-shrink-0" />
          <input
            type="text"
            placeholder="Search projects by title or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 outline-none text-lg placeholder:text-black/40 font-Jakarta-Medium"
          />
          {searchQuery && (
            <button
              onClick={handleClearSearch}
              className="p-1 hover:opacity-70 transition-opacity flex-shrink-0"
            >
              <X size={20} className="text-black/60" />
            </button>
          )}
        </div>
      </div>

      {/* Projects List */}
      {isLoading ? (
        <SkeletonLoader />
      ) : displayedProjects.length > 0 ? (
        <>
          <div className="flex flex-col divide-y divide-black/10">
            {displayedProjects.map((proj, index) => (
              <motion.div
                key={proj.id}
                ref={(el) => (itemRefs.current[proj.id] = el)}
                data-id={proj.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
                className="flex flex-col md:flex-row md:items-center md:justify-between py-6 md:py-10 gap-4 md:gap-8"
              >
                {/* Nomor dan judul */}
                <div className="flex items-start gap-3 md:gap-8">
                  <span className="text-sm md:text-lg font-semibold tracking-wider text-black/60 flex-shrink-0">
                    {proj.id}
                  </span>
                  <div>
                    <h3 className="font-Jakarta-Bold text-2xl md:text-3xl lg:text-4xl leading-snug font-extrabold">
                      {proj.title}
                    </h3>
                  </div>
                </div>

                {/* Tanggal dan tombol */}
                <div className="flex flex-row justify-between md:flex-col items-center md:items-end gap-3 md:gap-4 lg:gap-8 w-full md:w-auto flex-shrink-0">
                  <span className="text-base md:text-lg lg:text-xl font-medium text-black/80">
                    {proj.date}
                  </span>
                  <button
                    onClick={() => handleLearnMore(proj.link)}
                    className="border-2 border-black rounded-full px-4 py-1.5 md:px-6 md:py-2.5 flex items-center gap-2 font-semibold text-base md:text-lg hover:bg-black hover:text-white transition-all duration-300 whitespace-nowrap"
                  >
                    Learn More <ArrowRight size={18} className="md:w-5 md:h-5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Load More Button */}
          {displayedCount < filteredProjects.length && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex justify-center mt-12 md:mt-16"
            >
              <button
                onClick={handleLoadMore}
                className="border-2 border-black rounded-full px-8 py-3 font-semibold text-lg hover:bg-black hover:text-white transition-all duration-300"
              >
                Load More Projects
              </button>
            </motion.div>
          )}
        </>
      ) : isLoading ? null : (
        <div className="text-center py-16">
          <p className="text-2xl text-black/60 font-Jakarta-Medium mb-4">
            No projects found for "{searchQuery}"
          </p>
          <button
            onClick={handleClearSearch}
            className="border-2 border-black rounded-full px-6 py-2 font-semibold hover:bg-black hover:text-white transition-all duration-300"
          >
            Clear Search
          </button>
        </div>
      )}
    </section>
  )
}

export default WorksPage
