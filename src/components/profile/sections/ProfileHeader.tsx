import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Profile } from "@/integrations/supabase/types/profile";

type Props = {
  profile: Profile | undefined;
  handleAvatarChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const ProfileHeader = ({ profile, handleAvatarChange }: Props) => {
  const getUserTypeColor = (userType?: string) => {
    switch (userType) {
      case 'founder':
        return 'bg-blue-500';
      case 'maven':
        return 'bg-green-500';
      case 'admin':
        return 'bg-purple-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="flex items-center gap-4">
      <Avatar className="h-20 w-20">
        <AvatarImage src={profile?.avatar_url || ""} />
        <AvatarFallback>{profile?.full_name?.charAt(0) || "?"}</AvatarFallback>
      </Avatar>
      <div className="space-y-2">
        <Input
          type="file"
          accept="image/*"
          onChange={handleAvatarChange}
          className="mb-2"
        />
        <p className="text-sm text-muted-foreground">
          Recommended: Square image, max 1MB
        </p>
        {profile?.user_type && (
          <Badge className={getUserTypeColor(profile.user_type)}>
            {profile.user_type.charAt(0).toUpperCase() + profile.user_type.slice(1)}
          </Badge>
        )}
      </div>
    </div>
  );
};