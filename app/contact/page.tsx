"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Sparkles } from 'lucide-react';

const ContactPage = () => {
    const [focusedField, setFocusedField] = useState<string | null>(null);

    return (
        // Applied Brand Primary Color: #112D4E
        <section className="relative min-h-screen w-full flex items-center justify-center bg-[#112D4E] overflow-hidden py-20 px-6">

            {/* 1. Font Import */}
            <style dangerouslySetInnerHTML={{
                __html: `
        @import url('https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@800,700,500,400&display=swap');
      `}} />

            {/* 2. Background Effects (Monochrome Blue/White to match brand) */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                {/* Subtle Grid Pattern in White/5% */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:40px_40px] opacity-[0.03]"></div>

                {/* Ambient Glows - Using White/Blue opacity instead of colors */}
                <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-white/5 rounded-full blur-[120px] mix-blend-overlay"></div>
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#3F72AF]/20 rounded-full blur-[120px] mix-blend-screen"></div>
            </div>

            <div className="relative z-10 max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center font-['Cabinet_Grotesk',sans-serif]">

                {/* Left Side: Information */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="space-y-8"
                >

                    <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-tight">
                        Let’s build something <br />
                        {/* Gradient Text: White to slightly transparent white for depth */}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-white/70">
                            extraordinary.
                        </span>
                    </h1>

                    <p className="text-lg text-blue-100/80 max-w-lg leading-relaxed font-medium">
                        Have a project in mind? We help brands and businesses turn their ideas into world-class digital products.
                    </p>

                    <div className="space-y-6 pt-8">
                        <ContactItem icon={Mail} title="Email us" content="hello@kodia.in" delay={0.1} />
                        <ContactItem icon={Phone} title="Call us" content="+91 98765 43210" delay={0.2} />
                        <ContactItem icon={MapPin} title="Visit us" content="Chennai, Tamil Nadu, India" delay={0.3} />
                    </div>
                </motion.div>


                {/* Right Side: The Glass Form */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative"
                >
                    {/* Decorative Border behind the card - Using White Glow */}
                    <div className="absolute -inset-1 rounded-[2.5rem] bg-gradient-to-br from-white/20 to-transparent opacity-30 blur-lg"></div>

                    {/* Form Container: Darker Blue Glass to blend with #112D4E */}
                    <div className="relative bg-[#112D4E]/50 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-[2rem] shadow-2xl">
                        <form className="space-y-6">

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <InputField
                                    label="First Name"
                                    placeholder="John"
                                    id="firstName"
                                    focusedField={focusedField}
                                    setFocusedField={setFocusedField}
                                />
                                <InputField
                                    label="Last Name"
                                    placeholder="Doe"
                                    id="lastName"
                                    focusedField={focusedField}
                                    setFocusedField={setFocusedField}
                                />
                            </div>

                            <InputField
                                label="Email Address"
                                placeholder="john@example.com"
                                id="email"
                                type="email"
                                focusedField={focusedField}
                                setFocusedField={setFocusedField}
                            />

                            <div>
                                <label className="block text-sm font-bold text-blue-100 mb-2 ml-1">Message</label>
                                <div className={`relative transition-all duration-300 rounded-xl p-[1px] ${focusedField === 'message' ? 'bg-white' : 'bg-white/10'}`}>
                                    <textarea
                                        id="message"
                                        rows={4}
                                        onFocus={() => setFocusedField('message')}
                                        onBlur={() => setFocusedField(null)}
                                        className="w-full bg-[#112D4E]/80 rounded-[11px] px-4 py-3 text-white placeholder-blue-200/30 focus:outline-none resize-none"
                                        placeholder="Tell us about your project..."
                                    ></textarea>
                                </div>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                // Button: White Background (Secondary Color) with Primary Color Text
                                className="w-full group relative flex items-center justify-center gap-3 py-4 bg-white rounded-xl text-[#112D4E] font-bold text-lg shadow-lg shadow-white/5 overflow-hidden"
                            >
                                <span className="relative z-10">Send Message</span>
                                <Send className="relative z-10 w-5 h-5 text-[#112D4E] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />

                                {/* Button Shine Effect (Blue Tint) */}
                                <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-[#112D4E]/10 to-transparent"></div>
                            </motion.button>

                        </form>
                    </div>
                </motion.div>

            </div>
        </section>
    );
};

// --- Sub Components ---

const ContactItem = ({ icon: Icon, title, content, delay }: any) => (
    <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 + delay }}
        className="flex items-start gap-4 group"
    >
        <div className="p-3 rounded-2xl bg-white/5 border border-white/10 group-hover:bg-white group-hover:text-[#112D4E] transition-all duration-300">
            <Icon className="w-6 h-6 text-blue-200 group-hover:text-[#112D4E] transition-colors" />
        </div>
        <div>
            <h3 className="text-sm font-bold text-blue-200 mb-1">{title}</h3>
            <p className="text-base font-medium text-white">{content}</p>
        </div>
    </motion.div>
);

const InputField = ({ label, placeholder, id, type = "text", focusedField, setFocusedField }: any) => (
    <div className="group">
        <label className="block text-sm font-bold text-blue-100 mb-2 ml-1 transition-colors group-hover:text-white">{label}</label>
        {/* Gradient Border Container - Uses White for Focus */}
        <div className={`relative transition-all duration-300 rounded-xl p-[1px] ${focusedField === id ? 'bg-white shadow-[0_0_15px_rgba(255,255,255,0.3)]' : 'bg-white/10 group-hover:bg-white/20'}`}>
            <input
                type={type}
                id={id}
                onFocus={() => setFocusedField(id)}
                onBlur={() => setFocusedField(null)}
                // Input Bg matches Primary Color but slightly transparent
                className="w-full bg-[#112D4E]/80 rounded-[11px] px-4 py-3 text-white placeholder-blue-200/30 focus:outline-none transition-all"
                placeholder={placeholder}
            />
        </div>
    </div>
);

export default ContactPage;