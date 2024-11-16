import { Briefcase } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

interface Experience {
  id: string;
  maven_id: string;
  experience_type: string;
  company_name: string;
  job_title: string;
  start_date: string;
  end_date: string | null;
  responsibilities: string | null;
  achievements: string | null;
}

interface MavenExperienceProps {
  experience: Experience[] | null;
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
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="font-medium text-gray-800 text-lg">{exp.job_title}</p>
                <p className="text-gray-700">{exp.company_name}</p>
                <p className="text-sm text-gray-600">
                  {format(new Date(exp.start_date), 'MMM yyyy')} - 
                  {exp.end_date ? format(new Date(exp.end_date), ' MMM yyyy') : ' Present'}
                </p>
              </div>
              <Badge variant="secondary">{exp.experience_type}</Badge>
            </div>
            
            {exp.responsibilities && (
              <div className="mt-3">
                <p className="font-medium text-sm text-gray-800 mb-1">Responsibilities:</p>
                <p className="text-sm text-gray-700 whitespace-pre-wrap">{exp.responsibilities}</p>
              </div>
            )}
            
            {exp.achievements && (
              <div className="mt-3">
                <p className="font-medium text-sm text-gray-800 mb-1">Key Achievements:</p>
                <p className="text-sm text-gray-700 whitespace-pre-wrap">{exp.achievements}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};