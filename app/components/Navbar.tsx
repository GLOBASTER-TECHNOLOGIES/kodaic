"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Hexagon, Menu, X, ArrowRight } from 'lucide-react';
import Link from 'next/link';

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
      // Trigger size reduction after 50px of scrolling
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
        transition={{ duration: 0.5 }}
        // Dynamic padding: py-6 when at top, py-3 when scrolling
        className={`fixed top-0 left-0 z-50 w-full font-['Cabinet_Grotesk',sans-serif] transition-all duration-500 ease-in-out ${
          isScrolled 
            ? 'bg-white/80 backdrop-blur-xl border-b border-slate-200/50 py-3 shadow-md' 
            : 'bg-transparent py-8'
        }`}
      >
        {/* Centered container with max-width */}
        <div className="max-w-7xl mx-auto px-8 lg:px-12 flex items-center justify-between">
          
          {/* Left: Logo */}
          <div className="flex-1 flex justify-start">
            <Link href="/" className="flex items-center gap-3 group">
              <div className={`p-2 rounded-xl transition-all duration-300 ${isScrolled ? 'bg-[#112D4E] scale-90' : 'bg-white shadow-xl shadow-black/5 scale-110'}`}>
                <Hexagon 
                  className={`w-6 h-6 transition-colors ${isScrolled ? 'text-white' : 'text-[#112D4E]'}`} 
                  strokeWidth={2.5} 
                />
              </div>
              <span className={`text-2xl font-black tracking-tight transition-colors duration-300 ${isScrolled ? 'text-[#112D4E]' : 'text-[#112D4E]'}`}>
                Kodia
              </span>
            </Link>
          </div>

          {/* Center: Spread out Desktop Links */}
          <div className="hidden lg:flex items-center gap-2 bg-white/40 backdrop-blur-md p-1.5 rounded-full border border-white/40 shadow-sm">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => setActiveTab(link.name)}
                className="relative px-6 py-2 rounded-full text-sm font-bold transition-all"
              >
                <span className={`relative z-10 transition-colors duration-300 ${activeTab === link.name ? 'text-white' : 'text-slate-600 hover:text-[#112D4E]'}`}>
                  {link.name}
                </span>

                {activeTab === link.name && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-[#112D4E] rounded-full shadow-lg shadow-[#112D4E]/20"
                    transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Right: Action Buttons */}
          <div className="hidden md:flex flex-1 justify-end items-center gap-6">
             <button className="text-sm font-bold text-slate-600 hover:text-[#112D4E] transition-colors">
              Log In
            </button>
            <button className={`flex items-center gap-2 px-7 py-2.5 rounded-full font-bold text-sm transition-all duration-300 ${
              isScrolled 
              ? 'bg-[#112D4E] text-white shadow-lg shadow-[#112D4E]/20' 
              : 'bg-white text-[#112D4E] border border-slate-200'
            }`}>
              Get Started
              <ArrowRight size={16} />
            </button>
          </div>

          {/* Mobile Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-[#112D4E]"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white/95 backdrop-blur-2xl border-b border-slate-100 overflow-hidden"
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
                <button className="w-full bg-[#112D4E] text-white py-4 rounded-2xl font-bold shadow-xl">
                  Get Started
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
};

export default Navbar;