import { useState } from "react";
import { X, ChevronDown, ChevronUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/auth/AuthProvider";
import { Profile } from "@/integrations/supabase/types/profile";
import { parseBusinessInfo } from "@/utils/typeConversions";
import { Accordion } from "@/components/ui/accordion";
import { GettingStartedProgress } from "./getting-started/GettingStartedProgress";
import { GettingStartedTask } from "./getting-started/GettingStartedTask";

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

  const { data: projects } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("founder_projects")
        .select("*")
        .eq("founder_id", session?.user.id);

      if (error) throw error;
      return data;
    },
  });

  const { data: integrations } = useQuery({
    queryKey: ["integrations"],
    queryFn: async () => {
      const [{ data: figma }, { data: slack }, { data: jira }] = await Promise.all([
        supabase
          .from("figma_integrations")
          .select("*")
          .eq("user_id", session?.user.id),
        supabase
          .from("slack_integrations")
          .select("*")
          .eq("user_id", session?.user.id),
        supabase
          .from("jira_integrations")
          .select("*")
          .eq("user_id", session?.user.id)
      ]);
      
      return {
        hasIntegrations: Boolean(
          (figma && figma.length > 0) || 
          (slack && slack.length > 0) || 
          (jira && jira.length > 0)
        )
      };
    },
    enabled: !!session?.user.id
  });

  const isProfileComplete = profile?.business && Object.values(profile.business).some(value => value !== null && value !== '');
  const hasCreatedProject = projects && projects.length > 0;
  const hasSetupIntegrations = integrations?.hasIntegrations;
  
  const progress = [
    isProfileComplete, 
    hasCreatedProject, 
    hasSetupIntegrations
  ].filter(Boolean).length * 25;

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
              <p className="text-neutral-500 text-xs mb-3">Complete these steps to get started with Maven</p>
              
              <GettingStartedProgress progress={progress} />

              <Accordion type="single" collapsible className="mt-3">
                <GettingStartedTask
                  value="profile"
                  title="Complete Business Profile"
                  description="Add your company details"
                  isCompleted={isProfileComplete}
                  buttonText="Complete Profile"
                  onAction={() => navigate("/dashboard/profile")}
                />

                <GettingStartedTask
                  value="project"
                  title="Create Your First Project"
                  description="Define what you need help with"
                  isCompleted={hasCreatedProject}
                  buttonText="Create Project"
                  onAction={() => navigate("/dashboard/create-project")}
                />

                <GettingStartedTask
                  value="marketplace"
                  title="Browse Mavens"
                  description="Find the perfect Maven for your needs"
                  isCompleted={false}
                  buttonText="View Marketplace"
                  onAction={() => navigate("/dashboard/marketplace")}
                />

                <GettingStartedTask
                  value="integrations"
                  title="Set Up Integrations"
                  description="Connect your favorite tools"
                  isCompleted={hasSetupIntegrations}
                  buttonText="Set Up Integrations"
                  onAction={() => navigate("/dashboard/integrations")}
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