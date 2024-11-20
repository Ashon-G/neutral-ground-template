import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export const VelocityHero = () => {
  return (
    <div className="relative min-h-screen bg-[#0A0118]">
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
      <div className="relative z-10 mx-auto mt-24 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mx-auto mb-6 max-w-4xl bg-gradient-to-r from-[#9b87f5] to-[#D6BCFA] bg-clip-text text-5xl font-black text-transparent sm:text-7xl"
        >
          Build Your Next Big Thing with Student Talent
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mx-auto mb-12 max-w-2xl text-lg text-white/60"
        >
          Access ambitious student developers and marketers ready to help build and launch your product. 
          Get high-quality work at student-friendly rates.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex justify-center gap-4"
        >
          <Button asChild size="lg" className="bg-[#9b87f5] hover:bg-[#7E69AB]">
            <Link to="/signup/founder">Start Building</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
            <Link to="/signup/maven">Join as Student</Link>
          </Button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2 text-white/40">
            <span className="text-sm">Scroll to explore</span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="h-12 w-0.5 bg-gradient-to-b from-white/40 to-transparent"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default VelocityHero;