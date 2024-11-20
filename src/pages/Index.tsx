import React from "react";
import { VelocityHero } from "@/components/landing/Hero";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Index = () => {
  return (
    <>
      <VelocityHero />
      <AIFeatureSection />
    </>
  );
};

const AIFeatureSection = () => {
  return (
    <section className="relative w-full min-h-screen bg-black">
      {/* Background glow effects */}
      <div className="absolute left-1/3 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/20 blur-3xl" />
      <div className="absolute right-1/3 bottom-1/4 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/20 blur-3xl" />
      
      <div className="flex flex-col items-center justify-center min-h-screen px-6 md:px-10">
        <h1
          className="max-w-[900px] text-[32px] md:text-[56px] font-medium leading-tight md:leading-[1.1] tracking-[-1.44px] text-center mb-16"
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

        <div className="flex flex-wrap items-center justify-center gap-6">
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
    </section>
  );
};

export default Index;