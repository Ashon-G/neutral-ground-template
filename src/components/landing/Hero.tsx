import {
  motion,
  useScroll,
  useVelocity,
  useTransform,
  useSpring,
} from "framer-motion";
import React, { useRef, useState } from "react";
import { FiArrowDown, FiLogIn, FiUserPlus } from "react-icons/fi";
import { Link } from "react-router-dom";

export const VelocityHero = () => {
  const targetRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  const scrollVelocity = useVelocity(scrollYProgress);
  const skewXRaw = useTransform(scrollVelocity, [-1, 1], ["45deg", "-45deg"]);
  const skewX = useSpring(skewXRaw, { mass: 3, stiffness: 400, damping: 50 });
  const xRaw = useTransform(scrollYProgress, [0, 1], [0, -3000]);
  const x = useSpring(xRaw, { mass: 3, stiffness: 400, damping: 50 });

  return (
    <section ref={targetRef} className="min-h-screen bg-[#1A1F2C] text-white">
      <div className="sticky top-0 flex h-screen flex-col justify-between overflow-hidden">
        <Nav />
        <CenterCopy />
        <motion.p
          style={{ skewX, x }}
          className="origin-bottom-left whitespace-nowrap text-7xl font-black uppercase leading-[0.85] text-[#6E59A5]/20 md:text-9xl md:leading-[0.85]"
        >
          Connect with student talent. Build innovative products. Launch faster than ever before.
        </motion.p>
        <ScrollArrow />
      </div>
    </section>
  );
};

const Nav = () => {
  return (
    <div className="relative mb-1 flex w-full justify-between p-6">
      <Logo />
      <div className="flex items-center gap-4">
        <Link
          to="/login"
          className="flex items-center gap-2 rounded-lg border border-white/20 px-4 py-2 text-sm font-medium text-white transition-all hover:border-white/40 hover:text-[#9b87f5]"
        >
          <FiLogIn className="h-4 w-4" />
          Login
        </Link>
        <Link
          to="/signup"
          className="flex items-center gap-2 rounded-lg bg-[#9b87f5] px-4 py-2 text-sm font-medium text-white transition-all hover:bg-[#7E69AB]"
        >
          <FiUserPlus className="h-4 w-4" />
          Sign Up
        </Link>
      </div>
    </div>
  );
};

const Logo = () => {
  return (
    <div className="text-2xl font-bold text-white">
      Maven<span className="text-[#9b87f5]">.</span>
    </div>
  );
};

const CenterCopy = () => {
  return (
    <div className="flex items-center justify-center px-4 text-center">
      <div className="max-w-4xl">
        <h1 className="mb-6 text-4xl font-bold sm:text-6xl md:text-7xl">
          Build Your Next Big Thing with{" "}
          <span className="bg-gradient-to-r from-[#9b87f5] to-[#D6BCFA] bg-clip-text font-black text-transparent">
            Student Talent
          </span>
        </h1>
        <p className="mb-8 text-lg text-white/60 md:text-xl">
          Access ambitious student developers and marketers ready to help build and launch your product. 
          Get high-quality work at student-friendly rates.
        </p>
        <Link
          to="/signup"
          className="inline-block rounded-full bg-[#9b87f5] px-8 py-4 font-semibold text-white transition-all hover:bg-[#7E69AB]"
        >
          Start Building Today
        </Link>
      </div>
    </div>
  );
};

const ScrollArrow = () => {
  return (
    <>
      <div className="absolute left-4 top-1/2 hidden -translate-y-1/2 text-xs text-white/40 lg:block">
        <span style={{ writingMode: "vertical-lr" }}>SCROLL</span>
        <FiArrowDown className="mx-auto mt-2" />
      </div>
      <div className="absolute right-4 top-1/2 hidden -translate-y-1/2 text-xs text-white/40 lg:block">
        <span style={{ writingMode: "vertical-lr" }}>SCROLL</span>
        <FiArrowDown className="mx-auto mt-2" />
      </div>
    </>
  );
};

export default VelocityHero;