import { Briefcase } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

interface MavenExperienceProps {
  experience: any[];
}

export const MavenExperience = ({ experience }: MavenExperienceProps) => {
  if (!experience?.length) return null;

  return (
    <div className="space-y-2">
      <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-900">
        <Briefcase className="h-5 w-5" />
        Experience
      </h3>
      <div className="space-y-4">
        {experience.map((exp) => (
          <div key={exp.id} className="bg-secondary/10 rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium text-gray-800">{exp.job_title}</p>
                <p className="text-gray-700">{exp.company_name}</p>
                <p className="text-sm text-gray-600">
                  {format(new Date(exp.start_date), 'MMM yyyy')} - 
                  {exp.end_date ? format(new Date(exp.end_date), ' MMM yyyy') : ' Present'}
                </p>
              </div>
              <Badge>{exp.experience_type}</Badge>
            </div>
            {exp.responsibilities && (
              <div className="mt-2">
                <p className="font-medium text-sm text-gray-800">Responsibilities:</p>
                <p className="text-sm text-gray-700">{exp.responsibilities}</p>
              </div>
            )}
            {exp.achievements && (
              <div className="mt-2">
                <p className="font-medium text-sm text-gray-800">Key Achievements:</p>
                <p className="text-sm text-gray-700">{exp.achievements}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};