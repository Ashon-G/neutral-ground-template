import React, { useState, useCallback } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
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

const TARGET_AUDIENCES = [
  "Small Businesses",
  "Enterprise Companies",
  "Startups",
  "Consumers",
  "Government",
  "Education",
  "Healthcare",
  "Non-profit",
  "Technology",
  "Retail",
];

interface TargetAudienceFieldProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const TargetAudienceField = ({
  value,
  onChange,
  placeholder = "Select target audience...",
}: TargetAudienceFieldProps) => {
  const [open, setOpen] = useState(false);

  const handleAudienceChange = useCallback((currentValue: string) => {
    onChange(currentValue);
    setOpen(false);
  }, [onChange]);

  return (
    <div className="relative">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {value ? value : placeholder}
          </Button>
        </PopoverTrigger>
        <PopoverContent 
          className="w-full min-w-[200px] p-0" 
          align="start"
          side="bottom"
          sideOffset={4}
        >
          <Command shouldFilter={false}>
            <CommandInput 
              placeholder="Search target audiences..." 
              className="h-9"
            />
            <CommandEmpty>No target audience found.</CommandEmpty>
            <CommandGroup className="max-h-[200px] overflow-y-auto">
              {TARGET_AUDIENCES.map((audience) => (
                <CommandItem
                  key={audience}
                  value={audience}
                  onSelect={() => handleAudienceChange(audience)}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === audience ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {audience}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};