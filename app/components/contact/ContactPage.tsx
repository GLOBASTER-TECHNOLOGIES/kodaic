"use client";

import React, { useState, useRef } from 'react';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// ✅ Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

const ContactPage = () => {
    const [focusedField, setFocusedField] = useState<string | null>(null);
    
    // Refs for GSAP
    const containerRef = useRef<HTMLDivElement>(null);
    const bgBlob1Ref = useRef<HTMLDivElement>(null);
    const bgBlob2Ref = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // ✅ ADDED SCROLLTRIGGER TO TIMELINE
        // This ensures animations start only when the section hits the viewport
        const tl = gsap.timeline({ 
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 75%", // Animation starts when top of section hits 75% of viewport height
                toggleActions: "play none none reverse", // Plays on enter, reverses on leave (optional, makes it feel responsive)
            },
            defaults: { ease: "power4.out" } 
        });

        // 1. Initial State Setup (Hidden)
        gsap.set([".hero-badge", ".hero-heading", ".hero-subtext", ".contact-item", ".form-card", ".form-input", ".submit-btn"], {
            y: 50, // Increased distance for more dramatic effect
            opacity: 0
        });

        // 2. Entrance Sequence
        tl.to(".hero-badge", { y: 0, opacity: 1, duration: 1.2 })
          .to(".hero-heading", { y: 0, opacity: 1, duration: 1.4 }, "-=1.0")
          .to(".hero-subtext", { y: 0, opacity: 1, duration: 1.2 }, "-=1.2")
          .to(".contact-item", { y: 0, opacity: 1, stagger: 0.15, duration: 1 }, "-=1.0")
          .to(".form-card", { y: 0, opacity: 1, duration: 1.4 }, "-=1.2")
          .to([".form-input", ".submit-btn"], { y: 0, opacity: 1, stagger: 0.1, duration: 1 }, "-=1.0");

        // 3. Background Blobs (Independent of ScrollTrigger to keep moving)
        gsap.to(bgBlob1Ref.current, {
            y: -30,
            x: 20,
            duration: 8,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
        gsap.to(bgBlob2Ref.current, {
            y: 30,
            x: -20,
            duration: 10,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: 1
        });

    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="relative w-full flex items-center justify-center bg-[#F8FAFC] overflow-hidden py-12 px-4 md:px-6 lg:py-20 font-['Cabinet_Grotesk',sans-serif]">

            {/* Font Import */}
            <style dangerouslySetInnerHTML={{
                __html: `
        @import url('https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@800,700,500,400&display=swap');
      `}} />

            {/* Background - Animated Blobs */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div ref={bgBlob1Ref} className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-[#112D4E]/5 rounded-full blur-[100px]"></div>
                <div ref={bgBlob2Ref} className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[80px]"></div>
            </div>

            <div className="relative z-10 max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-start">

                {/* --- Left Column: Context & Info --- */}
                <div className="space-y-8 lg:pt-4">
                    <div className="space-y-4">
                        
                        {/* Badge */}
                        <div className="hero-badge inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 w-fit">
                            <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                            </span>
                            <span className="text-[10px] md:text-xs font-bold tracking-wide text-[#112D4E] uppercase">Available for new projects</span>
                        </div>

                        {/* Heading */}
                        <h1 className="hero-heading text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#112D4E] leading-[1.1] tracking-tight">
                            Let’s start a <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-[#112D4E]">
                                conversation.
                            </span>
                        </h1>

                        <p className="hero-subtext text-base md:text-lg text-slate-500 max-w-md leading-relaxed font-medium">
                            We help ambitious brands turn complex challenges into simple, elegant digital solutions.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div className="space-y-4">
                            <ContactItem 
                                icon={Mail} 
                                title="Email Us" 
                                content="hello@kodia.in" 
                                link="mailto:hello@kodia.in"
                            />
                            <ContactItem 
                                icon={Phone} 
                                title="Call Us" 
                                content="+91 98765 43210" 
                                link="tel:+919876543210"
                            />
                            <ContactItem 
                                icon={MapPin} 
                                title="Visit HQ" 
                                content="Chennai, Tamil Nadu, India" 
                            />
                        </div>
                    </div>
                </div>


                {/* --- Right Column: The Clean Card Form --- */}
                <div className="relative w-full">
                    {/* Compact Card Container */}
                    <div className="form-card relative bg-white p-6 md:p-8 rounded-[1.5rem] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] border border-slate-100">
                        <h2 className="text-xl md:text-2xl font-bold text-[#112D4E] mb-5">Tell us about your project</h2>
                        
                        <form className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="form-input">
                                    <InputField
                                        label="First Name"
                                        placeholder="John"
                                        id="firstName"
                                        focusedField={focusedField}
                                        setFocusedField={setFocusedField}
                                    />
                                </div>
                                <div className="form-input">
                                    <InputField
                                        label="Last Name"
                                        placeholder="Doe"
                                        id="lastName"
                                        focusedField={focusedField}
                                        setFocusedField={setFocusedField}
                                    />
                                </div>
                            </div>

                            <div className="form-input">
                                <InputField
                                    label="Email Address"
                                    placeholder="john@company.com"
                                    id="email"
                                    type="email"
                                    focusedField={focusedField}
                                    setFocusedField={setFocusedField}
                                />
                            </div>

                            <div className="form-input">
                                <label className="block text-sm font-bold text-[#112D4E] mb-1.5 ml-1">Message</label>
                                <div className={`relative transition-all duration-300 rounded-xl border ${focusedField === 'message' ? 'border-[#112D4E] ring-2 ring-blue-50' : 'border-slate-200 hover:border-slate-300'} bg-slate-50/50`}>
                                    <textarea
                                        id="message"
                                        rows={3}
                                        onFocus={() => setFocusedField('message')}
                                        onBlur={() => setFocusedField(null)}
                                        className="w-full bg-transparent rounded-xl px-4 py-3 text-[#112D4E] placeholder-slate-400 focus:outline-none resize-none text-sm md:text-base"
                                        placeholder="Tell us a bit about your goals..."
                                    ></textarea>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                className="submit-btn w-full group relative flex items-center justify-center gap-2 py-3.5 bg-[#112D4E] text-white rounded-xl font-bold text-base md:text-lg shadow-lg shadow-blue-900/10 overflow-hidden mt-2 transform transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                                type="button"
                            >
                                <span className="relative z-10">Send Message</span>
                                <ArrowRight className="relative z-10 w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 group-hover:translate-x-1" />
                                
                                {/* Hover Gradient Effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-[#112D4E] to-[#1B3A5E] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </button>
                        </form>
                    </div>
                </div>

            </div>
        </section>
    );
};

// --- Sub Components ---

const ContactItem = ({ icon: Icon, title, content, link }: any) => {
    const Wrapper = link ? 'a' : 'div';
    const props = link ? { href: link } : {};

    return (
        // @ts-ignore
        <div className="contact-item">
            <Wrapper {...props} className="flex items-start gap-4 group cursor-pointer">
                <div className="flex-shrink-0 p-2.5 rounded-full bg-white border border-slate-100 shadow-sm text-[#112D4E] group-hover:bg-[#112D4E] group-hover:text-white transition-all duration-300">
                    <Icon className="w-4 h-4 md:w-5 md:h-5" />
                </div>
                <div>
                    <h3 className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">{title}</h3>
                    <p className="text-base md:text-lg font-semibold text-[#112D4E] group-hover:text-blue-600 transition-colors">{content}</p>
                </div>
            </Wrapper>
        </div>
    );
};

const InputField = ({ label, placeholder, id, type = "text", focusedField, setFocusedField }: any) => (
    <div className="group">
        <label className="block text-sm font-bold text-[#112D4E] mb-1.5 ml-1">{label}</label>
        <div className={`relative transition-all duration-300 rounded-xl border ${focusedField === id ? 'border-[#112D4E] ring-2 ring-blue-50 bg-white' : 'border-slate-200 bg-slate-50/50 hover:border-slate-300'}`}>
            <input
                type={type}
                id={id}
                onFocus={() => setFocusedField(id)}
                onBlur={() => setFocusedField(null)}
                className="w-full bg-transparent rounded-xl px-4 py-3 text-[#112D4E] placeholder-slate-400 focus:outline-none transition-all font-medium text-sm md:text-base"
                placeholder={placeholder}
            />
        </div>
    </div>
);

export default ContactPage;