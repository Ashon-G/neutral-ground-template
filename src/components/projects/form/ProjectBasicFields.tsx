import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
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
import { CalendarIcon, HelpCircle, Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

const TARGET_AUDIENCES = [
  "Small Business Owners",
  "Enterprise Companies",
  "Startups",
  "Freelancers",
  "Students",
  "Parents",
  "Young Professionals",
  "Remote Workers",
  "Local Businesses",
  "Tech Enthusiasts",
  "Creative Professionals",
  "Healthcare Providers",
  "Educational Institutions",
  "Non-Profit Organizations",
  "Government Agencies"
];

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
  const [open, setOpen] = React.useState(false);
  const selectedAudiences = targetAudience ? targetAudience.split(",").filter(Boolean) : [];

  const handleAudienceChange = (audience: string) => {
    const current = new Set(selectedAudiences);
    
    if (current.has(audience)) {
      current.delete(audience);
    } else if (current.size < 3) {
      current.add(audience);
    }
    
    onChange("target_audience", Array.from(current).join(","));
  };

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
        <div className="space-y-2">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-full justify-between"
              >
                {selectedAudiences.length === 0 ? (
                  <span className="text-muted-foreground">{placeholder}</span>
                ) : (
                  <span className="text-black">
                    {selectedAudiences.length} selected
                  </span>
                )}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0" side="bottom" align="start">
              <Command>
                <CommandInput placeholder="Search target audiences..." />
                <CommandEmpty>No target audience found.</CommandEmpty>
                <CommandGroup className="max-h-[200px] overflow-auto">
                  {TARGET_AUDIENCES.map((audience) => (
                    <CommandItem
                      key={audience}
                      onSelect={() => {
                        handleAudienceChange(audience);
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          selectedAudiences.includes(audience)
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      {audience}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
          <div className="flex flex-wrap gap-2">
            {selectedAudiences.map((audience) => (
              <Badge
                key={audience}
                variant="secondary"
                className="text-sm"
              >
                {audience}
                <button
                  className="ml-1 rounded-full outline-none focus:outline-none"
                  onClick={(e) => {
                    e.preventDefault();
                    handleAudienceChange(audience);
                  }}
                >
                  ×
                </button>
              </Badge>
            ))}
          </div>
        </div>
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