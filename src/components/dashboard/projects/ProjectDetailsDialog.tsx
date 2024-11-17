import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Project, ProjectStatus } from "@/integrations/supabase/types/project";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Calendar, Users, Target, Coins } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { Profile } from "@/integrations/supabase/types/profile";
import { parseBusinessInfo } from "@/utils/typeConversions";
import { useToast } from "@/components/ui/use-toast";
import { FigmaEmbed } from "@/components/projects/FigmaEmbed";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/components/auth/AuthProvider";

interface ProjectDetailsDialogProps {
  project: Project;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ProjectDetailsDialog = ({ project, open, onOpenChange }: ProjectDetailsDialogProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { session } = useAuth();
  const isFounder = session?.user?.id === project.founder_id;

  const { data: founder, isLoading: loadingFounder } = useQuery({
    queryKey: ["founder", project.founder_id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", project.founder_id)
        .single();
      
      if (error) throw error;
      
      return {
        ...data,
        business: parseBusinessInfo(data.business)
      } as Profile;
    },
    enabled: open,
  });

  const updateProjectStatus = useMutation({
    mutationFn: async (status: ProjectStatus) => {
      const { error } = await supabase
        .from("founder_projects")
        .update({ status })
        .eq("id", project.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["my-projects"] });
      toast({
        title: "Success",
        description: "Project status updated successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update project status",
        variant: "destructive",
      });
    },
  });

  const handleContactClick = () => {
    navigate(`/dashboard/chat`, { state: { selectedFounder: project.founder_id } });
    onOpenChange(false);
  };

  const projectStatuses: { value: ProjectStatus; label: string }[] = [
    { value: "active", label: "Active" },
    { value: "draft", label: "Not Active" },
    { value: "completed", label: "Completed" },
    { value: "archived", label: "Archived" }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        {loadingFounder ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : (
          <ScrollArea className="max-h-[80vh]">
            <div className="space-y-6">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold">{project.title}</h2>
                  <p className="text-gray-500">Posted by {founder?.full_name}</p>
                </div>
                {isFounder ? (
                  <Select
                    value={project.status}
                    onValueChange={(value: ProjectStatus) => updateProjectStatus.mutate(value)}
                  >
                    <SelectTrigger className="w-[140px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {projectStatuses.map((status) => (
                        <SelectItem key={status.value} value={status.value}>
                          {status.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <Badge variant="secondary">{project.status}</Badge>
                )}
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Project Description</h3>
                  <p className="text-gray-700 whitespace-pre-wrap">{project.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="h-4 w-4" />
                      <span>Timeline: {project.timeline}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Target className="h-4 w-4" />
                      <span>Target Audience: {project.target_audience}</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    {project.budget && (
                      <div className="flex items-center gap-2 text-gray-600">
                        <Coins className="h-4 w-4" />
                        <span>Budget: {project.budget}</span>
                      </div>
                    )}
                  </div>
                </div>

                {project.goals && project.goals.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold">Project Goals</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      {project.goals.map((goal, index) => (
                        <li key={index} className="text-gray-700">{goal}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {founder?.business && (
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold">Business Information</h3>
                    <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                      {Object.entries(founder.business).map(([key, value]) => (
                        <div key={key} className="text-sm">
                          <span className="font-medium capitalize">{key.replace(/_/g, ' ')}: </span>
                          <span className="text-gray-700">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {project.figma_files && project.figma_files.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Figma Files</h3>
                    <div className="space-y-6">
                      {project.figma_files.map((file: { url: string; title: string }, index: number) => (
                        <FigmaEmbed key={index} url={file.url} title={file.title} />
                      ))}
                    </div>
                  </div>
                )}

                {!isFounder && (
                  <Button onClick={handleContactClick} className="w-full">
                    Contact Founder
                  </Button>
                )}
              </div>
            </div>
          </ScrollArea>
        )}
      </DialogContent>
    </Dialog>
  );
};
