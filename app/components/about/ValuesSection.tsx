"use client";

import React, { useRef } from 'react';
import { Target, Users, Lightbulb } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP Plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

const values = [
  {
    icon: Target,
    title: "Excellence",
    description: "We deliver nothing less than exceptional quality in every project we undertake, ensuring precision in every pixel and line of code.",
    color: "text-blue-600",
    bg: "bg-blue-50"
  },
  {
    icon: Users,
    title: "Collaboration",
    description: "We work as partners with our clients, ensuring their vision drives every decision and fostering open, transparent communication.",
    color: "text-blue-600",
    bg: "bg-blue-50"
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "We embrace emerging technologies to provide cutting-edge solutions that keep your business ahead of the curve.",
    color: "text-blue-600",
    bg: "bg-blue-50"
  }
];

const ValuesSection = () => {
  // ✅ FIXED: Changed HTMLSectionElement to HTMLElement
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // 1. Initial State: Hide everything slightly down
    gsap.set([".header-reveal", ".value-card"], {
      y: 50,
      opacity: 0
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%", 
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      }
    });

    // 2. Animate Header IN
    tl.to(".header-reveal", {
      y: 0,
      opacity: 1,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out"
    });

    // 3. Animate Cards IN
    tl.to(".value-card", {
      y: 0,
      opacity: 1,
      duration: 1,
      stagger: 0.15,
      ease: "power4.out"
    }, "-=0.6");

  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef} 
      className="relative w-full py-20 md:py-32 px-6 md:px-12 bg-white flex justify-center overflow-hidden font-['Cabinet_Grotesk',sans-serif]"
    >
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@800,700,500,400&display=swap');
      `}} />

      <div className="max-w-7xl w-full">
        
        {/* --- HEADER --- */}
        <div className="text-center mb-16 md:mb-24 space-y-4">
          <h2 className="header-reveal text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#112D4E] tracking-tight">
            What Drives Us <span className="text-[#3B82F6]">Forward</span>
          </h2>
          <p className="header-reveal text-lg md:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
            The principles that guide every decision we make and every solution we deliver
          </p>
        </div>

        {/* --- CARDS GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((item, index) => (
            <div 
              key={index} 
              className="value-card group relative p-8 md:p-10 bg-white rounded-[2rem] border border-slate-100 hover:border-blue-100 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-15px_rgba(59,130,246,0.1)] transition-all duration-500 ease-out"
            >
              <div className={`w-14 h-14 rounded-2xl ${item.bg} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500`}>
                <item.icon className={`w-7 h-7 ${item.color}`} strokeWidth={2} />
              </div>

              <h3 className="text-2xl font-bold text-[#112D4E] mb-4 group-hover:text-[#3B82F6] transition-colors duration-300">
                {item.title}
              </h3>
              
              <p className="text-slate-500 leading-relaxed text-base md:text-lg">
                {item.description}
              </p>

              <div className="absolute bottom-0 left-10 right-10 h-[3px] bg-[#3B82F6] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-t-full"></div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ValuesSection;