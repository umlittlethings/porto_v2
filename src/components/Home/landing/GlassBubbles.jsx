import React, { useEffect, useRef } from 'react';

export default function GlassBubbles() {
  const containerRef = useRef(null);
  const bubbleRef = useRef(null);
  const physicsRef = useRef({
    x: 50,
    y: 50,
    vx: 1.4,
    vy: 1.0,
    size: 240, // Large size for desktop, responsive scale applied via screen check
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animId;
    let width = container.clientWidth;
    let height = container.clientHeight;

    // Adjust size for smaller screen devices dynamically
    const updateDimensionsAndBounds = () => {
      if (!containerRef.current) return;
      width = containerRef.current.clientWidth;
      height = containerRef.current.clientHeight;

      const isMobile = width < 640;
      const bubbleSize = isMobile ? 150 : 250;
      physicsRef.current.size = bubbleSize;

      if (bubbleRef.current) {
        bubbleRef.current.style.width = `${bubbleSize}px`;
        bubbleRef.current.style.height = `${bubbleSize}px`;
      }

      // Clamp position inside bounds
      const p = physicsRef.current;
      if (p.x + bubbleSize > width) p.x = Math.max(0, width - bubbleSize);
      if (p.y + bubbleSize > height) p.y = Math.max(0, height - bubbleSize);
    };

    updateDimensionsAndBounds();

    // Initial position centered slightly off-center
    physicsRef.current.x = Math.max(20, (width - physicsRef.current.size) * 0.2);
    physicsRef.current.y = Math.max(20, (height - physicsRef.current.size) * 0.3);

    window.addEventListener('resize', updateDimensionsAndBounds);

    // Physics Animation Loop
    const updatePhysics = () => {
      if (!containerRef.current || !bubbleRef.current) return;
      const currentWidth = containerRef.current.clientWidth;
      const currentHeight = containerRef.current.clientHeight;
      const p = physicsRef.current;

      // Update position
      p.x += p.vx;
      p.y += p.vy;

      // Edge Bounce Mechanics (Left & Right)
      if (p.x <= 0) {
        p.x = 0;
        p.vx = Math.abs(p.vx);
      } else if (p.x + p.size >= currentWidth) {
        p.x = currentWidth - p.size;
        p.vx = -Math.abs(p.vx);
      }

      // Edge Bounce Mechanics (Top & Bottom)
      if (p.y <= 0) {
        p.y = 0;
        p.vy = Math.abs(p.vy);
      } else if (p.y + p.size >= currentHeight) {
        p.y = currentHeight - p.size;
        p.vy = -Math.abs(p.vy);
      }

      // Apply transform directly for smooth 60fps performance
      bubbleRef.current.style.transform = `translate3d(${p.x}px, ${p.y}px, 0)`;

      animId = requestAnimationFrame(updatePhysics);
    };

    animId = requestAnimationFrame(updatePhysics);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', updateDimensionsAndBounds);
    };
  }, []);

  // Click interaction: change direction & boost speed slightly
  const handleClick = () => {
    const p = physicsRef.current;
    p.vx = (p.vx > 0 ? -1 : 1) * (1.6 + Math.random() * 0.6);
    p.vy = (p.vy > 0 ? -1 : 1) * (1.6 + Math.random() * 0.6);
  };

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none z-15 overflow-hidden"
    >
      <div
        ref={bubbleRef}
        onClick={handleClick}
        style={{ willChange: 'transform' }}
        className="absolute top-0 left-0 rounded-full pointer-events-auto cursor-pointer select-none
          bg-gradient-to-br from-white/40 via-white/10 to-transparent
          backdrop-blur-xl backdrop-saturate-200
          border border-white/50
          shadow-[inset_0_6px_18px_rgba(255,255,255,0.85),inset_0_-8px_24px_rgba(0,0,0,0.3),0_20px_50px_rgba(0,0,0,0.25),0_0_40px_rgba(255,255,255,0.15)]
          hover:scale-105 transition-transform duration-300 ease-out group"
      >
        {/* Primary Specular Glare (Realistic top-left curved highlight) */}
        <div className="absolute top-[8%] left-[12%] w-[40%] h-[22%] rounded-full bg-gradient-to-r from-white/90 via-white/60 to-transparent blur-[1px] transform -rotate-30 group-hover:from-white group-hover:via-white/80 transition-colors" />

        {/* Top-Right subtle spot glare */}
        <div className="absolute top-[18%] right-[16%] w-[12%] h-[12%] rounded-full bg-white/60 blur-[1px]" />

        {/* Bottom Ambient Glow & Reflection */}
        <div className="absolute bottom-[10%] right-[14%] w-[35%] h-[15%] rounded-full bg-white/25 blur-[3px]" />

        {/* Inner Glass Contour Ring */}
        <div className="absolute inset-2 rounded-full border border-white/30 pointer-events-none" />
      </div>
    </div>
  );
}
