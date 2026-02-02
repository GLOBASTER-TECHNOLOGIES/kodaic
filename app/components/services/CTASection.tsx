import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const CTASection = () => {
  return (
    <section className="w-full px-6 py-12 flex justify-center">
      <div className="w-full max-w-5xl bg-[#112D4E] rounded-2xl p-8 md:p-16 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Not Sure Where to Start?
        </h2>
        <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
          Schedule a free consultation and we&apos;ll help you identify the best solutions for your business needs.
        </p>
        <Link
          href="/contact" // Replace with your actual consultation link
          className="inline-flex items-center gap-2 bg-[#1B3A5E] hover:bg-[#214770] text-white font-semibold py-3 px-8 rounded-full transition-colors"
        >
          Schedule Free Consultation
          <ArrowRight size={20} />
        </Link>
      </div>
    </section>
  );
};

export default CTASection;