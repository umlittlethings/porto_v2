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

  // 🔹 Title unik per card kanan
  const titleImages = [
    "expert/expert details/titleft.svg",
    "expert/expert details/titlemd.svg",
    "expert/expert details/titlepd.svg",
  ];

  const cardContent = [
    `I love building websites that look great and work even better! Turning ideas into smooth, user-friendly experiences is what I enjoy most. Still brushing up on my backend skills (we’re getting there), but front-end is where I’m most at home.
    This is my main focus: creating clean, responsive interfaces that feel intuitive and actually help users get things done. Whether it’s a landing page, a web app, or something experimental, I aim to make it both usable and visually solid.`,
    'I love crafting mobile apps that feel intuitive and responsive across different devices. For me, it’s all about turning complex interactions into simple, meaningful experiences — whether it’s managing data, integrating APIs, or polishing animations that make an app come alive. I focus on building clean, maintainable codebases while ensuring the design feels native to the platform, so users can just dive in and use it effortlessly.',
    'I’m passionate about designing products that balance aesthetics with functionality. My process always starts with understanding user needs — translating insights into wireframes, prototypes, and interfaces that make sense and feel natural. I enjoy shaping systems that not only look cohesive but also tell a clear story through design. Every detail matters, from visual hierarchy to micro-interactions that enhance the overall experience.'  ];

  // 🔹 Perhitungan elemen tengah viewport
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

    handleScroll(); // Jalankan sekali saat load
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      <div className="flex gap-8 px-50 py-10 pt-20">
        {/* 🔹 KIRI: Box Highlight */}
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

        {/* 🔹 KANAN: Card Section */}
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
              <div className="relative px-4 py-5 border-2 overflow-hidden max-w-130 rounded-2xl backdrop-blur-sm shadow-lg">
                {/* 🔸 Title unik */}
                <img
                  className="h-auto object-contain relative z-10"
                  src={titleImages[i]}
                  alt={`title-${i}`}
                />

                {/* 🔸 Background pattern halus */}
                <div className="absolute inset-0 -z-10 pointer-events-none opacity-5">
                  {[...Array(4)].map((_, j) => (
                    <img
                      key={j}
                      className="h-auto object-contain"
                      src={titleImages[i]}
                      alt=""
                    />
                  ))}
                </div>

                {/* 🔸 Text konten */}
                <p className="relative z-20 mt-9 text-xl text-justify max-w-130 font-Jakarta-Medium leading-relaxed ">
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