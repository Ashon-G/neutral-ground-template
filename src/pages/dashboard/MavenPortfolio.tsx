import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/auth/AuthProvider";
import { 
  Card,
  Button,
} from "@/components/ui/card";
import { calculateRating } from "@/utils/calculateRating";
import { format } from "date-fns";
import { Project } from "@/integrations/supabase/types/project";
import { Task } from "@/integrations/supabase/types/task";
import { Trophy } from "lucide-react";

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

const CertificationCard = () => {
  return (
    <Card className="max-w-[340px] mb-6">
      <div className="p-6 pb-0">
        <Trophy className="w-12 h-12 text-primary mb-4" />
        <h3 className="text-xl font-semibold">
          Maven Excellence Certificate
        </h3>
      </div>
      <div className="p-6">
        <p className="text-muted-foreground mt-2">
          Each completed project earns you a Maven Excellence Certificate. Add it to your LinkedIn 
          profile or resume to showcase your verified expertise and successful project deliveries.
        </p>
        <div className="mt-4">
          <Button
            variant="outline"
            className="h-12 px-6 rounded-xl hover:bg-primary/5"
          >
            View Sample Certificate
          </Button>
        </div>
      </div>
    </Card>
  );
};

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
        {projects.map((project) => {
          const projectRating = calculateRating(
            project.ratings.map(r => ({ rating: r.rating, weight: 1 }))
          );

          return (
            <Card key={project.id} className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
                  <p className="text-muted-foreground">{project.description}</p>
                </div>
                {projectRating > 0 && (
                  <div className="text-right">
                    <div className="text-2xl font-bold text-secondary">
                      {projectRating.toFixed(1)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Overall Rating
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Completed Tasks</h3>
                {project.tasks.map((task) => {
                  const taskRating = task.ratings?.[0];
                  return (
                    <div key={task.id} className="border-t pt-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{task.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {task.description}
                          </p>
                          <div className="text-sm text-muted-foreground mt-1">
                            Completed on {format(new Date(task.end_date || task.created_at), "MMM d, yyyy")}
                          </div>
                        </div>
                        {taskRating && (
                          <div className="text-right">
                            <div className="font-semibold text-secondary">
                              {taskRating.rating}/5
                            </div>
                            {taskRating.feedback && (
                              <p className="text-sm text-muted-foreground max-w-[300px] text-right">
                                "{taskRating.feedback}"
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default MavenPortfolio;