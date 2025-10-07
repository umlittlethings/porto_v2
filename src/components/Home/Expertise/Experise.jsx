import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";

function Expertise() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRefs = useRef([]);

  const boxImages = [
    "expert/fullstack.svg",
    "expert/Group 6.svg",
    "expert/Vector.svg",
  ];

  const cardContent = [
    `I love building websites that look great and work even better! Turning ideas into smooth, user-friendly experiences is what I enjoy most. Still brushing up on my backend skills (we’re getting there 😅), but front-end is where I’m most at home.
    This is my main focus: creating clean, responsive interfaces that feel intuitive and actually help users get things done. Whether it’s a landing page, a web app, or something experimental, I aim to make it both usable and visually solid.`,
    `I enjoy designing digital experiences that connect users with products seamlessly. My focus lies in delivering user-centered interfaces backed by strong usability and consistency. Every project teaches me how to make design serve functionality better.`,
    `I’m also diving deeper into modern front-end tools and reactive patterns. My goal is to combine performance, accessibility, and aesthetic balance to create experiences that truly stand out and remain maintainable.`,
  ];

  useEffect(() => {
    const handleScroll = () => {
      const viewportCenter = window.innerHeight / 2;

      let closestIndex = 0;
      let smallestDistance = Infinity;

      sectionRefs.current.forEach((el, i) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const elementCenter = rect.top + rect.height / 2;
        const distance = Math.abs(elementCenter - viewportCenter);
        if (distance < smallestDistance) {
          smallestDistance = distance;
          closestIndex = i;
        }
      });

      setActiveIndex(closestIndex);
    };

    handleScroll(); // jalankan sekali saat load
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      <div className="flex gap-8 px-50 py-10">
        {/* KIRI */}
        <div className="flex-shrink-0 sticky top-20 self-start flex flex-col items-center space-y-6 pr-20">
          {boxImages.map((src, i) => (
            <motion.img
              key={i}
              src={src}
              alt=""
              className="transition-all duration-500"
              animate={{
                opacity: activeIndex === i ? 1 : 0.1,
                scale: activeIndex === i ? 1.15 : 1,
                filter:
                  activeIndex === i
                    ? "drop-shadow(0 0 10px rgba(255,255,255,0.7))"
                    : "none",
              }}
              transition={{ duration: 0.4 }}
            />
          ))}
        </div>

        {/* KANAN */}
        <div className="flex-1 space-y-10">
          {cardContent.map((text, i) => (
            <motion.div
              key={i}
              ref={(el) => (sectionRefs.current[i] = el)}
              initial={{ opacity: 0, y: 50 }}
              animate={
                activeIndex === i
                  ? { opacity: 1, y: 0, scale: 1 }
                  : { opacity: 0, y: 50, scale: 0.98 }
              }
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="relative px-4 py-5 border-2 overflow-hidden max-w-130">
                <img
                  className="h-auto object-contain relative z-10"
                  src="expert/expert details/titleft.svg"
                  alt=""
                />
                <div className="absolute inset-0 -z-10 pointer-events-none">
                  {[...Array(4)].map((_, j) => (
                    <img
                      key={j}
                      className="opacity-5 h-auto object-contain"
                      src="expert/expert details/titleft.svg"
                      alt=""
                    />
                  ))}
                </div>
                <p className="relative z-20 mt-9 text-xl text-justify max-w-130 font-Jakarta-Medium">
                  {text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Expertise;