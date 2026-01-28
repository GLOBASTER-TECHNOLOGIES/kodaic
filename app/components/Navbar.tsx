"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Hexagon, Menu, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  const [activeTab, setActiveTab] = useState('Home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@800,700,500,400&display=swap');
      `}} />

      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        // Dynamic Padding: shrinks from py-8 (tall) to py-4 (compact)
        className={`fixed top-0 left-0 z-50 w-full font-['Cabinet_Grotesk',sans-serif] transition-all duration-500 ease-in-out ${
            isScrolled ? 'py-4 bg-white/80 backdrop-blur-xl border-b border-slate-200/50 shadow-sm' : 'py-8 bg-transparent'
        }`}
      >
        {/* Container */}
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 flex items-center justify-between">
          
          {/* 1. LOGO SECTION (Left) */}
          <div className="flex-shrink-0 z-20">
            <Link href="/" className="flex items-center gap-3 group">
              {/* <div className={`p-2 rounded-xl transition-all duration-500 ${isScrolled ? 'bg-[#112D4E] scale-90' : 'bg-white shadow-xl shadow-black/5 scale-100'}`}>
              </div> */}
                <Image src="/logoo.png" height={50} width={50} alt='logo' />
              <span className={`text-2xl translate-y-0.5 font-black tracking-tight transition-colors duration-300 ${isScrolled ? 'text-[#112D4E]' : 'text-[#112D4E]'}`}>
                Kodiac
              </span>
            </Link>
          </div>

          {/* 2. DYNAMIC MENU LIST (Absolute Center X & Y) */}
          <motion.div 
            layout
            // KEY CHANGE: top-1/2 -translate-y-1/2 locks it to vertical center
            className={`hidden lg:flex items-center absolute left-0 right-0 mx-auto w-fit top-1/2 -translate-y-1/2 z-10`}
          >
             <motion.div 
               layout
               className={`flex items-center rounded-full transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
                 isScrolled 
                 ? 'bg-white/60 backdrop-blur-xl border border-white/40 shadow-lg shadow-black/5 p-1.5 gap-1' // Scrolled: Compact Pill
                 : 'bg-transparent border-transparent p-0 gap-8' // Top: Wide & Transparent
               }`}
             >
                {navLinks.map((link) => (
                  <button
                    key={link.name}
                    onClick={() => setActiveTab(link.name)}
                    className={`relative rounded-full text-sm font-bold transition-all duration-300 ${
                        isScrolled ? 'px-5 py-2' : 'px-2 py-1'
                    }`}
                  >
                    <span className={`relative z-10 transition-colors duration-300 ${
                        activeTab === link.name 
                            ? (isScrolled ? 'text-white' : 'text-[#112D4E]') 
                            : 'text-slate-500 hover:text-[#112D4E]'
                    }`}>
                      {link.name}
                    </span>

                    {/* Active Background (Scrolled Pill) */}
                    {activeTab === link.name && isScrolled && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-[#112D4E] rounded-full shadow-md"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    
                    {/* Active Underline (Top State) */}
                    {activeTab === link.name && !isScrolled && (
                         <motion.div
                         layoutId="activeTabUnderline"
                         className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#112D4E]"
                         transition={{ duration: 0.3 }}
                       />
                    )}
                  </button>
                ))}
             </motion.div>
          </motion.div>

          {/* 3. MOBILE TOGGLE */}
          <div className="flex-1 flex justify-end lg:hidden z-20">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-[#112D4E]"
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
    </>
  );
};

export default Navbar;