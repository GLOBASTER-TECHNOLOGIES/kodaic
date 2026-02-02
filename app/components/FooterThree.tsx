"use client";

import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

// Optimized Images
const footerLinks = [
  {
    title: "Email",
    href: "mailto:hello@kodaic.in",
    src: "https://images.unsplash.com/photo-1596524430615-b46475ddff6e?q=80&w=600&auto=format&fit=crop",
    color: "#3b82f6"
  },
  {
    title: "LinkedIn",
    href: "#",
    src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=600&auto=format&fit=crop",
    color: "#0a66c2"
  },
  {
    title: "Instagram",
    href: "#",
    src: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=600&auto=format&fit=crop",
    color: "#e1306c"
  },
  {
    title: "Office",
    href: "#",
    src: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=600&auto=format&fit=crop",
    color: "#10b981"
  }
];

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  // Ref for the footer container to track scroll progress
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  // Parallax Effect: The footer content moves slightly slower than the scroll
  // This creates the "Deep Space" feel.
  const yParallax = useTransform(scrollYProgress, [0, 1], [-100, 0]);

  // Cursor Physics
  const springConfig = { damping: 15, stiffness: 150, mass: 0.05 }; 
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  return (
    // 1. PLACEHOLDER DIV (The "Height" Provider)
    // Removed clipPath to fix the "jamming"
    <div ref={containerRef} className="relative h-[500px] md:h-[800px]" style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}>
      
      {/* 2. FIXED DIV (The Visual Footer) */}
      <div className="fixed bottom-0 left-0 right-0 h-[500px] md:h-[800px] w-full">
        
        <div 
          onMouseMove={handleMouseMove}
          className="relative h-full bg-[#050505] text-white overflow-hidden font-sans pt-10 pb-10 flex flex-col justify-between"
        >
          {/* Inject Fonts & Grain */}
          <style dangerouslySetInnerHTML={{
            __html: `
            @import url('https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@800,700,500,400&display=swap');
            .font-grotesk { font-family: 'Cabinet Grotesk', sans-serif; }
          `}} />

          {/* Preload Images */}
          <div className="hidden">
            {footerLinks.map((link) => (
                <img key={link.title} src={link.src} alt="preload" />
            ))}
          </div>

          {/* 3. PARALLAX CONTENT WRAPPER */}
          {/* As you reveal the footer, this content slides down into place */}
          <motion.div 
            style={{ y: yParallax }}
            className="relative z-10 px-6 lg:px-12 max-w-[1400px] mx-auto w-full h-full flex flex-col justify-between"
          >
            
            {/* Header CTA */}
            <div className="border-b border-white/10 pb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
              <h2 className="font-grotesk text-xs md:text-sm font-bold tracking-[0.2em] text-zinc-500 uppercase">
                Have an idea?
              </h2>
              <div className="text-right hidden md:block">
                  <p className="text-zinc-500 text-sm">Bangalore, India</p>
              </div>
            </div>

            {/* Links Section */}
            <div className="flex-grow flex flex-col justify-center py-10">
              <div className="flex flex-col">
                {footerLinks.map((link, index) => (
                  <motion.a
                    key={index}
                    href={link.href}
                    className="group relative flex items-center justify-between py-4 md:py-8 border-b border-white/10 transition-colors hover:border-white/30 z-20 cursor-none md:cursor-pointer"
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <span className="font-grotesk text-4xl md:text-8xl font-bold uppercase text-zinc-400 transition-all duration-300 group-hover:text-white group-hover:translate-x-4">
                      {link.title}
                    </span>
                    <ArrowUpRight className="w-6 h-6 md:w-12 md:h-12 text-zinc-600 group-hover:text-white transition-all duration-300 group-hover:rotate-45" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-4 text-xs text-zinc-600 uppercase font-medium tracking-wider pt-8">
              <div className="flex gap-6">
                  <a href="#" className="hover:text-white transition-colors">Privacy</a>
                  <a href="#" className="hover:text-white transition-colors">Terms</a>
              </div>
              <h1 className="font-grotesk font-black text-white text-lg md:text-xl tracking-tight">
                KODAIC
              </h1>
              <p>© {currentYear}</p>
            </div>
          </motion.div>

          {/* Floating Image Reveal */}
          <AnimatePresence>
            {hoveredIndex !== null && (
              <motion.div
                className="fixed top-0 left-0 w-[200px] h-[250px] md:w-[280px] md:h-[360px] z-30 pointer-events-none hidden md:block rounded-xl overflow-hidden shadow-2xl"
                style={{ x, y, translateX: "-50%", translateY: "-50%" }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.15 }}
              >
                <img 
                  src={footerLinks[hoveredIndex].src} 
                  alt="Link Preview"
                  className="w-full h-full object-cover grayscale contrast-125"
                />
                <div 
                  className="absolute inset-0 mix-blend-multiply opacity-50"
                  style={{ backgroundColor: footerLinks[hoveredIndex].color }} 
                />
                <div className="absolute bottom-4 left-4 bg-black px-3 py-1 rounded-full border border-white/20">
                    <p className="text-white text-[10px] font-bold tracking-widest">
                      OPEN
                    </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
        </div>
      </div>
    </div>
  );
};

export default Footer;