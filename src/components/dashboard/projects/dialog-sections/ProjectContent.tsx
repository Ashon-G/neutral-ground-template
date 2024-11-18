import { Project } from "@/integrations/supabase/types/project";
import { Calendar, Target, Coins } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { FigmaEmbed } from "@/components/projects/FigmaEmbed";
import { ProjectFileUpload } from "@/components/projects/form/ProjectFileUpload";
import { ProjectImageUpload } from "@/components/projects/form/ProjectImageUpload";
import { ProjectFigmaFiles } from "@/components/projects/form/ProjectFigmaFiles";

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
  onImageChange?: (url: string) => void;
  onDocumentsChange?: (urls: string[]) => void;
  onFigmaFilesChange?: (files: { url: string; title: string }[]) => void;
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
  onImageChange,
  onDocumentsChange,
  onFigmaFilesChange,
}: ProjectContentProps) => {
  return (
    <div className="space-y-6">
      {isEditing && (
        <div className="space-y-6 border-b pb-6">
          <ProjectImageUpload
            onImageUploaded={onImageChange}
            existingImage={project.image_url}
          />
          <ProjectFileUpload
            onFileUploaded={onDocumentsChange}
            existingFiles={project.documents}
          />
          <ProjectFigmaFiles
            figmaFiles={project.figma_files || []}
            onChange={onFigmaFilesChange}
          />
        </div>
      )}

      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Project Description</h3>
        {isEditing ? (
          <Textarea
            value={editedDescription}
            onChange={(e) => onDescriptionChange(e.target.value)}
            className="min-h-[100px]"
            placeholder="Describe your project in detail..."
          />
        ) : (
          <p className="text-gray-700 whitespace-pre-wrap">{project.description}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar className="h-4 w-4" />
              {isEditing ? (
                <Input
                  value={editedTimeline}
                  onChange={(e) => onTimelineChange(e.target.value)}
                  placeholder="Project timeline"
                />
              ) : (
                <span>Timeline: {project.timeline || "Not specified"}</span>
              )}
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-gray-600">
              <Target className="h-4 w-4" />
              {isEditing ? (
                <Input
                  value={editedTargetAudience}
                  onChange={(e) => onTargetAudienceChange(e.target.value)}
                  placeholder="Target audience"
                />
              ) : (
                <span>Target Audience: {project.target_audience || "Not specified"}</span>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex items-center gap-2 text-gray-600">
            <Coins className="h-4 w-4" />
            {isEditing ? (
              <Input
                value={editedBudget}
                onChange={(e) => onBudgetChange(e.target.value)}
                placeholder="Project budget"
              />
            ) : (
              project.budget && <span>Budget: {project.budget}</span>
            )}
          </div>
        </div>
      </div>

      {project.goals && project.goals.length > 0 && !isEditing && (
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Project Goals</h3>
          <ul className="list-disc pl-5 space-y-1">
            {project.goals.map((goal, index) => (
              <li key={index} className="text-gray-700">{goal}</li>
            ))}
          </ul>
        </div>
      )}

      {!isEditing && project.figma_files && project.figma_files.length > 0 && (
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