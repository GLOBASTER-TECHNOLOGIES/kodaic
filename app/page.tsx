"use client";
import Hero from "./components/main/Hero";
import CoreServices from "./components/main/CoreServices";
import CTASection from "./components/main/CTASection";
import SpotlightBrandTwo from "./components/main/SpotlightBrandTwo";

const page = () => {
  return (
    <div className="relative">
      <div>
        <SpotlightBrandTwo />
        <Hero />
        <CoreServices />
        <CTASection />
      </div>
    </div>
  );
};

export default page;