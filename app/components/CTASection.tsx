"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const CTASection = () => {
  return (
    <section className="w-full py-20 px-6 flex justify-center bg-white">
      
      {/* Font Import */}
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@800,700,500,400&display=swap');
      `}} />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-5xl rounded-[2.5rem] overflow-hidden bg-[#1e293b] text-center font-['Cabinet_Grotesk',sans-serif]"
      >
        
        {/* Background Gradient & Texture */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-800 via-[#1e293b] to-[#0f172a]"></div>
        
        {/* Subtle "Stars/Network" overlay effect using CSS opacity */}
        <div className="absolute inset-0 opacity-20" 
             style={{ backgroundImage: 'radial-gradient(white 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
        </div>
        
        {/* Blue Glow Effect (Bottom Center) */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-blue-500/10 blur-[100px] rounded-full pointer-events-none"></div>

        {/* Content Container */}
        <div className="relative z-10 px-8 py-20 md:py-24 flex flex-col items-center">
          
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
            Ready to Transform Your Business?
          </h2>
          
          <p className="text-slate-300 text-lg md:text-xl max-w-2xl mb-10 font-medium leading-relaxed">
            Let's discuss how we can help you achieve your digital transformation goals.
          </p>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-[#263346] hover:bg-[#2f3e54] text-white rounded-full border border-slate-600/50 shadow-lg shadow-blue-900/20 transition-all duration-300"
          >
            <span className="font-bold text-lg tracking-wide">Schedule a Discovery Call</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300 text-blue-300" />
            
            {/* Button Inner Glow */}
            <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/10 group-hover:ring-white/20"></div>
          </motion.button>
          
        </div>
      </motion.div>
    </section>
  );
};

export default CTASection;