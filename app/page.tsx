"use client";
import Hero from "./components/Hero";
import CoreServices from "./components/CoreServices";
import Footer from "./components/Footer";
import CTASection from "./components/CTASection";
import SpotlightBrandTwo from "./components/SpotlightBrandTwo";

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