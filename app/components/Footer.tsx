"use client";

import React from "react";
import { Hexagon, Mail, Linkedin, Github, ArrowUpRight, Heart } from "lucide-react";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative bg-slate-900 text-slate-400 font-sans border-t border-slate-800">

            {/* 1. Font Import (Cabinet Grotesk) */}
            <style dangerouslySetInnerHTML={{
                __html: `
        @import url('https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@800,700,500,400&display=swap');
      `}} />

            {/* 2. Top Gradient Accent Line - Matches your Services colors */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-violet-500 to-blue-500 opacity-80" />

            {/* Main Content */}
            <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 font-['Cabinet_Grotesk',sans-serif]">

                <div className="grid grid-cols-1 gap-12 md:grid-cols-3 lg:gap-16">

                    {/* Brand Section */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-500/10 rounded-lg border border-blue-500/20">
                                <Hexagon className="h-6 w-6 text-blue-400 fill-blue-500/20" strokeWidth={2} />
                            </div>
                            <h2 className="text-2xl font-bold tracking-tight text-white">
                                Kodia
                            </h2>
                        </div>
                        <p className="text-base leading-relaxed max-w-sm text-slate-400">
                            Building reliable, scalable digital solutions with clean design
                            and solid engineering principles.
                        </p>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-widest text-slate-100 mb-6">
                            Company
                        </h3>
                        <ul className="space-y-4">
                            {['About', 'Contact'].map((item) => (
                                <li key={item}>
                                    <a
                                        href={`/${item.toLowerCase()}`}
                                        className="group inline-flex items-center gap-2 hover:text-blue-400 transition-all duration-300"
                                    >
                                        <span className="text-base font-medium">{item}</span>
                                        <ArrowUpRight className="h-4 w-4 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Connect */}
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-widest text-slate-100 mb-6">
                            Connect
                        </h3>
                        <ul className="space-y-4">
                            <li>
                                <a
                                    href="mailto:hello@kodia.in"
                                    className="group flex items-center gap-3 hover:text-white transition-colors duration-300"
                                >
                                    <div className="p-2 rounded-full bg-slate-800 group-hover:bg-blue-600 transition-colors">
                                        <Mail className="h-4 w-4" />
                                    </div>
                                    <span className="font-medium">hello@kodia.in</span>
                                </a>
                            </li>
                            <li>
                                <a href="#" className="group flex items-center gap-3 hover:text-white transition-colors duration-300">
                                    <div className="p-2 rounded-full bg-slate-800 group-hover:bg-[#0077b5] transition-colors">
                                        <Linkedin className="h-4 w-4" />
                                    </div>
                                    <span className="font-medium">LinkedIn</span>
                                </a>
                            </li>
                            <li>
                                <a href="#" className="group flex items-center gap-3 hover:text-white transition-colors duration-300">
                                    <div className="p-2 rounded-full bg-slate-800 group-hover:bg-black transition-colors">
                                        <Github className="h-4 w-4" />
                                    </div>
                                    <span className="font-medium">GitHub</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="mt-20 pt-8 border-t border-slate-800/60 flex flex-col md:flex-row items-center justify-between gap-4 text-sm font-medium text-slate-500">
                    <p>© {currentYear} Kodia. All rights reserved.</p>

                    <div className="flex items-center gap-8">
                        <a href="/privacy" className="hover:text-blue-400 transition-colors">Privacy</a>
                        <a href="/terms" className="hover:text-blue-400 transition-colors">Terms</a>
                        <a href="/sitemap" className="hover:text-blue-400 transition-colors">Sitemap</a>
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;