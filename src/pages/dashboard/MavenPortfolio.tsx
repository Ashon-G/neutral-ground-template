import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/auth/AuthProvider";
import { CertificationCard } from "@/components/portfolio/CertificationCard";
import { ProjectCard } from "@/components/portfolio/ProjectCard";
import { Project } from "@/integrations/supabase/types/project";
import { Task } from "@/integrations/supabase/types/task";

interface ProjectWithTasksAndRatings extends Omit<Project, 'documents' | 'figma_files'> {
  documents: string[];
  figma_files: { url: string; title: string }[];
  tasks: (Task & {
    ratings: Array<{
      rating: number;
      feedback: string | null;
    }>;
  })[];
  ratings: Array<{
    rating: number;
    feedback: string | null;
  }>;
}

const MavenPortfolio = () => {
  const { session } = useAuth();

  const { data: projects } = useQuery<ProjectWithTasksAndRatings[]>({
    queryKey: ["maven-portfolio"],
    queryFn: async () => {
      const { data: tasks, error: tasksError } = await supabase
        .from("tasks")
        .select(`
          *,
          project:founder_projects(*),
          ratings:task_ratings(*)
        `)
        .eq("assigned_to", session?.user.id)
        .eq("status", "completed");

      if (tasksError) throw tasksError;

      // Group tasks by project
      const projectMap = new Map<string, ProjectWithTasksAndRatings>();
      
      tasks?.forEach((task) => {
        if (!task.project?.[0]) return;
        const project = task.project[0];
        
        if (!projectMap.has(project.id)) {
          projectMap.set(project.id, {
            ...project,
            documents: Array.isArray(project.documents) ? project.documents.map(doc => String(doc)) : [],
            figma_files: Array.isArray(project.figma_files) 
              ? project.figma_files.map(file => {
                  if (typeof file === 'object' && file !== null && 'url' in file && 'title' in file) {
                    return {
                      url: String(file.url || ''),
                      title: String(file.title || '')
                    };
                  }
                  return { url: '', title: '' };
                })
              : [],
            tasks: [],
            ratings: [],
          });
        }
        
        const projectWithTasks = projectMap.get(project.id);
        if (projectWithTasks) {
          projectWithTasks.tasks.push({
            ...task,
            ratings: Array.isArray(task.ratings) ? task.ratings : []
          });
          if (Array.isArray(task.ratings)) {
            projectWithTasks.ratings.push(...task.ratings);
          }
        }
      });

      return Array.from(projectMap.values());
    },
    enabled: !!session?.user.id,
  });

  if (!projects?.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <h2 className="text-2xl font-semibold mb-2">No Projects Yet</h2>
        <p className="text-muted-foreground">
          Complete tasks to build your portfolio and showcase your work.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-start">
        <h1 className="text-3xl font-bold">Your Portfolio</h1>
        <CertificationCard />
      </div>
      
      <div className="grid gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};

export default MavenPortfolio;