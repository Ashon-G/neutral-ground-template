import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/auth/AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import { GenerateTasksButton } from "./GenerateTasksButton";
import { Loader2, HelpCircle } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { ProjectBasicFields } from "./form/ProjectBasicFields";
import { ProjectGoals } from "./form/ProjectGoals";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion } from "framer-motion";

const STORAGE_KEY = "project_form_data";

export const ProjectForm = () => {
  const { session } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [projectId, setProjectId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    goals: [""],
    target_audience: "",
    timeline: "",
  });

  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setFormData(parsedData);
      } catch (error) {
        console.error("Error parsing saved form data:", error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  }, [formData]);

  const handleFieldChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleGoalChange = (index: number, value: string) => {
    const newGoals = [...formData.goals];
    newGoals[index] = value;
    setFormData({ ...formData, goals: newGoals });
  };

  const addGoal = () => {
    setFormData({ ...formData, goals: [...formData.goals, ""] });
  };

  const removeGoal = (index: number) => {
    const newGoals = formData.goals.filter((_, i) => i !== index);
    setFormData({ ...formData, goals: newGoals });
  };

  const isStepComplete = (step: number) => {
    switch (step) {
      case 1:
        return formData.title.trim() !== "" && formData.description.trim() !== "";
      case 2:
        return formData.goals.some(goal => goal.trim() !== "");
      case 3:
        return formData.target_audience.trim() !== "" && formData.timeline.trim() !== "";
      default:
        return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const { data, error } = await supabase
        .from("founder_projects")
        .insert({
          ...formData,
          founder_id: session?.user.id,
        })
        .select()
        .single();

      if (error) throw error;

      setProjectId(data.id);
      localStorage.removeItem(STORAGE_KEY);
      
      queryClient.invalidateQueries({ queryKey: ["projects"] });

      toast({
        title: "🎉 Project Created Successfully!",
        description: "Your project has been created. You can now start adding tasks.",
      });
    } catch (error) {
      console.error("Error creating project:", error);
      toast({
        title: "Error",
        description: "Failed to create project. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    if (currentStep < 3 && isStepComplete(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  return (
    <motion.form 
      onSubmit={handleSubmit}
      className="space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold">
            Step {currentStep} of 3
          </h2>
          <Tooltip>
            <TooltipTrigger>
              <HelpCircle className="h-4 w-4 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-xs">
                Fill out each section carefully. You can always come back and edit later.
              </p>
            </TooltipContent>
          </Tooltip>
        </div>
        <div className="flex gap-2">
          {Array.from({ length: 3 }, (_, i) => (
            <div
              key={i}
              className={`h-2 w-16 rounded-full transition-colors ${
                i + 1 === currentStep
                  ? "bg-secondary"
                  : i + 1 < currentStep
                  ? "bg-muted-foreground"
                  : "bg-muted"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="space-y-8">
        {currentStep === 1 && (
          <ProjectBasicFields
            title={formData.title}
            description={formData.description}
            targetAudience={formData.target_audience}
            timeline={formData.timeline}
            onChange={handleFieldChange}
          />
        )}

        {currentStep === 2 && (
          <ProjectGoals
            goals={formData.goals}
            onGoalChange={handleGoalChange}
            onAddGoal={addGoal}
            onRemoveGoal={removeGoal}
          />
        )}

        {currentStep === 3 && (
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Final Details</h3>
              <ProjectBasicFields
                title={formData.title}
                description={formData.description}
                targetAudience={formData.target_audience}
                timeline={formData.timeline}
                onChange={handleFieldChange}
                hideBasic
              />
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-between pt-6 border-t">
        <Button
          type="button"
          variant="outline"
          onClick={prevStep}
          disabled={currentStep === 1}
        >
          Previous
        </Button>

        {currentStep < 3 ? (
          <Button
            type="button"
            onClick={nextStep}
            disabled={!isStepComplete(currentStep)}
          >
            Next Step
          </Button>
        ) : (
          <div className="flex gap-4">
            <Button type="submit" disabled={isSubmitting || !isStepComplete(currentStep)}>
              {isSubmitting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              Create Project
            </Button>
            {projectId && session?.user.id && (
              <GenerateTasksButton
                projectId={projectId}
                founderId={session.user.id}
              />
            )}
          </div>
        )}
      </div>
    </motion.form>
  );
};