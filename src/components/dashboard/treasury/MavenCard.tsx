import { Profile } from "@/integrations/supabase/types/profile";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StarIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface MavenCardProps {
  maven: Profile;
}

export const MavenCard = ({ maven }: MavenCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/dashboard/chat", { state: { selectedMaven: maven.id } });
  };

  return (
    <Card 
      onClick={handleClick}
      className="group cursor-pointer overflow-hidden transition-all hover:-translate-y-1 border border-gray-200 hover:border-gray-300 hover:shadow-lg h-full"
    >
      <div className="relative aspect-[3/2] w-full">
        <img
          src={maven.avatar_url || "https://api.dicebear.com/7.x/avataaars/svg"}
          alt={maven.full_name || "Maven"}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>
      <div className="p-4 md:p-6 flex flex-col h-[calc(100%-33.33%)]">
        <div className="flex items-start justify-between gap-2 mb-3">
          <div>
            <h3 className="font-medium text-base md:text-lg line-clamp-1">
              {maven.full_name?.split(" ")[0]}
            </h3>
            <div className="flex items-center gap-1 text-sm text-yellow-500">
              <StarIcon className="h-4 w-4 fill-current" />
              <span>5.0</span>
              <span className="text-muted-foreground">(24)</span>
            </div>
          </div>
          <Badge
            variant="secondary"
            className="bg-secondary/10 text-secondary hover:bg-secondary/20 text-xs whitespace-nowrap"
          >
            {maven.maven_skillset}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2 flex-grow">
          {maven.bio || "Maven on the platform"}
        </p>
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Starting at</span>
            <span className="font-medium">$50/hr</span>
          </div>
        </div>
      </div>
    </Card>
  );
};