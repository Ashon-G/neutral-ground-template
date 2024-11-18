import { useState } from "react";
import { X, ChevronDown, ChevronUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/auth/AuthProvider";
import { Profile } from "@/integrations/supabase/types/profile";
import { Accordion } from "@/components/ui/accordion";
import { GettingStartedProgress } from "./GettingStartedProgress";
import { GettingStartedTask } from "./GettingStartedTask";

export const MavenGettingStartedGuide = () => {
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
      return data as Profile;
    },
  });

  const { data: hasReachedOut } = useQuery({
    queryKey: ["maven-outreach"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("messages")
        .select("id")
        .eq("sender_id", session?.user.id)
        .limit(1);

      if (error) throw error;
      return data.length > 0;
    },
  });

  const isProfileComplete = profile?.bio && 
    profile?.location && 
    profile?.linkedin_profile && 
    profile?.maven_skillset;

  const progress = [isProfileComplete, hasReachedOut].filter(Boolean).length * 50;

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
            <div className="flex justify-between items-center p-3">
              <h2 className="text-neutral-950 font-title text-base">Getting Started</h2>
              <div className="flex gap-1">
                <button 
                  onClick={() => setIsCollapsed(true)}
                  className="p-1 hover:bg-gray-100 rounded-md transition-colors"
                >
                  <ChevronDown className="h-4 w-4 text-neutral-400" />
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-gray-100 rounded-md transition-colors"
                >
                  <X className="h-4 w-4 text-neutral-400" />
                </button>
              </div>
            </div>
            <div className="px-3 pb-3">
              <p className="text-neutral-500 text-xs mb-3">Complete these steps to get started as a Maven</p>
              
              <GettingStartedProgress progress={progress} />

              <Accordion type="single" collapsible className="mt-3">
                <GettingStartedTask
                  value="profile"
                  title="Complete Your Profile"
                  description="Add your skills and experience"
                  isCompleted={isProfileComplete}
                  buttonText="Complete Profile"
                  onAction={() => navigate("/dashboard/profile")}
                />

                <GettingStartedTask
                  value="outreach"
                  title="Connect with Founders"
                  description="Browse and apply to projects"
                  isCompleted={hasReachedOut}
                  buttonText="View Projects"
                  onAction={() => navigate("/dashboard/project-marketplace")}
                />
              </Accordion>

              <div className="text-center text-neutral-500 text-xs mt-3">
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
            className="bg-white rounded-t-xl border border-border shadow-lg px-3 py-2 flex items-center gap-2"
          >
            <ChevronUp className="h-4 w-4" />
            <span className="text-sm">Getting Started Guide</span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};