import { Project } from "@/integrations/supabase/types/project";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageSquare, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/components/auth/AuthProvider";

interface ProjectCardProps {
  project: Project;
  onProjectClick: () => void;
  isMyProject?: boolean;
}

export const ProjectCard = ({ project, onProjectClick, isMyProject }: ProjectCardProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { session } = useAuth();

  const handleChatClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!session) {
      toast({
        title: "Please sign in",
        description: "You need to be signed in to chat with founders",
        variant: "destructive",
      });
      return;
    }

    navigate(`/dashboard/chat`, { state: { selectedFounder: project.founder_id } });
  };

  return (
    <Card 
      className="w-full overflow-hidden cursor-pointer transition-all hover:shadow-lg"
      onClick={onProjectClick}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-medium text-gray-900">
              {project.title}
            </h3>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Calendar className="h-4 w-4" />
              <span>Timeline: {project.timeline}</span>
            </div>
          </div>
          <Badge variant="secondary" className="bg-secondary/10 text-secondary">
            {project.status}
          </Badge>
        </div>

        <p className="mt-3 text-sm text-gray-600 line-clamp-3">
          {project.description}
        </p>

        <div className="mt-4 space-y-2">
          <div className="text-sm text-gray-600">
            <strong>Target Audience:</strong> {project.target_audience}
          </div>
          {project.budget && (
            <div className="text-sm text-gray-600">
              <strong>Budget:</strong> {project.budget}
            </div>
          )}
        </div>

        {!isMyProject && (
          <Button 
            onClick={handleChatClick}
            variant="secondary" 
            size="sm" 
            className="w-full mt-4"
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            Chat with Founder
          </Button>
        )}
      </CardContent>
    </Card>
  );
};