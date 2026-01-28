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

  // Handle Scroll Effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Font Import */}
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@800,700,500,400&display=swap');
      `}} />

      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 z-50 w-full font-['Cabinet_Grotesk',sans-serif] transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/80 backdrop-blur-md border-b border-slate-200/50 py-4 shadow-sm' 
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
          
          {/* 1. Brand Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className={`p-2 rounded-lg transition-colors ${isScrolled ? 'bg-[#112D4E]/5' : 'bg-white/10'}`}>
               {/* Icon adapts to scroll state */}
              <Hexagon 
                className={`w-6 h-6 transition-colors ${isScrolled ? 'text-[#112D4E]' : 'text-[#112D4E]'}`} 
                strokeWidth={2.5} 
              />
            </div>
            <span className={`text-xl font-bold tracking-tight transition-colors ${isScrolled ? 'text-[#112D4E]' : 'text-[#112D4E]'}`}>
              Kodia
            </span>
          </Link>

          {/* 2. Desktop Navigation with Sliding Pill */}
          <div className="hidden lg:flex items-center gap-1 bg-white/50 backdrop-blur-sm p-1 rounded-full border border-white/20 shadow-sm">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => setActiveTab(link.name)}
                className="relative px-5 py-2 rounded-full text-sm font-bold transition-colors z-10"
              >
                {/* Active Text Color Change */}
                <span className={`relative z-10 transition-colors duration-200 ${activeTab === link.name ? 'text-white' : 'text-slate-600 hover:text-[#112D4E]'}`}>
                  {link.name}
                </span>

                {/* The Sliding Pill Animation */}
                {activeTab === link.name && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-[#112D4E] rounded-full"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </button>
            ))}
          </div>

     

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-[#112D4E]"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* 4. Mobile Menu Dropdown */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-b border-slate-100 overflow-hidden"
            >
              <div className="px-6 py-8 space-y-4 flex flex-col items-center">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-lg font-bold text-slate-600 hover:text-[#112D4E] transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
                <hr className="w-full border-slate-100 my-4" />
                <button className="w-full bg-[#112D4E] text-white py-3 rounded-xl font-bold">
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