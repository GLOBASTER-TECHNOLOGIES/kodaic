"use client";

import React, { useRef } from "react";
// ✅ FIXED: Imported ArrowUpRight instead of ArrowRight
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
    title: "Engineering & Architecture",
    description: "We don't just write code; we architect scalable ecosystems. From microservices to monolithic migrations, our engineering builds the backbone of your business logic.",
    tags: ["System Design", "Microservices", "High Scalability"],
    icon: Layers,
  },
  {
    id: "02",
    title: "AI & Intelligent Systems",
    description: "Leveraging LLMs and predictive models to automate complex workflows. We turn raw data into actionable intelligence that drives decision-making.",
    tags: ["LLM Integration", "Predictive Analytics", "Process Automation"],
    icon: Cpu,
  },
  {
    id: "03",
    title: "Cloud Infrastructure",
    description: "Robust, secure, and auto-scaling environments. We ensure your application performs impeccably under any load, optimized for cost and speed.",
    tags: ["AWS / Azure", "Kubernetes", "CI/CD Pipelines"],
    icon: Globe,
  },
  {
    id: "04",
    title: "Full-Cycle Product Dev",
    description: "From the first line of code to the final deployment. We handle the entire lifecycle with strict agile methodologies and rapid iteration cycles.",
    tags: ["React / Next.js", "Mobile Apps", "MVP to Scale"],
    icon: Code2,
  },
];

const ServiceStack = () => {
  const containerRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // 1. Setup ScrollTrigger for Pinned Layout
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom bottom",
      pin: leftColRef.current,
      pinSpacing: false,
    });

    // 2. Animate Service Cards (Highlight Active)
    const cards = gsap.utils.toArray<HTMLElement>(".service-card");
    
    cards.forEach((card, i) => {
      ScrollTrigger.create({
        trigger: card,
        start: "top 60%", // When card hits center-ish of screen
        end: "bottom 60%",
        onEnter: () => setActive(i),
        onEnterBack: () => setActive(i),
      });
    });

    // 3. Progress Bar Animation
    gsap.fromTo(progressBarRef.current, 
      { height: "0%" },
      {
        height: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        }
      }
    );

    // Helper to animate state changes
    function setActive(index: number) {
      // Highlight current card
      gsap.to(cards, {
        opacity: 0.2, // Dim all
        duration: 0.4,
      });
      gsap.to(cards[index], {
        opacity: 1, // Highlight active
        duration: 0.4,
      });

      // Update the "Terminal" numbers on the left
      gsap.to(".counter-num", {
        y: -100 * index + "%", // Slide numbers up like a slot machine
        duration: 0.6,
        ease: "power4.out"
      });
      
      // Update Icon Visibility
      gsap.to(".icon-container", { opacity: 0, scale: 0.8, duration: 0.3 });
      gsap.to(`.icon-${index}`, { opacity: 1, scale: 1, duration: 0.3, delay: 0.1 });
    }

  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef} 
      className="relative w-full bg-[#050505] text-white font-['Cabinet_Grotesk',sans-serif]"
    >
      {/* Font Import */}
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@800,700,500,400&display=swap');
      `}} />

      <div className="flex flex-col lg:flex-row min-h-screen">
        
        {/* --- LEFT COLUMN: STICKY TERMINAL --- */}
        <div 
          ref={leftColRef} 
          className="hidden lg:flex w-1/2 h-screen sticky top-0 flex-col justify-between p-16 border-r border-white/10"
        >
          {/* Top Label */}
          <div className="flex items-center gap-3">
             <div className="w-2 h-2 bg-blue-500 animate-pulse rounded-full" />
             <span className="text-sm font-mono text-zinc-500 uppercase tracking-widest">System Capabilities</span>
          </div>

          {/* Center Dynamic Visuals */}
          <div className="relative flex-1 flex flex-col justify-center items-start">
            
            {/* Slot Machine Number Counter */}
            <div className="h-[120px] overflow-hidden mb-6">
               <div className="counter-num flex flex-col">
                  {services.map((s) => (
                    <span key={s.id} className="text-9xl font-extrabold text-transparent stroke-text leading-[120px]">
                      {s.id}
                    </span>
                  ))}
               </div>
            </div>

            {/* Dynamic Icons */}
            <div className="relative w-24 h-24">
              {services.map((s, i) => (
                <div key={i} className={`icon-container icon-${i} absolute inset-0 flex items-center justify-center bg-blue-600 rounded-2xl opacity-0 scale-80`}>
                   <s.icon className="w-10 h-10 text-white" />
                </div>
              ))}
            </div>

          </div>

          {/* Progress Bar Container */}
          <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-white/5">
             <div ref={progressBarRef} className="w-full bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.5)]" />
          </div>
        </div>

        {/* --- RIGHT COLUMN: SCROLLABLE CONTENT --- */}
        <div className="w-full lg:w-1/2 flex flex-col">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="service-card min-h-[80vh] flex flex-col justify-center p-8 md:p-16 border-b border-white/5 lg:border-none"
            >
               {/* Mobile Number Display */}
               <span className="lg:hidden text-6xl font-extrabold text-zinc-800 mb-6 block">
                 {service.id}
               </span>

               <h3 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
                 {service.title}
               </h3>
               
               <p className="text-lg md:text-xl text-zinc-400 leading-relaxed mb-10 max-w-md">
                 {service.description}
               </p>

               {/* Tags */}
               <div className="flex flex-wrap gap-3 mb-10">
                 {service.tags.map(tag => (
                   <span key={tag} className="px-4 py-2 rounded-full border border-white/10 text-sm text-zinc-300 font-medium">
                     {tag}
                   </span>
                 ))}
               </div>

               <button className="group flex items-center gap-3 text-blue-500 font-bold uppercase tracking-widest text-sm hover:text-white transition-colors">
                  Explore Solution
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
               </button>
            </div>
          ))}
        </div>

      </div>

      <style jsx>{`
        .stroke-text {
          -webkit-text-stroke: 2px rgba(255, 255, 255, 0.2);
          color: transparent;
        }
      `}</style>
    </section>
  );
};

export default ServiceStack;