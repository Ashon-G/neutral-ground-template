import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";

interface ProjectBasicFieldsProps {
  title: string;
  description: string;
  targetAudience: string;
  timeline: string;
  onChange: (field: string, value: string) => void;
  hideBasic?: boolean;
}

export const ProjectBasicFields = ({
  title,
  description,
  targetAudience,
  timeline,
  onChange,
  hideBasic = false,
}: ProjectBasicFieldsProps) => {
  const renderField = (
    label: string,
    id: string,
    value: string,
    placeholder: string,
    tooltip: string,
    type: "input" | "textarea" = "input"
  ) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-2"
    >
      <div className="flex items-center gap-2">
        <Label htmlFor={id} className="text-sm font-medium">
          {label}
        </Label>
        <Tooltip>
          <TooltipTrigger>
            <HelpCircle className="h-4 w-4 text-muted-foreground" />
          </TooltipTrigger>
          <TooltipContent>
            <p className="max-w-xs">{tooltip}</p>
          </TooltipContent>
        </Tooltip>
      </div>
      {type === "textarea" ? (
        <Textarea
          id={id}
          value={value}
          onChange={(e) => onChange(id, e.target.value)}
          placeholder={placeholder}
          className="min-h-[150px] resize-none"
        />
      ) : (
        <Input
          id={id}
          value={value}
          onChange={(e) => onChange(id, e.target.value)}
          placeholder={placeholder}
        />
      )}
    </motion.div>
  );

  return (
    <div className="space-y-6">
      {!hideBasic && (
        <>
          {renderField(
            "Project Title",
            "title",
            title,
            "Enter a clear and concise title",
            "Choose a title that clearly represents your project's main objective"
          )}
          {renderField(
            "Project Description",
            "description",
            description,
            "Describe your project in detail...",
            "Provide a comprehensive overview of your project, including its purpose and expected outcomes",
            "textarea"
          )}
        </>
      )}
      {renderField(
        "Target Audience",
        "target_audience",
        targetAudience,
        "Who is this project for?",
        "Define who will benefit from or use your project"
      )}
      {renderField(
        "Timeline",
        "timeline",
        timeline,
        "Expected timeline for the project",
        "Specify your project's duration and key milestones"
      )}
    </div>
  );
};