import React, { useState } from "react";
import { X, ChevronDown, CheckCircle2, ChevronUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/auth/AuthProvider";
import { Profile } from "@/integrations/supabase/types/profile";
import { Json } from "@/integrations/supabase/types";
import { parseBusinessInfo } from "@/utils/typeConversions";

export const GettingStartedGuide = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();
  const { session } = useAuth();

  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session?.user.id)
        .single();

      if (error) throw error;
      
      return {
        ...data,
        business: parseBusinessInfo(data.business)
      } as Profile;
    },
  });

  const isProfileComplete = profile?.business && Object.values(profile.business).some(value => value !== null && value !== '');
  const progress = [isProfileComplete].filter(Boolean).length * 25;

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-0 right-4 md:right-8 z-50">
      <AnimatePresence>
        {!isCollapsed ? (
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="w-[90vw] max-w-[400px] bg-white rounded-t-xl border border-border shadow-lg"
          >
            <div className="flex justify-between items-start p-6 pb-0">
              <h2 className="text-neutral-950 font-title text-lg">Getting Started</h2>
              <div className="flex gap-2">
                <ChevronDown 
                  className="text-neutral-400 cursor-pointer hover:text-neutral-600" 
                  onClick={() => setIsCollapsed(true)}
                />
                <X 
                  className="text-neutral-400 cursor-pointer hover:text-neutral-600" 
                  onClick={() => setIsOpen(false)}
                />
              </div>
            </div>
            <div className="p-6">
              <p className="text-neutral-500 text-sm mb-4">Complete these steps to get started with Maven</p>
              
              <div className="w-full h-2 bg-neutral-200 rounded-full mb-1">
                <div 
                  className="bg-secondary h-full rounded-full transition-all duration-500" 
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-neutral-500 text-xs mb-6">{progress}% Completed</p>

              <details className="mb-6 group" open={!isProfileComplete}>
                <summary className="flex justify-between items-center cursor-pointer">
                  <div className="flex items-center gap-2">
                    <div className={`w-[34px] h-[34px] ${isProfileComplete ? 'bg-green-500' : 'bg-secondary/10'} rounded-full flex items-center justify-center`}>
                      <CheckCircle2 className={`w-5 h-5 ${isProfileComplete ? 'text-white' : 'text-secondary'}`} />
                    </div>
                    <div>
                      <p className="text-neutral-950 font-medium">Complete Business Profile</p>
                      <p className="text-neutral-500 text-sm">Add your company details</p>
                    </div>
                  </div>
                  <ChevronDown className="text-neutral-400 group-open:rotate-180 transition-transform" />
                </summary>
                <div className="pl-12 pr-4 mt-4">
                  <p className="text-neutral-500 text-sm mb-4">Help us understand your business better by completing your company profile</p>
                  <div className="flex gap-4">
                    <button 
                      onClick={() => navigate("/dashboard/profile")}
                      className="bg-secondary text-white rounded-md py-2 px-4 hover:bg-secondary/90 transition-colors"
                    >
                      Complete Profile
                    </button>
                  </div>
                </div>
              </details>

              <details className="mb-6 group">
                <summary className="flex justify-between items-center cursor-pointer">
                  <div className="flex items-center gap-2">
                    <div className="w-[34px] h-[34px] bg-secondary/10 rounded-full flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5 text-secondary" />
                    </div>
                    <div>
                      <p className="text-neutral-950 font-medium">Create Your First Project</p>
                      <p className="text-neutral-500 text-sm">Define what you need help with</p>
                    </div>
                  </div>
                  <ChevronDown className="text-neutral-400 group-open:rotate-180 transition-transform" />
                </summary>
                <div className="pl-12 pr-4 mt-4">
                  <p className="text-neutral-500 text-sm mb-4">Create a project to start collaborating with Mavens</p>
                  <div className="flex gap-4">
                    <button 
                      onClick={() => navigate("/dashboard/tasks")}
                      className="bg-secondary text-white rounded-md py-2 px-4 hover:bg-secondary/90 transition-colors"
                    >
                      Create Project
                    </button>
                  </div>
                </div>
              </details>

              <details className="mb-6 group">
                <summary className="flex justify-between items-center cursor-pointer">
                  <div className="flex items-center gap-2">
                    <div className="w-[34px] h-[34px] bg-secondary/10 rounded-full flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5 text-secondary" />
                    </div>
                    <div>
                      <p className="text-neutral-950 font-medium">Browse Mavens</p>
                      <p className="text-neutral-500 text-sm">Find the perfect Maven for your needs</p>
                    </div>
                  </div>
                  <ChevronDown className="text-neutral-400 group-open:rotate-180 transition-transform" />
                </summary>
                <div className="pl-12 pr-4 mt-4">
                  <p className="text-neutral-500 text-sm mb-4">Explore our marketplace of skilled Mavens ready to help</p>
                  <div className="flex gap-4">
                    <button 
                      onClick={() => navigate("/dashboard/marketplace")}
                      className="bg-secondary text-white rounded-md py-2 px-4 hover:bg-secondary/90 transition-colors"
                    >
                      View Marketplace
                    </button>
                  </div>
                </div>
              </details>

              <details className="mb-6 group">
                <summary className="flex justify-between items-center cursor-pointer">
                  <div className="flex items-center gap-2">
                    <div className="w-[34px] h-[34px] bg-secondary/10 rounded-full flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5 text-secondary" />
                    </div>
                    <div>
                      <p className="text-neutral-950 font-medium">Set Up Integrations</p>
                      <p className="text-neutral-500 text-sm">Connect your favorite tools</p>
                    </div>
                  </div>
                  <ChevronDown className="text-neutral-400 group-open:rotate-180 transition-transform" />
                </summary>
                <div className="pl-12 pr-4 mt-4">
                  <p className="text-neutral-500 text-sm mb-4">Connect tools like Slack and Jira to streamline your workflow</p>
                  <div className="flex gap-4">
                    <button 
                      onClick={() => navigate("/dashboard/integrations")}
                      className="bg-secondary text-white rounded-md py-2 px-4 hover:bg-secondary/90 transition-colors"
                    >
                      Set Up Integrations
                    </button>
                  </div>
                </div>
              </details>

              <div className="text-center text-neutral-500 text-xs mt-8">
                <p>Powered by Maven</p>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.button
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            onClick={() => setIsCollapsed(false)}
            className="bg-white rounded-t-xl border border-border shadow-lg px-6 py-3 flex items-center gap-2"
          >
            <ChevronUp className="w-5 h-5" />
            <span>Getting Started Guide</span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};
