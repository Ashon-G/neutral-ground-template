import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Profile } from "@/integrations/supabase/types/profile";

interface MavenHeaderProps {
  maven: Profile;
}

export const MavenHeader = ({ maven }: MavenHeaderProps) => {
  return (
    <DialogHeader>
      <div className="flex items-center gap-4">
        <img
          src={maven.avatar_url || "https://api.dicebear.com/7.x/avataaars/svg"}
          alt={maven.full_name || "Maven"}
          className="h-16 w-16 rounded-full object-cover"
        />
        <div>
          <DialogTitle className="text-2xl text-gray-900">{maven.full_name}</DialogTitle>
          <Badge variant="secondary" className="mt-1">
            {maven.maven_skillset}
          </Badge>
        </div>
      </div>
    </DialogHeader>
  );
};