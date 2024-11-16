import { Badge } from "@/components/ui/badge";
import { Lightbulb } from "lucide-react";

interface Skill {
  id: string;
  maven_id: string;
  skill_type: string;
  skill_name: string;
}

interface MavenSkillsProps {
  skills: Skill[] | null;
}

export const MavenSkills = ({ skills }: MavenSkillsProps) => {
  if (!skills?.length) return null;

  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.skill_type]) {
      acc[skill.skill_type] = [];
    }
    acc[skill.skill_type].push(skill.skill_name);
    return acc;
  }, {} as Record<string, string[]>);

  return (
    <div className="space-y-2">
      <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-900">
        <Lightbulb className="h-5 w-5" />
        Skills
      </h3>
      <div className="space-y-4">
        {Object.entries(groupedSkills).map(([type, skillNames]) => (
          <div key={type} className="bg-secondary/10 rounded-lg p-4">
            <p className="text-sm font-medium mb-2 text-gray-800">{type}</p>
            <div className="flex flex-wrap gap-2">
              {skillNames.map((name) => (
                <Badge key={name} variant="secondary">
                  {name}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};