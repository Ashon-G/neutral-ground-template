import { Project } from "@/integrations/supabase/types/project";
import { Calendar, Target, Coins } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { FigmaEmbed } from "@/components/projects/FigmaEmbed";

interface ProjectContentProps {
  project: Project;
  isEditing: boolean;
  editedDescription: string;
  editedTargetAudience: string;
  editedTimeline: string;
  editedBudget: string;
  onDescriptionChange: (value: string) => void;
  onTargetAudienceChange: (value: string) => void;
  onTimelineChange: (value: string) => void;
  onBudgetChange: (value: string) => void;
}

export const ProjectContent = ({
  project,
  isEditing,
  editedDescription,
  editedTargetAudience,
  editedTimeline,
  editedBudget,
  onDescriptionChange,
  onTargetAudienceChange,
  onTimelineChange,
  onBudgetChange,
}: ProjectContentProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Project Description</h3>
        {isEditing ? (
          <Textarea
            value={editedDescription}
            onChange={(e) => onDescriptionChange(e.target.value)}
            className="min-h-[100px]"
          />
        ) : (
          <p className="text-gray-700 whitespace-pre-wrap">{project.description}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-gray-600">
            <Calendar className="h-4 w-4" />
            {isEditing ? (
              <Input
                value={editedTimeline}
                onChange={(e) => onTimelineChange(e.target.value)}
                placeholder="Timeline"
              />
            ) : (
              <span>Timeline: {project.timeline}</span>
            )}
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Target className="h-4 w-4" />
            {isEditing ? (
              <Input
                value={editedTargetAudience}
                onChange={(e) => onTargetAudienceChange(e.target.value)}
                placeholder="Target Audience"
              />
            ) : (
              <span>Target Audience: {project.target_audience}</span>
            )}
          </div>
        </div>
        <div className="space-y-1">
          {(project.budget || isEditing) && (
            <div className="flex items-center gap-2 text-gray-600">
              <Coins className="h-4 w-4" />
              {isEditing ? (
                <Input
                  value={editedBudget}
                  onChange={(e) => onBudgetChange(e.target.value)}
                  placeholder="Budget"
                />
              ) : (
                <span>Budget: {project.budget}</span>
              )}
            </div>
          )}
        </div>
      </div>

      {project.goals && project.goals.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Project Goals</h3>
          <ul className="list-disc pl-5 space-y-1">
            {project.goals.map((goal, index) => (
              <li key={index} className="text-gray-700">{goal}</li>
            ))}
          </ul>
        </div>
      )}

      {project.figma_files && project.figma_files.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Figma Files</h3>
          <div className="space-y-6">
            {project.figma_files.map((file: { url: string; title: string }, index: number) => (
              <FigmaEmbed key={index} url={file.url} title={file.title} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};