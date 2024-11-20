import React from "react";
import { VelocityHero } from "@/components/landing/Hero";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-[#0A0118]">
      <VelocityHero />
      <AIFeatureSection />
    </div>
  );
};

const AIFeatureSection = () => {
  return (
    <div className="w-full min-h-[679px] bg-black text-white flex flex-col items-center justify-center px-10 font-sans text-base">
      <div className="relative z-10">
        <div className="max-w-[1280px] w-full lg:w-[782px]">
          <div className="flex flex-col items-start max-w-[782px]">
            <div className="flex flex-col items-center gap-6">
              <h1
                className="text-[48px] font-medium leading-[52.8px] tracking-[-1.44px] m-0"
                style={{
                  background: "linear-gradient(125deg, #E1E0FF 11.36%, #6849E6 67.09%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Sintra X: The world's first AI-powered assistants, powered by
                your AI brain. That can complete tasks for you, even while you
                sleep. All to save your most valuable asset – your time.
              </h1>
            </div>

            <div className="w-full pt-24" />

            <div className="flex flex-wrap items-center gap-4">
              <Button
                variant="link"
                className="text-[#5176FB] text-xl tracking-[-0.6px] p-0 h-auto hover:no-underline"
              >
                Watch Video
              </Button>

              <Button
                asChild
                className="h-12 bg-white text-[#171717] rounded-[11.2px] px-[18px] py-3 shadow-[0_0_0_4px_rgba(255,255,255,0.1)] outline-1 outline outline-[rgba(255,255,255,0.2)] outline-offset-4 hover:bg-white/90 transition-all duration-200"
                style={{
                  backgroundImage:
                    "linear-gradient(0deg, rgb(191, 219, 254), rgb(255, 255, 255)), linear-gradient(rgb(59, 130, 246), rgb(59, 130, 246))",
                }}
              >
                <a href="/pricing?method=x" className="flex items-center gap-2">
                  Get Access
                  <ArrowRight className="h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
