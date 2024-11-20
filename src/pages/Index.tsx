import React from "react";
import { VelocityHero } from "@/components/landing/Hero";
import { ScrollFeatures } from "@/components/landing/ScrollFeatures";
import { CountUpStats } from "@/components/landing/CountUpStats";
import { FoldingLogos } from "@/components/landing/FoldingLogos";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Testimonials } from "@/components/landing/Testimonials";
import { CTA } from "@/components/landing/CTA";
import { Footer } from "@/components/layout/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-[#0A0118]">
      <VelocityHero />
      <ScrollFeatures />
      <CountUpStats />
      <FoldingLogos />
      <HowItWorks />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
};

export default Index;