"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Smartphone, ShieldCheck, ArrowRight } from 'lucide-react';

const services = [
  {
    icon: Globe,
    title: "Web Development",
    description: "Building fast, SEO-optimized, and responsive web applications with modern frameworks.",
  },
  {
    icon: Smartphone,
    title: "Mobile Development",
    description: "Creating seamless native and cross-platform mobile experiences for iOS and Android.",
  },
  {
    icon: ShieldCheck,
    title: "Cyber Security",
    description: "Ensuring your digital assets are protected with industry-leading security protocols.",
  }
];

const CoreServices = () => {
  return (
    <section className="w-full min-h-screen flex flex-col justify-center py-20 bg-white font-sans">
      <div className="max-w-6xl mx-auto px-6 w-full">
        
        {/* Header - Simplified */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
            Our Core Services
          </h2>
          <p className="text-lg text-slate-500 max-w-xl mx-auto">
            Focused technology solutions built to scale your digital presence.
          </p>
        </div>

        {/* Services Grid - Clean Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="p-8 rounded-2xl border border-slate-100 bg-slate-50/30 hover:bg-white hover:border-blue-100 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                <service.icon size={24} />
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-3">
                {service.title}
              </h3>

              <p className="text-slate-500 text-sm leading-relaxed mb-6">
                {service.description}
              </p>

              <div className="flex items-center text-sm font-bold text-blue-600 cursor-pointer">
                <span>View Details</span>
                <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default CoreServices;