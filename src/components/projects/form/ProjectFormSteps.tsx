import { ProjectBasicFields } from "./ProjectBasicFields";
import { ProjectGoals } from "./ProjectGoals";
import { ProjectImageUpload } from "./ProjectImageUpload";
import { ProjectFileUpload } from "./ProjectFileUpload";
import { ProjectFigmaFiles } from "./ProjectFigmaFiles";

interface ProjectFormStepsProps {
  currentStep: number;
  formData: any;
  onChange: (field: string, value: any) => void;
  onGoalChange: (index: number, value: string) => void;
  onAddGoal: () => void;
  onRemoveGoal: (index: number) => void;
}

export const ProjectFormSteps = ({
  currentStep,
  formData,
  onChange,
  onGoalChange,
  onAddGoal,
  onRemoveGoal,
}: ProjectFormStepsProps) => {
  switch (currentStep) {
    case 1:
      return (
        <div className="space-y-6">
          <ProjectBasicFields
            title={formData.title}
            description={formData.description}
            targetAudience={formData.target_audience}
            timeline={formData.timeline}
            onChange={onChange}
          />
          <ProjectImageUpload
            onImageUploaded={(url) => onChange('image_url', url)}
            existingImage={formData.image_url}
          />
        </div>
      );
    case 2:
      return (
        <ProjectGoals
          goals={formData.goals}
          onGoalChange={onGoalChange}
          onAddGoal={onAddGoal}
          onRemoveGoal={onRemoveGoal}
        />
      );
    case 3:
      return (
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Final Details</h3>
            <ProjectBasicFields
              title={formData.title}
              description={formData.description}
              targetAudience={formData.target_audience}
              timeline={formData.timeline}
              onChange={onChange}
              hideBasic
            />
            <ProjectFileUpload
              onFileUploaded={(urls) => onChange('documents', urls)}
              existingFiles={formData.documents}
            />
            <ProjectFigmaFiles
              figmaFiles={formData.figma_files || []}
              onChange={(files) => onChange('figma_files', files)}
            />
          </div>
        </div>
      );
    default:
      return null;
  }
};