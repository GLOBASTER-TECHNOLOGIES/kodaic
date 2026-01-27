"use client";
import React from 'react';
import { Cloud, Globe, Smartphone, ArrowRight } from 'lucide-react';

const services = [
  {
    icon: Cloud,
    title: "Cloud Computing",
    description: "Scalable infrastructure and cloud-native solutions that grow with your business.",
    link: "#"
  },
  {
    icon: Globe,
    title: "Web Development",
    description: "Modern, responsive web applications built with cutting-edge technologies.",
    link: "#"
  },
  {
    icon: Smartphone,
    title: "Mobile Development",
    description: "Native and cross-platform mobile apps that deliver exceptional user experiences.",
    link: "#"
  }
];

const CoreServices = () => {
  return (
    <section className="relative w-full min-h-screen flex flex-col justify-center py-20 bg-white font-sans">
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
        
        {/* Header Section */}
        <div className="text-center mb-20">
          <span className="text-blue-500 font-bold tracking-wider uppercase text-sm mb-3 block">
            What We Do
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#1e2f4d] mb-6 tracking-tight">
            Core Services
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-slate-500">
            End-to-end technology solutions designed to accelerate your business growth
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="group bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-blue-900/5 hover:-translate-y-2 transition-all duration-300"
            >
              {/* Icon Container */}
              <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-8 group-hover:bg-blue-600 transition-colors duration-300">
                <service.icon 
                  size={28} 
                  className="text-blue-600 group-hover:text-white transition-colors duration-300" 
                />
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold text-[#1e2f4d] mb-4">
                {service.title}
              </h3>
              
              <p className="text-slate-500 leading-relaxed mb-8">
                {service.description}
              </p>

              {/* Interactive Link */}
              <a 
                href={service.link} 
                className="inline-flex items-center text-blue-600 font-bold group/link"
              >
                Learn more
                <ArrowRight 
                  size={18} 
                  className="ml-2 transition-transform duration-300 group-hover/link:translate-x-1" 
                />
              </a>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default CoreServices;