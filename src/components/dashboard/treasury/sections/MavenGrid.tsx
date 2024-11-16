import { Profile } from "@/integrations/supabase/types/profile";
import { MavenCard } from "../MavenCard";

interface MavenGridProps {
  title: string;
  mavens: Profile[];
}

export const MavenGrid = ({ title, mavens }: MavenGridProps) => {
  if (mavens.length === 0) return null;
  
  return (
    <section className="space-y-4 md:space-y-6 px-4 md:px-0">
      <div className="flex items-center justify-between">
        <h2 className="text-lg md:text-2xl font-semibold text-gray-900">{title}</h2>
        <span className="text-sm text-gray-500">{mavens.length} available</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {mavens.map((maven) => (
          <MavenCard key={maven.id} maven={maven} />
        ))}
      </div>
    </section>
  );
};