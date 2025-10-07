import React, { useRef, useEffect, useState } from "react";

function useInView(ref, rootMargin = "0px") {
  const [isIntersecting, setIntersecting] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => setIntersecting(entry.isIntersecting),
      { rootMargin }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, rootMargin]);
  return isIntersecting;
}

const AnimatedLogoRow = ({ children, delayStart = 0 }) => {
  const rowRef = useRef(null);
  const inView = useInView(rowRef, "-100px");
  return (
    <div ref={rowRef} className={children.props.className}>
      {React.Children.map(children.props.children, (child, idx) =>
        React.cloneElement(child, {
          style: {
            transition: "opacity 0.5s cubic-bezier(.4,0,.2,1), transform 0.5s cubic-bezier(.4,0,.2,1)",
            transitionDelay: inView ? `${delayStart + idx * 0.15}s` : "0s",
            opacity: inView ? 1 : 0,
            transform: inView ? "scale(1) translateY(0)" : "scale(0.8) translateY(30px)",
            ...child.props.style,
          },
        })
      )}
    </div>
  );
};

export default AnimatedLogoRow;