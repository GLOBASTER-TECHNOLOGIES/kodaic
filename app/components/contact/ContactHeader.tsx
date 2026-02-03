"use client";

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

// Ensure GSAP plugin is registered
if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}

const ContactHeader = () => {
  // 🔧 FIX HERE: HTMLSectionElement → HTMLElement
  const containerRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const eyebrowRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    // Initial Set
    gsap.set([eyebrowRef.current, headingRef.current, textRef.current], {
      y: 50,
      opacity: 0,
      skewY: 2,
    });

    // Sequence Animation
    tl.to(eyebrowRef.current, {
      y: 0,
      opacity: 1,
      skewY: 0,
      duration: 1.2,
    })
    .to(headingRef.current, {
      y: 0,
      opacity: 1,
      skewY: 0,
      duration: 1.5,
    }, "-=1.0")
    .to(textRef.current, {
      y: 0,
      opacity: 1,
      skewY: 0,
      duration: 1.2,
    }, "-=1.3");

  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef} 
      className="w-full h-screen px-6 bg-white flex items-center justify-center font-['Cabinet_Grotesk',sans-serif] overflow-hidden"
    >
      {/* Font Injection */}
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@800,700,500,400&display=swap');
      `}} />

      <div className="max-w-4xl mx-auto text-center">
        
        <div className="overflow-hidden mb-4">
          <span 
            ref={eyebrowRef} 
            className="block text-blue-600 font-bold tracking-[0.2em] uppercase text-sm"
          >
            Contact Us
          </span>
        </div>

        <div className="overflow-hidden mb-8">
          <h2 
            ref={headingRef} 
            className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-[#112D4E] tracking-tight leading-[0.95]"
          >
            Let&apos;s Build <br className="hidden md:block" />
            Something Great
          </h2>
        </div>

        <div className="overflow-hidden">
          <p 
            ref={textRef} 
            className="text-lg md:text-2xl text-slate-500 leading-relaxed max-w-3xl mx-auto font-medium"
          >
            Ready to start your project? Get in touch with our team to discuss your needs and 
            discover how we can help transform your business.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactHeader;
