"use client";

import React, { useRef } from "react";
import { Code2, Cpu, Globe, Layers, ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

const services = [
  {
    id: "01",
    title: "Engineering",
    subtitle: "& Architecture",
    description: "Architecting scalable ecosystems. From microservices to monolithic migrations, building the backbone of your business logic.",
    tags: ["System Design", "Microservices", "Scalability"],
    icon: Layers,
  },
  {
    id: "02",
    title: "Intelligent",
    subtitle: "AI Systems",
    description: "Turning raw data into actionable intelligence via LLMs and predictive models. Automation that drives decision-making.",
    tags: ["LLM Integration", "Predictive Analytics", "Automation"],
    icon: Cpu,
  },
  {
    id: "03",
    title: "Cloud",
    subtitle: "Infrastructure",
    description: "Robust, secure, auto-scaling environments. Ensuring your application performs impeccably under any load.",
    tags: ["AWS / Azure", "Kubernetes", "DevOps"],
    icon: Globe,
  },
  {
    id: "04",
    title: "Product",
    subtitle: "Development",
    description: "Full-cycle creation from the first line of code to deployment. Strict agile methodologies and rapid iteration cycles.",
    tags: ["React / Next.js", "Mobile Apps", "MVP to Scale"],
    icon: Code2,
  },
];

const ServiceStack = () => {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const cards = gsap.utils.toArray<HTMLElement>(".parallax-card");

    cards.forEach((card, i) => {
      const scaleBase = 1 - (cards.length - i) * 0.05;

      ScrollTrigger.create({
        trigger: card,
        start: "top top+=120", // Offset to stack visibly below header
        end: "bottom top", 
        pin: true, 
        pinSpacing: false, 
        scrub: true,
        animation: gsap.to(card, {
          scale: scaleBase, 
          opacity: 0.4,
          filter: "blur(4px)", // Blur old cards for depth
          transformOrigin: "center top",
          ease: "none"
        })
      });
    });
  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef} 
      className="relative w-full bg-[#020617] font-['Cabinet_Grotesk',sans-serif] pt-24 pb-40"
    >
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@800,700,500,400&display=swap');
        .bg-grid { background-image: linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px); background-size: 60px 60px; }
      `}} />

      {/* --- BACKGROUND AMBIENCE --- */}
      <div className="absolute inset-0 bg-grid pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-[#020617] to-transparent z-10" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        
        {/* --- HEADER --- */}
        <div className="mb-32 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-mono mb-6 uppercase tracking-widest">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            Core Capabilities
          </div>
          <h2 className="text-5xl md:text-8xl font-extrabold text-white tracking-tight leading-[0.9]">
            Built for <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500">Scale.</span>
          </h2>
        </div>

        {/* --- THE STACKING CARDS --- */}
        <div className="flex flex-col">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="parallax-card sticky top-32 w-full mb-12" // mb-12 creates the gap
            >
              <div className="relative w-full bg-gradient-to-br from-[#112D4E] to-[#0F2540] rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl group transition-all hover:border-blue-500/50">
                
                {/* 1. Watermark Number (Background) */}
                <div className="absolute -bottom-10 -right-4 text-[200px] font-black text-white/5 leading-none select-none z-0">
                  0{index + 1}
                </div>

                {/* 2. Top Highlight Line */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-400/50 to-transparent opacity-50" />

                <div className="relative h-full flex flex-col md:flex-row p-8 md:p-12 gap-8 md:gap-16 z-10">
                  
                  {/* --- LEFT: TITLE & DESC --- */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      {/* Decorative Label */}
                      <div className="flex items-center gap-4 mb-8">
                        <span className="font-mono text-blue-300 text-sm">0{index + 1}</span>
                        <div className="h-[1px] w-12 bg-blue-500/30" />
                        <span className="font-mono text-zinc-500 text-xs uppercase tracking-widest">/ Service Protocol</span>
                      </div>
                      
                      <h3 className="text-4xl md:text-6xl font-bold text-white leading-[0.95] mb-6">
                        {service.title} <br />
                        <span className="text-zinc-500">{service.subtitle}</span>
                      </h3>
                      
                      <p className="text-lg text-blue-100/70 leading-relaxed mb-8 max-w-lg font-light">
                        {service.description}
                      </p>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {service.tags.map(tag => (
                        <span key={tag} className="text-xs font-medium uppercase tracking-wider text-blue-200 bg-white/5 border border-white/5 px-4 py-2 rounded-lg backdrop-blur-sm">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* --- RIGHT: ICON & ACTION --- */}
                  <div className="flex flex-col justify-between items-end">
                    
                    <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 group-hover:bg-blue-500/20 group-hover:border-blue-500/50 transition-colors duration-500">
                      <service.icon className="w-8 h-8 text-white" strokeWidth={1.5} />
                    </div>

                    <button className="group/btn relative overflow-hidden rounded-full bg-white text-[#112D4E] px-8 py-4 font-bold text-lg flex items-center gap-4 transition-transform hover:scale-105 active:scale-95">
                      <span className="relative z-10">Explore</span>
                      <ArrowUpRight className="w-5 h-5 relative z-10 transition-transform group-hover/btn:rotate-45" />
                      {/* Button Hover Fill */}
                      <div className="absolute inset-0 bg-blue-400 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 ease-out" />
                    </button>

                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
      
      {/* Scroll Spacer */}
      <div className="h-[10vh]" />
    </section>
  );
};

export default ServiceStack;