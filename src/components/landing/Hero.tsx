import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export const VelocityHero = () => {
  return (
    <section className="relative w-full min-h-screen bg-[#0A0118]">
      {/* Background glow effects */}
      <div className="absolute left-1/4 top-1/4 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/20 blur-3xl" />
      <div className="absolute right-1/4 top-3/4 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/20 blur-3xl" />
      
      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between p-6">
        <div className="text-2xl font-bold text-white">
          Maven<span className="text-[#9b87f5]">.</span>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/login" className="text-sm text-white/80 hover:text-white">
            Login
          </Link>
          <Button asChild variant="secondary" className="bg-[#9b87f5] hover:bg-[#7E69AB]">
            <Link to="/signup">Get Started</Link>
          </Button>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)]">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mx-auto mb-6 max-w-4xl px-6 bg-gradient-to-r from-[#9b87f5] to-[#D6BCFA] bg-clip-text text-5xl font-black text-transparent sm:text-7xl text-center"
        >
          Build Your Next Big Thing with Student Talent
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mx-auto mb-12 max-w-2xl px-6 text-lg text-white/60 text-center"
        >
          Access ambitious student developers and marketers ready to help build and launch your product. 
          Get high-quality work at student-friendly rates.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-4 px-6"
        >
          <Button asChild size="lg" className="bg-[#9b87f5] hover:bg-[#7E69AB]">
            <Link to="/signup/founder">Start Building</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
            <Link to="/signup/maven">Join as Student</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default VelocityHero;