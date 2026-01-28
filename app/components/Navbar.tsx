"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Hexagon, Menu, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

// Register GSAP
if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}

const Navbar = () => {
  const [activeTab, setActiveTab] = useState('Home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  
  // Refs for GSAP
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  
  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  // 1. Sync Active Tab
  useEffect(() => {
    const currentLink = navLinks.find(link => link.href === pathname);
    if (currentLink) setActiveTab(currentLink.name);
  }, [pathname]);

  // 2. Handle Scroll
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 3. GSAP ENTRANCE ANIMATION
  // This creates the "Premium" staggered load effect
  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    // Ensure initial state (hidden) is set before animating
    gsap.set([logoRef.current, ".nav-item", ".mobile-toggle"], { y: -20, opacity: 0 });

    tl.to(logoRef.current, { y: 0, opacity: 1, duration: 1 })
      .to(".nav-item", { y: 0, opacity: 1, stagger: 0.1, duration: 0.8 }, "-=0.8")
      .to(".mobile-toggle", { y: 0, opacity: 1, duration: 0.8 }, "-=0.8");

  }, { scope: containerRef });

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@800,700,500,400&display=swap');
      `}} />

      {/* Main Container for GSAP Scope */}
      <div ref={containerRef}>
        <motion.nav
          // Removed Framer's initial={{ y: -100 }} to let GSAP handle the entrance
          className={`fixed top-0 left-0 z-50 w-full font-['Cabinet_Grotesk',sans-serif] transition-all duration-700 cubic-bezier(0.22, 1, 0.36, 1) ${
              isScrolled ? 'py-4 bg-white/80 backdrop-blur-xl border-b border-slate-200/50 shadow-sm' : 'py-8 bg-transparent'
          }`}
        >
          {/* Inner Content */}
          <div className="relative mx-auto max-w-7xl px-6 lg:px-8 flex items-center justify-between">
            
            {/* 1. LOGO SECTION */}
            <div ref={logoRef} className="flex-shrink-0 z-20 opacity-0">
              <Link href="/" className="flex items-center gap-3 group">
                <Image src="/logoo.png" height={50} width={50} alt='logo' className="w-10 h-10 object-contain" />
                <span className={`text-2xl translate-y-0.5 font-black tracking-tight transition-colors duration-300 ${isScrolled ? 'text-[#112D4E]' : 'text-[#112D4E]'}`}>
                  Kodia
                </span>
              </Link>
            </div>

            {/* 2. MENU LIST (Center Logic) */}
            <motion.div 
              layout
              className={`hidden lg:flex items-center absolute left-0 right-0 mx-auto w-fit top-1/2 -translate-y-1/2 z-10`}
            >
               <motion.div 
                 ref={linksRef}
                 layout
                 className={`flex items-center rounded-full transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
                   isScrolled 
                   ? 'bg-white/60 backdrop-blur-xl border border-white/40 shadow-lg shadow-black/5 p-1.5 gap-1' 
                   : 'bg-transparent border-transparent p-0 gap-8' 
                 }`}
               >
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setActiveTab(link.name)}
                      className={`nav-item opacity-0 relative rounded-full text-sm font-bold transition-all duration-300 overflow-hidden group ${
                          isScrolled ? 'px-5 py-2' : 'px-2 py-1'
                      }`}
                    >
                      {/* Premium "Rolling Text" Effect Structure */}
                      <div className="relative overflow-hidden block">
                        {/* Visible Text */}
                        <span className={`block transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full ${
                            activeTab === link.name 
                                ? (isScrolled ? 'text-white' : 'text-[#112D4E]') 
                                : 'text-slate-500'
                        }`}>
                          {link.name}
                        </span>
                        
                        {/* Hidden Text (Rolls up on hover) */}
                        <span className={`absolute top-full left-0 block transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full ${
                            activeTab === link.name 
                                ? (isScrolled ? 'text-white' : 'text-[#112D4E]') 
                                : 'text-[#112D4E]'
                        }`}>
                          {link.name}
                        </span>
                      </div>

                      {/* Active Background Pill */}
                      {activeTab === link.name && isScrolled && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute inset-0 bg-[#112D4E] rounded-full shadow-md -z-10"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                      
                      {/* Active Underline */}
                      {activeTab === link.name && !isScrolled && (
                           <motion.div
                           layoutId="activeTabUnderline"
                           className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#112D4E]"
                           transition={{ duration: 0.3 }}
                         />
                      )}
                    </Link>
                  ))}
               </motion.div>
            </motion.div>

            {/* 3. MOBILE TOGGLE */}
            <div className="flex-1 flex justify-end lg:hidden z-20">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="mobile-toggle opacity-0 p-2 text-[#112D4E]"
              >
                {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>

          {/* Mobile Dropdown */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="lg:hidden fixed top-[80px] left-0 right-0 bg-white/95 backdrop-blur-2xl border-b border-slate-100 overflow-hidden shadow-2xl z-10"
              >
                <div className="px-8 py-10 space-y-6 flex flex-col items-center">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-xl font-bold text-slate-700 hover:text-[#112D4E]"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      </div>
    </>
  );
};

export default Navbar;