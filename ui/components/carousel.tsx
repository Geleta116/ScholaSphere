// components/Carousel.tsx
"use client"

import { useEffect, useRef } from 'react';

const Carousel = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  let angle = 0;

  useEffect(() => {
    const interval = setInterval(() => {
      if (carouselRef.current) {
        angle += 120; // Rotate by 120 degrees for each item
        carouselRef.current.style.transform = `rotateY(${angle}deg)`;
      }
    }, 3000); // Rotate every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden perspective-1200">
      <div
        className="absolute w-full h-full transform-style-preserve-3d transition-transform duration-1000"
        ref={carouselRef}
      >
        <div className="absolute w-[560px] h-[315px] transform-style-preserve-3d">
          <iframe
            className="w-full h-full"
            width="560"
            height="315"
            src="https://www.youtube.com/embed/s2mYsPWzLjg?si=cHeK5uGLSILOyLih"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
        <div className="absolute w-[560px] h-[315px] transform-style-preserve-3d rotate-y-120 translate-z-600">
            
          <iframe
            className="w-full h-full"
            width="560"
            height="315"
            src="https://www.youtube.com/embed/s2mYsPWzLjg?si=cHeK5uGLSILOyLih"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
        <div className="absolute w-[560px] h-[315px] transform-style-preserve-3d rotate-y-240 translate-z-600">
          <iframe
            className="w-full h-full"
            width="560"
            height="315"
            src="https://www.youtube.com/embed/s2mYsPWzLjg?si=cHeK5uGLSILOyLih"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default Carousel;
