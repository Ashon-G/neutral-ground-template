import { CheckCircle2 } from "lucide-react";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface GettingStartedTaskProps {
  title: string;
  description: string;
  isCompleted: boolean;
  buttonText: string;
  onAction: () => void;
  value: string;
}

export const GettingStartedTask = ({ 
  title, 
  description, 
  isCompleted, 
  buttonText, 
  onAction,
  value
}: GettingStartedTaskProps) => {
  return (
    <AccordionItem value={value} className="mb-3">
      <AccordionTrigger className="flex justify-between items-center py-2 [&>svg]:hidden">
        <div className="flex items-center gap-2">
          <div className={`w-6 h-6 ${isCompleted ? 'bg-green-500' : 'bg-secondary/10'} rounded-full flex items-center justify-center`}>
            <CheckCircle2 className={`w-4 h-4 ${isCompleted ? 'text-white' : 'text-secondary'}`} />
          </div>
          <div className="text-left">
            <p className="text-neutral-950 text-sm font-medium">{title}</p>
            <p className="text-neutral-500 text-xs">{description}</p>
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent>
        <div className="pl-8 pr-4 mt-2">
          <button 
            onClick={onAction}
            className="bg-secondary text-white rounded-md py-1.5 px-3 text-sm hover:bg-secondary/90 transition-colors"
          >
            {buttonText}
          </button>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};