import React from "react";
import { motion } from "framer-motion";
import { IntegrationsBlock } from "./IntegrationsBlock";
import { CollaborateBlock } from "./CollaborateBlock";
import { HighlighBlocks } from "./HighlighBlocks";
import { SectionHeading } from "../shared/SectionHeading";
import { SectionSubheading } from "../shared/SectionSubheading";
import { Button } from "@/components/ui/button";

export const BenefitsGrid = () => {
  return (
    <motion.section
      transition={{
        staggerChildren: 0.1,
      }}
      initial="initial"
      whileInView="whileInView"
      className="relative mx-auto grid max-w-6xl grid-cols-3 gap-4 px-2 md:px-4"
    >
      <div className="col-span-3">
        <SectionHeading>Accelerate Your Startup Growth</SectionHeading>
        <SectionSubheading className="text-black">
          From early-stage startups to VC-backed companies, discover how Maven helps you scale faster and more efficiently.
        </SectionSubheading>
      </div>
      <IntegrationsBlock />
      <CollaborateBlock />
      <HighlighBlocks />
      <div className="col-span-3 mt-6 flex justify-center">
        <Button variant="outline">
          <span className="font-bold">Get started - </span> no CC required
        </Button>
      </div>
    </motion.section>
  );
};