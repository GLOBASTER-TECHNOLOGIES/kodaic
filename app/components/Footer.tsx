"use client";

import React, { useRef } from "react";
import { Hexagon, Mail, Linkedin, ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const footerRef = useRef<HTMLElement>(null);
  
  // Refs for GSAP quickSetters
  const xTo = useRef<any>();
  const yTo = useRef<any>();

  useGSAP(() => {
    // 1. Content Entrance
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      }
    });

    tl.fromTo(".footer-content", 
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power2.out" }
    );

    // 2. Spotlight Physics (Adjusted for "Heavy" feel)
    // duration: 0.6 creates that slight "Sheryians" lag/drag effect
    xTo.current = gsap.quickTo(footerRef.current, "--x", { duration: 0.6, ease: "power4.out" });
    yTo.current = gsap.quickTo(footerRef.current, "--y", { duration: 0.6, ease: "power4.out" });

  }, { scope: footerRef });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!footerRef.current || !xTo.current || !yTo.current) return;
    const { left, top } = footerRef.current.getBoundingClientRect();
    xTo.current(e.clientX - left);
    yTo.current(e.clientY - top);
  };

  const handleMouseEnter = () => {
    gsap.to(".spotlight-layer", { opacity: 1, duration: 0.3 });
  };

  const handleMouseLeave = () => {
    gsap.to(".spotlight-layer", { opacity: 0, duration: 0.3 });
  };

  return (
    <footer 
      ref={footerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative bg-[#112D4E] text-white font-sans overflow-hidden border-t border-white/10 min-h-screen flex flex-col justify-between"
    >
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@800,700,500,400&display=swap');
      `}} />

      {/* --- CONTENT SECTION --- */}
      <div className="relative z-30 mx-auto max-w-7xl px-6 pt-20 lg:px-8 w-full font-['Cabinet_Grotesk',sans-serif] pointer-events-none">
        
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 lg:gap-16 mb-12 md:mb-24">
          
          {/* Brand */}
          <div className="footer-content space-y-6 pointer-events-auto">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/10 rounded-lg border border-white/20">
                <Hexagon className="h-6 w-6 text-white fill-white/20" strokeWidth={2} />
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-white">Kodia</h2>
            </div>
            <p className="text-base leading-relaxed max-w-sm text-blue-100/70">
              Building reliable, scalable digital solutions with clean design and solid engineering principles.
            </p>
          </div>

          {/* Navigation */}
          <div className="footer-content pointer-events-auto">
            <h3 className="text-sm font-bold uppercase tracking-widest text-white/50 mb-6">Company</h3>
            <ul className="space-y-4">
              {['About', 'Services', 'Projects', 'Contact'].map((item) => (
                <li key={item}>
                  <a href={`/${item.toLowerCase()}`} className="group inline-flex items-center gap-2 hover:text-white transition-all duration-300 text-blue-100/70">
                    <span className="text-base font-medium">{item}</span>
                    <ArrowUpRight className="h-4 w-4 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div className="footer-content pointer-events-auto">
            <h3 className="text-sm font-bold uppercase tracking-widest text-white/50 mb-6">Connect</h3>
            <ul className="space-y-4">
              <li>
                <a href="mailto:hello@kodia.in" className="group flex items-center gap-3 hover:text-white transition-colors duration-300 text-blue-100/70">
                  <div className="p-2 rounded-full bg-white/5 group-hover:bg-white/20 transition-colors">
                    <Mail className="h-4 w-4" />
                  </div>
                  <span className="font-medium">hello@kodia.in</span>
                </a>
              </li>
              <li>
                <a href="#" className="group flex items-center gap-3 hover:text-white transition-colors duration-300 text-blue-100/70">
                  <div className="p-2 rounded-full bg-white/5 group-hover:bg-[#0077b5] transition-colors">
                    <Linkedin className="h-4 w-4" />
                  </div>
                  <span className="font-medium">LinkedIn</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Metadata */}
        <div className="footer-content pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm font-medium text-blue-100/50 pb-20 pointer-events-auto">
          <p>© {currentYear} Kodia. All rights reserved.</p>
          <div className="flex items-center gap-8">
            <a href="/privacy" className="hover:text-white transition-colors">Privacy</a>
            <a href="/terms" className="hover:text-white transition-colors">Terms</a>
          </div>
        </div>
      </div>


      {/* Layer 1: Ghostly Outline (Always Visible) */}
      <div className="absolute inset-0 z-10 flex items-end justify-center overflow-hidden pointer-events-none pb-10">
        <h1 
          className="font-['Cabinet_Grotesk'] font-extrabold text-[22vw] leading-[0.8] tracking-tighter uppercase whitespace-nowrap select-none text-transparent opacity-20"
          style={{ WebkitTextStroke: '2px rgba(255, 255, 255, 0.1)' }}
        >
          Kodaic
        </h1>
      </div>

      {/* Layer 2: The Spotlight Reveal */}
      <div 
        className="spotlight-layer absolute inset-0 z-20 flex items-end justify-center overflow-hidden pointer-events-none pb-10 opacity-0"
        style={{
          maskImage: `radial-gradient(circle 350px at calc(var(--x) * 1px) calc(var(--y) * 1px), black 20%, transparent 100%)`,
          WebkitMaskImage: `radial-gradient(circle 350px at calc(var(--x) * 1px) calc(var(--y) * 1px), black 20%, transparent 100%)`,
        }}
      >
        
        <h1 className="font-['Cabinet_Grotesk'] font-extrabold text-[22vw] leading-[0.8] tracking-tighter uppercase whitespace-nowrap select-none text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.5)]">
          Kodaic
        </h1>
      </div>

    </footer>
  );
};

export default Footer;