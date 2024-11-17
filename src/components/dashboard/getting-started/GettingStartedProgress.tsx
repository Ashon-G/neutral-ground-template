import { motion } from "framer-motion";

interface GettingStartedProgressProps {
  progress: number;
}

export const GettingStartedProgress = ({ progress }: GettingStartedProgressProps) => {
  return (
    <>
      <div className="w-full h-2 bg-neutral-200 rounded-full mb-1">
        <div 
          className="bg-secondary h-full rounded-full transition-all duration-500" 
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-neutral-500 text-xs mb-6">{progress}% Completed</p>
    </>
  );
};