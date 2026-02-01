"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const SpotlightBrandTwo = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  // Use refs for GSAP quickSetters (High Performance)
  const xTo = useRef<gsap.QuickToFunc>();
  const yTo = useRef<gsap.QuickToFunc>();
  const xTextTo = useRef<gsap.QuickToFunc>();
  const yTextTo = useRef<gsap.QuickToFunc>();

  useGSAP(() => {
    if (!containerRef.current) return;

    // 1. Setup Physics
    xTo.current = gsap.quickTo(containerRef.current, "--x", {
      duration: 0.8,
      ease: "power4.out",
    });
    yTo.current = gsap.quickTo(containerRef.current, "--y", {
      duration: 0.8,
      ease: "power4.out",
    });

    xTextTo.current = gsap.quickTo(containerRef.current, "--tx", {
      duration: 1,
      ease: "power4.out",
    });
    yTextTo.current = gsap.quickTo(containerRef.current, "--ty", {
      duration: 1,
      ease: "power4.out",
    });

    gsap.fromTo(
      ".spotlight-text-layer",
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 1.4, ease: "power3.out" }
    );
  }, { scope: containerRef });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (
      !containerRef.current ||
      !xTo.current ||
      !yTo.current ||
      !xTextTo.current ||
      !yTextTo.current
    )
      return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    xTo.current(x);
    yTo.current(y);

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    xTextTo.current((x - centerX) * -0.1);
    yTextTo.current((y - centerY) * -0.1);
  };

  const handleMouseEnter = () => {
    gsap.to(".spotlight-reveal", {
      opacity: 1,
      duration: 0.6,
      ease: "power3.out",
    });
    gsap.to(".outline-layer", {
      filter: "blur(4px)",
      opacity: 0.15,
      duration: 0.6,
    });
  };

  const handleMouseLeave = () => {
    gsap.to(".spotlight-reveal", {
      opacity: 0,
      duration: 0.6,
      ease: "power3.out",
    });
    gsap.to(".outline-layer", {
      filter: "blur(0px)",
      opacity: 0.35,
      duration: 0.6,
    });

    if (xTextTo.current && yTextTo.current) {
      xTextTo.current(0);
      yTextTo.current(0);
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative w-full  h-screen -[45vh] md:h -[55vh] flex items-center justify-center overflow-hidden bg-transparent cursor-crosshair"
      style={{
        "--x": "-500px",
        "--y": "-500px",
        "--tx": "0px",
        "--ty": "0px",
      } as React.CSSProperties}
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @import url('https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@800,700,500,400&display=swap');
          `,
        }}
      />

      <div className="spotlight-text-layer relative w-full h-full flex items-center justify-center">

        {/* --- LAYER 1: Ghost Outline (Background) --- */}
        <div className="outline-layer absolute inset-0 z-10 flex items-center justify-center pointer-events-none transition-all will-change-[filter,opacity]">
          <h1
            className="font-['Cabinet_Grotesk'] font-extrabold text-[23vw] leading-none tracking-tighter uppercase text-transparent"
            style={{
              WebkitTextStroke: "3px rgba(255,255,255,0.55)",
              opacity: 0.35,
            }}
          >
            Kodaic
          </h1>
        </div>

        {/* --- LAYER 2: Spotlight Reveal (Foreground) --- */}
        <div
          className="spotlight-reveal absolute inset-0 z-20 flex items-center justify-center pointer-events-none opacity-0"
          style={{
            maskImage:
              "radial-gradient(circle 400px at var(--x) var(--y), black 10%, transparent 70%)",
            WebkitMaskImage:
              "radial-gradient(circle 400px at var(--x) var(--y), black 10%, transparent 70%)",
          }}
        >
          <div
            className="will-change-transform"
            style={{ transform: "translate(var(--tx), var(--ty))" }}
          >
            <h1
              ref={textRef}
              className="font-['Cabinet_Grotesk'] font-extrabold text-[23vw] leading-none tracking-tighter uppercase text-white drop-shadow-[0_0_60px_rgba(255,255,255,0.6)]"
            >
              Kodaic
            </h1>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SpotlightBrandTwo;
