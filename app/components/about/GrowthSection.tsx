"use client";

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register Plugins
if (typeof window !== "undefined") {
    gsap.registerPlugin(useGSAP, ScrollTrigger);
}

const GrowthSection = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 80%", // Starts slightly earlier
                toggleActions: "play none none reverse",
            }
        });

        // 1. Reveal Heading
        tl.from(".reveal-text", {
            y: 100,
            opacity: 0,
            duration: 1,
            stagger: 0.1,
            ease: "power3.out"
        });

        // 2. Expand Line
        tl.from(lineRef.current, {
            scaleX: 0,
            transformOrigin: "left center",
            duration: 1.2,
            ease: "expo.out"
        }, "-=0.6");

        // 3. Fade in Body Text
        tl.from(".body-text", {
            y: 20,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out"
        }, "-=0.8");

    }, { scope: containerRef });

    return (
        <section
            ref={containerRef}
            className="relative w-full py-16 md:py-24 px-6 md:px-12 bg-white flex justify-center items-center overflow-hidden font-['Cabinet_Grotesk',sans-serif]"
        >
            {/* Font Import */}
            <style dangerouslySetInnerHTML={{
                __html: `
        @import url('https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@800,700,500,400&display=swap');
      `}} />

            {/* Subtle Background Detail */}
            <div className="absolute top-10 right-10 w-2 h-2 rounded-full bg-blue-500/20"></div>
            <div className="absolute bottom-20 left-20 w-3 h-3 rounded-full bg-blue-500/10"></div>

            <div className="max-w-4xl w-full">

                {/* --- HEADLINE --- */}
                {/* Adjusted sizes to match reference image: 4xl on mobile, 6xl on desktop */}
                <div className="space-y-0 mb-6">
                    <div className="overflow-hidden">
                        <h2 className="reveal-text text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#112D4E] leading-[1.1] tracking-tight">
                            Connecting Small
                        </h2>
                    </div>
                    <div className="overflow-hidden">
                        <h2 className="reveal-text text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#112D4E] leading-[1.1] tracking-tight">
                            Pieces for
                        </h2>
                    </div>
                    <div className="overflow-hidden">
                        {/* Using the brighter blue for the accent word */}
                        <h2 className="reveal-text text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#3B82F6] leading-[1.1] tracking-tight">
                            Massive Growth
                        </h2>
                    </div>
                </div>

                {/* --- SEPARATOR LINE --- */}
                <div
                    ref={lineRef}
                    className="w-full h-[2px] bg-blue-100/50 mb-8"
                ></div>

                {/* --- BODY CONTENT --- */}
                <div className="space-y-6 max-w-3xl">
                    {/* Intro Paragraph: Slightly larger/darker */}
                    <p className="body-text text-lg md:text-xl text-[#112D4E] leading-relaxed font-medium">
                        At Kodaic Technologies, we believe that great technology is built by connecting the right pieces together. Just like our logo&apos;s signature dot, every small component matters in creating something extraordinary.
                    </p>
                </div>

            </div>
        </section>
    );
};

export default GrowthSection;