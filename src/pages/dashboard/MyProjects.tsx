import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Project } from "@/integrations/supabase/types/project";
import { useAuth } from "@/components/auth/AuthProvider";
import { ProjectCard } from "@/components/dashboard/projects/ProjectCard";
import { ProjectDetailsDialog } from "@/components/dashboard/projects/ProjectDetailsDialog";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";

const MyProjects = () => {
  const { session } = useAuth();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedTab, setSelectedTab] = useState(1);

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

  const TAB_DATA = [
    {
      id: 1,
      title: "Active",
      status: "active",
      color: "bg-green-600",
      borderColor: "border-green-600",
      textColor: "text-green-600",
    },
    {
      id: 2,
      title: "Not Active",
      status: "draft",
      color: "bg-red-500",
      borderColor: "border-red-500",
      textColor: "text-red-500",
    },
    {
      id: 3,
      title: "Completed",
      status: "completed",
      color: "bg-blue-600",
      borderColor: "border-blue-600",
      textColor: "text-blue-600",
    },
    {
      id: 4,
      title: "Archived",
      status: "archived",
      color: "bg-gray-500",
      borderColor: "border-gray-500",
      textColor: "text-gray-500",
    },
  ];

  const ToggleButton = ({
    children,
    id,
  }: {
    children: string;
    id: number;
  }) => {
    const tab = TAB_DATA.find((t) => t.id === id);
    return (
      <div
        className={`rounded-lg transition-colors ${
          selectedTab === id ? tab?.color : "bg-zinc-900"
        }`}
      >
        <button
          onClick={() => setSelectedTab(id)}
          className={`w-full origin-top-left rounded-lg border py-3 text-xs font-medium transition-all md:text-base ${
            selectedTab === id
              ? `-translate-y-1 ${tab?.borderColor} bg-white ${tab?.textColor}`
              : "border-zinc-900 bg-white text-zinc-900 hover:-rotate-2"
          }`}
        >
          {children}
        </button>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const currentTab = TAB_DATA.find((tab) => tab.id === selectedTab);
  const currentProjects = projectsByStatus[currentTab?.status as keyof typeof projectsByStatus] || [];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">My Projects</h1>
        <Badge variant="outline" className="px-3 py-1">
          {projects?.length || 0} Total Projects
        </Badge>
      </div>

      <div className="bg-zinc-50">
        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-4 px-8 py-12 lg:grid-cols-4">
          {TAB_DATA.map((tab) => (
            <ToggleButton key={tab.id} id={tab.id}>
              {tab.title}
            </ToggleButton>
          ))}
        </div>
      </div>

      <div className="mt-8">
        {currentProjects.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No {currentTab?.status} projects found
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onProjectClick={() => setSelectedProject(project)}
                isMyProject={true}
              />
            ))}
          </div>
        )}
      </div>

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