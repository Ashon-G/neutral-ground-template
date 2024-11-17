import { CheckCircle2, ChevronDown } from "lucide-react";
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
    <AccordionItem value={value} className="mb-6 group">
      <AccordionTrigger className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className={`w-[34px] h-[34px] ${isCompleted ? 'bg-green-500' : 'bg-secondary/10'} rounded-full flex items-center justify-center`}>
            <CheckCircle2 className={`w-5 h-5 ${isCompleted ? 'text-white' : 'text-secondary'}`} />
          </div>
          <div>
            <p className="text-neutral-950 font-medium">{title}</p>
            <p className="text-neutral-500 text-sm">{description}</p>
          </div>
        </div>
        <ChevronDown className="text-neutral-400 group-open:rotate-180 transition-transform" />
      </AccordionTrigger>
      <AccordionContent>
        <div className="pl-12 pr-4 mt-4">
          <p className="text-neutral-500 text-sm mb-4">{description}</p>
          <div className="flex gap-4">
            <button 
              onClick={onAction}
              className="bg-secondary text-white rounded-md py-2 px-4 hover:bg-secondary/90 transition-colors"
            >
              {buttonText}
            </button>
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};