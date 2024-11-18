import { Project } from "@/integrations/supabase/types/project";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageSquare, Calendar, Target, Clock, Coins } from "lucide-react";
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "draft":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      case "archived":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-secondary/10 text-secondary";
    }
  };

  return (
    <Card 
      className="group w-full overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-border"
      onClick={onProjectClick}
    >
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
                {project.title}
              </h3>
              <Badge 
                variant="secondary" 
                className={`${getStatusColor(project.status)} px-2 py-0.5 text-xs font-medium capitalize`}
              >
                {project.status}
              </Badge>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="h-4 w-4 text-gray-400" />
                <span className="line-clamp-1">{project.timeline || "Timeline not specified"}</span>
              </div>
              {project.target_audience && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Target className="h-4 w-4 text-gray-400" />
                  <span className="line-clamp-1">{project.target_audience}</span>
                </div>
              )}
              {project.budget && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Coins className="h-4 w-4 text-gray-400" />
                  <span className="line-clamp-1">{project.budget}</span>
                </div>
              )}
            </div>

            <p className="text-sm text-gray-600 line-clamp-2 mb-4">
              {project.description}
            </p>
          </div>
        </div>

        {!isMyProject && (
          <Button 
            onClick={handleChatClick}
            variant="secondary" 
            size="sm" 
            className="w-full mt-2 bg-secondary hover:bg-secondary/90 text-white"
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            Chat with Founder
          </Button>
        )}
      </CardContent>
    </Card>
  );
};