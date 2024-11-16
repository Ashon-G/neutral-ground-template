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
      className="group cursor-pointer overflow-hidden transition-all hover:-translate-y-1 border border-gray-200 hover:border-gray-300 hover:shadow-lg w-full"
    >
      {/* Image Section */}
      <div className="relative aspect-[4/3] w-full">
        <img
          src={maven.avatar_url || "https://api.dicebear.com/7.x/avataaars/svg"}
          alt={maven.full_name || "Maven"}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      {/* Content Section */}
      <div className="p-4 sm:p-6 md:p-8">
        <div className="flex items-start justify-between gap-4 mb-4 md:mb-6">
          <div>
            {/* Name */}
            <h3 className="font-medium text-lg sm:text-xl md:text-2xl line-clamp-1">
              {maven.full_name?.split(" ")[0]}
            </h3>

            {/* Rating */}
            <div className="flex items-center gap-1.5 text-sm sm:text-base text-yellow-500 mt-1">
              <StarIcon className="h-4 w-4 sm:h-5 sm:w-5 fill-current" />
              <span>5.0</span>
              <span className="text-muted-foreground">(24)</span>
            </div>
          </div>

          {/* Badge */}
          <Badge
            variant="secondary"
            className="bg-secondary/10 text-secondary hover:bg-secondary/20 text-xs sm:text-base whitespace-nowrap px-2 sm:px-4 py-0.5 sm:py-1"
          >
            {maven.maven_skillset}
          </Badge>
        </div>

        {/* Bio */}
        <p className="text-sm sm:text-lg text-muted-foreground line-clamp-2 mb-4 sm:mb-6">
          {maven.bio || "Maven on the platform"}
        </p>

        {/* Pricing */}
        <div className="pt-4 sm:pt-6 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <span className="text-sm sm:text-base text-muted-foreground">
              Starting at
            </span>
            <span className="font-medium text-lg sm:text-xl">$50/hr</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
