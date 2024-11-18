import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Project, ProjectStatus } from "@/integrations/supabase/types/project";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Profile } from "@/integrations/supabase/types/profile";
import { parseBusinessInfo } from "@/utils/typeConversions";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/components/auth/AuthProvider";
import { useState } from "react";
import { ProjectHeader } from "./dialog-sections/ProjectHeader";
import { ProjectContent } from "./dialog-sections/ProjectContent";

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

  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(project.title);
  const [editedDescription, setEditedDescription] = useState(project.description);
  const [editedTargetAudience, setEditedTargetAudience] = useState(project.target_audience || "");
  const [editedTimeline, setEditedTimeline] = useState(project.timeline || "");
  const [editedBudget, setEditedBudget] = useState(project.budget || "");
  const [editedImageUrl, setEditedImageUrl] = useState(project.image_url);
  const [editedDocuments, setEditedDocuments] = useState(project.documents || []);
  const [editedFigmaFiles, setEditedFigmaFiles] = useState(project.figma_files || []);

  const handleSave = () => {
    updateProject.mutate({
      title: editedTitle,
      description: editedDescription,
      target_audience: editedTargetAudience,
      timeline: editedTimeline,
      budget: editedBudget,
      image_url: editedImageUrl,
      documents: editedDocuments,
      figma_files: editedFigmaFiles,
    });
  };

  const handleStatusChange = (newStatus: ProjectStatus) => {
    if (newStatus === project.status) return;
    updateProject.mutate({ status: newStatus });
  };

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

  const updateProject = useMutation({
    mutationFn: async (updates: Partial<Project>) => {
      const { error } = await supabase
        .from("founder_projects")
        .update(updates)
        .eq("id", project.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["my-projects"] });
      setIsEditing(false);
      toast({
        title: "Success",
        description: "Project updated successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update project",
        variant: "destructive",
      });
    },
  });

  const handleContactClick = () => {
    navigate(`/dashboard/chat`, { state: { selectedFounder: project.founder_id } });
    onOpenChange(false);
  };

  if (loadingFounder) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <ScrollArea className="max-h-[80vh]">
          <div className="space-y-6">
            <ProjectHeader
              project={project}
              isFounder={isFounder}
              isEditing={isEditing}
              editedTitle={editedTitle}
              onTitleChange={setEditedTitle}
              onStatusChange={handleStatusChange}
              founderName={founder?.full_name}
            />

            <ProjectContent
              project={project}
              isEditing={isEditing}
              editedDescription={editedDescription}
              editedTargetAudience={editedTargetAudience}
              editedTimeline={editedTimeline}
              editedBudget={editedBudget}
              onDescriptionChange={setEditedDescription}
              onTargetAudienceChange={setEditedTargetAudience}
              onTimelineChange={setEditedTimeline}
              onBudgetChange={setEditedBudget}
              onImageChange={setEditedImageUrl}
              onDocumentsChange={setEditedDocuments}
              onFigmaFilesChange={setEditedFigmaFiles}
            />

            {isFounder ? (
              <div className="flex justify-end gap-2">
                {isEditing ? (
                  <>
                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleSave}>
                      Save Changes
                    </Button>
                  </>
                ) : (
                  <Button onClick={() => setIsEditing(true)}>
                    Edit Project
                  </Button>
                )}
              </div>
            ) : (
              <Button onClick={handleContactClick} className="w-full">
                Contact Founder
              </Button>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};