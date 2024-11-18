import { Card } from "@/components/ui/card";
import { format } from "date-fns";
import { calculateRating } from "@/utils/calculateRating";
import { Task } from "@/integrations/supabase/types/task";

interface ProjectCardProps {
  project: {
    id: string;
    title: string;
    description: string;
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
  };
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
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
};