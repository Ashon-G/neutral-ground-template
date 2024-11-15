import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-10 animate-gradient"></div>
      <div className="container mx-auto px-4 pt-20 text-center relative z-10">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Build Something Amazing
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Start your journey with our powerful platform and create the next big thing.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity text-lg px-8 py-6">
            Get Started
          </Button>
          <Button variant="outline" className="text-lg px-8 py-6">
            Learn More
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;