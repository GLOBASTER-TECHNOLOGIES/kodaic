import React from 'react';

const ServicesHeader = () => {
  return (
    // ✅ Changed: h-screen makes it full height
    // ✅ Added: flex items-center justify-center centers the content vertically & horizontally
    <section className="w-full h-screen px-6 bg-white flex items-center justify-center">
      <div className="max-w-5xl mx-auto text-center">
        {/* Eyebrow Text */}
        <span className="block text-blue-500 font-semibold tracking-widest uppercase text-sm mb-4">
          Our Services
        </span>

        {/* Main Heading */}
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#112D4E] mb-6 tracking-tight">
          End&ndash;to&ndash;End Technology Solutions
        </h2>

        {/* Subtext */}
        <p className="text-lg md:text-xl text-slate-500 leading-relaxed max-w-3xl mx-auto">
          From cloud infrastructure to AI-powered applications, we deliver comprehensive 
          solutions that drive digital transformation and business growth.
        </p>
      </div>
    </section>
  );
};

export default ServicesHeader;