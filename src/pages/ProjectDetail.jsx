import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { worksData } from '../data/worksData'

function ProjectDetail() {
  const { projectId } = useParams()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)

  // Simulate loading dengan useEffect
  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800)
    return () => clearTimeout(timer)
  }, [projectId])

  // Find project by link.route
  const project = worksData.find(proj => {
    const route = typeof proj.link === 'string' ? proj.link : proj.link?.route
    return route === `/works/${projectId}`
  })

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center px-7">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
          <button
            onClick={() => navigate('/works')}
            className="text-blue-600 hover:underline"
          >
            Back to Works
          </button>
        </div>
      </div>
    )
  }

  // Skeleton Loader Component
  const SkeletonLoader = () => (
    <section className="min-h-screen px-7 md:px-30 py-10 md:py-24">
      {/* Back Button Skeleton */}
      <div className="flex items-center gap-2 mb-8 md:mb-12 h-6 w-40 bg-black/10 rounded animate-pulse"></div>

      {/* Project Header Skeleton */}
      <div className="mb-12 md:mb-16 animate-pulse">
        <div className="mb-8">
          <div className="h-12 bg-black/10 rounded w-3/4 mb-4"></div>
          <div className="h-6 bg-black/10 rounded w-1/3"></div>
        </div>
      </div>

      {/* Project Description Skeleton */}
      <div className="mb-12 md:mb-16 w-full animate-pulse">
        <div className="space-y-6">
          <div className="h-5 bg-black/10 rounded w-full"></div>
          <div className="h-5 bg-black/10 rounded w-full"></div>
          <div className="h-5 bg-black/10 rounded w-full"></div>
          <div className="h-5 bg-black/10 rounded w-2/3"></div>
        </div>
      </div>

      {/* Tech Stack Skeleton */}
      <div className="mb-12 md:mb-16 animate-pulse">
        <div className="h-8 bg-black/10 rounded w-32 mb-6"></div>
        <div className="flex gap-6 flex-wrap">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-20 h-20 md:w-24 md:h-24 bg-black/10 rounded-lg"></div>
          ))}
        </div>
      </div>
    </section>
  )

  return (
    <>
      {isLoading ? (
        <SkeletonLoader />
      ) : (
    <section className="min-h-screen px-7 md:px-30 py-10 md:py-24">
      {/* Back Button */}
      <button
        onClick={() => navigate('/works')}
        className="flex items-center gap-2 mb-8 md:mb-12 text-black hover:opacity-70 transition-opacity"
      >
        <ArrowLeft size={20} /> Back to Works
      </button>

      {/* Project Header */}
      <div className="mb-12 md:mb-16">
        <div className="mb-8">
          <h1 className="font-Jakarta-Bold text-4xl md:text-5xl lg:text-6xl leading-tight font-extrabold mb-4">
            {project.title}
          </h1>
          <p className="text-lg md:text-xl text-black/70">
            {project.date}
          </p>
        </div>
      </div>

      {/* Project Main Image(s) - support single atau multiple images */}
      {project.mainImage && (
        <div className="mb-12 md:mb-20 space-y-6 md:space-y-8">
          {(Array.isArray(project.mainImage) ? project.mainImage : [project.mainImage]).map((image, index) => (
            <div key={index} className="rounded-2xl shadow-2xl">
              <img 
                src={image} 
                alt={`${project.title} - Image ${index + 1}`}
                className="w-full h-auto object-cover rounded-2xl"
              />
            </div>
          ))}
        </div>
      )}

      {/* Project Description - full width, paragraf terpisah */}
      <div className="mb-12 md:mb-16 w-full">
        <div className="space-y-6 text-lg md:text-xl leading-relaxed text-justify font-Jakarta-Medium text-black/80">
          {(Array.isArray(project.desc) ? project.desc : [project.desc]).map((paragraph, i) => (
            <p key={i} className="first:mt-0 last:mb-0">
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      {/* GitHub Link Button - di tengah (pakai field link.github) */}
      {project.link && typeof project.link === 'object' && project.link.github && (
        <div className="flex justify-center mb-12 md:mb-16">
          <a
            href={project.link.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border-2 border-black rounded-full px-6 md:px-8 py-3 md:py-4 font-semibold text-base md:text-lg hover:bg-black hover:text-white transition-all duration-300"
          >
            Check it out <ArrowRight size={20} className="md:w-5 md:h-5" />
          </a>
        </div>
      )}

      {/* Tech Stack */}
      <div className="mb-12 md:mb-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 font-Jakarta-Bold">
          Tech Stack
        </h2>
        <div className="flex gap-6 flex-wrap">
          {project.techStack.map((tech, idx) => (
            <div key={idx} className="flex items-center justify-center w-20 h-20 md:w-24 md:h-24 bg-black/5 rounded-lg">
              <img src={tech} alt="tech" className="w-12 h-12 md:w-14 md:h-14 object-contain" />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center py-8 border-t border-black/10">
        <button
          onClick={() => navigate('/works')}
          className="text-lg font-semibold hover:opacity-70 transition-opacity"
        >
          ← Back to Works
        </button>
      </div>
    </section>
      )}
    </>
  )
}

export default ProjectDetail
