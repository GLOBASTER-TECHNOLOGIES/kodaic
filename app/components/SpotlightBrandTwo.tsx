"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const SpotlightBrandTwo = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  // GSAP Refs
  const xTo = useRef<gsap.QuickToFunc>();
  const yTo = useRef<gsap.QuickToFunc>();
  const xTextTo = useRef<gsap.QuickToFunc>();
  const yTextTo = useRef<gsap.QuickToFunc>();
  
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const rafId = useRef<number | null>(null);

  useGSAP(() => {
    if (!containerRef.current) return;
    xTo.current = gsap.quickTo(containerRef.current, "--x", { duration: 0.8, ease: "power4.out" });
    yTo.current = gsap.quickTo(containerRef.current, "--y", { duration: 0.8, ease: "power4.out" });
    xTextTo.current = gsap.quickTo(containerRef.current, "--tx", { duration: 1, ease: "power4.out" });
    yTextTo.current = gsap.quickTo(containerRef.current, "--ty", { duration: 1, ease: "power4.out" });

    gsap.fromTo(".spotlight-text-layer", { opacity: 0, scale: 0.96 }, { opacity: 1, scale: 1, duration: 1.4, ease: "power3.out" });
  }, { scope: containerRef });

  // ✅ THIS IS THE MISSING PART THAT FIXES YOUR ISSUE
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Send a signal to the Navbar!
        // detail: true = I am visible (Hide Navbar)
        // detail: false = I am gone (Show Navbar)
        const event = new CustomEvent('spotlight-visibility', { detail: entry.isIntersecting });
        window.dispatchEvent(event);
      },
      { threshold: 0.15 } 
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const animate = () => {
    if (!containerRef.current || !xTo.current || !yTo.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = mouseX.current - rect.left;
    const y = mouseY.current - rect.top;
    xTo.current(x);
    yTo.current(y);
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    xTextTo.current?.((x - cx) * -0.1);
    yTextTo.current?.((y - cy) * -0.1);
    rafId.current = requestAnimationFrame(animate);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.current = e.clientX;
    mouseY.current = e.clientY;
    if (!rafId.current) rafId.current = requestAnimationFrame(animate);
  };
  
  const handleMouseEnter = () => {
    gsap.to(".spotlight-reveal", { opacity: 1, duration: 0.6, ease: "power3.out" });
    gsap.to(".outline-layer", { opacity: 0.08, duration: 0.6, ease: "power3.out" });
  };

  const handleMouseLeave = () => {
    gsap.to(".spotlight-reveal", { opacity: 0, duration: 0.6, ease: "power3.out" });
    gsap.to(".outline-layer", { opacity: 0.35, duration: 0.6, ease: "power3.out" });
    xTextTo.current?.(0);
    yTextTo.current?.(0);
    if (rafId.current) { cancelAnimationFrame(rafId.current); rafId.current = null; }
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (e.deltaY > 0) document.querySelector("#starting-section")?.scrollIntoView({ behavior: "smooth" });
    if (e.deltaY < 0) document.querySelector("#starting-band")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      ref={containerRef}
      onWheel={handleWheel}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      id="starting-band"
      className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-black cursor-crosshair"
      style={{ "--x": "-500px", "--y": "-500px", "--tx": "0px", "--ty": "0px" } as React.CSSProperties}
    >
      <div className="absolute top-10 left-14 z-50 pointer-events-none">
        <Image src="/kodaicBlack.jpeg" alt="Kodaic Logo" width={70} height={70} priority />
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
            @import url('https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@800,700,500,400&display=swap');
            .spotlight-reveal, .outline-layer, h1 { will-change: transform, opacity; }
      `}} />
      <div className="spotlight-text-layer relative w-full h-full flex items-center justify-center">
        <div className="outline-layer absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
          <h1 className="font-['Cabinet_Grotesk'] font-extrabold text-[23vw] uppercase text-transparent" style={{ WebkitTextStroke: "3px rgba(255,255,255,0.55)", opacity: 0.35 }}>Kodaic</h1>
        </div>
        <div className="spotlight-reveal absolute inset-0 z-20 flex items-center justify-center pointer-events-none opacity-0" style={{ maskImage: "radial-gradient(circle 280px at var(--x) var(--y), black 12%, transparent 70%)", WebkitMaskImage: "radial-gradient(circle 280px at var(--x) var(--y), black 12%, transparent 70%)" }}>
          <div style={{ transform: "translate(var(--tx), var(--ty))" }}>
            <h1 ref={textRef} className="font-['Cabinet_Grotesk'] font-extrabold text-[23vw] uppercase text-white drop-shadow-[0_0_60px_rgba(255,255,255,0.55)]">Kodaic</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpotlightBrandTwo;