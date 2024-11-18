import { Project, ProjectStatus } from "@/integrations/supabase/types/project";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ProjectHeaderProps {
  project: Project;
  isFounder: boolean;
  isEditing: boolean;
  editedTitle: string;
  onTitleChange: (value: string) => void;
  onStatusChange: (value: ProjectStatus) => void;
  founderName?: string;
}

export const ProjectHeader = ({
  project,
  isFounder,
  isEditing,
  editedTitle,
  onTitleChange,
  onStatusChange,
  founderName,
}: ProjectHeaderProps) => {
  const projectStatuses: { value: ProjectStatus; label: string }[] = [
    { value: "active", label: "Active" },
    { value: "draft", label: "Not Active" },
    { value: "completed", label: "Completed" },
    { value: "archived", label: "Archived" }
  ];

  return (
    <div className="flex items-start justify-between">
      <div>
        {isEditing ? (
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => onTitleChange(e.target.value)}
            className="text-2xl font-bold bg-transparent border-b border-gray-300 focus:outline-none focus:border-gray-600"
          />
        ) : (
          <>
            <h2 className="text-2xl font-bold">{project.title}</h2>
            <p className="text-gray-500">Posted by {founderName}</p>
          </>
        )}
      </div>
      {isFounder ? (
        <Select
          value={project.status}
          onValueChange={onStatusChange}
        >
          <SelectTrigger className="w-[140px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {projectStatuses.map((status) => (
              <SelectItem key={status.value} value={status.value}>
                {status.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ) : (
        <Badge variant="secondary">{project.status}</Badge>
      )}
    </div>
  );
};