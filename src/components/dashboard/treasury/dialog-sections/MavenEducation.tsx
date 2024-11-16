import { GraduationCap } from "lucide-react";
import { format } from "date-fns";

interface MavenEducationProps {
  education: {
    id: string;
    maven_id: string;
    university_id: string;
    degree_program: string;
    major: string;
    minor: string | null;
    year_of_study: string;
    graduation_date: string;
    gpa: number | null;
    universities: {
      name: string;
    };
  } | null;
}

export const MavenEducation = ({ education }: MavenEducationProps) => {
  if (!education) return null;

  return (
    <div className="space-y-2">
      <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-900">
        <GraduationCap className="h-5 w-5" />
        Education
      </h3>
      <div className="bg-secondary/10 rounded-lg p-4 space-y-3">
        <div>
          <p className="font-medium text-gray-800 text-lg">{education.universities?.name}</p>
          <p className="text-gray-700">{education.degree_program} in {education.major}</p>
          {education.minor && <p className="text-gray-700">Minor in {education.minor}</p>}
        </div>
        
        <div className="space-y-1">
          <p className="text-gray-700">
            <span className="font-medium">Year of Study:</span> {education.year_of_study}
          </p>
          {education.gpa && (
            <p className="text-gray-700">
              <span className="font-medium">GPA:</span> {education.gpa}
            </p>
          )}
          <p className="text-gray-700">
            <span className="font-medium">Graduating:</span> {format(new Date(education.graduation_date), 'MMMM yyyy')}
          </p>
        </div>
      </div>
    </div>
  );
};