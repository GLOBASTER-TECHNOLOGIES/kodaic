"use client"
import React, { useState } from 'react';
import { Moon } from 'lucide-react';
import Image from 'next/image';

const Navbar = () => {
    const [activeTab, setActiveTab] = useState('Home');
    const navLinks = ['Home', 'Services', 'Portfolio', 'About', 'Contact'];

    return (
        // The 'font-sans' class here triggers Cabinet Grotesk based on your config
        <nav className="absolute top-0 left-0 z-10 w-full flex items-center justify-between px-8 py-4 bg-white shadow-sm font-sans">
            {/* Logo Section */}
            <div className="flex items-center space-x-2 shrink-0">
                <Image
                    src="/logoo.png"
                    height={50}
                    width={50}
                    alt="Company Logo" // Required by Next.js
                />
                {/* font-bold matches Cabinet Grotesk 700 */}
                <span className="text-xl font-bold text-slate-800 tracking-tight hidden sm:block">
                    Kodaic
                </span>
            </div>

            {/* Navigation Links */}
            <div className="hidden lg:flex items-center space-x-1">
                {navLinks.map((link) => (
                    <button
                        key={link}
                        onClick={() => setActiveTab(link)}
                        // font-medium (500) looks very clean for navigation in this font
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${activeTab === link
                            ? 'bg-blue-50 text-blue-600'
                            : 'text-slate-500 hover:text-slate-800'
                            }`}
                    >
                        {link}
                    </button>
                ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center space-x-4 md:space-x-6 shrink-0">
                <button className="text-slate-600 hover:text-slate-900 transition-colors">
                    <Moon size={20} />
                </button>

                {/* font-bold to match the CTA buttons in the Hero section */}
                <button className="bg-[#1e2f4d] text-white px-5 py-2 md:px-6 md:py-2.5 rounded-full font-bold text-sm hover:bg-slate-800 transition-all shadow-md whitespace-nowrap">
                    Get Started
                </button>
            </div>
        </nav>
    );
};

export default Navbar;