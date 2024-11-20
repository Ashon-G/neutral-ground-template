import React from "react";
import { VelocityHero } from "@/components/landing/Hero";
import { AIFeatureSection } from "@/components/landing/AIFeatureSection";
import { TeamSection } from "@/components/landing/TeamSection";

const Index = () => {
  return (
    <>
      <VelocityHero />
      <AIFeatureSection />
      <TeamSection />
    </>
  );
};

export default Index;