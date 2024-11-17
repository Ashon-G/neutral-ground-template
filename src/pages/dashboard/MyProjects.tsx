import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Project } from "@/integrations/supabase/types/project";
import { useAuth } from "@/components/auth/AuthProvider";
import { ProjectCard } from "@/components/dashboard/projects/ProjectCard";
import { ProjectDetailsDialog } from "@/components/dashboard/projects/ProjectDetailsDialog";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2 } from "lucide-react";

const MyProjects = () => {
  const { session } = useAuth();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const { data: projects, isLoading } = useQuery({
    queryKey: ["my-projects", session?.user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("founder_projects")
        .select("*")
        .eq("founder_id", session?.user?.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Project[];
    },
    enabled: !!session?.user?.id,
  });

  const projectsByStatus = {
    active: projects?.filter((p) => p.status === "active") || [],
    draft: projects?.filter((p) => p.status === "draft") || [],
    completed: projects?.filter((p) => p.status === "completed") || [],
    archived: projects?.filter((p) => p.status === "archived") || [],
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">My Projects</h1>
        <Badge variant="outline" className="px-3 py-1">
          {projects?.length || 0} Total Projects
        </Badge>
      </div>

      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid w-full grid-cols-4 lg:w-[400px]">
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="draft">Not Active</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="archived">Archived</TabsTrigger>
        </TabsList>

        {Object.entries(projectsByStatus).map(([status, statusProjects]) => (
          <TabsContent key={status} value={status}>
            {statusProjects.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No {status} projects found
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {statusProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onProjectClick={() => setSelectedProject(project)}
                  />
                ))}
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>

      {selectedProject && (
        <ProjectDetailsDialog
          project={selectedProject}
          open={!!selectedProject}
          onOpenChange={(open) => !open && setSelectedProject(null)}
        />
      )}
    </div>
  );
};

export default MyProjects;