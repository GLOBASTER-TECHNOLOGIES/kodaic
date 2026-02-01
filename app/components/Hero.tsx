"use client";
import React, { useEffect, useState, useMemo } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion'; // Importing the animation engine
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

// --- 1. Creative Dev: The "Liquid" Primary Button ---
const LiquidButton = () => {
    return (
        <motion.button
            className="relative group overflow-hidden bg-[#1e2f4d] text-white px-8 py-4 rounded-full font-bold"
            whileHover="hover"
            whileTap="tap"
            initial="initial"
        >
            {/* MOTION LAYER 1: The Sheen 
         We animate x from -100% to 200% using Framer Motion (no tailwind config needed)
      */}
            <motion.div
                className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                variants={{
                    initial: { x: "-150%" },
                    hover: {
                        x: "250%",
                        transition: {
                            duration: 1,
                            ease: "easeInOut",
                            repeat: Infinity,
                            repeatDelay: 1
                        }
                    },
                }}
            />

            {/* MOTION LAYER 2: Content & Physics */}
            <motion.span
                className="relative z-10 flex items-center gap-2"
                variants={{
                    tap: { scale: 0.95 } // Tactile click feedback
                }}
            >
                <span>Schedule a Discovery Call</span>
                <motion.div
                    variants={{
                        initial: { x: 0 },
                        hover: { x: 4 } // Arrow slide
                    }}
                    transition={{ type: "spring", stiffness: 300 }}
                >
                    <ArrowRight size={18} />
                </motion.div>
            </motion.span>
        </motion.button>
    );
};

// --- 2. Creative Dev: The "Smart" Secondary Button ---
const GlassButton = () => {
    return (
        <motion.button
            className="relative px-8 py-4 rounded-full border border-slate-200 text-slate-700 font-bold bg-white/50 backdrop-blur-sm"
            whileHover="hover"
            whileTap="tap"
        >
            {/* Background Fill Animation */}
            <motion.div
                className="absolute inset-0 bg-white rounded-full opacity-0"
                variants={{
                    hover: { opacity: 1 }, // Fades in solid white on hover
                }}
                transition={{ duration: 0.2 }}
            />

            <motion.span
                className="relative z-10 flex items-center gap-2"
                variants={{
                    hover: { color: "#2563eb" } // Text turns blue
                }}
            >
                View Our Work
                {/* The Dot: Expands and pulses */}
                <motion.span
                    className="w-1.5 h-1.5 rounded-full bg-slate-400"
                    variants={{
                        hover: {
                            backgroundColor: "#3b82f6",
                            scale: 1.5
                        }
                    }}
                />
            </motion.span>
        </motion.button>
    );
};

// --- Main Component ---
const Hero = () => {
    const [init, setInit] = useState(false);

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    const particlesOptions = useMemo(() => ({
        fpsLimit: 120,
        fullScreen: { enable: false },
        interactivity: { events: { onHover: { enable: false }, onClick: { enable: false } } },
        particles: {
            color: { value: "#3b82f6" },
            links: { color: "#3b82f6", distance: 150, enable: true, opacity: 0.2, width: 1 },
            move: { direction: "none", enable: true, outModes: { default: "out" }, random: true, speed: 0.8, straight: false },
            number: { density: { enable: true, width: 800, height: 800 }, value: 60 },
            opacity: { value: 0.3 },
            shape: { type: "circle" },
            size: { value: { min: 1, max: 2 } },
        },
        detectRetina: true,
    }), []);

    return (
        <section id='starting-section' className="relative w-full min-h-screen flex flex-col items-center justify-center px-4 pt-28 pb-20 overflow-hidden bg-white font-sans">

            {init && (
                <div className="absolute inset-0 z-0">
                    <Particles id="tsparticles" options={particlesOptions} className="h-full w-full" />
                </div>
            )}

            <div className="relative z-10 max-w-5xl mx-auto text-center">


                <h1 className="text-5xl md:text-7xl font-extrabold text-[#1e2f4d] leading-[1.1] mb-6 tracking-tight">
                    Transforming Ideas Into <br />
                    <span className="text-blue-500">Digital Excellence</span>
                </h1>

                <p className="max-w-3xl mx-auto text-lg md:text-xl text-slate-500 font-normal leading-relaxed mb-10">
                    We connect small pieces to build massive, scalable solutions. From
                    cloud infrastructure to AI-powered applications, we&apos;re your partner in
                    digital transformation.
                </p>

                {/* --- Replaced HTML buttons with Framer Motion Components --- */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <LiquidButton />
                    <GlassButton />
                </div>
            </div>
        </section>
    );
};

export default Hero;