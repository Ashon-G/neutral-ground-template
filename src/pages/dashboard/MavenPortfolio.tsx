import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/auth/AuthProvider";
import { Card } from "@/components/ui/card";
import { calculateRating } from "@/utils/calculateRating";
import { format } from "date-fns";

const MavenPortfolio = () => {
  const { session } = useAuth();

  const { data: projects } = useQuery({
    queryKey: ["maven-portfolio"],
    queryFn: async () => {
      // Get all tasks assigned to the maven
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
      const projectMap = new Map();
      tasks?.forEach((task) => {
        if (!task.project) return;
        
        if (!projectMap.has(task.project.id)) {
          projectMap.set(task.project.id, {
            ...task.project,
            tasks: [],
            ratings: [],
          });
        }
        
        const project = projectMap.get(task.project.id);
        project.tasks.push(task);
        if (task.ratings) {
          project.ratings.push(...task.ratings);
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
      <h1 className="text-3xl font-bold">Your Portfolio</h1>
      
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