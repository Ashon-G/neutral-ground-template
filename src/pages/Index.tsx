import { Button } from "@/components/ui/button";
import { VelocityHero } from "@/components/landing/Hero";
import { BenefitsGrid } from "@/components/benefits-grid/BenefitsGrid";
import { CountUpStats } from "@/components/landing/CountUpStats";
import { BlogPostCarousel } from "@/components/landing/BlogPostCarousel";
import { StickyCards } from "@/components/landing/StickyCards";

const TiltChipLink = () => {
  return (
    <a
      href="#integrations"
      className="group relative inline-block overflow-hidden rounded-full bg-gradient-to-r from-violet-600/50 to-indigo-600/50 px-4 py-2 font-mono text-[10px] font-medium uppercase tracking-wider text-white backdrop-blur-xl hover:from-violet-600 hover:to-indigo-600"
    >
      <span className="relative z-10 flex items-center gap-1">
        Integrations
        <span className="rounded bg-white/20 px-1.5 py-0.5">Early Alpha</span>
      </span>
      <div className="absolute inset-0 z-0 scale-x-[2] bg-gradient-to-r from-violet-600/50 to-indigo-600/50 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100" />
    </a>
  );
};

const Index = () => {
  return (
    <div className="min-h-screen bg-black">
      <nav className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between bg-black/50 p-6 backdrop-blur-lg">
        <div className="text-2xl font-bold text-white">
          Maven<span className="text-secondary">.</span>
        </div>
        <TiltChipLink />
        <Button variant="outline" className="text-white">
          Get Started
        </Button>
      </nav>

      <main className="relative">
        <VelocityHero />
        <CountUpStats />
        <BenefitsGrid />
        <BlogPostCarousel />
        <StickyCards />
      </main>
    </div>
  );
};

export const BLOG_POSTS = [
  {
    title: "Post Title 1",
    content: "Content for the first post.",
  },
  {
    title: "Post Title 2",
    content: "Content for the second post.",
  },
  {
    title: "Post Title 3",
    content: "Content for the third post.",
  },
];

export default Index;
