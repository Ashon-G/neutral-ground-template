import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Project } from "@/integrations/supabase/types/project";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { ProjectCard } from "@/components/dashboard/projects/ProjectCard";
import { ProjectDetailsDialog } from "@/components/dashboard/projects/ProjectDetailsDialog";

const ProjectMarketplace = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const { data: projects } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("founder_projects")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Project[];
    },
  });

  const filteredProjects = projects?.filter((project) =>
    project.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.target_audience?.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  return (
    <div className="space-y-8 pb-20">
      <div className="bg-gradient-to-r from-blue-600 to-orange-500 animate-gradient-x -mx-4 md:-mx-8 px-4 md:px-8 py-12 mb-8 rounded-2xl">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Find Your Next Project
            </h1>
            <p className="text-white/80 text-lg">
              Browse through available projects and connect with founders
            </p>
          </div>
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 py-6 text-lg rounded-lg border-0 shadow-lg"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onProjectClick={() => setSelectedProject(project)}
          />
        ))}
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

export default ProjectMarketplace;