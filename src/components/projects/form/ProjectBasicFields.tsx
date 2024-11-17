import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { TargetAudienceField } from "./TargetAudienceField";

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
    type: "input" | "textarea" | "date" | "audience" = "input"
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
            <HelpCircle className="h-4 w-4 text-black" />
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
      ) : type === "date" ? (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal",
                !value && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {value ? format(new Date(value), "PPP") : placeholder}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={value ? new Date(value) : undefined}
              onSelect={(date) => onChange(id, date ? date.toISOString() : "")}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      ) : type === "audience" ? (
        <TargetAudienceField
          value={value}
          onChange={(value) => onChange(id, value)}
          placeholder={placeholder}
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
        "Select up to 3 target audiences",
        "Choose who will benefit from or use your project",
        "audience"
      )}
      {renderField(
        "Project Timeline",
        "timeline",
        timeline,
        "Select target completion date",
        "Choose when you expect the project to be completed",
        "date"
      )}
    </div>
  );
};