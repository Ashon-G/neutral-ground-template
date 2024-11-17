import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { Plus, Minus, HelpCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ProjectGoalsProps {
  goals: string[];
  onGoalChange: (index: number, value: string) => void;
  onAddGoal: () => void;
  onRemoveGoal: (index: number) => void;
}

export const ProjectGoals = ({
  goals,
  onGoalChange,
  onAddGoal,
  onRemoveGoal,
}: ProjectGoalsProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Label className="text-lg font-medium">Project Goals</Label>
        <Tooltip>
          <TooltipTrigger>
            <HelpCircle className="h-4 w-4 text-black" />
          </TooltipTrigger>
          <TooltipContent>
            <p className="max-w-xs">
              Break down your project into specific, measurable goals. This helps track progress and ensures clarity.
            </p>
          </TooltipContent>
        </Tooltip>
      </div>

      <div className="space-y-4">
        {goals.map((goal, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="flex gap-2"
          >
            <Input
              value={goal}
              onChange={(e) => onGoalChange(index, e.target.value)}
              placeholder={`Goal ${index + 1} - e.g., "Increase user engagement by 25%"`}
              className="flex-1"
            />
            {goals.length > 1 && (
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => onRemoveGoal(index)}
                className="shrink-0"
              >
                <Minus className="h-4 w-4" />
              </Button>
            )}
          </motion.div>
        ))}
      </div>

      <Button
        type="button"
        variant="outline"
        onClick={onAddGoal}
        className="w-full"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Another Goal
      </Button>

      <div className="bg-muted/50 rounded-lg p-4 text-sm text-muted-foreground">
        <p className="font-medium mb-2 text-black">Tips for setting effective goals:</p>
        <ul className="list-disc list-inside space-y-1 text-black">
          <li>Make them specific and measurable</li>
          <li>Set realistic timelines</li>
          <li>Focus on outcomes rather than tasks</li>
          <li>Align them with your project's vision</li>
        </ul>
      </div>
    </div>
  );
};