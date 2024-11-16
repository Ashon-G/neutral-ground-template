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
        <div className="space-y-2">
          <DialogTitle className="text-2xl text-gray-900">{maven.full_name}</DialogTitle>
          <div className="flex flex-wrap gap-2">
            {maven.maven_skillset && (
              <Badge variant="secondary">
                {maven.maven_skillset}
              </Badge>
            )}
            {maven.user_type && (
              <Badge variant="outline">
                {maven.user_type}
              </Badge>
            )}
          </div>
          {maven.username && (
            <p className="text-sm text-gray-600">@{maven.username}</p>
          )}
        </div>
      </div>
      <div className="mt-4 space-y-1 text-sm text-gray-500">
        <p>Profile ID: {maven.id}</p>
        <p>Created: {new Date(maven.created_at).toLocaleDateString()}</p>
      </div>
    </DialogHeader>
  );
};