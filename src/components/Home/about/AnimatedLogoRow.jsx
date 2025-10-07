// 🔹 AnimatedLogoRow.jsx
import React, { useRef, useEffect, useState } from "react";

function useInViewOnce(ref, rootMargin = "0px") {
  const [hasIntersected, setHasIntersected] = useState(false);

  useEffect(() => {
    if (!ref.current || hasIntersected) return; // stop kalau sudah muncul sekali
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasIntersected(true); // muncul sekali saja
          observer.disconnect(); // berhenti observasi
        }
      },
      { rootMargin }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, rootMargin, hasIntersected]);

  return hasIntersected;
}

const AnimatedLogoRow = ({ children, delayStart = 0 }) => {
  const rowRef = useRef(null);
  const inViewOnce = useInViewOnce(rowRef, "-100px");

  return (
    <div ref={rowRef} className={children.props.className}>
      {React.Children.map(children.props.children, (child, idx) =>
        React.cloneElement(child, {
          style: {
            transition:
              "opacity 0.5s cubic-bezier(.4,0,.2,1), transform 0.5s cubic-bezier(.4,0,.2,1)",
            transitionDelay: inViewOnce ? `${delayStart + idx * 0.15}s` : "0s",
            opacity: inViewOnce ? 1 : 0,
            transform: inViewOnce
              ? "scale(1) translateY(0)"
              : "scale(0.8) translateY(30px)",
            ...child.props.style,
          },
        })
      )}
    </div>
  );
};

export default AnimatedLogoRow;