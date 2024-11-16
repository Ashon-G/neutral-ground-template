import { Profile } from "@/integrations/supabase/types/profile";
import { MavenCard } from "../MavenCard";

interface MavenGridProps {
  title: string;
  mavens: Profile[];
}

export const MavenGrid = ({ title, mavens }: MavenGridProps) => {
  if (mavens.length === 0) return null;
  
  return (
    <section className="space-y-6 md:space-y-8 px-4 md:px-8">
      <div className="flex items-center justify-between">
        <h2 className="text-xl md:text-3xl font-semibold text-gray-900">{title}</h2>
        <span className="text-sm md:text-base text-gray-500">{mavens.length} available</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
        {mavens.map((maven) => (
          <MavenCard key={maven.id} maven={maven} />
        ))}
      </div>
    </section>
  );
};