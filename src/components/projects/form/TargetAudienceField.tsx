import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
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

interface TargetAudienceFieldProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

export const TargetAudienceField = ({ value, onChange, placeholder }: TargetAudienceFieldProps) => {
  const [open, setOpen] = React.useState(false);
  const selectedAudiences = value ? value.split(",").filter(Boolean) : [];

  const handleAudienceChange = (audience: string) => {
    const current = new Set(selectedAudiences);
    
    if (current.has(audience)) {
      current.delete(audience);
    } else if (current.size < 3) {
      current.add(audience);
    }
    
    onChange(Array.from(current).join(","));
  };

  return (
    <div className="relative space-y-2">
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
        <PopoverContent 
          className="w-[300px] p-0 z-50" 
          align="start"
          side="bottom"
          sideOffset={4}
          alignOffset={0}
          avoidCollisions={true}
          style={{ position: 'relative' }}
        >
          <Command className="max-h-[300px] overflow-auto">
            <CommandInput placeholder="Search target audiences..." className="h-9" />
            <CommandEmpty>No target audience found.</CommandEmpty>
            <CommandGroup>
              {TARGET_AUDIENCES.map((audience) => (
                <CommandItem
                  key={audience}
                  value={audience}
                  onSelect={() => handleAudienceChange(audience)}
                  className="cursor-pointer"
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
                e.stopPropagation();
                handleAudienceChange(audience);
              }}
            >
              ×
            </button>
          </Badge>
        ))}
      </div>
    </div>
  );
};