"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Smartphone, Server, ArrowRight, Sparkles } from 'lucide-react';

const services = [
  {
    icon: Globe,
    title: "Web Development",
    description: "Building fast, SEO-optimized, and responsive web applications with modern frameworks.",
    color: "from-blue-400 to-blue-600",
    bg: "bg-blue-50"
  },
  {
    icon: Smartphone,
    title: "Mobile Development",
    description: "Creating seamless native and cross-platform mobile experiences for iOS and Android.",
    color: "from-violet-400 to-violet-600",
    bg: "bg-violet-50"
  },
  {
    icon: Server,
    title: "Deployment & Support",
    description: "Streamlining infrastructure with CI/CD pipelines, cloud scaling, and 24/7 server management.",
    color: "from-amber-400 to-amber-600",
    bg: "bg-amber-50"
  }
];

const CoreServices = () => {
  return (
    <section className="relative w-full min-h-screen flex flex-col justify-center py-20 overflow-hidden bg-slate-50">
      
      {/* 1. Font Import */}
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@800,700,500,400&display=swap');
      `}} />

      {/* 2. Apply Font */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full font-['Cabinet_Grotesk',sans-serif]">
        
        {/* Header */}
        <div className="text-center mb-24">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 text-slate-700 text-xs font-bold uppercase tracking-wider mb-8 shadow-sm"
          >
            <Sparkles size={14} className="text-blue-500" />
            <span>Premium Solutions</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight text-slate-900"
          >
            Our Core Services
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl font-medium text-slate-500 max-w-2xl mx-auto leading-relaxed"
          >
            Focused technology solutions built to scale your digital presence with precision and performance.
          </motion.p>
        </div>

        {/* Services Grid - Back to 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
              whileHover={{ y: -8 }}
              className="group relative p-8 rounded-[2rem] bg-white border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden"
            >
              {/* Animated Top Border */}
              <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${service.color} transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500`} />

              {/* Icon Container */}
              <div className={`relative w-16 h-16 rounded-2xl ${service.bg} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500`}>
                <service.icon size={32} className="relative z-10 text-slate-700 group-hover:text-black transition-colors duration-300" />
              </div>

              {/* Title */}
              <h3 className="text-3xl font-bold text-slate-900 mb-4 group-hover:text-amber-700 transition-colors duration-300">
                {service.title}
              </h3>

              <p className="text-slate-500 font-medium leading-relaxed mb-8 text-lg">
                {service.description}
              </p>

              <div className="flex items-center text-sm font-bold text-slate-900 group-hover:text-amber-600 transition-colors cursor-pointer uppercase tracking-wide">
                <span>View Details</span>
                <ArrowRight size={16} className="ml-2 transform group-hover:translate-x-2 transition-transform duration-300" />
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default CoreServices;