"use client";

import React, { 
  useState, 
  useEffect, 
  useLayoutEffect, // ✅ Import this
  useRef 
} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}

const Navbar = () => {
  const [activeTab, setActiveTab] = useState('Home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  // State: Default to true (Hidden) if we think we are on home, to be safe.
  const [isSpotlightVisible, setIsSpotlightVisible] = useState(isHomePage);

  // ✅ FIX 1: Use 'useLayoutEffect' to sync state BEFORE the screen paints.
  // This prevents the "flash" of the navbar from the previous page.
  useLayoutEffect(() => {
    if (isHomePage) {
      setIsSpotlightVisible(true);
    } else {
      setIsSpotlightVisible(false);
    }
  }, [isHomePage]);

  // Listen for Spotlight signals
  useEffect(() => {
    if (!isHomePage) return;

    const handleSpotlightVisibility = (e: CustomEvent) => {
      setIsSpotlightVisible(e.detail);
    };

    window.addEventListener('spotlight-visibility', handleSpotlightVisibility as EventListener);

    // Safety check for refresh while scrolled down
    if (window.scrollY > window.innerHeight * 0.5) {
      setIsSpotlightVisible(false);
    }

    return () => window.removeEventListener('spotlight-visibility', handleSpotlightVisibility as EventListener);
  }, [isHomePage]);

  const shouldHide = isHomePage && isSpotlightVisible;

  // Refs
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  
  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  useEffect(() => {
    const currentLink = navLinks.find(link => link.href === pathname);
    if (currentLink) setActiveTab(currentLink.name);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
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

      <div ref={containerRef}>
        <motion.nav
          // ✅ FIX 2: Conditional Duration
          // If 'shouldHide' is true, we force 'duration-0'. 
          // This kills the transition instantly when you arrive at Home, preventing the ghosting/fade-out glitch.
          // When you scroll down (shouldHide becomes false), 'duration-700' kicks back in for a smooth fade-in.
          className={`fixed top-0 left-0 z-50 w-full font-['Cabinet_Grotesk',sans-serif] transition-all cubic-bezier(0.22, 1, 0.36, 1)
            ${shouldHide ? 'opacity-0 pointer-events-none -translate-y-4 duration-0' : 'opacity-100 translate-y-0 duration-700'}
            ${isScrolled
              ? 'py-4 bg-white/80 backdrop-blur-xl border-b border-slate-200/50 shadow-sm'
              : 'py-8 bg-transparent'
            }`}
        >
          <div className="relative mx-auto max-w-7xl px-6 lg:px-8 flex items-center justify-between">
            <div ref={logoRef} className="flex-shrink-0 z-20 opacity-0">
              <Link href="/" className="flex items-center gap-3 group">
                <Image src="/logoo.png" height={50} width={50} alt='logo' className="w-10 h-10 object-contain" />
                <span className="text-2xl translate-y-0.5 font-black tracking-tight text-[#112D4E]">Kodia</span>
              </Link>
            </div>
            
            <motion.div layout className="hidden lg:flex items-center absolute left-0 right-0 mx-auto w-fit top-1/2 -translate-y-1/2 z-10">
              <motion.div ref={linksRef} layout className={`flex items-center rounded-full transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] ${isScrolled ? 'bg-white/60 backdrop-blur-xl border border-white/40 shadow-lg shadow-black/5 p-1.5 gap-1' : 'bg-transparent border-transparent p-0 gap-8'}`}>
                {navLinks.map((link) => (
                  <Link key={link.name} href={link.href} onClick={() => setActiveTab(link.name)} className={`nav-item opacity-0 relative rounded-full text-sm font-bold transition-all duration-300 overflow-hidden group ${isScrolled ? 'px-5 py-2' : 'px-2 py-1'}`}>
                    <div className="relative overflow-hidden block">
                      <span className={`block transition-transform duration-500 group-hover:-translate-y-full ${activeTab === link.name ? 'text-[#112D4E]' : 'text-slate-500'}`}>{link.name}</span>
                      <span className="absolute top-full left-0 block transition-transform duration-500 group-hover:-translate-y-full text-[#112D4E]">{link.name}</span>
                    </div>
                    {activeTab === link.name && isScrolled && <motion.div layoutId="activeTab" className="absolute inset-0 bg-[#112D4E] rounded-full shadow-md -z-10" transition={{ type: "spring", bounce: 0.2, duration: 0.6 }} />}
                    <style jsx>{` .nav-item:has(> div > .text-\\[\\#112D4E\\]) .absolute.inset-0 + div span { color: white !important; } `}</style>
                    {activeTab === link.name && isScrolled && <div className="absolute inset-0 flex items-center justify-center pointer-events-none"><span className="text-white text-sm font-bold">{link.name}</span></div>}
                    {activeTab === link.name && !isScrolled && <motion.div layoutId="activeTabUnderline" className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#112D4E]" transition={{ duration: 0.3 }} />}
                  </Link>
                ))}
              </motion.div>
            </motion.div>

            <div className="flex-1 flex justify-end lg:hidden z-20">
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="mobile-toggle opacity-0 p-2 text-[#112D4E]">
                {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="lg:hidden fixed top-[80px] left-0 right-0 bg-white/95 backdrop-blur-2xl border-b border-slate-100 overflow-hidden shadow-2xl z-10">
                <div className="px-8 py-10 space-y-6 flex flex-col items-center">
                  {navLinks.map((link) => (
                    <Link key={link.name} href={link.href} onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-bold text-slate-700 hover:text-[#112D4E]">{link.name}</Link>
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