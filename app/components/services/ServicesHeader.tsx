"use client";

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const ServicesHeader = () => {
  const containerRef = useRef<HTMLElement>(null);
  
  // Refs for animation targets
  const eyebrowRef = useRef<HTMLSpanElement>(null);
  const headingLine1Ref = useRef<HTMLHeadingElement>(null);
  const headingLine2Ref = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    // 1. Initial Set (Ensure they are hidden below the mask)
    gsap.set([headingLine1Ref.current, headingLine2Ref.current], { y: "100%" });
    gsap.set([eyebrowRef.current, descRef.current], { y: 20, opacity: 0 });

    // 2. Animation Sequence
    tl.to(eyebrowRef.current, {
      y: 0,
      opacity: 1,
      duration: 1,
      delay: 0.2
    })
    .to([headingLine1Ref.current, headingLine2Ref.current], {
      y: "0%",
      duration: 1.5,
      stagger: 0.15, // The second line comes in slightly later
    }, "-=0.8") // Overlap with previous animation
    .to(descRef.current, {
      y: 0,
      opacity: 1,
      duration: 1,
    }, "-=1.2");

  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-screen px-6 bg-white flex items-center justify-center font-['Cabinet_Grotesk',sans-serif] overflow-hidden"
    >
      {/* --- FONT IMPORT --- */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @import url('https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@800,700,500,400&display=swap');
        `}} 
      />

      {/* --- AMBIENT BACKGROUND (Subtle Moving Blob) --- */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-100/30 rounded-full blur-[100px] pointer-events-none animate-pulse" />

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        
        {/* 1. EYEBROW */}
        <div className="overflow-hidden mb-6">
          <span 
            ref={eyebrowRef}
            className="block text-blue-600 font-bold tracking-[0.2em] uppercase text-sm"
          >
            Our Services
          </span>
        </div>

        {/* 2. MAIN HEADING (Masked Reveal) */}
        {/* We split the text into two lines with overflow-hidden to create the 'rising' effect */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-[#112D4E] mb-8 tracking-tight leading-[0.9]">
          <div className="overflow-hidden">
            <div ref={headingLine1Ref} className="pb-2">End&ndash;to&ndash;End</div>
          </div>
          <div className="overflow-hidden">
            <div ref={headingLine2Ref} className="pb-2 text-transparent bg-clip-text bg-gradient-to-r from-[#112D4E] to-blue-600">
              Tech Solutions
            </div>
          </div>
        </h1>

        {/* 3. SUBTEXT */}
        <p 
          ref={descRef}
          className="text-lg md:text-2xl text-slate-500 leading-relaxed max-w-3xl mx-auto font-medium"
        >
          From cloud infrastructure to AI-powered applications, we deliver comprehensive 
          solutions that drive digital transformation and business growth.
        </p>

      </div>
    </section>
  );
};

export default ServicesHeader;