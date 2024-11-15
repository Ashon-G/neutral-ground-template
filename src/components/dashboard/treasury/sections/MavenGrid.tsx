import { Profile } from "@/integrations/supabase/types/profile";
import { MavenCard } from "../MavenCard";

interface MavenGridProps {
  title: string;
  mavens: Profile[];
}

export const MavenGrid = ({ title, mavens }: MavenGridProps) => {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {mavens.map((maven) => (
          <MavenCard key={maven.id} maven={maven} />
        ))}
      </div>
    </section>
  );
};