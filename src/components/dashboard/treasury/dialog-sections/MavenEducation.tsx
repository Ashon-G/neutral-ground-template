import { GraduationCap } from "lucide-react";
import { format } from "date-fns";

interface MavenEducationProps {
  education: any;
}

export const MavenEducation = ({ education }: MavenEducationProps) => {
  if (!education) return null;

  return (
    <div className="space-y-2">
      <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-900">
        <GraduationCap className="h-5 w-5" />
        Education
      </h3>
      <div className="bg-secondary/10 rounded-lg p-4">
        <p className="font-medium text-gray-800">{education.universities?.name}</p>
        <p className="text-gray-700">{education.degree_program} in {education.major}</p>
        {education.minor && <p className="text-gray-700">Minor in {education.minor}</p>}
        <p className="text-gray-700">Year of Study: {education.year_of_study}</p>
        {education.gpa && <p className="text-gray-700">GPA: {education.gpa}</p>}
        <p className="text-sm text-gray-600 mt-1">
          Graduating {format(new Date(education.graduation_date), 'MMMM yyyy')}
        </p>
      </div>
    </div>
  );
};