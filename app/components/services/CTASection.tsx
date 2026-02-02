"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const CTASection = () => {
  return (
    <section className="relative w-full py-20 md:py-32 px-4 md:px-6 bg-white flex justify-center items-center overflow-hidden">
      
      {/* ✅ Blue Card Container */}
      <div className="relative z-10 w-full max-w-5xl bg-[#112D4E] rounded-[2rem] p-8 md:p-16 text-center shadow-2xl mx-auto overflow-hidden border border-[#1e3a5f]">
        
        {/* ✅ SUBTLE DOT PATTERN INSIDE */}
        {/* Changed opacity to 0.1 (10%) and dot size to 1px for a very soft look */}
        <div className="absolute inset-0 w-full h-full pointer-events-none opacity-10"
             style={{
               backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
               backgroundSize: '24px 24px',
               maskImage: 'radial-gradient(circle at center, black 40%, transparent 100%)',
               WebkitMaskImage: 'radial-gradient(circle at center, black 40%, transparent 100%)'
             }}>
        </div>

        {/* Creative touch: Subtle top highlight for depth */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>

        <h2 className="relative z-20 text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 font-['Cabinet_Grotesk',sans-serif] tracking-tight">
          Not Sure Where to Start?
        </h2>
        
        <p className="relative z-20 text-blue-100/80 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
          Schedule a free consultation and we&apos;ll help you identify the best solutions for your business needs.
        </p>
        
        <Link
          href="/contact"
          className="relative z-20 group inline-flex items-center gap-3 bg-[#1B3A5E] hover:bg-[#234b7a] border border-[#2d527a] text-white font-medium py-4 px-8 rounded-full transition-all duration-300 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:-translate-y-1"
        >
          Schedule Free Consultation
          <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
};

export default CTASection;