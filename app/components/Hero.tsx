"use client";
import React, { useEffect, useState, useMemo } from 'react';
import { ArrowRight } from 'lucide-react';
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";

const Hero = () => {
    const [init, setInit] = useState(false);

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    const particlesOptions: ISourceOptions = useMemo(() => ({
        fpsLimit: 120,
        fullScreen: { enable: false },
        interactivity: {
            events: {
                onHover: { enable: false, mode: "grab" },
                onClick: { enable: false },
            },
        },
        particles: {
            color: { value: "#3b82f6" },
            links: {
                color: "#3b82f6",
                distance: 150,
                enable: true,
                opacity: 0.2,
                width: 1,
            },
            move: {
                direction: "none",
                enable: true,
                outModes: { default: "out" },
                random: true,
                speed: 0.8,
                straight: false,
            },
            number: {
                density: { enable: true, width: 800, height: 800 },
                value: 60,
            },
            opacity: { value: 0.3 },
            shape: { type: "circle" },
            size: { value: { min: 1, max: 2 } },
        },
        detectRetina: true,
    }), []);

    return (
        <section className="relative w-full min-h-screen flex flex-col items-center justify-center px-4 pt-28 pb-20 overflow-hidden bg-white font-sans">
            
            {/* Animated Particle Background */}
            {init && (
                <div className="absolute inset-0 z-0">
                    <Particles
                        id="tsparticles"
                        options={particlesOptions}
                        className="h-full w-full"
                    />
                </div>
            )}

            {/* Content Container */}
            <div className="relative z-10 max-w-5xl mx-auto text-center">

                {/* Main Heading - Cabinet Grotesk Bold */}
                <h1 className="text-5xl md:text-7xl font-extrabold text-[#1e2f4d] leading-[1.1] mb-6 tracking-tight">
                    Transforming Ideas Into <br />
                    <span className="text-blue-500">Digital Excellence</span>
                </h1>

                {/* Subtext - Cabinet Grotesk Regular */}
                <p className="max-w-3xl mx-auto text-lg md:text-xl text-slate-500 font-normal leading-relaxed mb-10">
                    We connect small pieces to build massive, scalable solutions. From
                    cloud infrastructure to AI-powered applications, we&apos;re your partner in
                    digital transformation.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button className="group flex items-center space-x-2 bg-[#1e2f4d] text-white px-8 py-4 rounded-full font-bold transition-all hover:bg-slate-800 hover:scale-[1.02] active:scale-95 shadow-lg shadow-blue-900/10">
                        <span>Schedule a Discovery Call</span>
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>

                    <button className="px-8 py-4 rounded-full border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 transition-all bg-white/80 backdrop-blur-sm">
                        View Our Work
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Hero;