"use client";

import React from "react";
import { ArrowUpRight, Instagram, Linkedin, Twitter } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <footer className="relative bg-[#050505] text-white overflow-hidden font-sans">
      {/* Font Import */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @import url('https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@800,700,500,400&display=swap');
        .font-grotesk { font-family: 'Cabinet Grotesk', sans-serif; }
      `}} />

      {/* Main Content Container */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-20 pb-12 lg:px-8">
        
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-24"
        >
          {/* 1. CTA Section (Span 6) */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <motion.div variants={itemVariants}>
              <h2 className="font-grotesk text-5xl md:text-7xl font-bold leading-[0.9] tracking-tight mb-8">
                Ready to scale <br />
                <span className="text-blue-500">your vision?</span>
              </h2>
              <p className="text-zinc-400 text-lg max-w-md mb-8">
                We build digital products that look good and work even better. 
                Let&apo;s turn your ideas into a scalable reality.
              </p>
              
              <a 
                href="mailto:hello@kodia.in"
                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full text-lg font-bold overflow-hidden transition-all hover:pr-10"
              >
                <span className="relative z-10">Start a Project</span>
                <div className="absolute inset-0 bg-blue-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
                <ArrowUpRight className="relative z-10 w-5 h-5 transition-transform group-hover:rotate-45" />
              </a>
            </motion.div>
          </div>

          {/* 2. Navigation Links (Span 2) */}
          {/* Changed: Removed lg:col-start-8 so it sits next to CTA */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 mb-6">Sitemap</h3>
            <ul className="space-y-4">
              {['Home', 'Services', 'Our Work', 'Agency', 'Careers'].map((item) => (
                <li key={item}>
                  <FooterLink href={`/${item.toLowerCase().replace(' ', '-')}`}>
                    {item}
                  </FooterLink>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* 3. Socials (Span 2) */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 mb-6">Socials</h3>
            <ul className="space-y-4">
              <li><FooterLink href="#"><Linkedin className="w-4 h-4 inline mr-2" /> LinkedIn</FooterLink></li>
              <li><FooterLink href="#"><Twitter className="w-4 h-4 inline mr-2" /> Twitter</FooterLink></li>
              <li><FooterLink href="#"><Instagram className="w-4 h-4 inline mr-2" /> Instagram</FooterLink></li>
            </ul>
          </motion.div>

          {/* 4. Legal (Span 2) - Now fits on the same row */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 mb-6">Legal</h3>
            <ul className="space-y-4">
              <li><FooterLink href="/privacy">Privacy Policy</FooterLink></li>
              <li><FooterLink href="/terms">Terms of Service</FooterLink></li>
              <li><FooterLink href="/cookies">Cookie Policy</FooterLink></li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Divider */}
        <motion.div 
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "circOut" }}
          className="w-full h-[1px] bg-zinc-800 origin-left mb-8" 
        />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-zinc-500 text-sm">
          <p>© {currentYear} Kodia Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
             <span className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                Crafting your success
             </span>
          </div>
        </div>

      </div>

      {/* GIANT BACKGROUND TEXT (Watermark) */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none overflow-hidden select-none flex justify-center z-0">
         <motion.h1 
            initial={{ y: 100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 0.1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="font-grotesk text-[28vw] leading-[0.7] font-black text-white opacity-5 tracking-tighter translate-y-[20%]"
         >
            KODIAC
         </motion.h1>
      </div>
      
      {/* Subtle Gradient Overlay at bottom to fade text */}
      <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-[#050505] to-transparent z-1 pointer-events-none" />
    </footer>
  );
};

// Helper Component for Magnetic/Animated Links
const FooterLink = ({ href, children }: { href: string, children: React.ReactNode }) => {
  return (
    <a 
      href={href} 
      className="group relative block overflow-hidden text-zinc-400 hover:text-white transition-colors duration-300 w-fit"
    >
      <span className="block transition-transform duration-300 group-hover:-translate-y-full">
        {children}
      </span>
      <span className="absolute top-0 left-0 block translate-y-full transition-transform duration-300 group-hover:translate-y-0 text-blue-400">
        {children}
      </span>
    </a>
  );
};

export default Footer;