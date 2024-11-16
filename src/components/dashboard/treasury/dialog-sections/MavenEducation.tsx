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
        <div className="space-y-2">
          <div className="flex justify-between items-start">
            <div>
              <p className="font-medium text-gray-800 text-lg">{education.universities?.name}</p>
              <p className="text-gray-700">{education.degree_program}</p>
            </div>
            <span className="text-sm text-gray-600">ID: {education.id}</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-600">Major</p>
              <p className="text-gray-800">{education.major}</p>
            </div>
            {education.minor && (
              <div>
                <p className="text-sm font-medium text-gray-600">Minor</p>
                <p className="text-gray-800">{education.minor}</p>
              </div>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-gray-600">Year of Study</p>
            <p className="text-gray-800">{education.year_of_study}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Graduation Date</p>
            <p className="text-gray-800">{format(new Date(education.graduation_date), 'MMMM yyyy')}</p>
          </div>
          {education.gpa !== null && (
            <div>
              <p className="text-sm font-medium text-gray-600">GPA</p>
              <p className="text-gray-800">{education.gpa.toFixed(2)}</p>
            </div>
          )}
          <div>
            <p className="text-sm font-medium text-gray-600">University ID</p>
            <p className="text-gray-800">{education.university_id}</p>
          </div>
        </div>
      </div>
    </div>
  );
};