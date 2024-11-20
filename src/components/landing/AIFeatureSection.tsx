import React, { useEffect, useRef } from "react";

export function AIFeatureSection() {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!textRef.current) return;
      
      const scrollPosition = window.scrollY;
      const elementPosition = textRef.current.offsetTop;
      const viewportHeight = window.innerHeight;
      
      // Calculate how far through the section we've scrolled (0 to 1)
      const progress = Math.max(0, Math.min(1, 
        (scrollPosition - elementPosition + viewportHeight) / viewportHeight
      ));

      // Apply the clip-path based on scroll progress
      textRef.current.style.clipPath = `inset(0 ${100 - (progress * 100)}% 0 0)`;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="w-full bg-black text-white">
      <div className="mx-auto max-w-[980px] px-5 lg:px-0">
        <div className="h-[1697.5px] relative">
          <div className="h-full relative flex items-center justify-center bg-black overflow-hidden">
            <div 
              ref={textRef}
              className="sticky top-0 z-[5] flex items-center h-[679px] bg-black pl-2.5 text-[50px] font-semibold"
              style={{
                background: "linear-gradient(to right, #fff, #fff)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                transition: "clip-path 0.1s ease-out"
              }}
            >
              Introducing Hire Hub, the mobile app that connects university
              students with startups. Students earn academic credit and gain
              real-world experience, while startups enjoy free access to
              university talent. Experience seamless collaboration and growth
              with Hire Hub.
            </div>
            <div
              className="absolute inset-0 z-[10] block h-full pointer-events-none"
              style={{
                backgroundImage:
                  "linear-gradient(rgb(0, 0, 0) 30%, rgb(53, 16, 115) 36%, rgb(201, 88, 222) 43%, rgb(251, 177, 247) 50%, rgb(201, 88, 222) 59%, rgb(53, 16, 115) 67%, rgb(0, 0, 0) 74%)",
                mixBlendMode: "darken",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}